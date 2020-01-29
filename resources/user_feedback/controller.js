const userFeedbackTemplate = require('../../templates/userFeedback');
const sendEmail = require('../../utils/sendEmail');
// const model = require('./model');
// recieves body of text, from user login - get email. Send to Quickdecs email
// reset_pw: send body of text to QuickDecks email

exports.userFeedback = async (req, res) => {
  try {
    const feedback = req.body.text;
    const userEmail = req.body.email;
    // const user = await model.filter({ email: userEmail });
    // console.log(user);

    sendEmail('Feedback', userEmail, userFeedbackTemplate(userEmail, feedback));

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
