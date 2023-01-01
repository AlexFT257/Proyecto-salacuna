const fileSizeError = (err, req, res, next) => {
    if (err) {
        //confirm.log(err);
        return res.status(413).send({ message: "El archivo es demasiado grande", error: err})
    } else {
        next()
    }
}

module.exports = fileSizeError