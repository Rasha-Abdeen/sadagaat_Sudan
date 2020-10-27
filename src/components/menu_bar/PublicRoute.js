import React from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../repository'

/**
 * @see https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx
 */

const PubliceRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated()? <Redirect to="/" />: <Component {...props} /> 
      }
    />
  );
};

export default PubliceRoute;
