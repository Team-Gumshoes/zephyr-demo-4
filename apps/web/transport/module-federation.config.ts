import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'transport',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
      shared: (libraryName, defaultConfig) => {
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return { singleton: true, requiredVersion: false, eager: true };
    }
    return defaultConfig;
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
