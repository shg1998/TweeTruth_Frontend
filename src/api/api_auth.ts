import { getAxiosBase } from "./index";

export const registerApi = (
  userName: string,
  email: string,
  password: string,
  fullName: string
) => {
  return getAxiosBase()
    .post("/Users", { userName, email, password, fullName })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};

export const loginApi = (username: string, password: string) => {
  return getAxiosBase()
    .post("/Users/Token", { username, password })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};
