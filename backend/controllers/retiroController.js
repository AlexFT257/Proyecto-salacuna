var nodemailer = require('nodemailer');

var correo = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`
  }
});

const notificarRetiro = (req, res) => {
    const {to, rutParvulo} = req.body;

    var mailOptions = {
        from: `${process.env.MAIL_USER}`,
        to,
        subject: `Su pupilo ha sido retirado`,
        text: `Su pupilo: ${rutParvulo} fue retirado a las ${Date.now}`
      };

      correo.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
  notificarRetiro
};