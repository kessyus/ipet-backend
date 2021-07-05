const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const send = async ({ destinatario, remetente, assunto, corpo }) => {
  const msg = {
    to: destinatario, // Change to your recipient
    from: remetente, // Change to your verified sender
    subject: assunto,
    text: corpo
  };

  await sendgrid.send(msg);
};

module.exports = {
  send
};
