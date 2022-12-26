import React from "react";
import axios from "axios";
import { useState,useEffect} from "react";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import {getParvulos} from "../data/parvulos";

//Listar los parvulos en una tabla

const ListarParvulos = () => {
    const [parvulos, setParvulos] = useState([]);
    const getParvulos = async () => {
        const token = Cookies.get("token");
        const payload = jwt.decode(token, process.env.SECRET_KEY,true);
        const response = await axios.get(`${process.env.API_URL}/parvulos`, {
            headers: { "X-Caller-Id": payload.sub},
        });
        console.log(response);
        setParvulos(response.data);
    };
    useEffect(() => {
        getParvulos();
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Parvulos</h1>
            </div>
            <div className="parvuloTable">
                <table className="tableContainer table-auto border-separate border-spacing-x-1 border-spacing-y-1 ">
                    <thead className="">
                        <tr className="">
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Rut </th>
                            <th>Apoderado</th>
                            <th>Fecha de nacimiento</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Condiciones Medicas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {parvulos.map((parvulo) => (
                            <tr key={parvulo._id}>
                                <td><img src={parvulo.foto} alt="foto" width="100" height="100"/></td>
                                <td>{parvulo.nombre}</td>
                                <td>{parvulo.rut}</td>
                                <td>{parvulo.apoderado}</td>
                                <td>{parvulo.fechaNacimiento}</td>
                                <td>{parvulo.telefonoEmergencia}</td>
                                <td>{parvulo.direccion}</td>
                                <td>{parvulo.condicionesMedicas}</td>
                    
                                <td>
                                    <button className="btn btn-primary">Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ListarParvulos;
 
