import { ElementSize } from "./size";

export interface ElementPosition {
  x: number;
  y: number;
}

export const getCenterPosition = (size: ElementSize): ElementPosition => {
  return {
    x: Math.floor(size.width / 2),
    y: Math.floor(size.height / 2),
  };
};

export const isSamePosition = (
  position1: ElementPosition,
  position2: ElementPosition,
): boolean => position1.x === position2.x && position1.y === position2.y;

export const addPosition = (
  base: ElementPosition,
  add: ElementPosition,
): ElementPosition => {
  return {
    x: base.x + add.x,
    y: base.y + add.y,
  };
};

export const subPosition = (
  base: ElementPosition,
  sub: ElementPosition,
): ElementPosition => {
  return {
    x: base.x - sub.x,
    y: base.y - sub.y,
  };
};

export const multiPosition = (
  base: ElementPosition,
  times: number,
): ElementPosition => {
  return {
    x: base.x * times,
    y: base.y * times,
  };
};
