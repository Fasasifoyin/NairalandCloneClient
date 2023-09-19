import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import HomeHero from "../components/home/HomeHero";
import RandomTags from "../components/home/RandomTags";
import Fader from "../components/home/Fader";
import HomeTagsBlog from "../components/home/HomeTagsBlog";
import Pagination from "../components/layouts/Pagination";
import Footer from "../components/layouts/Footer";
import TriangleLoader from "../components/loaders/TriangleLoader";

import { useDispatch, useSelector } from "react-redux";
import { getHomePageBlogs, getRandomTags } from "../app/actions/Blogs";
import {
  Error,
  Status,
  Total,
  allTagsBlogId,
} from "../app/slice/home/HomeBlogSlice";
import {
  allRandomTagsId,
  Status as RandomTagsStatus,
} from "../app/slice/home/RandomTagsSlice";

const Home = () => {
  const { homePage } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const homeTagsBlog = useSelector(allTagsBlogId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const totalPages = useSelector(Total);

  const randomTags = useSelector(allRandomTagsId);
  const randomTagsStatus = useSelector(RandomTagsStatus);
  const initialRandomTag = ["", "", ""];

  useEffect(() => {
    if (randomTagsStatus === "idle") {
      dispatch(getRandomTags(3));
    }
  }, [dispatch, randomTagsStatus]);

  useEffect(() => {
    dispatch(getHomePageBlogs(homePage || 1));
  }, [dispatch, homePage]);

  useEffect(() => {
    if (location.pathname === "/tags/1") {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Box>
      <Box pos={"absolute"} top={"0"} left={"0"} w={"100%"}>
        <Navbar
          text={"black"}
          activeText={"#175616"}
          hover={"#175616"}
          buttonBg={"#175616"}
          buttonColor={"white"}
          btnHover={"white"}
          btnColorHover={"green"}
          logoutBg={"none"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
        />
      </Box>
      <HomeHero />
      <Box className="cc-container page_alignment" mb={"60px"}>
        <Box mb={"20px"} hideFrom={"lg"}>
          <h4 className="Xlarge-text text-green">Categories</h4>
          <Box h={"3px"} w={"90px"} bg={"#175616"} />
        </Box>
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: "20px", lg: "50px" }}
        >
          {(randomTags.length ? randomTags : initialRandomTag).map(
            (each, index) => (
              <RandomTags key={index} tagsId={each} />
            )
          )}
        </SimpleGrid>
      </Box>
      <Box
        className="skeleton"
        mb={"60px"}
        hideBelow={"md"}
        h={{ lg: "37.44rem", md: "30rem" }}
      >
        <Fader />
      </Box>

      <Box mb={"60px"}>
        <Flex justify={"center"} mb={"20px"}>
          <Box
            hideFrom={"lg"}
            borderBottom={"2px solid #175616"}
            width={"min-content"}
          >
            <h4 className="Xlarge-text text-green">Topics</h4>
          </Box>
        </Flex>
        {status === "pending" && (
          <Flex justify={"center"}>
            <TriangleLoader />
          </Flex>
        )}
        {status === "failed" && <p>{error}</p>}
        {status === "success" &&
          (homeTagsBlog.length ? (
            <Flex direction={"column"} gap={"20px"}>
              {homeTagsBlog.map((each, index) => (
                <HomeTagsBlog key={each} id={each} index={index} />
              ))}
            </Flex>
          ) : (
            <Flex justify={"center"}>
              <h3 className="fw-bold">No Topics</h3>
            </Flex>
          ))}
      </Box>
      <Flex justify={"center"} mb={"100px"}>
        <Pagination
          currentPage={homePage}
          totalPages={totalPages}
          route={"/tags"}
          initial={"/"}
        />
      </Flex>
      <Footer />
    </Box>
  );
};

export default Home;
