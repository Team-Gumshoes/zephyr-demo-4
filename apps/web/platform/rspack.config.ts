import { NxAppRspackPlugin } from '@nx/rspack/app-plugin.js';
import { NxReactRspackPlugin } from '@nx/rspack/react-plugin.js';
import {
  NxModuleFederationPlugin,
  NxModuleFederationDevServerPlugin,
} from '@nx/module-federation/rspack.js';
import { join } from 'path';
import { Configuration } from '@rspack/core';
import { withZephyr } from 'zephyr-rspack-plugin';

import mfConfig from './module-federation.config';

const config: Configuration = {
  output: {
    path: join(__dirname, 'dist'),
    publicPath: 'auto',
  },
  resolve: {
    alias: {
      '@allorai/shared-ui': join(__dirname, '../../../libs/shared/ui/src/index.ts'),
    },
  },
  devServer: {
    port: 4200,
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
  },
  plugins: [
    new NxAppRspackPlugin({
      tsConfig: './tsconfig.app.json',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactRspackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new NxModuleFederationPlugin({ config: mfConfig }, { dts: false }),
    // Only use dev server plugin in development (enables lazy compilation)
    ...(process.env['NODE_ENV'] === 'development'
      ? [new NxModuleFederationDevServerPlugin({ config: mfConfig })]
      : []),
  ],
};

// Toggle Zephyr plugin via environment variable
export default process.env['USE_ZEPHYR'] === 'true' ? withZephyr()(config) : config;
