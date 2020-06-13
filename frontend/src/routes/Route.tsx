import React from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const user = false;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
