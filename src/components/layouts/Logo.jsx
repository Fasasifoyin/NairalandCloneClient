import { Box, Flex, Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Logo = ({ fs, color, baseLogoColor }) => {
  return (
    <Flex>
      <Box pos={"relative"}>
        <Text className={`${fs} fw-bold`} color={color}>
          N
        </Text>
        <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
          <Flex
            h={"100%"}
            direction={"column"}
            justifyContent={"center"}
            gap={"7%"}
          >
            <Box width={"100%"} h={"7%"} bg={color} />
            <Box width={"100%"} h={"7%"} bg={color} />
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text className={`${fs} fw-bold`} color={color}>
          airaland
        </Text>
      </Box>
    </Flex>
  );
};

export default Logo;
