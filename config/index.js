const port = process.env.PORT || 4003;
const SECRET = process.env.SECRET || 'A very secure secret';
const emailAddress = process.env.NODEMAILER_EMAIL_ADDRESS;
const password = process.env.NODEMAILER_EMAIL_PASSWORD;
module.exports = {
  port,
  SECRET,
  emailAddress,
  password,
};
