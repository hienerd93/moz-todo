import { useRef, useEffect } from "react";

export function usePrevious<T>(arg: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = arg;
  }, [arg]);
  return ref.current as T;
}
