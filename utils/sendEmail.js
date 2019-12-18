const nodemailer = require('nodemailer');
const { stubTransport } = require('nodemailer-stub');
const { senderEmail, password } = require('../config/index');

// A sendEmail util accepting `subject` as subject of the email to be sent
// `recipient` as email Address of recipent, `emailBody` as the html to be
// sent to the recipent and an optional callback function that returns the
// information obtained from nodemailer on success

module.exports = (subject, recipients, emailBody, next) => {
  // Make transporter a test stub when testing and a gmail
  // transporter otherwise.
  const transporter =
    process.env.DB_ENV !== 'testing'
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: senderEmail,
            pass: password,
          },
        })
      : nodemailer.createTransport(stubTransport);

  const mailOptions = {
    from: `"Your QuickDecks Plug" <${senderEmail}>`,
    to: recipients,
    subject,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error && next) {
      next(info);
    }
  });
};
