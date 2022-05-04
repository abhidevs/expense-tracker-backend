import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendmail = (
  mailTo: string,
  subject: string,
  text: string,
  html: string
) => {
  const msg: any = {
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

export default sendmail;
