# `@lucid-softworks/safe-json-stringify`

Serialize JSON into a `Result` instead of throwing. Circular values, `BigInt`,
and root values that produce `undefined` become `JsonStringifyError`.

```ts
import { safeJsonStringify } from "@lucid-softworks/safe-json-stringify";

const result = safeJsonStringify({ ready: true }, 2);
```
