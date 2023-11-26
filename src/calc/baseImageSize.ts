import { ElementSize } from "../util/size";

interface CalcBaseImageSizeArgs {
  wrapperSize: ElementSize;
  naturalImageSize: ElementSize;
}

export const calcBaseImageSize = (args: CalcBaseImageSizeArgs): ElementSize => {
  const { wrapperSize, naturalImageSize } = args;

  const { width: wrapperWidth, height: wrapperHeight } = wrapperSize;
  const { width: imageWidth, height: imageHeight } = naturalImageSize;

  const ratioX = wrapperWidth / imageWidth;
  const ratioY = wrapperHeight / imageHeight;
  const ratio = Math.min(ratioX, ratioY);

  return {
    width: Math.round(imageWidth * ratio),
    height: Math.round(imageHeight * ratio),
  };
};
