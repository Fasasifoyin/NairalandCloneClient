/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Box, Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiMenu5Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

import { useSelector, useDispatch } from "react-redux";
import { UserDetails } from "../../app/Slice/UserSlice";
import { LOGOUT } from "../../app/Slice/UserSlice";
import decode from "jwt-decode";
import Sidebar from "./Sidebar";

const Navbar = ({
  logo,
  text,
  activeText,
  hover,
  buttonBg,
  buttonColor,
  btnHover,
  btnColorHover,
  logoutBg,
  logoutBgHover,
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

  useEffect(() => {
    const token = user?.token;

    if (!token) {
      return;
    }

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        loggingOut();
      } else {
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
          <Logo color={logo ? "white" : "#175616"} fs={"logo-medium-text"} />
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
          {user?.token && (
            <Box hideBelow={"lg"}>
              <Link>
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
        {/* <Flex gap={"20px"}>
          {user?.token && (
            <Link to="/profile">
              <Button
                hideBelow={"lg"}
                w={"94px"}
                h={"34px"}
                color={button ? "#175616" : "white"}
                bg={button ? "white" : "#175616"}
                rounded={0}
                _hover={{
                  bg: button ? "#175616" : "white",
                  color: button ? "white" : "#175616",
                  border: buttonborder ? "3px solid #e8ece0" : "",
                }}
              >
                PROFILE
              </Button>
            </Link>
          )}
          {user.token ? (
            <Button
              variant={"outline"}
              hideBelow={"lg"}
              w={"94px"}
              h={"34px"}
              color={button ? "white" : "#175616"}
              border={button ? "1px solid white" : "1px solid #175616"}
              rounded={0}
              className={
                button
                  ? "bg-hover-green"
                  : buttonborder
                  ? "bg-hover-green text-hover-white"
                  : "bg-hover-white"
              }
              onClick={loggingOut}
            >
              LOGOUT
            </Button>
          ) : (
            <Link to="/signin">
              <Button
                hideBelow={"lg"}
                w={"94px"}
                h={"34px"}
                color={button ? "#175616" : "white"}
                bg={button ? "white" : "#175616"}
                rounded={0}
                _hover={{
                  bg: button ? "#175616" : "white",
                  color: button ? "white" : "#175616",
                  border: buttonborder ? "3px solid #e8ece0" : "",
                }}
              >
                LOGIN
              </Button>
            </Link>
          )}
        </Flex> */}
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
            color={{ base: "#175616", lg: logo ? "white" : "#175616" }}
          />
          <Icon
            onClick={onOpen}
            as={RiMenu5Fill}
            boxSize={7}
            color={{ base: "#175616", lg: logo ? "white" : "#175616" }}
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
