import { describe, expect, it } from "vitest";
import { canEnterLab } from "./consent";

describe("consent boundary", () => {
  it("denies lab entry without an explicit acknowledgement", () => {
    expect(canEnterLab(false)).toBe(false);
  });

  it("allows lab entry after the participant acknowledges the disclosure", () => {
    expect(canEnterLab(true)).toBe(true);
  });
});
