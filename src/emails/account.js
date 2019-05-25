const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rick1977@protonmail.com',
    subject: 'Thanks for joining',
    text: `Welcome to the app, ${name}. Tell me how you get along. `
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rickd1977@protonmail',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name} Is there anything we could have done? Any comments would be appreciated.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}