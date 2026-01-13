import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'platform',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: [['profile', 'http://localhost:4201/remoteEntry.js']],
  // additionalShared: [
  //   [
  //     'react',
  //     { singleton: true, strictVersion: true, requiredVersion: '19.2.3' },
  //   ],
  //   [
  //     'react-dom',
  //     { singleton: true, strictVersion: true, requiredVersion: '19.2.3' },
  //   ],
  //   [
  //     'react-router-dom',
  //     { singleton: true, strictVersion: true, requiredVersion: '6.29.0' },
  //   ],
  // ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
