import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import useElementHeight from "../hooks/useElementHeight";
import NewFooter from "../components/layouts/NewFooter";

import { ElementHeightContext } from "../hooks/useElementHeightContext";

const Layout = () => {
  const location = useLocation();
  const { elementHeight, elementRef } = useElementHeight();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <ElementHeightContext.Provider value={elementHeight}>
      <Box>
        {!isAuthPage && <Navbar elementRef={elementRef} />}
        <Box
          pt={!isAuthPage ? `${elementHeight}px` : ""}
          mb={!isAuthPage ? "100px" : ""}
          minH={`calc(100vh - 100px)`}
        >
          <Outlet />
        </Box>
        {!isAuthPage && <NewFooter />}
      </Box>
    </ElementHeightContext.Provider>
  );
};

export default Layout;
