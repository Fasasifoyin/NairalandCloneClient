import { useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Head from "./Head";
import Button from "./Button";

import { useDispatch, useSelector } from "react-redux";
import { homeLatestNews } from "../../app/actions/Blogs";
import {
  HomeError,
  HomeLatestNews,
  HomeStatus,
} from "../../app/slice/latestSlice";

const HomeHero = () => {
  const dispatch = useDispatch();
  const latest = useSelector(HomeLatestNews);
  const status = useSelector(HomeStatus);
  const error = useSelector(HomeError);

  const dummyArray = new Array(7).fill(null);
  const mappedArray = status === "success" ? latest : dummyArray;

  useEffect(() => {
    if (!latest.length && status !== "success" && status !== "failed") {
      dispatch(homeLatestNews(1));
    }
  }, [dispatch, latest, status]);

  return (
    <Box className="cc-container page-alignment2">
      <Box
        className="bg-green-light-9"
        py={"20px"}
        borderRadius={{ md: "10px" }}
      >
        <Box px={"20px"}>
          <Head head={"Latest News"} />
          {status === "failed" ? (
            <Text mt={"30px"}>{error}</Text>
          ) : status === "idle" ||
            status === "pending" ||
            (status === "success" && mappedArray.length > 0) ? (
            <Box
              mt={"30px"}
              display={"grid"}
              gap={"25px"}
              gridAutoFlow={"column"}
              gridAutoColumns={{ base: "80%", sm: "56%", lg: "30%" }}
              overflowX={"auto"}
              scrollSnapType={"inline mandatory"}
              className="scrollbody"
            >
              {mappedArray.slice(0, 7).map((each, index) => (
                <Box
                  className="skeleton"
                  key={index}
                  height={"240px"}
                  scrollSnapAlign={"start"}
                  pos={"relative"}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    src={each?.images[0]}
                    alt={each?.title}
                    objectFit={"cover"}
                  />
                  {status === "success" && (
                    <Link to={`/${each?.slug}`}>
                      <Flex
                        position={"absolute"}
                        h={"120px"}
                        bottom={0}
                        left={0}
                        width={"100%"}
                        background={
                          "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)"
                        }
                      >
                        <Flex
                          width={"100%"}
                          p={"20px"}
                          gap={"10px"}
                          align={"center"}
                          className="text-white text-green-light-7-hover"
                        >
                          <Box
                            w={"7px"}
                            borderRadius={"12px"}
                            h={"100%"}
                            bg={"red"}
                            boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
                          />
                          <Text className="medium-text" flex={"1"}>
                            {each?.title?.length > 45
                              ? `${each?.title?.slice(0, 42).trim()}...`
                              : each?.title}
                          </Text>
                        </Flex>
                      </Flex>
                    </Link>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Text mt={"30px"}>No news</Text>
          )}
          {status === "success" && mappedArray.length > 0 && (
            <Button buttonText={"View more"} to={"/latest"} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHero;
