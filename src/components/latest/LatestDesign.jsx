/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { latestId } from "../../app/slice/latestSlice";
import { convertDate } from "../../utils/Date";
import useElementHeight from "../../hooks/useElementHeight";
import { Link } from "react-router-dom";

const LatestDesign = ({ id, designType }) => {
  const blog = useSelector((state) => latestId(state, id));
  const date = convertDate(blog?.createdAt);
  const { elementHeight, elementRef } = useElementHeight();

  if (designType === 1) {
    return (
      <Box h={{ lg: "15%" }} width={{ base: "100%", md: "47.5%", lg: "100%" }}>
        <Text className="small-text fw-bold" color={"rgb(0, 0, 0, 0.3)"}>
          {date}
        </Text>
        <Link to={`/${blog?.slug}`}>
          <Text className="fw-bold">
            {blog?.title?.length > 70
              ? `${blog?.title?.slice(0, 67).trim()}...`
              : blog?.title}
          </Text>
        </Link>
      </Box>
    );
  } else if (designType == 2) {
    return (
      <Flex direction={"column"}>
        <Box order={{ base: 1, lg: 0 }} h={{ base: "350px", lg: "380px" }}>
          <Image
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
            alt={blog?.title}
            src={blog?.images[0]}
          />
        </Box>
        <Box className="bg-green-light-9" p={"10px"}>
          <Link to={`/${blog?.slug}`}>
            <Text className="medium-text fw-bold">
              {blog?.title?.length > 75
                ? `${blog?.title?.slice(0, 72).trim()}...`
                : blog?.title}
            </Text>
          </Link>
          <Text className="small-text fw-bold" color={"rgb(0, 0, 0, 0.3)"}>
            {date}
          </Text>
        </Box>
      </Flex>
    );
  } else if (designType === 3) {
    return (
      <Box
        ref={elementRef}
        h={{ base: "160px", lg: "23.5%" }}
        width={{ base: "100%", md: "47.5%", lg: "100%" }}
      >
        <Flex
          h={`${elementHeight}px`}
          direction={{ base: "row", lg: "column", xl: "row" }}
          gap={"10px"}
        >
          <Box
            width={{ base: "50%", lg: "100%", xl: "45%" }}
            h={{ base: "100%", lg: "57%", xl: "100%" }}
          >
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              alt={blog?.title}
              src={blog?.images[0]}
            />
          </Box>
          <Box
            flex={1}
            width={{ lg: "100%" }}
            h={{ base: "100%", lg: "38%", xl: "100%" }}
          >
            <Link to={`/${blog?.slug}`}>
              <Text className="fw-bold small-text">
                {blog?.title?.length > 70
                  ? `${blog?.title?.slice(0, 67).trim()}...`
                  : blog?.title}
              </Text>
            </Link>
          </Box>
        </Flex>
      </Box>
    );
  } else if (designType === 4) {
    return (
      <Flex
        width={{ base: "100%", md: "47.5%" }}
        direction={{ base: "row", lg: "column" }}
        gap={"10px"}
      >
        <Box
          h={{ base: "160px", lg: "130px" }}
          width={{ base: "50%", lg: "100%" }}
        >
          <Image
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
            alt={blog?.title}
            src={blog?.images[0]}
          />
        </Box>
        <Box flex={1}>
          <Link to={`/${blog?.slug}`}>
            <Text className="fw-bold small-text">
              {blog?.title?.length > 70
                ? `${blog?.title?.slice(0, 67).trim()}...`
                : blog?.title}
            </Text>
          </Link>
          {/* <Text className="small-text fw-bold" color={"rgb(0, 0, 0, 0.3)"}>
            {blog.tags[0]}
          </Text> */}
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box
        bg={"white"}
        p={"20px"}
        boxShadow={{
          base: "rgba(0, 0, 0, 0.05) 0px 3px;",
          lg: "none",
        }}
      >
        <Link to={`/${blog?.slug}`}>
          <Text className="mediumtext fw-medium">{blog?.title}</Text>
        </Link>

        <Flex mt={"20px"} justifyContent={"space-between"} ref={elementRef}>
          <Box width={{ base: "100%", md: "70%" }}>
            <Text className="small-text">{`${blog?.body
              .slice(0, 300)
              .trim()}...`}</Text>
            <Text mt={"20px"} className="tiny-text" color={"red"}>
              {date}
            </Text>
          </Box>
          <Box width={"26%"} hideBelow={"md"} h={`${elementHeight}px`}>
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              alt={blog?.title}
              src={blog?.images[0]}
            />
          </Box>
        </Flex>
      </Box>
    );
  }
};

export default LatestDesign;
