import React from "react";

export function usePrevious<Type>(arg: Type): Type {
  const preRef = React.useRef<Type>();
  React.useEffect(() => {
    preRef.current = arg;
  });
  return preRef.current || arg;
}
