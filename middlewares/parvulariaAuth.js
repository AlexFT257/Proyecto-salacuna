const User = require("../models/user");

const parvulariaAuth = async (req, res, next) => {
  const id = req.get("X-Caller-Id");
  if (!id) {
    return res.status(400).send({ message: "Id vacio" });
  }
  const user = await User.findOne({ id });
  if (user.role == "parvularia" || user.role == "asistente") {
    next();
  } else {
    return res
      .status(400)
      .send({ message: "No tiene permisos para realizar esta acción" });
  }
};

module.exports = parvulariaAuth;
