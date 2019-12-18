const port = process.env.PORT || 4003;
const SECRET = process.env.SECRET || 'A very secure secret';
const senderEmail = process.env.NODEMAILER_EMAIL_ADDRESS;
const password = process.env.NODEMAILER_EMAIL_PASSWORD;
const BACKEND_HOST = process.env.HOST;
module.exports = {
  port,
  SECRET,
  senderEmail,
  password,
  BACKEND_HOST,
};
