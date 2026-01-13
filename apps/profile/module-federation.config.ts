import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'profile',
  exposes: {
    './Module': './src/remote-entry.ts',
    './Button' : './src/app/components/Button.tsx'
  },
  // Ensure critical React libs are shared as singletons across host/remote
  // additionalShared: [
  //   ['react', { singleton: true, strictVersion: true, requiredVersion: '19.2.3' }],
  //   ['react-dom', { singleton: true, strictVersion: true, requiredVersion: '19.2.3' }],
  //   ['react-router-dom', { singleton: true, strictVersion: true, requiredVersion: '6.29.0' }],
  // ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
