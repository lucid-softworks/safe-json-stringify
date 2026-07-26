import { err, ok, type Result } from "@lucid-softworks/result";

export class JsonStringifyError extends Error {
  override readonly name = "JsonStringifyError";
  override readonly cause: unknown;

  constructor(cause: unknown) {
    super("Value could not be serialized as JSON");
    this.cause = cause;
  }
}

/** Serialize JSON without throwing or returning an ambiguous `undefined`. */
export function safeJsonStringify(
  value: unknown,
  space?: number | string,
): Result<string, JsonStringifyError> {
  try {
    const output = JSON.stringify(value, undefined, space);

    return output === undefined
      ? err(
          new JsonStringifyError(
            new TypeError("JSON.stringify returned undefined"),
          ),
        )
      : ok(output);
  } catch (cause) {
    return err(new JsonStringifyError(cause));
  }
}
