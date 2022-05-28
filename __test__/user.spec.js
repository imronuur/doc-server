/* eslint-disable no-undef */
const app = require("../app");
const request = require("supertest");
const axios = require("axios").default;
const mongoose = require("mongoose");
// eslint-disable-next-line no-unused-vars
var { defaultAuth } = require("../firebase");

jest.setTimeout(20000);

let userToken;
let adminToken;
let userUID;
let _id;
let email;

beforeAll(async () => {
  // Before all the tests start, we need to connect to our MongoDB cluster.
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // ----------------- Access token creation section ------------------------- //

  // Creating TEST user
  await defaultAuth
    .createUser({
      email: "test@silicon.so",
      emailVerified: false,
      phoneNumber: "+15000554566",
      password: "secretPassword",
      displayName: "John Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })
    .then((user) => {
      userUID = user.uid;
    });

  // Create Custom token for the test user
  const userCustomToken = await defaultAuth.createCustomToken(userUID);

  // Exchanging our custom token with firebase auth token
  const userTokenRes = await axios({
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.API_KEY_1}`,
    method: "post",
    data: {
      token: userCustomToken,
      returnSecureToken: true,
    },
    json: true,
  });
  userToken = userTokenRes.data.idToken;

  // Creating custom access token for the admin
  const adminCustomToken = await defaultAuth.createCustomToken(
    process.env.ADMIN_UID
  );

  //   Exchanging our custom token with firebase auth token
  const adminTokenRes = await axios({
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.API_KEY_1}`,
    method: "post",
    data: {
      token: adminCustomToken,
      returnSecureToken: true,
    },
    json: true,
  });

  adminToken = adminTokenRes.data.idToken;

  console.log({ userToken, adminToken });

  // ------------------- Access Token creation section ends here ---------------------------- //
});
afterAll(async () => {
  await mongoose.connection.close();
});

/* ----------- USER APIs test ---------------
    In this test file all user APIs are tested including: 

    ---------- USER APIS --------------
    1. POST /users - Create Or Update User API
    2. POST /user-profile - Create User Profile 
    3. POST /login-user - User Login 
    4. POST /users/add-address - User Address Add API
    5. GET /users/get-address - User Address Read API
    6. POST /users/remove-address - User Address Remove API
    7. POST /users/token-check - Checks Where Token Is Valid Or Not

    ---------- ADMIN APIs -------------------
    8. GET /useres - List All Users 
    9. DELETE /users/:_id - Delete User
    10. POST /admin-add-user - Admin Can Create Users 
  
*/

describe("USER APIs", () => {
  it("POST /users", async () => {
    await request(app)
      .post(`/api/users`)
      .set("Authorization", userToken)
      .send({
        name: "Test User",
      })
      .expect(200)
      .then((res) => {
        _id = res.body.user._id;
        email = res.body.user.email;
        expect(res.body).toEqual({
          accessToken: expect.any(String),
          user: expect.objectContaining({
            _id: expect.any(String),
            role: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
            wishlist: expect.any(Array),
            address: expect.any(Array),
          }),
        });
      });
  });

  it("DELETE /users/:_id", async () => {
    console.log({ _id, email });
    await request(app)
      .delete(`/api/users/${_id}`)
      .set({ Authorization: adminToken, email: email })
      .expect(200)
      .then((res) => {
        console.log(res);
      });
  });
});
