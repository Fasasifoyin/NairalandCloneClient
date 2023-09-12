/* eslint-disable react/prop-types */
import { Box, Flex, Image } from "@chakra-ui/react";

const Bloggger = ({ user }) => {
  return (
    <Box mb={"30px"}>
      <Box border={"1px solid #175616"} mb={"15px"} />
      <Flex w={"100%"} justify={"space-between"}>
        <Box
          borderRadius={"50%"}
          w={{ base: "120px", md: "180px", lg: "225px" }}
          h={{ base: "120px", md: "180px", lg: "225px" }}
        >
          <Image w={"100%"} h={"100%"} borderRadius={"50%"} src={user.image} alt={user.firstName} />
        </Box>
        <Box
          w={{
            base: "calc(95% - 120px)",
            md: "calc(95% - 180px)",
            lg: "calc(95% - 225px)",
          }}
        >
          <Box>
            <h4 className="medium-text">
              {user.firstName} {user.lastName}
            </h4>
          </Box>
          <Box mb={"30px"}>
            <h6 className="small-text">
              {user.occupation ? user.occupation : "No occupation"}
            </h6>
          </Box>
          <Box>
            <p>{user.about ? user.about : "No about"}</p>
          </Box>
        </Box>
      </Flex>
      <Box border={"1px solid #175616"} mt={"15px"} />
    </Box>
  );
};

export default Bloggger;
