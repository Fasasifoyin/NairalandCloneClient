import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { latestNews } from "../app/actions/Blogs";
import {
  allLatestId,
  // Error,
  Status,
  TotalPages,
} from "../app/slice/latestSlice";
import Pagination from "../components/layouts/Pagination";

const Latest = () => {
  const { latestpage } = useParams();
  const dispatch = useDispatch();

  const blogs = useSelector(allLatestId);
  const status = useSelector(Status);
  // const error = useSelector(Error);
  const totalPages = useSelector(TotalPages);
  // console.log(blogs, status, error, totalPages);

  useEffect(() => {
    dispatch(latestNews(latestpage || 1));
  }, [dispatch, latestpage]);

  return (
    <Box>
      {status === "success" &&
        (blogs.length ? (
          <Box>
            <Flex justify={"center"} mt={"20px"}>
              <Pagination
                currentPage={latestpage}
                totalPages={totalPages}
                route={"/latest"}
              />
            </Flex>
            <Text mt={"7px"} textAlign={"center"} className="tiny-text">
              Available pages:{" "}
              <Text className="fw-bold tiny-text" as={"span"}>
                {totalPages}
              </Text>
            </Text>
          </Box>
        ) : (
          <Text className="fw-bold" textAlign={"center"}>
            No Blog
          </Text>
        ))}
    </Box>
  );
};

export default Latest;
