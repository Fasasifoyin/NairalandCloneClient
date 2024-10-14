/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Hero from "../components/profile/Hero";
import Personal from "../components/profile/Personal";

import { useDispatch, useSelector } from "react-redux";
import { profile } from "../app/actions/User";
import {
  ProfileDetails,
  ProfileError,
  ProfileStatus,
  setEmpty,
  setSearchEmpty,
} from "../app/slice/ProfileSlice";
import { UserDetails } from "../app/slice/UserSlice";
import Address from "../components/profile/Address";
import Actions from "../components/profile/Actions";
import UserBlogs from "../components/profile/UserBlogs";

const Profile = () => {
  const { userName } = useParams();
  const user = useSelector(UserDetails);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const userProfile = useSelector(ProfileDetails);
  const error = useSelector(ProfileError);
  const status = useSelector(ProfileStatus);

  useEffect(() => {
    dispatch(profile({ userName, page }));
  }, [dispatch, userName, page]);

  useEffect(() => {
    // This effect runs only when the component unmounts or userName changes
    return () => {
      dispatch(setEmpty([]));
      dispatch(setSearchEmpty());
      setPage(1);
    };
  }, [userName]);

  return (
    <Box>
      {userProfile?.userName && (
        <Box>
          <Hero userProfile={userProfile} user={user} />
          {userProfile.allBlogs.length > 0 ? (
            <UserBlogs
              userProfile={userProfile}
              user={user}
              page={page}
              setPage={setPage}
              status={status}
            />
          ) : (
            <Text mt={"100px"} className="fw-bold" textAlign={"center"}>
              {userProfile.userName === user.userName
                ? "You have"
                : `${userProfile.userName} has`}{" "}
              no blog
            </Text>
          )}
        </Box>
      )}
      {status === "pending" && (
        <Text mt={userProfile.userName ? "10px" : "30px"} textAlign={"center"}>
          Loading...
        </Text>
      )}
      {status === "failed" && (
        <Text mt={userProfile.userName ? "10px" : "30px"} textAlign={"center"}>
          {error}
        </Text>
      )}
    </Box>

    // <Box>
    //   {profileStatus === "pending" && (
    //     <Flex h={"100vh"} justify={"center"} align={"center"}>
    //       <TriangleLoader />
    //     </Flex>
    //   )}
    //   {profileStatus === "failed" && (
    //     <Box paddingTop={"calc(4.644rem + 60px)"}>
    //       <Box className="cc-container page_alignment">
    //         <h4 className="medium-text">{profileError}</h4>
    //       </Box>
    //     </Box>
    //   )}
    //   {profileStatus === "success" && (
    //     <Box>
    //       <Box className="cc-container page_alignment">
    //         <Personal userProfile={userProfile} user={user} />
    //         <Address userProfile={userProfile} user={user} />
    //         {userProfile.userName === user.userName && (
    //           <Actions userProfile={userProfile} />
    //         )}
    //         {userProfile?.allBlogs?.length ? (
    //           <Blogs userProfile={userProfile} user={user} />
    //         ) : (
    //           <Box>
    //             <h5 className="large-text fw-bold">Blogs Posted</h5>

    //             <h5 className="medium-text">
    //               You have no blog on our website. To create your own blog{" "}
    //               <Link to={"/blog/create"}>
    //                 <span className="medium-text text-green text-green-light-5-hover">
    //                   click here
    //                 </span>
    //               </Link>
    //             </h5>
    //           </Box>
    //         )}
    //       </Box>
    //     </Box>
    //   )}
    //   <Box mt={"100px"}>
    //     <Footer />
    //   </Box>
    // </Box>
  );
};

export default Profile;
