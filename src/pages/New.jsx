import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import Slider from "../components/new/Slider";
import GridLayout from "../components/new/GridLayout";
import Pagination from "../components/layouts/Pagination";
import Footer from "../components/layouts/Footer";

import { useSelector, useDispatch } from "react-redux";
import {
  Error,
  Status,
  Total,
  allNewBlogId,
} from "../app/slice/new/NewPageSlice";
import { getNewPageBlogs } from "../app/actions/Blogs";
import TriangleLoader from "../components/loaders/TriangleLoader";

const New = () => {
  const { newpage } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const newBlogs = useSelector(allNewBlogId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const totalPages = useSelector(Total);

  useEffect(() => {
    dispatch(getNewPageBlogs(newpage || 1));
  }, [dispatch, newpage]);

  useEffect(() => {
    if (location.pathname === "/new/1") {
      navigate("/new");
    }
  }, [location, navigate]);

  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Box pos={"absolute"} top={0} left={0} width={"100%"}>
        <Navbar
          logo
          text={"white"}
          activeText={"white"}
          hover={"#175616"}
          buttonBg={"#175616"}
          buttonColor={"white"}
          logoutBg={"white"}
          logoutColor={"#175616"}
          currentLoc="New"
        />
      </Box>
      <Slider />
      <Box className="cc-container page_alignment" mb={"60px"} pt={"5rem"}>
        <Flex hideFrom={"lg"} justify={"center"} mb={"20px"}>
          <Flex direction={"column"} align={"center"}>
            <h4 className="Xlarge-text text-green">New</h4>
            <Box h={"2px"} width={"80%"} bg={"#175616"} />
          </Flex>
        </Flex>
        {status === "pending" && (
                    <Flex justify={"center"}>
                    <TriangleLoader />
                  </Flex>
        )}
        {status === "failed" && <p>{error}</p>}
        {status === "success" &&
          (newBlogs.length ? (
            <Box className="grid">
              {newBlogs.map((each, index) => (
                <GridLayout key={each} index={index} each={each} />
              ))}
            </Box>
          ) : (
            <Flex justify={"center"}>
              <h3 className="fw-bold">No Blog</h3>
            </Flex>
          ))}
      </Box>
      <Flex justify={"center"} mb={"100px"}>
        <Pagination
          currentPage={newpage}
          totalPages={totalPages}
          route={"/new"}
        />
      </Flex>
      <Footer />
    </Box>
  );
};

export default New;
