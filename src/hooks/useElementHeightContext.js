import { createContext, useContext } from "react";

export const ElementHeightContext = createContext(null);

export const useElementHeightContext = () => {
  return useContext(ElementHeightContext);
};
