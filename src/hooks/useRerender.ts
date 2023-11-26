import { useCallback, useState } from "react";

type RerenderFunction = () => void;

export const useRerender = (): RerenderFunction => {
  const setState = useState(0)[1];
  return useCallback(() => setState((i) => i + 1), [setState]);
};
