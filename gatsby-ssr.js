/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from 'react';
import { GlobalLayout } from './src/app/views/layouts';
import { GlobalStyles } from './src/app/views/styles';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './src/app/state/store';

const reduxStore = configureStore();

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider store={reduxStore}>
      <GlobalStyles />
      <GlobalLayout>{element}</GlobalLayout>
    </ReduxProvider>
  );
};
