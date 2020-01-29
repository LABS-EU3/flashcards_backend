// const { welcomeText } = require('../../utils/constants');
// const { EMAIL_SECRET, GOOGLE_FRONTEND_REDIRCT } = require('../../config');
// const emailTemplate = require('../../templates/confirmEmail');
// const resetPasswordTemplate = require('../../templates/forgotPassword');
// const sendEmail = require('../../utils/sendEmail');
// recieves body of text, from user login - get email. Send to Quickdecs email
// reset_pw: send body of text to QuickDecks email

exports.feedback = async (req, res) => {
  try {
    console.log(req);
    console.log(res);
    // const feedback = req.body.text;
    // console.log(feedback);

    // sendEmail(
    //     'Feedback',
    //     resetRequestEmail,
    //     resetPasswordTemplate(resetRequestEmail, passwordResetToken)
    //   );
  } catch (error) {
    console.log(error);
  }
};
