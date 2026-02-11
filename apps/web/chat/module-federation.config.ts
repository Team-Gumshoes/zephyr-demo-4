import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'chat',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return {
        singleton: true,
        requiredVersion: false,
        eager: false,
      };
    } else if (libraryName === '@allorai/shared-ui') {
      return {
        singleton: true,
        requiredVersion: false,
      };
    } else if (libraryName === '@allorai/shared-types') {
      return {
        singleton: true,
        requiredVersion: false,
      };
    }
    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
