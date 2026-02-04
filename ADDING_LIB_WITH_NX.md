# Add UI library to AllorAI project
```sh
nx g @nx/react:library shared-ui --directory=libs/shared/ui --bundler=none
```

Copilot told me to remove this line to resolve TS error.
It does not seems to cause a problem with it still there either though.
```json
// apps/web/chat/tsconfig.app.json

{
  "compilerOptions" : {
    //...
    "rootDir": "src", // <-- remove this line
  }
}
```

## All the changes here:
### Root:
```json
// package.json (root)
// added:
  "devDependencies": {
    "@babel/core": "^7.14.5",
    "@babel/preset-react": "^7.14.5",
  }
```
---
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/web/*'
  - 'apps/*'
  - 'libs/shared/*'  # <-- added
autoInstallPeers: true
```
---
```json
// tsconfig.base.json (root)
    "paths": {
      "itineraries/*": ["apps/web/itineraries/src/*"],      // <-- This line is here because we had the Button being exposed in the itineraries MFE
      "@allorai/shared-ui": ["libs/shared/ui/src/index.ts"] // <-- add this to compiler otions in the root tsconfig (base)
    }
```
---
```json
// tsconfig.json (root) - this file extends the above tsconfig.base.json
    {
      "path": "./libs/shared/ui" // <-- add this line to "references". There is a "path" for every app in the monorepo
    }
```
### Chat module:
```ts
// apps/web/chat/rspack.config.ts
// This one is very interesting. Copilot came up with it and it was absolutely needed. Will probably need in all MFEs that use the shared UI
const config: Configuration = {
  // ... existing properties ...
  resolve: {
    alias: {
      '@allorai/shared-ui': join(
        __dirname,
        '../../../libs/shared/ui/src/index.ts',
      ),
    },
  },
}
```
---
```json
// apps/web/chat/tsconfig.app.json
  // ... existing properties ...
  "references": [
    {
      "path": "../../../libs/shared/ui/tsconfig.lib.json"
    }
  ]
```
---
```ts
// apps/web/chat/module-federation.config.ts
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
    } else if (libraryName === '@allorai/shared-ui') {  // <-- Adding this part here
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

```
### UI library (new)
```ts
// libs/shared/ui/.bablerc
{
  "presets": [
    [
      "@nx/react/babel",
      {
        "runtime": "automatic",
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": []
}
```
---
```js
// libs/shared/ui/eslint.config.mjs
// Not clear if removing this would cause any problems
import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    ignores: ['**/out-tsc'],
  },
];

```
---
```json
// libs/shared/ui/package.json
{
  "name": "@allorai/ui",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./package.json": "./package.json"
  }
}
```
---
```json
// libs/shared/ui/tsconfig.json
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    }
  ],
  "extends": "../../../tsconfig.base.json" // <-- extends root tsconfig
}

```
---
```json
// libs/shared/ui/tsconfig.lib.json
{
  "extends": "../../../tsconfig.base.json", // <-- extends root tsconfig
  "compilerOptions": {
    "outDir": "dist",
    "types": [
      "node",
      "@nx/react/typings/cssmodule.d.ts",
      "@nx/react/typings/image.d.ts"
    ],
    "rootDir": "src",
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "bundler",
    "tsBuildInfoFile": "dist/tsconfig.lib.tsbuildinfo"
  },
  "exclude": [
    "out-tsc",
    "dist",
    "jest.config.ts",
    "jest.config.cts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx",
    "src/**/*.spec.js",
    "src/**/*.test.js",
    "src/**/*.spec.jsx",
    "src/**/*.test.jsx",
    "eslint.config.js",
    "eslint.config.cjs",
    "eslint.config.mjs"
  ],
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"]
}
```
---
```ts
// libs/shared/ui/src/index.ts
// presumably we will export all of our components from here
export * from './lib/Card';
```
---
```tsx
// libs/shared/ui/src/lib/Card.tsx
// The actual shared component
export function Card() {
  return <h1>Shared Card</h1>
}
export default Card; // <-- I'm not sure this is helpful
```
### Consuming the component:
```tsx
// in this case it is in the Chat App
import { Card } from '@allorai/shared-ui'

// ... use it down in the JSX somewhere <Card/>
```