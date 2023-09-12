/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { tagsBlogId } from "../../app/slice/home/HomeBlogSlice";
import { Link } from "react-router-dom";

const HomeTagsBlog = ({ id, index }) => {
  const tag = useSelector((state) => tagsBlogId(state, id));

  return (
    <Box bg={index % 2 === 0 ? "#F6F6EC" : "white"} py={"20px"}>
      <Box className="cc-container page_alignment">
        <Flex
          direction={"column"}
          align={"center"}
          width={"90%"}
          margin={"auto"}
        >
          <h3 className="fw-bold">{tag.tag}</h3>
          {tag.related.length ? (
            <>
              <h4 className="large-text" style={{ textAlign: "center" }}>
                {tag.related[0]?.body.slice(0, 250).trim()}...
              </h4>
              <p style={{ marginBottom: "20px" }}>
                -{tag.related[0]?.author.firstName}{" "}
                {tag.related[0]?.author.lastName}
              </p>
              <Link to={`/${tag.related[0]?.slug}`}>
                <Button
                  className="bg-hover-green"
                  bg={"black"}
                  color={"white"}
                  borderRadius={"5px"}
                >
                  <h5 className="medium-text">READ MORE</h5>
                </Button>
              </Link>
            </>
          ) : (
            <h4 className="large-text">No available blog on this tag</h4>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default HomeTagsBlog;
