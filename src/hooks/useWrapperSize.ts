import { useEffect, useState } from "react";
import { ElementSize } from "../util/size";

interface UseWrapperSizeArgs {
  wrapperRef: HTMLDivElement | null;
}

interface UseWrapperRefState {
  wrapperSize: ElementSize;
}

const InitialSize: ElementSize = { width: 100, height: 100 };

export const useWrapperSize = (
  args: UseWrapperSizeArgs,
): UseWrapperRefState => {
  const { wrapperRef } = args;
  const [wrapperSize, setWrapperSize] = useState<ElementSize>(InitialSize);

  useEffect(() => {
    if (wrapperRef == null) return;
    const getSize = () => {
      const { clientHeight: height, clientWidth: width } = wrapperRef;
      setWrapperSize({ height, width });
    };
    getSize(); // Initialize
    const observer = new ResizeObserver(getSize);
    observer.observe(wrapperRef);
    return () => observer.disconnect();
  }, [wrapperRef, setWrapperSize]);

  return { wrapperSize };
};
