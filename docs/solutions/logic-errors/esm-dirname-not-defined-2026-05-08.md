---
title: __dirname not defined in ESM module scope — use import.meta.url
date: 2026-05-08
category: logic-errors
module: scripts
problem_type: runtime_error
component: node
tags: [esm, node, dirname, tsx]
symptoms:
  - ReferenceError __dirname is not defined in ES module scope
  - Script fails when run with tsx or node --loader ts-node/esm
---

## Problem

TypeScript scripts run via `tsx` execute as ES modules. `__dirname` and `__filename` are CommonJS globals and are not available in ESM scope.

## Solution

Derive them from `import.meta.url`:

```typescript
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## Key Takeaway

When writing Node.js scripts in a Vite/ESM project, always use `import.meta.url` instead of `__dirname`/`__filename`.
