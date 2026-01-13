```shell
npx create-nx-workspace@latest allorai --package-manager=pnpm
# NX   Let's create a new workspace [https://nx.dev/getting-started/intro]
#
# ✔ Which starter do you want to use? · custom
# ✔ Which stack do you want to use? · none
# ✔ Would you like to use Prettier for code formatting? · Yes
# ✔ Try the full Nx platform? · skip
#
# NX   Creating your v22.3.3 workspace.

nx add @nx/react
nx g @nx/react:host apps/platform --remotes=profile
# NX  Generating @nx/react:host
#
# ✔ Which stylesheet format would you like to use? · tailwind
# ✔ Which E2E test runner would you like to use? · none
# ✔ Which bundler do you want to use to build the application? · rspack

nx build platform
# ✔ Would you like to sync the identified changes to get your workspace up to date? · yes
# ✔ The workspace was synced successfully!
  
nx serve platform
# get 3 warnings similar to this    
# WARNING in ../../node_modules/.pnpm/@module-federation+error-codes@0.21.6/node_modules/@module-federation/error-codes/dist/index.cjs.js
#  ⚠ Module Warning (from /Users/brierly/Desktop/gridiron_survivor/allorai/yolo8/allorai/node_modules/.pnpm/source-map-loader@5.0.0_webpack@5.104.1_@swc+core@1.5.29_@swc+helpers@0.5.18__/node_modules/source-map-loader/dist/cjs.js):                               # Failed to parse source map from '/Users/brierly/Desktop/gridiron_survivor/allorai/yolo8/allorai/node_modules/.pnpm/@module-federation+error-codes@0.21.6/node_modules/@module-federation/error-codes/src/desc.ts' file
# : Error: ENOENT: no such file or directory, open '/Users/brierly/Desktop/gridiron_survivor/allorai/yolo8/allorai/node_modules/.pnpm/@module-federation+error-codes@0.21.6/node_modules/@module-federation/error-codes/src/desc.ts'

pnpm add -D zephyr-rspack-plugin -w
```

Then I update both `rspack.config.ts` files. Here is 'platform', for example:
```ts
// apps/platform/rspack.config.ts

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

const config:Configuration = {
  output: {
    path: join(__dirname, 'dist'),
    publicPath: 'auto',
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
    new NxModuleFederationDevServerPlugin({ config: mfConfig }),
  ],
};

export default withZephyr()(config)
```
Back in terminal
```shell
git add .
git commit -m "Second commit"
git remote add origin https://github.com/Team-Gumshoes/zephyr-demo-4.git
git push -u origin main

nx build profile
# Still get 'Git repository not found' Zephyr warning

nx build platform
# ZEPHYR   Failed to resolve remote dependencies:
# ZEPHYR     - profile@profile -> Error code: ZE40003
# ZEPHYR   
# ZEPHYR   More information on remote dependency resolution please check:
# ZEPHYR   https://docs.zephyr-cloud.io/features/remote-dependencies
```