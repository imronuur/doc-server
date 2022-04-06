const Client = require("../models/clients");

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json({
      clients,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.readClient = async (req, res) => {
  const { _id } = req.body;
  try {
    const client = await Client.find({ _id });
    res.json({
      client,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.createOrUpdateClient = async (req, res) => {
  try {
    const { _id, name, phone, email, state, company } = req.body.client;
    const client = await Client.findOneAndUpdate(
      { _id },
      { name, phone, email, state, company },
      { new: true }
    );
    if (client) {
      res.json(client);
    } else {
      const newClient = await new Client(req.body.client).save();
      res.json(newClient);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findOneAndDelete({
      _id: req.params._id,
    });
    res.json(deletedClient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteMany = async (req, res) => {
  try {
    await Client.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Clients!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
