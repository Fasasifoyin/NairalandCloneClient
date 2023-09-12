/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <Box>
      <h4 style={{ marginBottom: "20px" }} className="medium-text fw-medium">
        Categories
      </h4>
      <Flex flexWrap={"wrap"} gap={"20px"}>
        {categories.map((each) => (
          <Link key={each} to={`/blogs/tags?tag=${each}`}>
            <Box
              className="cursor bg-hover-green text-hover-white"
              borderRadius={"5px"}
              py={{ lg: "10px", base: "7px" }}
              px={{ lg: "15px", base: "10px" }}
              border={"1px solid #175616"}
            >
              <p>{each}</p>
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
