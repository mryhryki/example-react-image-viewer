import {
  addPosition,
  ElementPosition,
  multiPosition,
  subPosition,
} from "../util/position";
import { useCallback, useEffect } from "react";
import { SetZoomRatioType } from "./useZoomRatio";
import { SetImagePositionType } from "./useImagePosition";

interface UseZoomActionArgs {
  getMousePosition: () => ElementPosition;
  setImagePosition: SetImagePositionType;
  setZoomRatio: SetZoomRatioType;
  wrapperRef: HTMLDivElement | null;
}

export const useZoomAction = (args: UseZoomActionArgs): void => {
  const { setImagePosition, getMousePosition, setZoomRatio, wrapperRef } = args;

  const zoom: SetZoomRatioType = useCallback(
    (callback) => {
      setZoomRatio((prevZoomRatio, clamp) => {
        const nextZoomRatio = clamp(callback(prevZoomRatio, clamp));
        if (prevZoomRatio === nextZoomRatio) return prevZoomRatio;

        setImagePosition((prevImagePosition) => {
          const mousePosition = getMousePosition();
          return addPosition(
            multiPosition(
              subPosition(prevImagePosition, mousePosition),
              nextZoomRatio / prevZoomRatio,
            ),
            mousePosition,
          );
        });
        return nextZoomRatio;
      });
    },
    [getMousePosition, setImagePosition, setZoomRatio],
  );

  useEffect(() => {
    if (wrapperRef == null) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      // event.stopPropagation();
      zoom((prevZoomRatio, clamp) =>
        clamp(prevZoomRatio * (event.deltaY * -0.001 + 1))
      );
    };
    wrapperRef.addEventListener("wheel", onWheel);
    return () => wrapperRef.removeEventListener("wheel", onWheel);
  }, [wrapperRef, zoom]);

  useEffect(() => {
    if (wrapperRef == null) return;
    const onScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    wrapperRef.addEventListener("scroll", onScroll);
    return () => wrapperRef.removeEventListener("scroll", onScroll);
  }, [wrapperRef]);
};
