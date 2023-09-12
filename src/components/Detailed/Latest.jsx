/* eslint-disable react/prop-types */
import { Box, Flex, Image } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { detailedLatestId } from "../../app/slice//Detailed/DetailedLatest";

const Latest = ({ latest }) => {
  const blog = useSelector((state) => detailedLatestId(state, latest));
  const date = convertDate(blog?.createdAt);

  return (
    <Box>
      <Box w={{ base: "250px", lg: "100%" }}>
        <Flex justify={"space-between"}>
          {blog?.slug ? (
            <Link to={`/${blog?.slug}`}>
              <Box width={"100px"} h={"100px"} borderRadius={"50%"}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src={blog?.images[0]}
                  borderRadius={"50%"}
                  alt="Image"
                />
              </Box>
            </Link>
          ) : (
            <Box
              width={"100px"}
              h={"100px"}
              borderRadius={"50%"}
              className="skeleton"
            ></Box>
          )}

          {blog?.slug ? (
            <Flex
              h={{ lg: "100px" }}
              direction={"column"}
              justify={{ lg: "space-between", base: "center" }}
              width={"calc(96% - 100px)"}
            >
              <p className="fw-bold">
                {blog?.title.length > 35
                  ? `${blog?.title.slice(0, 35).trim()}...`
                  : blog?.title}
              </p>
              <h6 className="small-text" style={{ color: "#AAAAAA" }}>
                {date}
              </h6>
            </Flex>
          ) : (
            <Flex
              h={{ lg: "100px" }}
              direction={"column"}
              justify={"center"}
              width={"calc(96% - 100px)"}
              gap={"10px"}
            >
              <Box className="skeleton" width={"100%"} h={"10px"} />
              <Box className="skeleton" width={"100%"} h={"5px"} />
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Latest;
