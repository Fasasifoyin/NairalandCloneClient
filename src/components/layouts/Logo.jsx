import { Box, Flex } from "@chakra-ui/react";
import useWindowSize from "../../hooks/useWindowSize";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Logo = ({ fs, color, baseLogoColor }) => {
  const { width } = useWindowSize();

  return (
    <Flex>
      <Box pos={"relative"}>
        <h6
          className={`${fs} fw-bold`}
          style={{
            color:
              width >= 992 ? color : baseLogoColor ? baseLogoColor : "#175616",
          }}
        >
          N
        </h6>
        <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
          <Flex
            h={"100%"}
            direction={"column"}
            justifyContent={"center"}
            gap={"7%"}
          >
            <Box
              width={"100%"}
              h={"7%"}
              bg={{
                base: baseLogoColor ? baseLogoColor : "#175616",
                lg: color,
              }}
            />
            <Box
              width={"100%"}
              h={"7%"}
              bg={{
                base: baseLogoColor ? baseLogoColor : "#175616",
                lg: color,
              }}
            />
          </Flex>
        </Box>
      </Box>
      <Box>
        <h6
          className={`${fs} fw-bold`}
          style={{
            color:
              width >= 992 ? color : baseLogoColor ? baseLogoColor : "#175616",
          }}
        >
          airaland
        </h6>
      </Box>
    </Flex>
  );
};

export default Logo;
