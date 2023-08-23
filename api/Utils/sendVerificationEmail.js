const nodemailer = require("nodemailer");

const createMailTrasporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailpass,
    },
  });
  return transporter;
};

exports.sendVerificationMail = (user) => {
  const transporter = createMailTrasporter();

  const mailOptions = {
    from: `b'fet'<${process.env.email}>`,
    to: user.email,
    subject: "Verify your email",
    html: `<p>Hello ${user.name}, verify your email by clicking this link...</p>
    <a href='${process.env.fd}/verify-email?emailToken=${user.emailToken}'>Verify your email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sent");
    }
  });
};
