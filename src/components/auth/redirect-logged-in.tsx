import React from 'react';
import Router from 'next/router';

const RedirectLoggedIn = (
  ChildComponent: React.ComponentType<any | string>,
): React.FC => {
  const HOC: React.FC = (props: any): JSX.Element => {
    const { authState } = props;
    // check authState
    if (authState?.currentUser) {
      // redirect if signed in
      Router.push('/');
    }
    // show component (auth is initialized)
    return <ChildComponent {...props} />;
  };
  return HOC;
};

export default RedirectLoggedIn;
