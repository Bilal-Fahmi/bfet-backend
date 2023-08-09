const nodemailer = require("nodemailer");

exports.createMailTrasporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailpass,
    },
  });
  return transporter;
};
