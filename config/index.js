const port = process.env.PORT || 4003;
const SECRET = process.env.SECRET || 'A very secure secret';
const senderEmail = process.env.NODEMAILER_EMAIL_ADDRESS;
const password = process.env.NODEMAILER_EMAIL_PASSWORD;
const BACKEND_HOST = process.env.HOST;
const confirmEmailRedirect = process.env.EMAIL_CONFIRMATION_REDIRECT;
const frontEndSite = process.env.FRONTEND_SITE || `https://www.google.com`;
const EMAIL_SECRET = process.env.EMAIL_SECRET || `emailSecret`;
module.exports = {
  port,
  SECRET,
  senderEmail,
  password,
  BACKEND_HOST,
  confirmEmailRedirect,
  frontEndSite,
  EMAIL_SECRET,
};
