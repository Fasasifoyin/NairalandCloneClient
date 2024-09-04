/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { randomId } from "../../app/slice/home/RandomBlog";
import Button from "./Button";

const RandomBlogs = ({ id, index }) => {
  const blog = useSelector((state) => randomId(state, id));

  return (
    <Box
      className={index % 2 === 0 ? "bg-green-light-9" : "bg-white"}
      py={"30px"}
    >
      <Flex
        className="cc-container page-alignment"
        direction={"column"}
        align={"center"}
      >
        <Text className="medium-text">{blog?.tags[0]}</Text>
        <Text textAlign={"center"}>{blog?.body.slice(0, 250).trim()}...</Text>
        {/* <Text className="small-text" mt={"5px"}>
          {blog?.author?.firstName
            ? `-${blog?.author?.firstName} ${blog?.author?.lastName}`
            : "-unknown"}
        </Text> */}
        <Button buttonText={"Read more"} to={`/${blog?.slug}`} />
      </Flex>
    </Box>
  );
};

export default RandomBlogs;
