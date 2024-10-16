/* eslint-disable react/prop-types */
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import ProfileImage from "./ProfileImage";
import ConfirmationModal from "../layouts/ConfirmationModal";

const Hero = ({ userProfile, user }) => {
  const checkSize = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      bg={{
        base: "linear-gradient( 45deg, hsl(119deg 59% 21%) 0%,hsl(107deg 42% 28%) 40%,hsl(99deg 31% 35%) 76%,hsl(92deg 24% 43%) 91%,hsl(86deg 19% 51%) 97%, hsl(81deg 19% 59%) 99%,hsl(76deg 20% 67%) 100%,hsl(70deg 22% 76%) 101%,hsl(65deg 24% 85%) 100%,hsl(60deg 36% 95%) 100%)",
        md: "none",
      }}
      className="cc-container page-alignment"
      mt={{ base: 0, md: "30px" }}
    >
      <Box
        py={"20px"}
        px={{ base: 0, md: "20px" }}
        className={checkSize ? "bg-green-light-9" : ""}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "start" }}
          gap={{
            base: "15px",
            md: "25px",
          }}
        >
          <ProfileImage userProfile={userProfile} user={user} />
          <Flex
            direction={"column"}
            align={{ base: "center", md: "start" }}
            mt={{ md: "10px" }}
          >
            <Text
              className="medium-text"
              color={{ base: "white", md: "black" }}
            >
              {userProfile.lastName} {userProfile.firstName}
            </Text>
            <Text
              className="fw-bold"
              color={{ base: "rgb(255,255,255,0.3)", md: "rgb(0,0,0,0.3)" }}
            >
              @{userProfile.userName}
            </Text>
            {userProfile.occupation && (
              <Text color={{ base: "white", md: "black" }} mt={"10px"}>
                {userProfile.occupation}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
