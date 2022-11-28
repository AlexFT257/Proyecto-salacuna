var nodemailer = require('nodemailer');

var correo = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marco.acuna1901@alumnos.ubiobio.cl',
    pass: 'CAMBIAR'
  }
});

const notificarRetiro = (req, res) => {
    const {rut, parvulo} = req.params;
    const {to, subject, rutParvulo} = req.body;

    var mailOptions = {
        from: 'marco.acuna1901@alumnos.ubiobio.cl',
        to,
        subject: `Su pupilo ha sido retirado`,
        text: `Su pupilo: ${rutParvulo} fue retirado a las ${(new Date.now).toLocaleDateString()}`
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