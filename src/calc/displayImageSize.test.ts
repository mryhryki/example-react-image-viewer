import { describe, expect, it } from "vitest";
import { ElementSize } from "../util/size";
import { calcDisplayImageSize } from "./displayImageSize";

describe("calcDisplayImageSize", () => {
  type Elements = [
    ElementSize,
    /* zoomRatio: */ number,
    /* expect: */ ElementSize,
  ];
  const TestCaseList: Elements[] = [
    [{ height: 100, width: 100 }, 0.1, { height: 10, width: 10 }],
    [{ height: 100, width: 100 }, 0.5, { height: 50, width: 50 }],
    [{ height: 100, width: 100 }, 1, { height: 100, width: 100 }],
    [{ height: 100, width: 100 }, 1.5, { height: 150, width: 150 }],
    [{ height: 100, width: 100 }, 3, { height: 300, width: 300 }],
    [{ height: 200, width: 100 }, 0.1, { height: 20, width: 10 }],
    [{ height: 200, width: 100 }, 0.5, { height: 100, width: 50 }],
    [{ height: 200, width: 100 }, 1, { height: 200, width: 100 }],
    [{ height: 200, width: 100 }, 1.5, { height: 300, width: 150 }],
    [{ height: 200, width: 100 }, 3, { height: 600, width: 300 }],
    [{ height: 100, width: 200 }, 0.1, { height: 10, width: 20 }],
    [{ height: 100, width: 200 }, 0.5, { height: 50, width: 100 }],
    [{ height: 100, width: 200 }, 1, { height: 100, width: 200 }],
    [{ height: 100, width: 200 }, 1.5, { height: 150, width: 300 }],
    [{ height: 100, width: 200 }, 3, { height: 300, width: 600 }],
    [{ height: 104, width: 104 }, 0.1, { height: 10, width: 10 }],
    [{ height: 104, width: 104 }, 0.5, { height: 52, width: 52 }],
    [{ height: 104, width: 104 }, 1, { height: 104, width: 104 }],
    [{ height: 104, width: 104 }, 1.5, { height: 156, width: 156 }],
    [{ height: 104, width: 104 }, 3, { height: 312, width: 312 }],
    [{ height: 105, width: 105 }, 0.1, { height: 11, width: 11 }],
    [{ height: 105, width: 105 }, 0.5, { height: 53, width: 53 }],
    [{ height: 105, width: 105 }, 1, { height: 105, width: 105 }],
    [{ height: 105, width: 105 }, 1.5, { height: 158, width: 158 }],
    [{ height: 105, width: 105 }, 3, { height: 315, width: 315 }],
  ];
  it.each(TestCaseList)(
    `calcDisplayImageSize({baseImageSize:%j,zoomRatio:%f}) => %j`,
    (baseImageSize, zoomRatio, expectSize) => {
      const result = calcDisplayImageSize({ baseImageSize, zoomRatio });
      expect(result).toEqual(expectSize);
    },
  );
});
