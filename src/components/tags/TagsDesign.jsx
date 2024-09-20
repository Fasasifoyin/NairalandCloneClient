/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Timeago } from "../../utils/Timeago";

import { useSelector } from "react-redux";
import { relatedTagsId } from "../../app/slice/RelatedTags";
import { Link } from "react-router-dom";

const TagsDesign = ({ id, designType }) => {
  const blog = useSelector((state) => relatedTagsId(state, id));
  const time = Timeago(blog?.createdAt, true);
  console.log(blog.author);

  if (designType === 1) {
    return (
      <Box h={{ base: "400px", lg: "450px" }} position={"relative"}>
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          alt={blog?.title}
          src={blog?.images[0]}
        />
        <Flex
          direction={"column"}
          gap={"20px"}
          position={"absolute"}
          bottom={0}
          left={0}
          width={"100%"}
          h={"200px"}
          background={
            "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)"
          }
          p={"20px"}
          justifyContent={"flex-end"}
        >
          <Link to={`/${blog?.slug}`}>
            <Text className="large-text fw-bold" color={"white"}>
              {blog?.title.length > 65
                ? `${blog.title.slice(0, 62).trim()}...`
                : blog.title}
            </Text>
          </Link>
          <Text color={"white"}>{time}</Text>
        </Flex>
      </Box>
    );
  } else if (designType === 2) {
    return (
      <Flex width={"100%"} h={{ lg: "30%" }} justifyContent={"space-between"}>
        <Flex
          width={"65%"}
          gap={"10px"}
          direction={"column"}
          justifyContent={"center"}
        >
          <Link to={`/${blog?.slug}`}>
            <Text className="fw-medium">
              {" "}
              {blog?.title.length > 75
                ? `${blog.title.slice(0, 72).trim()}...`
                : blog.title}
            </Text>
          </Link>

          <Text className="small-text" color={"rgb(0, 0, 0, 0.3)"}>
            {time}
          </Text>
        </Flex>
        <Box width={"30%"} h={{ base: "130px", lg: "100%" }}>
          <Image
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
            alt={blog?.title}
            src={blog?.images[0]}
          />
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box>
        <Box w={"100%"} h={"200px"} mb={"20px"}>
          <Image
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
            alt={blog?.title}
            src={blog?.images[0]}
          />
        </Box>
        <Link to={`/${blog?.slug}`}>
          <Text className="fw-bold">
            {" "}
            {blog?.title.length > 65
              ? `${blog.title.slice(0, 62).trim()}...`
              : blog.title}
          </Text>
        </Link>
        <Text className="small-text" color={"rgb(0, 0, 0, 0.3)"} mt={"10px"}>
          {time}
        </Text>
      </Box>
    );
  }
};

export default TagsDesign;
