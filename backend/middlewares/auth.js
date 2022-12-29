const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

// funcion para crear token modificada para usar el header X-Caller-Id
const auth = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.token || !cookies.token == 'null') {
        return res.status(403).send({ message: 'No posees autorizacion' });
    }

    /*
    if (!req.headers.X-Caller-Id) {
        return res.status(403).send({ message: 'No posees autorizacion' });
    }

    // no se si se puede usar el header asi o con las cookies
    const token = req.headers.X-Caller-Id; */
    const token = cookies.token;
    const payload = jwt.decode(token, process.env.SECRET_KEY);

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'El token expiro' });
    }

    req.user = payload.sub;
    next();
}

module.exports = {  auth, };