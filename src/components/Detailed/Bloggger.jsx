/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Bloggger = ({ blogger, userName }) => {
  return (
    <Box mt={"20px"}>
      <Box border={"1px solid #175616"} mb={"15px"} />
      <Text className="fw-bold" mb={"20px"}>
        BLOGGER
      </Text>
      <Flex gap={"20px"}>
        <Box width={"100px"} h={"100px"} borderRadius={"50%"}>
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
            src={
              blogger?.image ||
              "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
            }
            alt={blogger?.firstName || "unknown"}
          />
        </Box>
        <Box flex={1}>
          {blogger?.firstName ? (
            <>
              <Text className="fw-bold">
                {userName === blogger?.userName
                  ? "You"
                  : `${blogger.firstName} ${blogger.lastName}`}
              </Text>
              <Text className="tiny-text">
                {blogger?.occupation ? blogger?.occupation : "No occupation"}
              </Text>
              <Text mt={"10px"}>
                {blogger?.about
                  ? blogger?.about?.length > 200
                    ? `${blogger?.about.slice(0, 197).trim()}...`
                    : blogger?.about
                  : "No about"}
              </Text>
              <Link to={`/profile/${blogger?.userName}`}>
                {blogger?.userName !== userName && (
                  <Text
                    color={"blue"}
                    _hover={{
                      color: "blue.400",
                    }}
                    className="small-text"
                    mt={"5px"}
                  >
                    Read more about {blogger?.firstName}
                  </Text>
                )}
              </Link>
            </>
          ) : (
            <Text className="fw-bold">Unknown Author</Text>
          )}
        </Box>
      </Flex>
      <Box border={"1px solid #175616"} mt={"15px"} />
    </Box>
  );
};

export default Bloggger;
