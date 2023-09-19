/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { convertImageToBase64 } from "../../utils/Convert";
import ProfileImage from "./ProfileImage";
import HeroButtons from "./HeroButtons";

const Hero = ({ userProfile, user }) => {
  const [file, setFile] = useState("");
  console.log(file);

  const onUpload = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setFile("");
  };

  return (
    <Box>
      <Box
        mb={"30px"}
        hideFrom={"lg"}
        bg={
          "linear-gradient( 45deg, hsl(119deg 59% 21%) 0%,hsl(107deg 42% 28%) 40%,hsl(99deg 31% 35%) 76%,hsl(92deg 24% 43%) 91%,hsl(86deg 19% 51%) 97%, hsl(81deg 19% 59%) 99%,hsl(76deg 20% 67%) 100%,hsl(70deg 22% 76%) 101%,hsl(65deg 24% 85%) 100%,hsl(60deg 36% 95%) 100%)"
        }
        className="cc-container page_alignment"
      >
        <Box padding={"5.5rem 0px 2.5rem 0px"}>
          <Flex direction={"column"} gap={"10px"}>
            <Flex direction={"column"} align={"center"}>
              <ProfileImage
                file={file}
                onUpload={onUpload}
                userProfile={userProfile}
                onSubmit={onSubmit}
                user={user}
              />
              {user.userName === userProfile.userName && (
                <HeroButtons
                  file={file}
                  userName={userProfile.userName}
                  setFile={setFile}
                  image={userProfile.image}
                />
              )}
            </Flex>

            <Box>
              <h1 style={{ textAlign: "center" }} className="text-white">
                {userProfile.lastName} {userProfile.firstName}
              </h1>
              <h4
                style={{ textAlign: "center" }}
                className="text-white medium-text"
              >
                {userProfile.userName}
              </h4>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box mb={"60px"} hideBelow={"lg"} paddingTop={"calc(4.644rem + 60px)"}>
        <Box className="cc-container page_alignment">
          <Flex
            className="bg-cream"
            padding={"20px"}
            gap={"25px"}
            align={"center"}
          >
            <ProfileImage
              file={file}
              onUpload={onUpload}
              userProfile={userProfile}
              user={user}
              onSubmit={onSubmit}
            />
            <Box>
              <h3 className="text-black">
                {userProfile.lastName} {userProfile.firstName}
              </h3>
              <h4 className="text-black medium-text">{userProfile.userName}</h4>
              {user.userName === userProfile.userName && (
                <HeroButtons
                  file={file}
                  userName={userProfile.userName}
                  setFile={setFile}
                  image={userProfile.image}
                />
              )}{" "}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
