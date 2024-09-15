import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LatestDesign from "../components/latest/LatestDesign";
import Pagination from "../components/layouts/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { latestNews } from "../app/actions/Blogs";
import {
  allLatestId,
  Error,
  Status,
  TotalPages,
} from "../app/slice/latestSlice";

const Latest = () => {
  const { latestpage } = useParams();
  const dispatch = useDispatch();

  const blogs = useSelector(allLatestId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const totalPages = useSelector(TotalPages);

  const checkSize = useBreakpointValue({ base: false, lg: true });
  // console.log(checkSize);

  useEffect(() => {
    dispatch(latestNews(latestpage || 1));
  }, [dispatch, latestpage]);

  return (
    <Box mt={"30px"} className="cc-container page-alignment">
      {status === "pending" && <Text>Loading...</Text>}
      {status === "failed" && <Text textAlign={"center"}>{error}</Text>}
      {status === "success" &&
        (blogs.length ? (
          <Box>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justifyContent={"space-between"}
              gap={{ base: "40px", lg: 0 }}
            >
              {blogs.length > 1 && (
                <Flex
                  width={{
                    base: "100%",
                    lg:
                      blogs.length < 8
                        ? "45%"
                        : blogs.length > 7 && blogs.length < 12
                        ? "31.5%"
                        : "25%",
                  }}
                  order={{ base: 1, lg: 0 }}
                  direction={{ base: "column", md: "row", lg: "column" }}
                  flexWrap={"wrap"}
                  columnGap={{ base: 0, md: "5%", lg: 0 }}
                  rowGap={{ base: "20px", lg: "2%" }}
                >
                  {blogs.slice(1, 7).map((each) => (
                    <LatestDesign key={each} id={each} designType={1} />
                  ))}
                </Flex>
              )}
              <Box
                width={{
                  base: "100%",
                  lg:
                    blogs.length < 8
                      ? "50%"
                      : blogs.length > 7 && blogs.length < 12
                      ? "31.5%"
                      : "45%",
                }}
                order={{ base: 0, lg: 1 }}
              >
                <LatestDesign id={blogs[0]} designType={2} />
                {blogs.length > 11 && (
                  <Flex
                    display={{ base: "none", lg: "flex" }}
                    mt={"25px"}
                    justifyContent={"space-between"}
                  >
                    {blogs.slice(11, 13).map((each) => (
                      <LatestDesign key={each} id={each} designType={4} />
                    ))}
                  </Flex>
                )}
              </Box>
              {blogs.length > 7 && (
                <Box
                  order={2}
                  width={{
                    base: "100%",
                    lg: blogs.length > 7 && blogs.length < 12 ? "31.5%" : "25%",
                  }}
                >
                  <Flex
                    h={"100%"}
                    direction={{ base: "column", md: "row", lg: "column" }}
                    flexWrap={"wrap"}
                    columnGap={{ base: 0, md: "5%", lg: 0 }}
                    rowGap={{ base: "20px", lg: "2%" }}
                  >
                    {blogs.slice(7, 11).map((each) => (
                      <LatestDesign key={each} id={each} designType={3} />
                    ))}
                  </Flex>
                  {blogs.length > 11 && (
                    <Flex
                      mt={"20px"}
                      display={{ base: "flex", lg: "none" }}
                      direction={{ base: "column", md: "row" }}
                      justifyContent={"space-between"}
                      gap={{ base: "20px", md: 0 }}
                    >
                      {blogs.slice(11, 13).map((each) => (
                        <LatestDesign key={each} id={each} designType={4} />
                      ))}
                    </Flex>
                  )}
                </Box>
              )}
            </Flex>
            {/* work */}
            {blogs.length > 13 && (
              <Flex
                mt={"50px"}
                p={{lg:"30px"}}
                className={checkSize ? "bg-green-light-9" : ""}
                direction={{ base: "column", lg: "row" }}
                justifyContent={"space-between"}
              >
                <Flex
                  width={{ base: "100%", lg: "calc(72.5% + 15px)" }}
                  direction={"column"}
                  gap={"30px"}
                >
                  {blogs.slice(13, blogs.length).map((each) => (
                    <LatestDesign key={each} id={each}/>
                  ))}
                </Flex>
                <Box
                  width={{ base: "100%", lg: "calc(25% - 15px)" }}
                  bg={"rgb(240, 240, 240)"}
                >
                  <Text className="tiny-text" textAlign={"center"} p={"10px"}>ADVERTISMENT</Text>
                </Box>
              </Flex>
            )}
            {/* work */}
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
