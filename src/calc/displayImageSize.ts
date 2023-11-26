import { ElementSize } from "../util/size";

interface CalcDisplayImageSizeArgs {
  baseImageSize: ElementSize;
  zoomRatio: number;
}

export const calcDisplayImageSize = (
  args: CalcDisplayImageSizeArgs,
): ElementSize => {
  const { baseImageSize, zoomRatio } = args;

  const width = baseImageSize.width * zoomRatio;
  const height = baseImageSize.height * zoomRatio;

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};
