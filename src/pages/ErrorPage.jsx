import { Box, Flex } from "@chakra-ui/react";
import Logo from "../components/layouts/Logo";
import { useState } from "react";
import Search from "../components/home/Search";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const [search, setSearch] = useState("");

  return (
    <Flex
      className="bg-cream2"
      w={"100%"}
      minH={"100vh"}
      justify={"center"}
      align={"center"}
      p={"20px"}
    >
      <Flex w={"100%"} direction={"column"} align={"center"}>
        <Box mb={"30px"}>
          <Link to={"/"}>
            <Logo color={"#175616"} fs={"logo-large-text"} />
          </Link>
        </Box>
        <Box mb={"5px"}>
          <h4 className="fw-medium Xlarge-text">Uh oh. Page not found</h4>
        </Box>
        <Box w={"100%"} maxW={"800px"} mb={"50px"}>
          <h5
            className="large-text"
            style={{ color: "rgb(120,120,120)", textAlign: "center" }}
          >
            Sorry the page you are looking for does not exist or has been
            moved. Kindly visit the{" "}
            <span className="large-text text-green fw-bold">
              <Link to={"/"}>HOME PAGE</Link>
            </span>{" "}
            or just search for something else
          </h5>
        </Box>
        <Search bgColor={"#f6f6ec"} search={search} setSearch={setSearch} />
      </Flex>
    </Flex>
  );
};

export default ErrorPage;
