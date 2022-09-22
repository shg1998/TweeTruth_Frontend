import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { routes } from "./config";
import { Styles } from "../styles/styles";
import React from "react";
import Dashboard from "../pages/dashboard";
import Login from "../pages/Login";
import { useUserState } from "../context/UserContext";

const Router = () => {
  var isAuthenticated: boolean = useUserState();

  return (
    <Suspense fallback={null}>
      <Styles />
      {!isAuthenticated && <Header />}
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
        <PrivateRoute path="/app" component={Dashboard} />
        <PublicRoute path="/login" component={Login} />
      </Switch>
      {!isAuthenticated && <Footer />}
    </Suspense>
  );

  function PublicRoute({ component, ...rest }: any): JSX.Element {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/app",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  function PrivateRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
};

export default Router;
