/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { tagRequest } from "../../utils/Data";
import ParentStyle from "./ParentStyle";

import { useDispatch, useSelector } from "react-redux";
import { Blogs, Status } from "../../app/slice/BBT";
import { getBlogsByTags } from "../../app/actions/Blogs";

const AfterHero = () => {
  const dispatch = useDispatch();
  const blog = useSelector(Blogs);
  const status = useSelector(Status);

  useEffect(() => {
    if (!blog.length && status !== "success" && status !== "failed") {
      dispatch(getBlogsByTags(tagRequest));
    }
  }, [dispatch, blog]);

  return (
    <Box className="cc-container page-alignment" mt={"60px"}>
      {status === "idle" ||
      status === "pending" ||
      (status === "success" && blog.length > 0) ? (
        <Flex direction={"column"} gap={"60px"}>
          <ParentStyle
            ind={2}
            blog={blog}
            status={status}
            style={"first"}
            number={4}
          />
          <ParentStyle
            ind={3}
            blog={blog}
            status={status}
            style={"second"}
            number={7}
          />
          <ParentStyle
            ind={1}
            blog={blog}
            status={status}
            style={"first"}
            number={4}
          />
          <ParentStyle
            ind={0}
            blog={blog}
            status={status}
            style={"first"}
            number={4}
          />
        </Flex>
      ) : (
        <Text>No news</Text>
      )}
    </Box>
  );
};

export default AfterHero;
