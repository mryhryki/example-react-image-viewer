import { ElementPosition } from "../util/position";
import { useCallback, useEffect, useRef } from "react";
import { ElementSize } from "../util/size";

interface UseMousePositionArgs {
  wrapperRef: HTMLDivElement | null;
  wrapperSize: ElementSize;
}

interface UseMousePositionState {
  getMousePosition: () => ElementPosition;
}

/**
 * Manage mouse position from wrapper center
 */
export const useMousePosition = (
  args: UseMousePositionArgs,
): UseMousePositionState => {
  const { wrapperRef, wrapperSize } = args;

  const mousePosition = useRef<ElementPosition>({ x: 0, y: 0 });
  const getMousePosition = useCallback(
    () => mousePosition.current,
    [mousePosition],
  );

  useEffect(() => {
    if (wrapperRef == null) return;

    const onMouseOver = (event: MouseEvent) => {
      const { target, clientX: mouseX, clientY: mouseY } = event;
      if (!(target instanceof HTMLElement)) return;
      const { y: wrapperTop, x: wrapperLeft } =
        wrapperRef.getBoundingClientRect();
      const innerX = mouseX - wrapperLeft;
      const innerY = mouseY - wrapperTop;
      const x = innerX - wrapperSize.width / 2;
      const y = innerY - wrapperSize.height / 2;
      mousePosition.current = { x, y };
    };

    wrapperRef.addEventListener("mousemove", onMouseOver);
    return () => wrapperRef.removeEventListener("mousemove", onMouseOver);
  }, [wrapperRef, wrapperSize]);

  useEffect(() => {
    if (wrapperRef == null) return;
    const onMouseLeave = () => {
      mousePosition.current = { x: 0, y: 0 };
    };
    wrapperRef.addEventListener("mouseleave", onMouseLeave);
    return () => wrapperRef.removeEventListener("mouseleave", onMouseLeave);
  }, [wrapperRef]);

  useEffect(() => {
    if (wrapperRef == null) return;
    const onScroll = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    };
    wrapperRef.addEventListener("scroll", onScroll);
    return () => wrapperRef.removeEventListener("scroll", onScroll);
  }, [wrapperRef]);

  return { getMousePosition };
};
