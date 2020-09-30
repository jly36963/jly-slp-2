import React from 'react';
import Router from 'next/router';

const PrivateRoute = (
  ChildComponent: React.ComponentType<any | string>,
): React.FC => {
  const HOC: React.FC = (props: any): JSX.Element => {
    const { authState } = props;
    // check authState
    if (authState && authState.initialized === true) {
      // auth is initialized
      if (!authState.currentUser) {
        // redirect if not signed in
        Router.push('/auth/login');
      }
    } else {
      // auth is not initialized
      return <div />;
    }
    // show component (auth is initialized)
    return <ChildComponent {...props} />;
  };
  return HOC;
};

export default PrivateRoute;
