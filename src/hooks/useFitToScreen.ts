import { useCallback, useEffect } from "react";

interface UseFitToScreenArgs {
  resetImagePosition: () => void;
  resetZoomRatio: () => void;
  wrapperRef: HTMLDivElement | null;
}


export const useFitToScreen = (
  args: UseFitToScreenArgs,
): void => {
  const { resetImagePosition, resetZoomRatio, wrapperRef } = args;

  const fitToScreen = useCallback(() => {
    resetImagePosition();
    resetZoomRatio();
  }, [resetImagePosition, resetZoomRatio]);

  useEffect(() => {
    if (wrapperRef == null) return;

    const onDoubleClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (event.target !== wrapperRef && event.target.tagName !== "IMG") return;
      fitToScreen();
    };
    const onSelectStart = (event: Event) => event.preventDefault();

    wrapperRef.addEventListener("dblclick", onDoubleClick);
    wrapperRef.addEventListener("selectstart", onSelectStart);

    return () => {
      wrapperRef.removeEventListener("dblclick", onDoubleClick);
      wrapperRef.removeEventListener("selectstart", onSelectStart);
    };
  }, [fitToScreen, wrapperRef]);
};
