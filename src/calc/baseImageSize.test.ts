import { describe, expect, it } from "vitest";
import { calcBaseImageSize } from "./baseImageSize";

describe("calcBaseCanvasSize", () => {
  it("should return correct size when same size", () => {
    const result = calcBaseImageSize({
      wrapperSize: { width: 100, height: 100 },
      naturalImageSize: { width: 100, height: 100 },
    });
    expect(result).toEqual({ width: 100, height: 100 });
  });

  it("should return the wrapper size when same aspect ratio", () => {
    const result = calcBaseImageSize({
      wrapperSize: { width: 200, height: 200 },
      naturalImageSize: { width: 100, height: 100 },
    });
    expect(result).toEqual({ width: 200, height: 200 });
  });

  it("should return the fit size when different aspect ratio (landscape)", () => {
    const result = calcBaseImageSize({
      wrapperSize: { width: 200, height: 200 },
      naturalImageSize: { width: 150, height: 90 },
    });
    expect(result).toEqual({ width: 200, height: 120 });
  });

  it("should return the fit size when different aspect ratio (portrait)", () => {
    const result = calcBaseImageSize({
      wrapperSize: { width: 200, height: 200 },
      naturalImageSize: { width: 90, height: 150 },
    });
    expect(result).toEqual({ width: 120, height: 200 });
  });
});
