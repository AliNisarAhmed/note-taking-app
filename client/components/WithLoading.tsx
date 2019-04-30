import * as React from 'react';

import { Note } from '../interfaces/Note';

import Loading from './Loading';

function WithLoading(Component: React.ComponentType) {
  return function WithLoadingComponent({ isLoading, ...rest }: { isLoading: boolean, rest?: object }): React.ReactElement {
    if (!isLoading) return <Component {...rest} />;
    return <Loading />
  }
}

export default WithLoading;