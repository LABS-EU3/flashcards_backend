const userFeedbackTemplate = require('../../templates/userFeedback');
const sendEmail = require('../../utils/sendEmail');
const { senderEmail } = require('../../config/index');

const model = require('./model');
// recieves body of text, from user login - get email. Send to Quickdecs email
// reset_pw: send body of text to QuickDecks email

exports.userFeedback = async (req, res) => {
  try {
    const feedback = req.body.text;
    const id = req.decodedToken.subject;
    const userEmailObj = await model.getUserEmail(id);
    const userEmail = userEmailObj.email;
    console.log(userEmail);

    sendEmail(
      'Feedback',
      userEmail,
      userFeedbackTemplate(userEmail, feedback),
      senderEmail
    );

    res.status(201).json({
      message: `User feedback sent successfully`,
      data: {
        feedback,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to sign user up` });
  }
};
