const nodemailer = require('nodemailer');
const { senderEmail, password } = require('../config/index');

// A sendEmail util accepting `subject` as subject of the email to be sent
// `recipient` as email Address of recipent, `emailBody` as the html to be
// sent to the recipent and an optional callback function that returns the
// information obtained from nodemailer on success

module.exports = (subject, recipients, emailBody, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: password,
    },
  });

  const mailOptions = {
    from: `"Your QuickDecks Plug" <${senderEmail}>`,
    to: recipients,
    subject,
    text: emailBody,
    html: `<b>${emailBody}</>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error && next) {
      next(info);
    }
  });
};
