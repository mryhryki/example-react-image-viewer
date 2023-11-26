import { FC } from "react";
import { calcBaseImageSize } from "./calc/baseImageSize";
import { calcDisplayImageSize } from "./calc/displayImageSize";
import { useElementRefs } from "./hooks/useElementRefs";
import { useImagePosition } from "./hooks/useImagePosition";
import { useImageSize } from "./hooks/useImageSize";
import { useFitToScreen } from "./hooks/useFitToScreen";
import { useWrapperSize } from "./hooks/useWrapperSize";
import { useZoomRatio } from "./hooks/useZoomRatio";
import { useMousePosition } from "./hooks/useMousePotision";
import { useZoomAction } from "./hooks/useZoomAction";
import { Image } from "./images.ts";

interface ImageViewerProps {
  image: Image;
}

export const ImageViewer: FC<ImageViewerProps> = (props) => {
  const { url: imageUrl, name: imageName } = props.image;

  const { wrapperRef, setWrapperRef } = useElementRefs();
  const { wrapperSize } = useWrapperSize({ wrapperRef });
  const { getMousePosition } = useMousePosition({ wrapperRef, wrapperSize });

  const { naturalImageSize, setImageRef } = useImageSize();
  const { resetZoomRatio, setZoomRatio, zoomRatio } = useZoomRatio({ imageUrl, naturalImageSize, wrapperSize });

  const baseImageSize = calcBaseImageSize({
    wrapperSize,
    naturalImageSize,
  });
  const displayImageStyle = calcDisplayImageSize({ baseImageSize, zoomRatio });

  const { imagePosition, resetImagePosition, setImagePosition } =
    useImagePosition({
      displayImageStyle,
      imageUrl,
      wrapperSize,
      wrapperRef,
    });

  useZoomAction({
    setZoomRatio,
    getMousePosition,
    setImagePosition,
    wrapperRef,
  });
  useFitToScreen({
    wrapperRef,
    resetZoomRatio,
    resetImagePosition,
  });

  return (
    <div
      ref={setWrapperRef}
      style={{
        cursor: "grab",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
      draggable={false}
    >
      <div
        style={{
          top: imagePosition.y,
          left: imagePosition.x,
          width: displayImageStyle.width,
          height: displayImageStyle.height,
          objectFit: "contain",
          position: "absolute",
        }}
        draggable={false}
      >
        <img
          src={imageUrl}
          alt={imageName}
          ref={setImageRef}
          draggable={false}
          style={{
            width: displayImageStyle.width,
            height: displayImageStyle.height,
          }}
        />
      </div>
    </div>
  );
};
