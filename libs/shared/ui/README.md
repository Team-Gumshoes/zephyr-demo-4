# @allorai/ui

Claude says, to generate additional shared libraries by concern:
```bash
pnpm nx g @nx/react:library hooks --directory=libs/shared/hooks
pnpm nx g @nx/js:library utils --directory=libs/shared/utils
pnpm nx g @nx/js:library types --directory=libs/shared/types
```

Folder structure can look something like this\
**Recommended Library Structure**
```
Consider organizing multiple shared libraries by concern:

libs/
├── shared/
│   ├── ui/                 # Presentational components (Button, Card, Modal)
│   ├── hooks/              # Shared React hooks
│   ├── utils/              # Pure utility functions
│   ├── types/              # Shared TypeScript types/interfaces
│   └── state/              # Shared state management (if applicable)
├── features/
│   └── auth/               # Feature-specific shared module
└── data-access/
    └── api-client/         # Shared API utilities
```


This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test @allorai/ui` to execute the unit tests via [Jest](https://jestjs.io).
