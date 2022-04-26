const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendmail = (mailTo, subject, text, html) => {
  const msg = {
    to: mailTo,
    from: {
      name: "Expense Tracker",
      email: process.env.SENDGRID_SENDER_EMAIL,
    },
    subject: subject,
    text: text,
    html: html,
  };

  return sgMail.send(msg);
};

module.exports = sendmail;
