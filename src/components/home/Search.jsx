/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    }
  };

  return (
    <Box className="page_alignment cc-container">
      <Flex
        h={"4.8rem"}
        bg={{ md: "#e8ece0", lg: "rgb(255,255,255,0.2)" }}
        boxShadow={"0px 4px rgba(0,0,0,0.2)"}
        align={"center"}
        px={"25px"}
      >
        <Box position={"relative"} height={"2.9rem"} width={"80%"}>
          <form
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            <Input
              paddingTop={"5px"}
              placeholder="Search"
              paddingLeft={"60px"}
              bg={"white"}
              focusBorderColor={"#1B481D"}
              borderRightRadius={"0px"}
              borderLeftRadius={"10px"}
              height={"100%"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <Icon
            boxSize={"5"}
            zIndex={"10"}
            top={"35%"}
            left={"25px"}
            pos={"absolute"}
            as={FiSearch}
            color={"#80A17B"}
          />
        </Box>
        <Box
          onClick={handleSubmit}
          className="cursor"
          borderRightRadius={"10px"}
          width={"20%"}
          height={"2.9em"}
          bg={"#1B481D"}
          hideBelow={"md"}
          display={"grid"}
          placeItems={"center"}
        >
          <h5 className="fw-medium text-white medium-text">Enter</h5>
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
