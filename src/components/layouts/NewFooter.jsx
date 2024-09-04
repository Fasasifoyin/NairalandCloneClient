import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";

const NewFooter = () => {
  return (
    <Box bg={"black"} py={"40px"} h={"80vh"}>
      <Box className="page-alignment cc-container">
        <Logo color={"white"} fs={"logo-medium-text"} />
      </Box>
    </Box>
  );
};

export default NewFooter;
