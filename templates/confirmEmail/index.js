const MailGen = require('mailgen');
const { confirmEmailRedirect, frontEndSite } = require('../../config');

module.exports = userFullName => {
  const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
      name: 'QuickDecks',
      link: frontEndSite,
      // logo: ToDo(Add logo URL)
    },
  });

  const email = {
    body: {
      name: userFullName,
      intro: 'Are you ready to be a savant?',
      action: {
        instructions: 'Please click the button below to verify your account',
        button: {
          color: '#33b5e5',
          text: 'Verify account',
          link: confirmEmailRedirect,
        },
      },
    },
  };

  return mailGenerator.generate(email);
};
// require('fs').writeFileSync('preview.html', emailTemplate, 'utf8');
