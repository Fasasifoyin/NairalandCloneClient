/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Search = ({ search, setSearch, bgColor }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    }
  };

  return (
    <Box className="page_alignment cc-container">
      <Flex
        h={{ base: "3.5rem", sm: "4rem", md: "4.8rem" }}
        bg={{
          sm: bgColor,
          md: bgColor ? bgColor : "#e8ece0",
          lg: bgColor ? bgColor : "rgb(255,255,255,0.2)",
        }}
        boxShadow={{ sm: "0px 4px rgba(0,0,0,0.2)" }}
        align={"center"}
        px={{ sm: "25px" }}
      >
        <Box
          position={"relative"}
          height={{ base: "3.5rem", sm: "3rem", md: "2.9rem" }}
          width={{ base: "85%", md: "80%" }}
        >
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
              _focus={{
                shadow: "none",
              }}
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
          width={{ base: "15%", md: "20%" }}
          height={{ base: "3.5rem", sm: "3rem", md: "2.9rem" }}
          bg={"#1B481D"}
          display={"grid"}
          placeItems={"center"}
        >
          <Box hideBelow={"md"}>
            <h5 className="fw-medium text-white medium-text">SEARCH</h5>
          </Box>
          <Box hideFrom={"md"}>
            <Icon as={FiSearch} color={"white"} boxSize={6} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
