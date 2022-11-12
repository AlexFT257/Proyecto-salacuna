const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// insertar las rutas de los requisitos
const asistenteParvuloRoutes = require('./routes/asistenteParvuloRoutes')
const actividadRoutes = require('./routes/actividadRoutes')

app.use(cors());
app.use(express.json());
app.options('*',cors());

app.use('/api', asistenteParvuloRoutes);
app.use('/api', actividadRoutes);

mongoose.set('useNewUrlParser',true);
//mongoose.set('useFindeAndModify',false); // crashea si se activa debe ser un video que no he visto
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);

mongoose.connect(process.env.DB,(error)=>{
    if(error){
        console.log(error);
    } else {
        console.log("Connected to database");
    }

})

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})
