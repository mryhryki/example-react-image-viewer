import { describe, it, expect } from "vitest";
import { ElementPosition, getCenterPosition } from "./position";
import { ElementSize } from "./size";

describe("getCenterPosition", () => {
  type Elements = [ElementSize, ElementPosition];
  const TestCaseList: Elements[] = [
    [
      { height: 0, width: 0 },
      { y: 0, x: 0 },
    ],
    [
      { height: 100, width: 100 },
      { y: 50, x: 50 },
    ],
    [
      { height: 201, width: 201 },
      { y: 100, x: 100 },
    ],
  ];
  it.each(TestCaseList)(
    "getCenterPosition(%j) => %j",
    (size, expectPosition) => {
      const result = getCenterPosition(size);
      expect(result).toEqual(expectPosition);
    },
  );
});
