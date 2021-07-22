import { useRef, useEffect } from "react";
import type { MutableRefObject } from "react";

export function usePrevious<T>(
  arg: T
): MutableRefObject<T | undefined>["current"] {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = arg;
  }, [arg]);
  return ref.current;
}
