/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from 'react';
import { GlobalLayout } from './src/app/views/layouts';
import { GlobalStyles } from './src/app/views/styles';

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyles />
      <GlobalLayout>{element}</GlobalLayout>
    </>
  );
};
