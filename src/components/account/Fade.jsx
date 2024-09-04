/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const Fade = ({ slides }) => {
  const [current, setCurrent] = useState(1);

  const next = () => {
    setCurrent(current === slides.length ? 1 : current + 1);
  };

  setTimeout(next, 5000);

  return (
    <Box hideBelow={"lg"} w={"50%"} h={"100vh"} pos={"relative"}>
      {slides.map((each) => (
        <React.Fragment key={each._id}>
          <Box
            position={"absolute"}
            w={"100%"}
            h={"100%"}
            top={0}
            left={0}
            opacity={current === each._id ? 1 : 0}
            transition={"opacity ease-in-out 0.7s"}
          >
            <Image
              objectFit={"cover"}
              w={"100%"}
              h={"100%"}
              src={each.image}
              alt={each._id}
            />
          </Box>
          <Box
            pos={"absolute"}
            height={"30%"}
            bottom={"70px"}
            w={"85%"}
            left={"50%"}
            opacity={current === each._id ? 1 : 0}
            transform={"translateX(-50%)"}
            transition={"opacity ease-in-out 0.7s"}
          >
            <Text className="text-cream Xlarge-text">
              {each.text}
            </Text>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Fade;
