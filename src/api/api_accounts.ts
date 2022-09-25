import { getAxiosBase } from "./index";

export const getAccounts = (PageNumber: number, PageSize: number) => {
  return getAxiosBase()
    .get(`/Account?PageNumber=${PageNumber}&PageSize=${PageSize}`)
    .then((res) => res.data.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};

export const addAccount = (username: string) => {
  return getAxiosBase()
    .post(`/Account`, { username })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};

export const editAccount = (id: number, username: string) => {
  return getAxiosBase()
    .put(`/Account/${id}`, { username })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};

export const deleteAccount = (id: number) => {
  return getAxiosBase()
    .delete(`/Account/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });
};
