/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Button = ({ buttonText, to }) => {
  return (
    <Flex justifyContent={"center"} mt={"20px"}>
      <Link to={to}>
        <Box
          p={"5px 30px"}
          className="bg-green text-white bg-green-light-5-hover"
          borderRadius={"5px"}
        >
          {buttonText}
        </Box>
      </Link>
    </Flex>
  );
};

export default Button;
