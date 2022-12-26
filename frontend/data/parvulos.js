import axios from "axios";

const getParvulos = async () => {
    const token = Cookies.get("token");
    const payload = jwt.decode(token, process.env.SECRET_KEY,true);
    const response = await axios.get(`${process.env.API_URL}/parvulos`, {
        headers: { "X-Caller-Id": payload.sub},
    });
    console.log(response);
    return response;
};

module.exports = {
    getParvulos,
};
