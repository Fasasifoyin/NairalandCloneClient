import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { profile } from "../app/actions/User";
import {
  ProfileDetails,
  ProfileError,
  ProfileStatus,
} from "../app/slice/ProfileSlice";
import Hero from "../components/profile/Hero";
import TriangleLoader from "../components/loaders/TriangleLoader";
import { UserDetails } from "../app/slice/UserSlice";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(UserDetails);

  const userProfile = useSelector(ProfileDetails);
  const profileError = useSelector(ProfileError);
  const profileStatus = useSelector(ProfileStatus);
  console.log(userProfile);

  useEffect(() => {
    dispatch(profile(userName));
  }, [dispatch, userName]);

  return (
    <Box>
      <Box pos={"absolute"} top={0} left={0} width={"100%"}>
        <Navbar
          text={"black"}
          activeText={"white"}
          hover={"#175616"}
          logoutBg={"white"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
          currentLoc={`/profile/${userName}`}
          baseLogoColor={profileStatus === "pending" ? "#175616" : "white"}
        />
      </Box>
      {profileStatus === "pending" && (
        <Flex h={"100vh"} justify={"center"} align={"center"}>
          <TriangleLoader />
        </Flex>
      )}
      {profileStatus === "failed" && (
        <Box hideBelow={"lg"} paddingTop={"calc(4.644rem + 60px)"}>
          <Box className="cc-container page_alignment">
            <h4 className="medium-text">{profileError}</h4>
          </Box>
        </Box>
      )}
      {profileStatus === "success" && (
        <Box>
          <Hero userProfile={userProfile} user={user} />
          <Box className="cc-container page_alignment">dhdhdfh</Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
