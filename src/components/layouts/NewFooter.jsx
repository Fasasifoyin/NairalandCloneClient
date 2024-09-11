import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Logo from "./Logo";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { mySocials, tagsList } from "../../utils/Data";
import { Link, NavLink } from "react-router-dom";

const NewFooter = () => {
  return (
    <Box bg={"black"} py={"40px"}>
      <Box className="page-alignment cc-container">
        <Flex justifyContent={{ base: "center", md: "start" }}>
          <Logo color={"white"} fs={"logo-large-text"} />
        </Flex>
        <Flex
          mt={"50px"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={{ base: "30px", lg: 0 }}
        >
          <Box width={{ base: "100%", lg: "70%" }}>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
              {tagsList.map((each) => (
                <NavLink
                  key={each.id}
                  to={`/tag/${each.name}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green fw-bold"
                      : "text-white text-hover-green"
                  }
                >
                  <Text>{each.name}</Text>
                </NavLink>
              ))}
            </SimpleGrid>
          </Box>
          <Flex width={{ base: "100%", lg: "25%" }} justifyContent={"center"}>
            <Flex
              direction={"column"}
              gap={"25px"}
              width={"100%"}
              maxW={{ base: "300px", lg: "100%" }}
            >
              <Box position={"relative"}>
                <Input
                  bg={"rgb(77, 77, 77)"}
                  color={"white"}
                  fontWeight={"bold"}
                  border={"none"}
                  placeholder="Search"
                  _placeholder={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  focusBorderColor="none"
                  borderRadius={"20px"}
                  h={"45px"}
                  paddingRight={"48px"}
                />
                <Flex
                  position={"absolute"}
                  top={"0"}
                  right={0}
                  width={"45px"}
                  h={"45px"}
                  borderRadius={"50%"}
                  bg={"white"}
                  zIndex={"50"}
                  align={"center"}
                  justifyContent={"center"}
                >
                  <Icon as={GoSearch} boxSize={"20px"} />
                </Flex>
              </Box>
              <Button
                leftIcon={<MdOutlineUnsubscribe size={"20px"} />}
                borderRadius={"20px"}
                h={"45px"}
              >
                Subscribe
              </Button>
              <Flex justifyContent={"space-between"}>
                {mySocials.map((each) => (
                  <Link
                    key={each.id}
                    to={each.linkTo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Flex
                      borderRadius={"5px"}
                      bg={"rgb(77, 77, 77)"}
                      p={"10px"}
                    >
                      <Icon as={each.icon} color={"white"} boxSize={"20px"} />
                    </Flex>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box mt={"50px"}>
          <Text
            textAlign={"center"}
            className="tiny-text fw-bold"
            color={"rgb(255,255,255,0.4)"}
          >
            This is a clone project and not the real Nairaland website. This was
            developed for learning purpose
          </Text>
          <Text textAlign={"center"} color={"white"} className="tiny-text">
            Built by{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={"https://foyin.vercel.app/"}
            >
              <Text as={"span"} color={"blue"} className="tiny-text">
                Fasasi Foyin{" "}
              </Text>
            </Link>
            (07043593355)
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default NewFooter;
