import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Pagination from "../components/layouts/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { getTagBlogs } from "../app/actions/Blogs";
import {
  Status,
  TotalPages,
  allRelatedTagsId,
  Error,
} from "../app/slice/RelatedTags";
import TagsDesign from "../components/tags/TagsDesign";

const Tags = () => {
  const { tagName, page } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(allRelatedTagsId);
  const status = useSelector(Status);
  const totalPages = useSelector(TotalPages);
  const error = useSelector(Error);

  useEffect(() => {
    dispatch(getTagBlogs({ tags: tagName, page: page || 1 }));
  }, [dispatch, tagName, page]);

  useEffect(() => {
    if (Number(page) === 1) {
      navigate(`/tag/${tagName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, page]);

  return (
    <Box mt={"30px"} className="cc-container page-alignment">
      {status === "pending" && <Text>Loading...</Text>}
      {status === "failed" && <Text textAlign={"center"}>{error}</Text>}
      {status === "success" &&
        (blogs.length > 0 ? (
          <Box>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justifyContent={"space-between"}
              gap={{ base: "20px", lg: 0 }}
            >
              <Box width={{ base: "100%", lg: "60%" }}>
                <TagsDesign id={blogs[0]} designType={1} />
              </Box>
              {blogs.length > 1 && (
                <Flex
                  width={{ base: "100%", lg: "35%" }}
                  direction={"column"}
                  rowGap={{ base: "20px", lg: "5%" }}
                >
                  {blogs.slice(1, 4).map((each) => (
                    <TagsDesign key={each} id={each} designType={2} />
                  ))}
                </Flex>
              )}
            </Flex>
            {blogs.length > 4 && (
              <SimpleGrid
                mt={"70px"}
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={5}
              >
                {blogs.slice(4, blogs.length).map((each) => (
                  <TagsDesign key={each} id={each} />
                ))}
              </SimpleGrid>
            )}

            <Flex justify={"center"} mt={"20px"}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                route={`/tag/${tagName}`}
              />
            </Flex>
          </Box>
        ) : (
          <Text className="fw-bold" textAlign={"center"}>
            No Blog
          </Text>
        ))}
    </Box>
  );
};

export default Tags;
