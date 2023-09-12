import { useEffect, useRef } from "react";

const useDidMountEffect = (func, deps1, deps2, deps3, deps4) => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) func();
    else initialRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps1, deps2, deps3, deps4]);
};

export default useDidMountEffect;
