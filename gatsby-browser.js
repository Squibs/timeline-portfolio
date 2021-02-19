/* eslint-disable react/jsx-filename-extension */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from 'react';
import { GlobalLayout } from './src/app/views/layouts';
import { GlobalStyles } from './src/app/views/themes';

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyles />
      <GlobalLayout>{element}</GlobalLayout>
    </>
  );
};
