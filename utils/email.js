require('dotenv').config();
const sgMail = require('@sendgrid/mail');

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENGRID_API_KEY);

  const msg = {
    to: data.to,
    from: 'No Reply<u201911952@upc.edu.pe>',
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data
  }

  try {
    const response = await sgMail.send(msg)
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  sendEmail
}
// sendEmail();
