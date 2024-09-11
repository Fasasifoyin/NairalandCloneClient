import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import HomeHero from "../components/home/HomeHero";
import RandomTags from "../components/home/RandomTags";
import Fader from "../components/home/Fader";
import HomeTagsBlog from "../components/home/RandomBlogs";
import Pagination from "../components/layouts/Pagination";
import TriangleLoader from "../components/loaders/TriangleLoader";

import { useDispatch, useSelector } from "react-redux";
import {
  getBlogsByTags,
  getHomePageBlogs,
  getRandomTags,
  randomBlogs,
} from "../app/actions/Blogs";
// import {
//   Error,
//   Status,
//   Total,
//   allTagsBlogId,
// } from "../app/slice/home/HomeBlogSlice";
import {
  allRandomTagsId,
  Status as RandomTagsStatus,
} from "../app/slice/home/RandomTagsSlice";
import AfterHero from "../components/home/AfterHero";
import {
  allRandomId,
  Error,
  Status,
  TotalPages,
} from "../app/slice/home/RandomBlog";
import RandomBlogs from "../components/home/RandomBlogs";

const Home = () => {
  const dispatch = useDispatch();
  const { homePage } = useParams();
  const blogs = useSelector(allRandomId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const totalPages = useSelector(TotalPages);

  useEffect(() => {
    dispatch(randomBlogs(homePage || 1));
  }, [dispatch, homePage]);

  return (
    <Box mt={"30px"}>
      <HomeHero />
      <AfterHero />
      <Box mt={"60px"}>
        {status === "pending" && (
          <Flex justify={"center"}>
            <TriangleLoader />
          </Flex>
        )}
        {status === "failed" && <Text textAlign={"center"}>{error}</Text>}
        {status === "success" &&
          (blogs.length ? (
            <Box>
              <Flex direction={"column"}>
                {blogs.map((each, index) => (
                  <RandomBlogs key={each} id={each} index={index} />
                ))}
              </Flex>
              <Flex justify={"center"} mt={"20px"}>
                <Pagination
                  currentPage={homePage}
                  totalPages={totalPages}
                  route={"home"}
                  initial={"/"}
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
    </Box>
  );
};

export default Home;
