import axios from "axios";

const login = async (id) => {
  try {
    console.log(id);
    const response = await axios.post(
      `${process.env.API_URL}/login`,
      {},
      {
        headers: { "X-Caller-Id": id },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/logout`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/checkToken`, {
      headers: {
        cookie: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  logout,
  checkToken,
};
