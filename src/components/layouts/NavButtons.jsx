/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavButtons = ({ user, base, lg, loggingOut }) => {
  return (
    <>
      {user?.token && (
        <Flex
          display={{ base, lg }}
          gap={"20px"}
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
        >
          <Box>
            <Link to={`/profile/${user.userName}`}>
              <Button
                className="bg-green text-white bg-hover-transparent text-hover-green"
                w={{ base: "100%", lg: "94px" }}
                h={"34px"}
                rounded={0}
                _hover={{
                  border: `1px solid green`,
                }}
              >
                PROFILE
              </Button>
            </Link>
          </Box>
          <Button
            className="text-green bg-transparent"
            w={{ base: "100%", lg: "94px" }}
            h={"34px"}
            rounded={0}
            _hover={{ border: `1px solid green` }}
            onClick={loggingOut}
          >
            LOGOUT
          </Button>
        </Flex>
      )}
      {!user?.token && (
        <Box display={{ base, lg }} w={"100%"}>
          <Link to={"/signin"} style={{ width: "100%" }}>
            <Button
              className="bg-green text-white bg-hover-transparent text-hover-green"
              w={{ base: "100%", lg: "94px" }}
              h={"34px"}
              rounded={0}
              _hover={{
                border: `1px solid green`,
              }}
            >
              LOGIN
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default NavButtons;
