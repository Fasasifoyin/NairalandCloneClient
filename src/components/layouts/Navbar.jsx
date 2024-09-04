/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { RiMenu5Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, UserDetails } from "../../app/slice/UserSlice";
import jwtDecode from "jwt-decode";
import Sidebar from "./Sidebar";
import { pages, tagsList } from "../../utils/Data";
import NavButtons from "./NavButtons";
import { setEmpty } from "../../app/slice/Detailed/CommentSlice";

const Navbar = ({ elementRef }) => {
  const user = useSelector(UserDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggingOut = () => {
    dispatch(LOGOUT());
    dispatch(setEmpty([]));
    navigate("/");
  };

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log("Failed to decode token", error);
      return null;
    }
  };

  const setLogoutTimer = (expirationTime) => {
    const currentTime = Date.now();
    const timeoutDuration = Math.max(0, expirationTime * 1000 - currentTime);
    setTimeout(loggingOut, timeoutDuration);
  };

  useEffect(() => {
    const token = user?.token;
    if (!token) {
      return;
    }
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.exp) {
        setLogoutTimer(decodedToken.exp);
      }
    }
  }, [user?.token]);

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
            />
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
