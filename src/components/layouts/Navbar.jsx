/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box, Flex, Icon, Input, Text, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import NavButtons from "./NavButtons";
import { RiMenu5Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { TbLetterXSmall } from "react-icons/tb";
import Sidebar from "./Sidebar";
import jwtDecode from "jwt-decode";
import { pages, tagsList } from "../../utils/Data";

import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, UserDetails } from "../../app/slice/UserSlice";
import { setEmpty } from "../../app/slice/Detailed/CommentSlice";

const Navbar = ({ elementRef }) => {
  const user = useSelector(UserDetails);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("searchQuery") || "";
  const [search, setSearch] = useState(searchQuery);
  const [showSearch, setShowSearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      const newSearchParams = new URLSearchParams({
        searchQuery: search,
        page: 1,
      });
      navigate(`/blog/search?${newSearchParams.toString()}`);
    } else {
      return;
    }
  };

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const loggingOut = () => {
    dispatch(LOGOUT());
    dispatch(setEmpty([]));
    navigate("/");
  };

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  };

  const checkTokenExpiration = () => {
    const token = user?.token;
    if (!token) {
      return;
    }
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      if (currentTime >= expirationTime) {
        loggingOut();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { tagName } = useParams();
  const currentTag = tagsList.find(
    (t) => t.name.toLowerCase() === tagName?.toLowerCase()
  );
  const currentTagId = currentTag ? currentTag.id : null;

  return (
    <Box
      ref={elementRef}
      position={"fixed"}
      top={0}
      left={0}
      w={"100%"}
      zIndex={100}
      bg={"white"}
    >
      <Box>
        <Flex
          className="cc-container page-alignment"
          align={"center"}
          justify={"space-between"}
          mb={{ base: "15px", lg: "20px" }}
          mt={"20px"}
        >
          <Link to="/">
            <Logo color={"#175616"} fs={"logo-medium-text"} />
          </Link>
          <Flex hideBelow={"lg"} gap={{ lg: "40px", xl: "70px" }}>
            {pages.map((each) => (
              <Box
                key={each.id}
                display={
                  each.id === pages.length && !user.token ? "none" : "block"
                }
              >
                <NavLink
                  to={each.path}
                  className={({ isActive }) =>
                    isActive ? "link-navbar text-green fw-bold" : "text-black"
                  }
                >
                  <Text fontSize={"13px"}>{each.page}</Text>
                </NavLink>
              </Box>
            ))}
          </Flex>
          <Flex gap={"20px"} align={"center"}>
            {showSearch ? (
              <Flex align={"center"} gap={"10px"}>
                <Box
                  pos={"relative"}
                  w={{ base: "150px", sm: "200px", md: "240px" }}
                >
                  <form onSubmit={handleSubmit}>
                    <Input
                      className="bg-green-light-9"
                      fontWeight={"bold"}
                      placeholder="Search"
                      focusBorderColor="black"
                      h={"35px"}
                      borderRadius={"5px"}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      paddingRight={{ base: "32px", sm: "42px" }}
                      autoFocus
                    />
                  </form>
                  <Flex
                    position={"absolute"}
                    top={"0"}
                    right={0}
                    width={{ base: "30px", sm: "40px" }}
                    h={"35px"}
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
                <Icon
                  className="cursor"
                  boxSize={"25px"}
                  as={TbLetterXSmall}
                  onClick={() => setShowSearch(false)}
                />
              </Flex>
            ) : (
              <Flex gap={"20px"} align={"center"}>
                <NavButtons
                  user={user}
                  base={"none"}
                  lg={"flex"}
                  loggingOut={loggingOut}
                />
                <Icon
                  as={GoSearch}
                  boxSize={"25px"}
                  className="text-green text-green-light-5-hover cursor"
                  onClick={() => setShowSearch(true)}
                />
              </Flex>
            )}
            <Icon
              hideFrom={"lg"}
              as={RiMenu5Fill}
              boxSize={"25px"}
              className="text-green text-green-light-5-hover cursor"
              onClick={onOpen}
            />
          </Flex>
        </Flex>
        <Box
          borderTop={"1px solid black"}
          borderBottom={"1px solid black"}
          py={"10px"}
        >
          <Box className="cc-container page-alignment">
            <Flex
              justifyContent={"space-between"}
              overflow={"auto"}
              className="scrollbody"
            >
              {tagsList.map((each, index) => (
                <Box
                  key={each.id}
                  ref={(el) => {
                    if (currentTagId === each.id && el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                      });
                    }
                  }}
                  paddingRight={
                    tagsList.length - 1 === index
                      ? ""
                      : { base: "13px", md: "20px" }
                  }
                  paddingLeft={index === 0 ? "" : { base: "13px", md: "20px" }}
                  borderRight={
                    tagsList.length - 1 === index ? "" : "1px solid black"
                  }
                >
                  <NavLink
                    to={`/tag/${each.name}`}
                    className={({ isActive }) =>
                      isActive ? "text-green fw-bold" : "text-black"
                    }
                  >
                    <Text
                      whiteSpace="nowrap"
                      className="text-hover-green"
                      // overflow="hidden"
                      // textOverflow="ellipsis"
                    >
                      {each.name}
                    </Text>
                  </NavLink>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
      <Sidebar
        isOpen={isOpen}
        user={user}
        onClose={onClose}
        loggingOut={loggingOut}
      />
    </Box>
  );
};

export default Navbar;
