import axios from "axios";

const baseAddress = "https://localhost:44384/api";

export const getAxiosBase = () => {
  let token = localStorage.getItem("id_token"); 
  console.log(token);
  return axios.create({
    baseURL: baseAddress,
    timeout: 10000,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
