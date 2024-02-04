const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // email options
  const mailOptions = {
    from: 'Aneesh Gupta <aneeshgupta2512@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
