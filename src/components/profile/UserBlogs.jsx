/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import {
  ProfileBlogs,
  Search,
  SearchError,
  SearchStatus,
  SearchTotalPages,
  setSearchEmpty,
  TotalPages,
} from "../../app/slice/ProfileSlice";
import Blogs from "./Blogs";
import { profileSearchedBlogs } from "../../app/actions/User";

const UserBlogs = ({ userProfile, user, page, setPage, status }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");  
  const [searchPage, setSearchPage] = useState(1);

  const userBlogs = useSelector(ProfileBlogs);
  const totalPages = useSelector(TotalPages);

  const searchedBlogs = useSelector(Search);
  const searchStatus = useSelector(SearchStatus);
  const searchError = useSelector(SearchError);
  const searchTotalPages = useSelector(SearchTotalPages);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(
        profileSearchedBlogs({
          search,
          page: 1,
          userName: userProfile.userName,
        })
      );
    } else {
      return;
    }
  };

  const handleSeeMoreSearch = () => {
    setSearchPage((prev) => prev + 1);
    dispatch(
      profileSearchedBlogs({
        search,
        page: searchPage + 1,
        userName: userProfile.userName,
      })
    );
  };

  useEffect(() => {
    if (!search) {
      dispatch(setSearchEmpty());
    }
  }, [dispatch, search]);

  return (
    <Box className="cc-container page-alignment" mt={"100px"}>
      <Box pos={"relative"} w={"100%"} maxW={"400px"}>
        <form onSubmit={handleSubmit}>
          <Input
            fontWeight={"bold"}
            placeholder="Search and enter"
            focusBorderColor="#175616"
            h={"45px"}
            borderRadius={"5px"}
            value={search}
            onChange={handleChange}
            paddingRight={"47px"}
          />
        </form>
        <Flex
          position={"absolute"}
          top={"0"}
          right={0}
          width={"45px"}
          h={"45px"}
          borderRightRadius={"5px"}
          className="bg-green cursor"
          zIndex={"50"}
          align={"center"}
          justifyContent={"center"}
          onClick={handleSubmit}
        >
          <Icon as={GoSearch} boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      {searchedBlogs.length === 0 &&
      searchStatus !== "success" &&
      searchStatus !== "pending" &&
      searchStatus !== "failed" ? (
        <Box mt={"40px"}>
          <Blogs blogs={userBlogs} userProfile={userProfile} user={user} />
          {totalPages > page && status === "success" && (
            <Button
              size={"xs"}
              mt={"10px"}
              bg={"green"}
              color={"white"}
              borderRadius={"3px"}
              onClick={() => setPage((prev) => prev + 1)}
            >
              See more
            </Button>
          )}
        </Box>
      ) : (
        <Box mt={"40px"}>
          {searchedBlogs.length > 0 ? (
            <Box>
              <Blogs
                blogs={searchedBlogs}
                userProfile={userProfile}
                user={user}
              />
              {searchTotalPages > searchPage && searchStatus === "success" && (
                <Button
                  size={"xs"}
                  mt={"10px"}
                  bg={"green"}
                  color={"white"}
                  borderRadius={"3px"}
                  onClick={handleSeeMoreSearch}
                >
                  See more
                </Button>
              )}
            </Box>
          ) : (
            searchStatus === "success" && (
                <Text textAlign={"center"}>
                {" "}
                {userProfile.userName === user.userName
                  ? "You have"
                  : `${userProfile.userName} has`}{" "}
                no blog with "{search}"
              </Text>
            )
          
          )}
          {searchStatus === "pending" && (
            <Text
              mt={searchedBlogs.length > 0 ? "10px" : "0px"}
              textAlign={"center"}
            >
              Finding {searchedBlogs.length > 0 && "more"} search
            </Text>
          )}
          {searchStatus === "failed" && (
            <Text
              textAlign={"center"}
              mt={searchedBlogs.length > 0 ? "10px" : "0px"}
            >
              {searchError}
            </Text>
          )}
        </Box>
      )}

      {/* {!search ? (
        <Text>ss</Text>
      ) : (
        <Text>ggs</Text>
      )} */}

      {/* {search &&
        searchStatus === "success" &&
        (searchedBlogs.length > 0 ? (
          <Box mt={"40px"}>
            <Blogs
              blogs={searchedBlogs}
              userProfile={userProfile}
              user={user}
            />
            {searchTotalPages > searchPage && searchStatus === "success" && (
              <Button
                size={"xs"}
                mt={"10px"}
                bg={"green"}
                color={"white"}
                borderRadius={"3px"}
                onClick={handleSeeMoreSearch}
                //   onClick={() => setPage((prev) => prev + 1)}
              >
                See more
              </Button>
            )}
          </Box>
        ) : (
          <Text mt={"40px"} textAlign={"center"} className="fw-bold">
            {userProfile.userName === user.userName
              ? "You have"
              : `${userProfile.userName} has`}{" "}
            no blog with "{search}"
          </Text>
        ))} */}

      {/* {search && searchStatus === "pending" && (
        <Text
          mt={searchedBlogs.length > 0 ? "10px" : "40px"}
          textAlign={"center"}
        >
          Finding search
        </Text>
      )} */}

      {/* {search && searchStatus === "failed" && (
        <Text
          mt={searchedBlogs.length > 0 ? "10px" : "40px"}
          textAlign={"center"}
        >
          {searchError}
        </Text>
      )} */}

      {/* {search ? (
        searchedBlog.length > 0 ? (
          <Box mt={"40px"}>
            <Blogs blogs={searchedBlog} userProfile={userProfile} user={user} />
          </Box>
        ) : (
          <Text mt={"40px"} textAlign={"center"} className="fw-bold">
            {userProfile.userName === user.userName
              ? "You have"
              : `${userProfile.userName} has`}{" "}
            no blog with "{search}"
          </Text>
        )
      ) : userBlogs.length > 0 ? (
        <Box mt={"40px"}>
          <Blogs blogs={userBlogs} userProfile={userProfile} user={user} />
          {totalPages > page && status === "success" && (
            <Button
              size={"xs"}
              mt={"10px"}
              bg={"green"}
              color={"white"}
              borderRadius={"3px"}
              onClick={() => setPage((prev) => prev + 1)}
            >
              See more
            </Button>
          )}
        </Box>
      ) : (
        <Text textAlign={"center"} className="fw-bold">
          {userProfile.userName === user.userName
            ? "You"
            : userProfile.userName}{" "}
          have no blogs
        </Text>
      )} */}

      {/*
      {search && blogsOrSearchBlogs.length === 0 && (
        <Text mt={"100px"} textAlign={"center"} className="fw-bold">
          {" "}
          {userProfile.userName === user.userName
            ? "You have"
            : `${userProfile.userName} has`}{" "}
          no blog with "{search}"
        </Text>
      )}
      {!search && blogsOrSearchBlogs.length === 0 && (
        <Text mt={"100px"} textAlign={"center"} className="fw-bold">
          {userProfile.userName === user.userName
            ? "You"
            : userProfile.userName}{" "}
          have no blogs
        </Text>
      )}
      {blogsOrSearchBlogs.length > 0 && (
        <Box>
          <Blogs
            blogs={blogsOrSearchBlogs}
            userProfile={userProfile}
            user={user}
          />
          {totalPages > page && status === "success" && (
            <Button
              size={"xs"}
              mt={"10px"}
              bg={"green"}
              color={"white"}
              borderRadius={"3px"}
              onClick={() => setPage((prev) => prev + 1)}
            >
              See more
            </Button>
          )}
        </Box>
      )} */}
    </Box>
  );
};

export default UserBlogs;
