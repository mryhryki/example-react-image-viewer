import { useEffect, useState } from 'react';
import { ElementSize } from '../util/size';

interface UseImageRefState {
  naturalImageSize: ElementSize;
  setImageRef: (ref: HTMLImageElement) => void;
}

const InitialSize: ElementSize = { width: 100, height: 100 };

export const useImageSize = (): UseImageRefState => {
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [naturalImageSize, setNaturalImageSize] =
    useState<ElementSize>(InitialSize);

  useEffect(() => {
    if (imageRef == null) return;
    const onLoad = () => {
      if (!imageRef.complete) return;
      const { naturalWidth, naturalHeight } = imageRef;
      const width = Math.max(naturalWidth, 100);
      const height = Math.max(naturalHeight, 100);
      setNaturalImageSize({ width, height });
    };
    imageRef.addEventListener('load', onLoad);
    onLoad();
    return () => imageRef.removeEventListener('load', onLoad);
  }, [imageRef]);

  return { naturalImageSize, setImageRef };
};
