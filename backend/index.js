const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// importes de login
const cookieParser = require("cookie-parser");

// insertar las rutas de los requisitos
const asistenteParvuloRoutes = require('./routes/asistenteParvuloRoutes');
const userRoutes = require('./routes/userRoutes');
const parvuloRoutes = require('./routes/parvuloRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const fileRoutes = require("./routes/fileRoutes");
const actividadRoutes = require("./routes/actividadRoutes");

// TODO: reemplazar el origin por la ruta de la app en el server
app.use(cookieParser());
app.options("*", cors());
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}));

app.use(express.json());




app.use('/api', asistenteParvuloRoutes);
app.use('/api', userRoutes);
app.use('/api', parvuloRoutes);
app.use('/api', asistenciaRoutes);
app.use('/api', actividadRoutes);
app.use("/api", userRoutes);
app.use("/api", fileRoutes);

mongoose.set("useNewUrlParser", true);
mongoose.set('useFindAndModify',false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.DB, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
