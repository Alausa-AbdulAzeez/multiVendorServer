const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(options) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  })

  // send mail with defined transport object
  console.log(options)
  let info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL, // sender address
    to: options?.email, // list of receivers
    subject: options?.subject, // Subject line
    text: options?.message, // plain text body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendMail().catch(console.error)

module.exports = sendMail
