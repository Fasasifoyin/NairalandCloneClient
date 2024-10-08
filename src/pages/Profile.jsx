import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import TriangleLoader from "../components/loaders/TriangleLoader";
import Hero from "../components/profile/Hero";
import Personal from "../components/profile/Personal";
import Footer from "../components/layouts/Footer";

import { useDispatch, useSelector } from "react-redux";
import { profile } from "../app/actions/User";
import {
  ProfileDetails,
  ProfileError,
  ProfileStatus,
} from "../app/slice/ProfileSlice";
import { UserDetails } from "../app/slice/UserSlice";
import Address from "../components/profile/Address";
import Actions from "../components/profile/Actions";
import Blogs from "../components/profile/Blogs";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(UserDetails);

  const userProfile = useSelector(ProfileDetails);
  const profileError = useSelector(ProfileError);
  const profileStatus = useSelector(ProfileStatus);

  useEffect(() => {
    dispatch(profile(userName));
  }, [dispatch, userName]);

  return (
    <Box>
      {/* <Box pos={"absolute"} top={0} left={0} width={"100%"}>
        <Navbar
          text={"black"}
          activeText={"white"}
          hover={"#175616"}
          logoutBg={"white"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
          currentLoc={`/profile/${userName}`}
          baseLogoColor={profileStatus === "success" ? "white" : "#175616"}
        />
      </Box> */}
      {profileStatus === "pending" && (
        <Flex h={"100vh"} justify={"center"} align={"center"}>
          <TriangleLoader />
        </Flex>
      )}
      {profileStatus === "failed" && (
        <Box paddingTop={"calc(4.644rem + 60px)"}>
          <Box className="cc-container page_alignment">
            <h4 className="medium-text">{profileError}</h4>
          </Box>
        </Box>
      )}
      {profileStatus === "success" && (
        <Box>
          <Hero userProfile={userProfile} user={user} />
          <Box className="cc-container page_alignment">
            <Personal userProfile={userProfile} user={user} />
            <Address userProfile={userProfile} user={user} />
            {userProfile.userName === user.userName && (
              <Actions userProfile={userProfile} />
            )}
            {userProfile?.allBlogs?.length ? (
              <Blogs userProfile={userProfile} user={user} />
            ) : (
              <Box>
                <h5 className="large-text fw-bold">Blogs Posted</h5>

                <h5 className="medium-text">
                  You have no blog on our website. To create your own blog{" "}
                  <Link to={"/blog/create"}>
                    <span className="medium-text text-green text-green-light-5-hover">
                      click here
                    </span>
                  </Link>
                </h5>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box mt={"100px"}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Profile;
