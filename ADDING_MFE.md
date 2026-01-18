# Adding an additional MFE to existing project:
Use NX generator:
```sh
nx g @nx/react:remote --directory=apps/web/transport --name=transport --style=tailwind --bundler=rspack --unitTestRunner=jest --e2eTestRunner=none --host=platform --devServerPort=4202 --typescriptConfiguration=true --linter=eslint
```
## What this command did (plus a few manual edits):
```ts
//apps/web/platform/module-federation.ts
// ...
remotes: ['hotels', 'transport'],
// ...
```
---
```json
// apps/web/platform/package.json
  "devDependencies": {
    "hotels": "workspace:*",
    "transport": "workspace:*"
  },
  "zephyr:dependencies": {
    "hotels": "hotels@*",
    "transport": "transport@*"
  }
```
---
```json
// apps/web/platform/tsconfig.app.json
  "references": [
    {
      "path": "../transport/tsconfig.app.json"
    },
    {
      "path": "../hotels/tsconfig.app.json"
    }
  ]
```
---
```json
// tsconfig.json (root)
  "references": [
    {
      "path": "./apps/web/platform"
    },
    {
      "path": "./apps/web/hotels"
    },
    {
      "path": "./apps/web/transport"
    }
  ]
```
## After running the NX generator:
Then needed to run: 
```sh
nx sync
```

Update type declarations for the platform:
```ts
// apps/web/platform/src/remotes.d.ts
declare module 'hotels/Module';
declare module 'hotels/Button';
declare module 'transport/Module'; //<-- added
```

Update Platform `app.tsx`
```tsx
const Transport = React.lazy(() => import('transport/Module'));
// ...
return (
	<Transport/>
)
```
Need to wait a bit of time, maybe 30 seconds, then:
```sh
nx serve transport
```
Can now see transport `app.tsx` on port 4202
## More edits:
```ts
// apps/web/transport/module-federation.config.ts
// add in the shared libraries:
    shared: (libraryName, defaultConfig) => {
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return { singleton: true, requiredVersion: false, eager: true };
    }
    return defaultConfig;
  }
```
---
```ts
// apps/web/transport/rspack.config.ts
// See file
// add in:
export default withZephyr()(config)
```
## Rebuild and serve
```sh
nx server platform
```
Wait for some time (maybe 1 minute).
Everything working now with Zephyr.

## Add and commit. Push to GitHub