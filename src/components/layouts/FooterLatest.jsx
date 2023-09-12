/* eslint-disable react/prop-types */
import { Box, Flex, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { footerBlogsId } from "../../app/slice/FooterSlice";
import { convertDate } from "../../utils/Date";
import { Link } from "react-router-dom";

const FooterLatest = ({ each }) => {
  const blog = useSelector((state) => footerBlogsId(state, each));
  const date = convertDate(blog?.createdAt);

  return (
    <Flex h={"70px"} justify={"space-between"}>
      {blog?.slug ? (
        <Box width={"30%"} h={"100%"}>
          <Link to={`/${blog?.slug}`}>
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              src={blog?.images[0]}
              alt="Image"
            />
          </Link>
        </Box>
      ) : (
        <Box width={"30%"} h={"100%"} className="skeleton" />
      )}

      <Flex width={"67%"} justify={"center"} direction={"column"} h={"100%"} gap={blog?.slug ? "" : "12px"}>
        {blog?.slug ? (
          <h6 className="text-white tiny-text">
            {blog?.title.length > 55
              ? `${blog?.title.slice(0, 55).trim()}...`
              : blog?.title}
          </h6>
        ) : (
          <Box>
            <Box
              style={{ marginBottom: "3px" }}
              className="skeleton"
              width={"100%"}
              h={"5px"}
            />
            <Box
              style={{ marginBottom: "3px" }}
              className="skeleton"
              width={"100%"}
              h={"5px"}
            />
            <Box
              style={{ marginBottom: "3px" }}
              className="skeleton"
              width={"80%"}
              h={"5px"}
            />
          </Box>
        )}
        {blog?.slug ? (
          <h6
            className="tiny-text"
            style={{
              textTransform: "uppercase",
              color: "rgb(255,255,255,0.6)",
            }}
          >
            {date}
          </h6>
        ) : (
          <Box>
            <Box className="skeleton" width={"90%"} h={"5px"} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default FooterLatest;
