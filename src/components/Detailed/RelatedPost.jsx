/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { detailedRelatedId } from "../../app/slice/Detailed/DetailedRelated";

const RelatedPost = ({ each }) => {
  const blog = useSelector((state) => detailedRelatedId(state, each));
  const date = convertDate(blog?.createdAt);

  return (
    <Box>
      <Box
        pos={"relative"}
        w={{ base: "250px", lg: "300px" }}
        h={{ base: "150px", lg: "200px" }}
        borderRadius={"5px"}
      >
        <Image
          hideBelow={"lg"}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          borderRadius={"5px"}
          src={blog?.images[0]}
          alt="Image"
        />
        <Flex
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"#175616"}
          opacity={{ lg: 0 }}
          _hover={{
            opacity: 1,
            transition: "0.2s ease-in all",
          }}
          borderRadius={"5px"}
          px={"10px"}
        >
          <Flex
            direction={"column"}
            h={"90%"}
            w={"90%"}
            margin={"auto"}
            justify={"center"}
            align={"center"}
            gap={"10px"}
          >
            <p
              style={{ textTransform: "uppercase", textAlign: "center" }}
              className="text-white"
            >
              {date} /{" "}
              <span>
                <Link to={`/blogs/tags?tag=${blog?.tags[0]}`}>
                  <span className="text-green-light-4 detailedLink">
                    {blog?.tags[0].length > 7
                      ? `${blog?.tags[0].slice(0, 7)}...`
                      : blog?.tags[0]}
                  </span>
                </Link>
              </span>
            </p>
            <h6
              className="text-white small-text"
              style={{ textAlign: "center" }}
            >
              {blog?.title.length > 45
                ? `${blog?.title.slice(0, 45).trim()}...`
                : blog?.title}
            </h6>
            <Link to={`/${blog?.slug}`}>
              <Button
                bg={"white"}
                _hover={{ bg: "white" }}
                borderRadius={"5px"}
                size={"sm"}
              >
                <h6 className="tiny-text">READ MORE</h6>
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default RelatedPost;
