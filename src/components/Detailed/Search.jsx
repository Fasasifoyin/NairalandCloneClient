import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <Flex hideBelow={"lg"} h={"40px"} mb={"150px"}>
      <Input
        borderColor={"rgba(0,0,0, 0.5)"}
        h={"100%"}
        bg={"white"}
        focusBorderColor={"#1B481D"}
        borderRightRadius={"0px"}
        borderLeftRadius={"7px"}
        width={"85%"}
        type="text"
        placeholder="Search"
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRightRadius={"7px"}
        h={"100%"}
        width={"15%"}
        bg={"#175616"}
      >
        <Icon color={"white"} boxSize={5} as={FiSearch} />
      </Box>
    </Flex>
  );
};

export default Search;
