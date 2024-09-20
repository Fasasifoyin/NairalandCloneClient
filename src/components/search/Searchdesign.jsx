/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { searchBlogId } from "../../app/slice/SearchSlice";
import { convertDate } from "../../utils/Date";

const Searchdesign = ({ id }) => {
  const blog = useSelector((state) => searchBlogId(state, id));
  const date = convertDate(blog?.createdAt);

  const checkSize = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex gap={"10px"} boxShadow={"rgba(0, 0, 0, 0.05) 1.95px 1.95px 2.6px;"}>
      <Box
        w={{ base: "140px", md: "190px" }}
        h={{ base: "150px", md: "190px" }}
      >
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          alt={blog?.title}
          src={blog?.images[0]}
        />
      </Box>
      <Flex
        direction={"column"}
        flex={1}
        pr={"20px"}
        py={"5px"}
        justifyContent={"space-between"}
      >
        <Box>
          <Text className={checkSize ? "fw-bold medium-text" : "fw-bold"}>
            {blog?.title?.length > 80
              ? `${blog?.title?.slice(0, 77).trim()}...`
              : blog?.title}
          </Text>
          <Text hideBelow={"lg"} mt={"5px"}>
            {blog?.body?.length > 350
              ? `${blog?.body?.slice(0, 347).trim()}...`
              : blog?.body}
          </Text>
        </Box>
        <Text color={"red"}>{date}</Text>
      </Flex>
    </Flex>
  );
};

export default Searchdesign;
