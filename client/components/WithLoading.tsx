import * as React from 'react';

import Loading from './Loading';

function WithLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...rest }) {
    if (!isLoading) return <Component {...rest} />;
    return <Loading />
  }
}

export default WithLoading;