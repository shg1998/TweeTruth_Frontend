import { getAxiosBase } from "./index";

export const getAccounts = (
    PageNumber: number,
    PageSize: number
  ) => {
    return getAxiosBase()
      .get(`/Account?PageNumber=${PageNumber}&PageSize=${PageSize}`)
      .then((res) => res.data.data)
      .catch((err) => {
        throw new Error(err.response.data);
      });
  };