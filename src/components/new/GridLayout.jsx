/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { NewBlogId } from "../../app/slice/new/NewPageSlice";
import { Link } from "react-router-dom";
import { convertDate, convertToTime } from "../../utils/Date";

const GridLayout = ({ index, each }) => {
  const newBlog = useSelector((state) => NewBlogId(state, each));
  const date = convertDate(newBlog.createdAt);
  const time = convertToTime(newBlog.createdAt);

  return (
    <Box
      className={
        index === 0
          ? "zero"
          : index === 1
          ? "one"
          : index === 2
          ? "two"
          : index === 3
          ? "three"
          : index === 4
          ? "four"
          : "five"
      }
    >
      <Box
        borderRadius={"10px"}
        overflow={"hidden"}
        h={{
          md: "calc(100% - 260px)",
          xl: "calc(100% - 220px)",
          base: "270px",
        }}
      >
        <Image
          transition={"200ms"}
          className="transform"
          borderRadius={"10px"}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          src={newBlog.images[0]}
          alt="Image"
        />
      </Box>
      <Flex
        height={{ md: "260px", xl: "220px" }}
        gap={"10px"}
        justify={{ md: "space-between" }}
        direction={"column"}
        px={"10px"}
        pt={"20px"}
      >
        <Flex justify={"space-between"} align={"center"}>
          <p style={{ textTransform: "uppercase" }} className="fw-medium">
            {date} /{" "}
            {newBlog.tags[0].length > 12
              ? `${newBlog.tags[0].slice(0, 10).trim()}...`
              : newBlog.tags[0]}
          </p>
          <p style={{ textTransform: "lowercase" }} className="fw-medium">
            {time}
          </p>
        </Flex>

        <h5 className="medium-text fw-bold">
          {newBlog.title.length > 38
            ? `${newBlog.title.slice(0, 38).trim()}...`
            : newBlog.title}
        </h5>
        <h6 className="small-text">{newBlog.body.slice(0, 120).trim()}...</h6>
        <Box hideBelow={"lg"} width={"max-content"}>
          <Link
            to={`/${newBlog.slug}`}
            state={{ blogId: newBlog?._id, tags: newBlog?.tags?.join(",") }}
          >
            <h6 className="small-text fw-bold text-green-light-5-hover">
              READ MORE
            </h6>
          </Link>
        </Box>
        <Box hideFrom={"lg"}>
          <Link to={`/${newBlog.slug}`}>
            <Button borderRadius={0} className="bg-green text-white">
              <h5 className="medium-text">Read More</h5>
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default GridLayout;
