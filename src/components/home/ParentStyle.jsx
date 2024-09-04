/* eslint-disable react/prop-types */
import { Box, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import Head from "./Head";
import FirstStyle from "./FirstStyle";
import Button from "./Button";
import { tagRequest } from "../../utils/Data";
import SecondStyle from "./SecondStyle";

const ParentStyle = ({ ind, blog, status, style, number }) => {
  const dummyArray = new Array(number).fill(null);
  const mappedArray = status === "success" ? blog[ind]?.blogs : dummyArray;

  return (
    <Box>
      <Head head={tagRequest[ind].tag} />
      {status === "idle" ||
      status === "pending" ||
      (status === "success" && blog[ind]?.blogs?.length > 0) ? (
        style === "first" ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            mt={"30px"}
            rowGap={{ md: "40px" }}
          >
            {mappedArray?.map((each, index) => (
              <FirstStyle
                key={index}
                data={each}
                index={index}
                length={blog[ind]?.blogs?.length}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Grid
            mt={"30px"}
            templateRows={{ lg: "repeat(3, 1fr)" }}
            templateColumns={{ lg: "repeat(6, 1fr)" }}
            // alignItems={"flex-start"}
          >
            {mappedArray?.map((each, index) => (
              <SecondStyle
                key={index}
                data={each}
                index={index}
                length={blog[ind]?.blogs?.length}
              />
            ))}
          </Grid>
        )
      ) : (
        <Text mt={"15px"}>No news</Text>
      )}
      {status === "success" && blog[ind]?.blogs?.length > 0 && (
        <Button buttonText={"See more"} to={`/tag/${tagRequest[ind].tag}`} />
      )}
    </Box>
  );
};

export default ParentStyle;
