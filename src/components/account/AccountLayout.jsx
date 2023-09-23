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
        overflowY={{ lg: "scroll" }}
        w={{ base: "100%", lg: "50%" }}
        className="scrollbody"
      >
        <Box
          margin={"auto"}
          width={"100%"}
          maxW={"504px"}
          px={"15px"}
          py={"30px"}
        >
          <Box mb={"50px"} width={"max-content"}>
            <Link to="/">
              <Logo color={"#175616"} fs={"logo-large-text"} />
            </Link>
          </Box>
          {children}
        </Box>
      </Flex>
      <Box h={"100vh"} w={"50%"} hideBelow={"lg"} pos={"relative"}>
        <Fade slides={slides} />
      </Box>
    </Flex>
  );
};

export default AccountLayout;
