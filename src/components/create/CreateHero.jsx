/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";

import { UserDetails } from "../../app/slice/UserSlice";
import { useSelector } from "react-redux";

const CreateHero = ({ header }) => {
  const user = useSelector(UserDetails);
  const checkSize = useBreakpointValue({ base: false, md: true });

  return (
    <Box className={checkSize ? "cc-container page-alignment" : ""}>
      <Flex
        h={{ base: "80px", md: "120px" }}
        justify={"center"}
        alignItems={"center"}
        position={"relative"}
        className="bg-cream"
      >
        <Text className="fw-bold text-green large-text">{header}</Text>
        <Box
          display={{ base: "none", md: "block" }}
          position={"absolute"}
          w={"100px"}
          h={"100px"}
          borderRadius={"50%"}
          top={"50%"}
          transform={"translateY(-50%)"}
          right={"10px"}
        >
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            src={user.image}
            alt={user.userName}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateHero;
