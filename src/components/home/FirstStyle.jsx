/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const FirstStyle = ({ data, index, length }) => {
  return (
    <Flex
      gap="10px"
      borderRight={{
        base: "",
        md: index % 2 === 0 ? "1px solid rgb(0,0,0,0.2)" : "",
        lg: (index + 1) % 4 === 0 ? "" : "1px solid rgb(0,0,0,0.2)",
      }}
      borderBottom={{
        base: length - 1 === index ? "" : "1px solid rgb(0,0,0,0.2)",
        md: "none",
      }}
      pr={{
        base: 0,
        md: index % 2 === 0 ? "40px" : 0,
        lg: (index + 1) % 4 === 0 ? 0 : "40px",
      }}
      pl={{
        base: 0,
        md: index % 2 === 0 ? 0 : "40px",
        lg: index % 4 === 0 ? 0 : "40px",
      }}
      pt={{
        base: index === 0 ? "" : "20px",
        md: 0,
      }}
      pb={{
        base: length - 1 === index ? "" : "20px",
        md: 0,
      }}
    >
      <Box width="100px" h="120px" className="skeleton">
        <Image width="100%" h="100%" objectFit="cover" src={data?.images[0]} />
      </Box>
      <Box flex="1">
        <Link
          to={`/${data?.slug}`}
        >
          <Text className="text-green-light-4-hover">
            {data?.title?.length > 40
              ? `${data?.title?.slice(0, 37).trim()}...`
              : data?.title}
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default FirstStyle;
