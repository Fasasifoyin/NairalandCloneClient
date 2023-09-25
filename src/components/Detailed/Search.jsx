/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { TbLetterX } from "react-icons/tb";

const Search = ({ placeholder, search, setSearch, onSearch, cancel }) => {
  return (
    <Flex h={"40px"} w={"100%"}>
      <Input
        borderColor={"rgba(0,0,0, 0.5)"}
        h={"100%"}
        bg={"white"}
        focusBorderColor={"#175616"}
        _focus={{
          shadow: "none",
        }}
        borderRightRadius={"0px"}
        borderLeftRadius={"7px"}
        width={"85%"}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRightRadius={"7px"}
        h={"100%"}
        width={"15%"}
        bg={"#175616"}
        onClick={onSearch}
        className="cursor"
      >
        <Icon
          color={"white"}
          boxSize={5}
          as={cancel && search.length ? TbLetterX : FiSearch}
        />
      </Box>
    </Flex>
  );
};

export default Search;
