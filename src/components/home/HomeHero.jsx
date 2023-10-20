import { Box, Flex, Image } from "@chakra-ui/react";
import Search from "./Search";
import { useState } from "react";

const HomeHero = () => {
  const [search, setSearch] = useState("");

  return (
    <Box
      className="bg-cream"
      h={{ lg: "47.875rem", base: "26rem", md: "34rem" }}
      pos={"relative"}
      mb={"60px"}
    >
      <Image
        display={{ base: "none", lg: "block" }}
        w={"100%"}
        h={"100%"}
        objectFit={"cover"}
        src={
          "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690883989/Nairaland/Group_9260_fdgmby.png"
        }
        alt="Image"
      />
      <Flex
        pos={"absolute"}
        top={"0"}
        left={"0"}
        w={"100%"}
        h={"100%"}
        bg={{ lg: "rgb(246,246,236, 0.5)" }}
        justify={"center"}
        align={"center"}
      >
        <Box px={"30px"}>
          <h1 className="fw-bold" style={{ textAlign: "center" }}>
            Welcome To Nairaland Forum
          </h1>
          <h5
            className="text-green fw-medium large-text"
            style={{ textAlign: "center" }}
          >
            We give the verified breaking news and current news
          </h5>
        </Box>
        <Box
          hideBelow={"md"}
          pos={"absolute"}
          width={"100%"}
          bottom={{ md: "10%", lg: "14%" }}
        >
          <Search
            bgColor={"rgb(255,255,255,0.2)"}
            search={search}
            setSearch={setSearch}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeHero;
