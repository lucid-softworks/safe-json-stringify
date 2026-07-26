import { describe, expect, it } from "vitest";

import { JsonStringifyError, safeJsonStringify } from "../src/index.js";

describe("safeJsonStringify", () => {
  it("serializes values and supports indentation", () => {
    expect(safeJsonStringify({ value: 1 })).toEqual({
      ok: true,
      value: '{"value":1}',
    });
    expect(safeJsonStringify({ value: 1 }, 2)).toEqual({
      ok: true,
      value: '{\n  "value": 1\n}',
    });
  });

  it("turns thrown serialization failures into a stable error", () => {
    const result = safeJsonStringify(1n);

    expect(result).toEqual({
      error: expect.any(JsonStringifyError),
      ok: false,
    });
    const error = (result as { readonly error: JsonStringifyError }).error;
    expect(error.cause).toBeInstanceOf(TypeError);
  });

  it("rejects root values for which JSON.stringify returns undefined", () => {
    const result = safeJsonStringify(undefined);

    expect(result).toEqual({
      error: expect.any(JsonStringifyError),
      ok: false,
    });
    const error = (result as { readonly error: JsonStringifyError }).error;
    expect(error.cause).toEqual(
      new TypeError("JSON.stringify returned undefined"),
    );
  });
});
