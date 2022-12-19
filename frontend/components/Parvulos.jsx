import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
const jwt = require('jwt-simple');

export const Parvulo = ({ parvulo }) => {
 const [parvulo, setParvulo] = useState({});
 const getParvulo = async () => {
    const token = Cookies.get("token");
    const decoded= jwt.decode(token,process.env.SECRET_KEY);
    const response= await axios.get(`${process.env.API_URL}/parvulos`,{
       headers:{"X-Call-Id":decoded.sub},}); 
}
}

module.exports = Parvulo;