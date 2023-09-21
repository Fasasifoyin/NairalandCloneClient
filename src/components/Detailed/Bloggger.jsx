/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Bloggger = ({ user }) => {
  return (
    <Box mb={"30px"}>
      <Box border={"1px solid #175616"} mb={"15px"} />
      <Flex w={"100%"} justify={"space-between"}>
        <Box
          borderRadius={"50%"}
          w={{ base: "120px", md: "180px", lg: "225px" }}
          h={{ base: "120px", md: "180px", lg: "225px" }}
        >
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
            src={
              user?.image ||
              "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
            }
            alt={user?.firstName || "unknown"}
          />
        </Box>

        {user?.firstName ? (
          <Box
            w={{
              base: "calc(95% - 120px)",
              md: "calc(95% - 180px)",
              lg: "calc(95% - 225px)",
            }}
          >
            <Link to={`/profile/${user.userName}`}>
              <Box>
                <h4 className="medium-text">
                  {user.firstName} {user.lastName}
                </h4>
              </Box>
            </Link>
            <Box mb={"30px"}>
              <h6 className="small-text">
                {user.occupation ? user.occupation : "No occupation"}
              </h6>
            </Box>
            <Box mb={"20px"}>
              <p>
                {user.about
                  ? user.about.length > 200
                    ? `${user.about.slice(0, 197).trim()}...`
                    : user.about
                  : "No about"}
              </p>
            </Box>
            <Link to={`/profile/${user.userName}`}>
              <Box>
                <Button
                  size={"sm"}
                  className="bg-green text-white bg-green-light-5-hover"
                >
                  Read more about {user.firstName}
                </Button>
              </Box>
            </Link>
          </Box>
        ) : (
          <Box
            w={{
              base: "calc(95% - 120px)",
              md: "calc(95% - 180px)",
              lg: "calc(95% - 225px)",
            }}
          >
            <h4 className="medium-text fw-bold">Unknown Author</h4>
          </Box>
        )}
      </Flex>
      <Box border={"1px solid #175616"} mt={"15px"} />
    </Box>
  );
};

export default Bloggger;
