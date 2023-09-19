/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Box, Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiMenu5Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

import { useSelector, useDispatch } from "react-redux";
import { UserDetails } from "../../app/slice/UserSlice";
import { LOGOUT } from "../../app/slice/UserSlice";
import jwtDecode from "jwt-decode";
import Sidebar from "./Sidebar";

const Navbar = ({
  logo,
  baseLogoColor,
  text,
  activeText,
  hover,
  buttonBg,
  buttonColor,
  btnHover,
  btnColorHover,
  logoutBg,
  logoutHoverBorder,
  logoutColor,
  currentLoc,
}) => {
  const user = useSelector(UserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loggingOut = () => {
    dispatch(LOGOUT());
    navigate("/");
  };

  const pages = [
    {
      page: "Home",
      path: "/",
    },
    {
      page: "Trending",
      path: "/trending",
    },
    {
      page: "Recent",
      path: "/recent",
    },
    {
      page: "New",
      path: "/new",
    },
    {
      page: "Create Blog",
      path: "/blog/create",
    },
  ];

  // useEffect(() => {
  //   const token = user?.token;

  //   if (!token) {
  //     return;
  //   }

  //   if (token) {
  //     const decodedToken = jwtDecode(token).exp;
  //     const now = Date.now().valueOf() / 1000;

  //     if (decodedToken < now) {
  //       loggingOut();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location, user?.token]);

  return (
    <>
      <Flex
        pos={"relative"}
        zIndex={20}
        className="page_alignment cc-container"
        justifyContent={`space-between`}
        alignItems={`center`}
        height={`4.688rem`}
      >
        <Link to="/">
          <Logo
            color={logo ? "white" : "#175616"}
            fs={"logo-medium-text"}
            baseLogoColor={baseLogoColor}
          />
        </Link>
        <Flex hideBelow={"lg"} gap={{ lg: "40px", xl: "80px" }}>
          {pages.map((each, index) => (
            <Box
              key={each.path}
              display={
                index === pages.length - 1 && !user.token ? "none" : "block"
              }
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? activeText : text,
                })}
                to={each.path}
                className={({ isActive }) => (isActive ? "link-navbar" : "")}
              >
                <Text
                  fontSize={"14px"}
                  _hover={{
                    color: hover && each.page !== currentLoc ? hover : text,
                  }}
                  textShadow={"0px 0px 5px rgba(0, 0, 0, 0.2)"}
                >
                  {each.page}
                </Text>
              </NavLink>
            </Box>
          ))}
        </Flex>
        <Flex gap={"20px"}>
          {user?.token && currentLoc !== location.pathname && (
            <Box hideBelow={"lg"}>
              <Link to={`/profile/${user.userName}`}>
                <Button
                  bg={buttonBg}
                  color={buttonColor}
                  className={`bg-hover-${btnHover} text-hover-${btnColorHover}`}
                  w={"94px"}
                  h={"34px"}
                  rounded={0}
                >
                  PROFILE
                </Button>
              </Link>
            </Box>
          )}
          {user?.token ? (
            <Box hideBelow={"lg"}>
              <Button
                bg={logoutBg}
                color={logoutColor}
                w={"94px"}
                h={"34px"}
                rounded={0}
                _hover={{ border: `1px solid ${logoutHoverBorder}` }}
                onClick={loggingOut}
              >
                LOGOUT
              </Button>
            </Box>
          ) : (
            <Box hideBelow={"lg"}>
              <Link to="/signin">
                <Button
                  w={"94px"}
                  h={"34px"}
                  className={`bg-hover-${btnHover} text-hover-${btnColorHover}`}
                  rounded={0}
                  bg={buttonBg}
                  color={buttonColor}
                >
                  LOGIN
                </Button>
              </Link>
            </Box>
          )}
        </Flex>
        <Box
          display={"flex"}
          gap={"7px"}
          alignItems={"center"}
          hideFrom={"lg"}
          className="cursor"
        >
          <Icon
            hideFrom={"md"}
            as={CiSearch}
            boxSize={7}
            color={{
              base: baseLogoColor ? baseLogoColor : "#175616",
              lg: logo ? "white" : "#175616",
            }}
          />
          <Icon
            onClick={onOpen}
            as={RiMenu5Fill}
            boxSize={7}
            color={{
              base: baseLogoColor ? baseLogoColor : "#175616",
              lg: logo ? "white" : "#175616",
            }}
          />
        </Box>
      </Flex>
      <Sidebar
        loggingOut={loggingOut}
        isOpen={isOpen}
        user={user}
        onClose={onClose}
        pages={pages}
      />
    </>
  );
};

export default Navbar;
