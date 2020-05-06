const sendgridMail = require('@sendgrid/mail');
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (to, from, subject, html, text) => {
  const msg = {
    to, from, subject, html, text
  };
  sendgridMail.send(msg);
};
