/* eslint-disable react/prop-types */
import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SecondStyle = ({ data, index, length }) => {
  return (
    <>
      {index === 0 && (
        <GridItem
          colSpan={2}
          rowSpan={3}
          pr={{ lg: "40px" }}
          borderRight={{ lg: "1px solid rgb(0,0,0,0.2)" }}
          borderBottom={{ base: "1px solid rgb(0,0,0,0.2)", lg: "none" }}
          pb={{ base: "20px", lg: 0 }}
          //   pt={{ lg: "40px" }}
        >
          <Box width={"100%"} h={"280px"} className="skeleton">
            <Image
              width="100%"
              h="100%"
              objectFit="cover"
              src={data?.images[0]}
              alt={data?.title}
            />
          </Box>
          <Link
            to={`/${data?.slug}`}
          >
            <Text
              mt={"10px"}
              className="medium-text fw-bold text-green-light-4-hover"
            >
              {data?.title}
            </Text>
          </Link>
        </GridItem>
      )}
      {index !== 0 && (
        <GridItem
          //   alignSelf={{
          //     lg:
          //       index === length - 1 || index === length - 2
          //         ? "start"
          //         : index === 1 || index === 2
          //         ? "end"
          //         : "",
          //   }}
          py={0}
          colSpan={2}
          pl={{ lg: "40px" }}
          pr={{ lg: "40px" }}
          borderRight={{
            lg: index % 2 === 0 ? "none" : "1px solid rgb(0,0,0,0.2)",
          }}
        >
          <Flex
            gap={"10px"}
            // pt={{ base: "20px", lg: index === 1 || index === 2 ? 0 : "40px" }}
            pt={{ base: "20px", lg: "40px" }}
            pb={{
              base: "20px",
              lg: "40px",
            }}
            // pb={{
            //   base: "20px",
            //   lg: index === length - 1 || index === length - 2 ? 0 : "40px",
            // }}
            borderBottom={{
              base: "1px solid rgb(0,0,0,0.5)",
              lg:
                index === length - 1 || index === length - 2
                  ? "none"
                  : "1px solid rgb(0,0,0,0.2)",
            }}
          >
            <Box width={"100px"} h={"120px"} className="skeleton">
              <Image
                width="100%"
                h="100%"
                objectFit="cover"
                src={data?.images[0]}
                alt={data?.title}
              />
            </Box>
            <Box flex={"1"}>
              <Link
                to={`/${data?.slug}`}
              >
                <Text className="text-green-light-4-hover">
                  {data?.title?.length > 55
                    ? `${data?.title?.slice(0, 52).trim()}...`
                    : data?.title}
                </Text>
              </Link>
            </Box>
          </Flex>
        </GridItem>
      )}
    </>
  );
};

export default SecondStyle;
