/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";

const Head = ({ head }) => {
  return (
    <Flex align={"flex-end"} gap={"7px"}>
      <Box w={"15px"} h={"15px"} className="bg-green" />
      <Text className="fw-bold" lineHeight={"14px"}>
        {head}
      </Text>
      <Box border={"1px solid rgb(0,0,0,0.1)"} flex={"1"} />
    </Flex>
  );
};

export default Head;
