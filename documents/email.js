exports.emailTemplate = ({ user }) => {
  return `
<!DOCTYPE html>
<html>
    <head>
       <style>
           html, body {
    margin: 0 auto;
    padding: 0;
}

.layout {
    background-color: #EEEEEE;
    font-family: "Roboto";
    width: 100%;
    color: #484b5b;
    padding: 20px 0;
}

.content {
    text-align: center;
    background-color: white;
    width: 75%;
    margin: 0 auto;
    padding: 25px;
}

.name {
    line-height: 20px;
    font-size: 24px;
    
}
       </style>
    </head>
    
    
    
    <body>
        <div class="layout">
        <div class="content">
         
            <h1 class="name"> Message from ${
              (user.firstName, user.lastName || user.fullName)
            }</h1>
            
              <hr>
              <div>
                 <p> ${user.message} </p>
                 <h4> User email ${user.email} </h4>
        </div>
    </div>
    </div>
    </body>
</html>`;
};
