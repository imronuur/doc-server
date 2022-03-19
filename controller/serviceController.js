const Service = require("../models/services");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../documents/email.js");

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json({
      services,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.readService = async (req, res) => {
  const { _id } = req.body;
  try {
    const service = await Service.find({ _id });
    res.json({
      service,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.createOrUpdateService = async (req, res) => {
  try {
    const {
      _id,
      title,
      subtitle,
      description,
      icon,
      techStacks,
      process,
      benifts,
      consider,
    } = req.body.service;
    const service = await Service.findOneAndUpdate(
      { _id },
      {
        title,
        subtitle,
        description,
        icon,
        techStacks,
        process,
        benifts,
        consider,
      },
      { new: true }
    );
    if (service) {
      res.json(service);
    } else {
      const newService = await new Service(req.body.service).save();
      res.json(newService);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findOneAndDelete({
      _id: req.params._id,
    });
    res.json(deletedService);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const { user } = req.body;
  console.log(user);
  try {
    const emailSent = await transporter.sendMail({
      from: `${(user.firstName, user.lastName || user.fullName)}`,
      to: `info@silicon.so`, // list of receivers
      replyTo: `${user.email}`,
      subject: `Contact From Mr/Ms ${user.lastName || user.fullName}`, // Subject line
      text: `${user.message}`, // plain text body
      html: emailTemplate(req.body),
    });

    res.status(200).send(emailSent);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
