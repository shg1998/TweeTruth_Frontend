import axios from "axios";

const baseAddress = "https://localhost:44384/api";

export const getAxiosBase = () => {
  return axios.create({
    baseURL: baseAddress,
    timeout: 10000,
  });
};
