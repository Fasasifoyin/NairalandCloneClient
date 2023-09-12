import { useEffect, useRef, useState } from "react";

const useScrollPosition = () => {
  const myElementRef = useRef(null);
  const [positionTop, setPositionTop] = useState(0);
  // const [positionLeft, setPositionLeft] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = myElementRef.current;
      setPositionTop(el.scrollTop);
      // setPositionLeft(el.scrollLeft);
    };

    const element = myElementRef.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { myElementRef, positionTop };
};

export default useScrollPosition;
