const User = require("../models/user");

const apoderadoAuth = async (req, res, next) => {
    const { id } = req.params.usuarioId;
    const user = await User.findById(id);
    if (user.role === "apoderado") {
        next();
    }
    else {
        return res.status(400).send({ message: "No tiene permisos para realizar esta acción" });
    }
};

module.exports = apoderadoAuth;