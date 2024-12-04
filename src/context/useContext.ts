import React from 'react';

import context from './context';
import * as Types from './types';

const useContext = (): Types.Value => React.useContext(context);

export default useContext;
