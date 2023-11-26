import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ElementPosition,
  getCenterPosition,
  isSamePosition,
} from "../util/position";
import { ElementSize } from "../util/size";
import { useRerender } from "./useRerender.ts";

export type SetImagePositionType = (
  callback: (prevImagePosition: ElementPosition) => ElementPosition,
) => void;

interface UseImagePositionArgs {
  displayImageStyle: ElementSize;
  imageUrl: string;
  wrapperRef: HTMLDivElement | null;
  wrapperSize: ElementSize;
}

interface UseImagePositionState {
  imagePosition: ElementPosition;
  resetImagePosition: () => void;
  setImagePosition: SetImagePositionType;
}

const InitialMovedDiff: ElementPosition = { x: 0, y: 0 };

// This mapping use to cache in memory for zoom ratio of each drawing image.
type ImagePositionMap = Record<
  /* imageUrl: */ string,
  /* movedDiff: */ ElementPosition | undefined
>;

/**
 * Manage image position from wrapper center
 */
export const useImagePosition = (
  args: UseImagePositionArgs,
): UseImagePositionState => {
  const {
    displayImageStyle,
    imageUrl,
    wrapperRef,
    wrapperSize,
  } = args;
  const wrapperCenterPosition = useMemo(
    () => getCenterPosition(wrapperSize),
    [wrapperSize],
  );

  const dragging = useRef(false);

  // This state is used `useRef` instead of `useState` because this state is high frequency updated
  //   and callback (`setState((value) => ...)`) sometimes receives the value that is not latest.
  const imagePositionMap = useRef<ImagePositionMap>({});
  const imagePosition: ElementPosition =
    imagePositionMap.current[imageUrl] ?? InitialMovedDiff;
  const prevImagePosition = useRef<ElementPosition>(InitialMovedDiff);

  const rerender = useRerender();
  const resetImagePosition = useCallback(() => {
    prevImagePosition.current = InitialMovedDiff;
    imagePositionMap.current[imageUrl] = InitialMovedDiff;
    rerender();
  }, [imageUrl, rerender]);
  const setImagePosition = useCallback(
    (
      callback: (prevImagePosition: ElementPosition) => ElementPosition,
    ): void => {
      const prevPosition: ElementPosition =
        imagePositionMap.current[imageUrl] ?? InitialMovedDiff;
      const imagePosition = callback(prevPosition);
      const nextMovedDiff: ElementPosition = forceInRange({
        imagePosition,
        wrapperCenterPosition,
        displayImageStyle,
      });
      if (isSamePosition(prevPosition, nextMovedDiff)) return;
      prevImagePosition.current = prevPosition;
      imagePositionMap.current[imageUrl] = nextMovedDiff;
      rerender();
    },
    [displayImageStyle, imageUrl, rerender, wrapperCenterPosition],
  );

  useEffect(() => {
    if (wrapperRef == null) return;

    const onDragStart = ({ pageX: x, pageY: y }: MouseEvent) => {
      dragging.current = true;
      prevImagePosition.current = { x, y };
    };
    const onDragEnd = ({ pageX: x, pageY: y }: MouseEvent) => {
      dragging.current = false;
      prevImagePosition.current = { x, y };
    };
    const onDrag = ({ pageX: x, pageY: y }: MouseEvent) => {
      if (!dragging.current) return;
      const diff: ElementPosition = {
        x: x - prevImagePosition.current.x,
        y: y - prevImagePosition.current.y,
      };
      if (diff.x === 0 && diff.y === 0) return;
      setImagePosition((prevMovedDiff) => ({
        x: prevMovedDiff.x + diff.x,
        y: prevMovedDiff.y + diff.y,
      }));
      prevImagePosition.current = { x, y };
      rerender();
    };

    wrapperRef.addEventListener("mousedown", onDragStart);
    wrapperRef.addEventListener("mousemove", onDrag);
    wrapperRef.addEventListener("mouseup", onDragEnd);
    wrapperRef.addEventListener("mouseleave", onDragEnd);

    return () => {
      wrapperRef.removeEventListener("mousedown", onDragStart);
      wrapperRef.removeEventListener("mousemove", onDrag);
      wrapperRef.removeEventListener("mouseup", onDragEnd);
      wrapperRef.removeEventListener("mouseleave", onDragEnd);
    };
  }, [
    displayImageStyle,
    wrapperRef,
    rerender,
    setImagePosition,
    wrapperCenterPosition,
    wrapperSize,
  ]);

  return {
    imagePosition: {
      x:
        wrapperCenterPosition.x +
        imagePosition.x -
        Math.round(displayImageStyle.width / 2),
      y:
        wrapperCenterPosition.y +
        imagePosition.y -
        Math.round(displayImageStyle.height / 2),
    },
    resetImagePosition,
    setImagePosition,
  };
};

interface ForceInRangeArgs {
  imagePosition: ElementPosition;
  displayImageStyle: ElementSize;
  wrapperCenterPosition: ElementPosition;
}

const forceInRange = (args: ForceInRangeArgs): ElementPosition => {
  const margin = 40;
  const {
    imagePosition,
    displayImageStyle,
    wrapperCenterPosition,
  } = args;
  const { x: wrapperHalfWidth, y: wrapperHalfHeight } = wrapperCenterPosition;
  const { height: imageHeight, width: imageWidth } = displayImageStyle;

  const xMax = Math.round(wrapperHalfWidth + imageWidth / 2 - margin);
  const x = Math.min(Math.max(imagePosition.x, xMax * -1), xMax);
  const yMax = Math.round(wrapperHalfHeight + imageHeight / 2 - margin);
  const y = Math.min(Math.max(imagePosition.y, yMax * -1), yMax);
  return { x, y };
};
