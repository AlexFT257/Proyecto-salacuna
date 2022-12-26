const fileModel = require("../models/file")
const fs = require('fs');

const uploadNewFile = (req, res) => {
    const { files } = req
    console.log("Subiendo archivos: " )
    let aux = files.map((file) => {
        const newFile = new fileModel({
            url: file.path,
            name: file.originalname,
            mimeType: file.mimetype
        })
        newFile.save((err, fileSaved) => {
            if (err) {
                return res.status(400).send({ message: "Error al guardar el archivo" })
            }
        })
        console.log("archivo: "+ file.path )
        return newFile
    })
    return res.status(201).send(aux)
}

const getFiles = (req, res) => {
    fileModel.find({}, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los archivos" })
        }
        return res.status(200).send(file)
    })
}

const getSpecificFile = (req, res) => {
    const { id } = req.params
    fileModel.findById(id, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        return res.download('./' + file.url)
    })
}

const deleteFile= (req,res)=>{
    const {id} = req.params;
    fileModel.findByIdAndDelete(id,async (err,file)=>{
        if (err) {
            return res.status(400).send({ message: "Error al obtener el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        await fs.unlink(file.url,(err)=>{
            if (err){
                console.error(err)
                return res.status(400).send({ message: "Error al obtener el archivo" })
            }
            return res.status(200).send({ message: "Archivo Eliminado" })
        })
    })
}


module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile,
    deleteFile
}