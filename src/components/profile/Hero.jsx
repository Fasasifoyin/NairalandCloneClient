/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { convertImageToBase64 } from "../../utils/Convert";
import ProfileImage from "./ProfileImage";
import HeroButtons from "./HeroButtons";
import { updatePhoto } from "../../app/actions/User";
import { useDispatch } from "react-redux";

const Hero = ({ userProfile, user }) => {
  const [file, setFile] = useState("");
  const [button, setButton] = useState(1);
  const dispatch = useDispatch();

  const onUpload = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (button === 1) {
      e.target.reset();
      dispatch(updatePhoto({ file, userName: userProfile.userName, setFile }));
    } else {
      e.target.reset();
      setFile("");
    }
  };

  return (
    <Box
      bg={{
        base: "linear-gradient( 45deg, hsl(119deg 59% 21%) 0%,hsl(107deg 42% 28%) 40%,hsl(99deg 31% 35%) 76%,hsl(92deg 24% 43%) 91%,hsl(86deg 19% 51%) 97%, hsl(81deg 19% 59%) 99%,hsl(76deg 20% 67%) 100%,hsl(70deg 22% 76%) 101%,hsl(65deg 24% 85%) 100%,hsl(60deg 36% 95%) 100%)",
        lg: "none",
      }}
      className="cc-container page_alignment"
    >
      <Box
        paddingTop={{
          lg: "calc(4.644rem + 60px)",
        }}
      >
        <Flex
          bg={{ base: "none", lg: "#f6f6ec" }}
          padding={{ base: "5.5rem 0px 2.5rem 0px", lg: "25px" }}
          direction={{ base: "column", lg: "row" }}
          align={"center"}
          gap={{
            base:
              !file &&
              userProfile.image ===
                "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
                ? 0
                : "20px",
            lg: "25px",
          }}
        >
          <ProfileImage
            file={file}
            onUpload={onUpload}
            userProfile={userProfile}
            onSubmit={onSubmit}
            user={user}
          />
          <Flex
            gap={{ lg: "40px" }}
            direction={{ base: "column-reverse", lg: "column" }}
          >
            <Box hideFrom={"lg"}>
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
            <Box hideBelow={"lg"}>
              <h3 className="text-black">
                {userProfile.lastName} {userProfile.firstName}
              </h3>
              <h4 className="text-black medium-text">{userProfile.userName}</h4>
            </Box>
            <Box>
              {user.userName === userProfile.userName && (
                <HeroButtons
                  file={file}
                  userName={userProfile.userName}
                  setFile={setFile}
                  image={userProfile.image}
                  setButton={setButton}
                />
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
