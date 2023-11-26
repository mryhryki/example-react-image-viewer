import { useState } from "react";

interface UseElementRefState {
  wrapperRef: HTMLDivElement | null;
  setWrapperRef: (ref: HTMLDivElement) => void;
}

export const useElementRefs = (): UseElementRefState => {
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

  return {
    setWrapperRef,
    wrapperRef,
  };
};
