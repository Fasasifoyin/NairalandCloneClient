/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import Fade from "./Fade";
import Logo from "../layouts/Logo";
import { Link } from "react-router-dom";

const AccountLayout = ({ children, slides }) => {
  return (
    <Flex>
      <Flex
        h={{ lg: "100vh" }}
        minH={"100vh"}
        w={{ base: "100%", lg: "50%" }}
        overflowY={{ lg: "scroll" }}
        className="scrollbody"
      >
        <Box
          margin={"auto"}
          w={"100%"}
          maxW={"500px"}
          py={"50px"}
          px={{ base: "1.25rem", sm: "2.1875rem", md: "3.125rem", lg: "35px" }}
        >
          <Box mb={"20px"} width={"max-content"}>
            <Link to="/">
              <Logo color={"#175616"} fs={"logo-large-text"} />
            </Link>
          </Box>
          {children}
        </Box>
      </Flex>
      <Fade slides={slides} />
    </Flex>
  );
};

export default AccountLayout;
