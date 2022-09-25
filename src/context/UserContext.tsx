import React from "react";
import { loginApi, registerApi } from "../api/api_auth";
import { notification } from "antd";

var UserStateContext = React.createContext<any>(null);
var UserDispatchContext = React.createContext<any>(null);
const key = "updatable";
function userReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: any) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  registerUser,
};

// ###########################################################

function loginUser(
  dispatch: any,
  username: any,
  password: any,
  history: any,
  setIsLoading: any,
  setError: any
): void {
  setError(false);
  setIsLoading(true);

  if (!!username && !!password) {
    loginApi(username, password)
      .then((res: any) => {
        console.log(res);
        localStorage.setItem("id_token", res.data.data);
        setIsLoading(false);
        history.push("/app");
        notification["success"]({
          key,
          message: "Successfull",
          description: "welcome :)",
        });
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(() => {
        setIsLoading(false);
        notification["error"]({
          key,
          message: "Error",
          description: "You are unable to log in with these credentials",
        });
      });
  } else {
    setIsLoading(false);
    notification["error"]({
      key,
      message: "Error",
      description: "All values ​​must be entered",
    });
  }
}

function registerUser(
  dispatch: any,
  userName: string,
  email: string,
  password: string,
  fullName: string,
  history: any,
  setIsLoading: any,
  setError: any
) {
  setError(false);
  setIsLoading(true);

  if (!!userName && !!email && !!password) {
    registerApi(userName, email, password, fullName)
      .then((res: any) => {
        setIsLoading(false);
        history.push("/login");
        notification["success"]({
          key,
          message: "Successfull",
          description:
            "You have successfully registered in the system, now you can proceed from the login menu",
        });
      })
      .catch((err: any) => {
        setIsLoading(false);
        notification["error"]({
          key,
          message: "Error",
          description: "There is something wrong with the workplace",
        });
      });
  } else {
    setIsLoading(false);
  }
}

function signOut(dispatch: any, history: any) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
  notification["success"]({
    key,
    message: "Successfull",
    description: "You have successfully exited",
  });
}
