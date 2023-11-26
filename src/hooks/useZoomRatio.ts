import { useCallback, useRef } from 'react';
import { useRerender } from './useRerender';
import { ElementSize } from '../util/size';

export type SetZoomRatioType = (
  callback: (
    prevZoomRatio: number,
    clampZoomRatio: (zoomRatio: number) => number,
  ) => number,
) => void;

interface UseZoomRatioArgs {
  imageUrl: string;
  wrapperSize: ElementSize;
  naturalImageSize: ElementSize;
}

interface UseZoomRatioState {
  zoomRatio: number;
  resetZoomRatio: () => void;
  setZoomRatio: SetZoomRatioType;
}

// This mapping use to cache in memory for zoom ratio of each drawing image.
type ZoomRatioMap = Record<
  /* imageUrl: */ string,
  /* zoomRatio: */ number | undefined
>;

const DefaultZoomRatio = 1;
const MinZoomRatio = 0.5;
const MaxZoomRatioBase = 3;

export const useZoomRatio = (args: UseZoomRatioArgs): UseZoomRatioState => {
  const { imageUrl, naturalImageSize, wrapperSize } = args;

  const maxZoomedImageWidth = naturalImageSize.width * MaxZoomRatioBase;
  const maxZoomedImageHeight = naturalImageSize.height * MaxZoomRatioBase;
  const maxZoomX = maxZoomedImageWidth / wrapperSize.width;
  const maxZoomY = maxZoomedImageHeight / wrapperSize.height;
  const maxZoomRatio = Math.max(maxZoomX, maxZoomY);

  const rerender = useRerender();
  const zoomRatioMap = useRef<ZoomRatioMap>({});
  const zoomRatio: number = zoomRatioMap.current[imageUrl] ?? DefaultZoomRatio;

  const clampZoomRatio = useCallback(
    (zoomRatio: number): number => Math.min(Math.max(zoomRatio, MinZoomRatio), maxZoomRatio),
    [maxZoomRatio],
  );
  const setZoomRatio: SetZoomRatioType = useCallback(
    (callback): void => {
      const prevZoomRatio: number =
        zoomRatioMap.current[imageUrl] ?? DefaultZoomRatio;
      const nextZoomRatio = clampZoomRatio(
        callback(prevZoomRatio, clampZoomRatio),
      );
      if (prevZoomRatio === nextZoomRatio) return;
      zoomRatioMap.current[imageUrl] = nextZoomRatio;
      rerender();
    },
    [clampZoomRatio, imageUrl, rerender],
  );

  const resetZoomRatio = useCallback(
    () => setZoomRatio(() => 1),
    [setZoomRatio],
  );

  return { resetZoomRatio, zoomRatio, setZoomRatio };
};
