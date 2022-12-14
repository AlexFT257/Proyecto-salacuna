const User = require("../models/user");

const apoderadoAuth = async (req, res, next) => {
  const { id } = req.get("X-Caller-Id");
  if (!id) {
    return res.status(400).send({ message: "Id vacio" });
  }

  const user = await User.findById(id);
  
  if (!user) {
    return res.status(404).send({ message: "Usuario no encontrado"});
  }

  if (user.role == "apoderado") {
    next();
  } else {
    return res
      .status(400)
      .send({ message: "No tiene permisos para realizar esta acción" });
  }
};

module.exports = apoderadoAuth;
