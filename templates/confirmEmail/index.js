const { confirmEmailRedirect } = require('../../config');

module.exports = `<b>Please click on this 
<a href="${confirmEmailRedirect}>${confirmEmailRedirect}</a> 
to confrim your email address.</b>`;
