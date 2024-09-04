/* eslint-disable react/prop-types */
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { pages } from "../../utils/Data";
import NavButtons from "./NavButtons";

const Sidebar = ({ isOpen, onClose, user, loggingOut }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={"sm"}
      hideFrom={"lg"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex justify={"flex-end"}>
            <Box
              className="cursor bg-cream2 bg-hover-transparent text-hover-green"
              onClick={onClose}
              borderRadius={"5px"}
              px={"15px"}
              py={{ base: "5px", sm: "7px" }}
            >
              <Text>Close</Text>
            </Box>
          </Flex>
        </DrawerHeader>
        <DrawerBody mt={"20px"}>
          <Flex direction={"column"} gap={"30px"} hideFrom={"lg"}>
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
                  <Text >{each.page}</Text>
                </NavLink>
              </Box>
            ))}
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <NavButtons user={user} base={"flex"} lg={"none"} loggingOut={loggingOut} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    // <Drawer
    // isOpen={isOpen}
    // placement="right"
    // onClose={onClose}
    // size={{ base: "sm" }}
    // >
    //   <DrawerOverlay />
    //   <DrawerContent m={"0px"}>
    //     <DrawerHeader>
    //       <Flex
    //         h={"52px"}
    //         align={"center"}
    //         justify={{ base: "space-between", sm: "flex-end" }}
    //       >
    //         <Link
    //           textDecoration={"none"}
    //           as={RouterLink}
    //           to="/"
    //           display={{ sm: "none" }}
    //         >
    //           <Logo fs={"logo-medium-text"} />
    //         </Link>
    // <Box
    //   className="cursor bg-cream2"
    //   onClick={onClose}
    //   borderRadius={"3px"}
    //   px={"9px"}
    //   py={{ base: "5px", sm: "7px" }}
    // >
    //   <p className="text-black">Close</p>
    // </Box>
    //       </Flex>
    //     </DrawerHeader>
    //     <DrawerBody mt={"20px"}>
    //       <Flex direction={"column"} hideFrom={"lg"} gap={"30px"}>
    //         {pages.map((each, index) => (
    //           <Box
    //             key={each.path}
    //             display={
    //               index === pages.length - 1 && !user.token ? "none" : "block"
    //             }
    //           >
    //             <NavLink
    //               onClick={onClose}
    //               style={{ width: "max-content" }}
    //               to={each.path}
    //               className={({ isActive }) =>
    //                 isActive ? "link-navbar" : "link-navbar_hover"
    //               }
    //             >
    //               <h5 className="text-hover-green medium-text">{each.page}</h5>
    //             </NavLink>
    //           </Box>
    //         ))}
    //       </Flex>
    //       {user?.token && (
    //         <Link as={RouterLink} to={`/profile/${user.userName}`}>
    //           <Button
    //             mt={"30px"}
    //             hideFrom={"lg"}
    //             w={"50%"}
    //             color={"white"}
    //             rounded={0}
    //             bg={"#175616"}
    //             _hover={{ bg: "#175616" }}
    //           >
    //             <h5 className="medium-text">PROFILE</h5>
    //           </Button>
    //         </Link>
    //       )}
    //     </DrawerBody>
    //     <DrawerFooter>
    //       {user.token ? (
    //         <Button
    //           hideFrom={"lg"}
    //           w={"100%"}
    //           color={"white"}
    //           rounded={0}
    //           bg={"#175616"}
    //           _hover={{ bg: "#175616" }}
    //           onClick={loggingOut}
    //         >
    //           <h5 className="medium-text">LOGOUT</h5>
    //         </Button>
    //       ) : (
    //         <Link as={RouterLink} to="/signin" w={"100%"}>
    //           <Button
    //             onClick={onClose}
    //             hideFrom={"lg"}
    //             w={"100%"}
    //             color={"white"}
    //             rounded={0}
    //             bg={"#175616"}
    //             _hover={{ bg: "#175616" }}
    //           >
    //             <h5>LOGIN</h5>
    //           </Button>
    //         </Link>
    //       )}
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
  );
};

export default Sidebar;
