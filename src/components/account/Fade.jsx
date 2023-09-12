/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

const Fade = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  setTimeout(next, 5000);

  return (
    <>
      {slides.map((each, index) => (
        <React.Fragment key={each._id}>
          <Box
            w={"100%"}
            h={"100%"}
            className={current === index ? "slide-active" : "slide"}
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
            width={"70%"}
            h={"70%"}
            pos={"absolute"}
            top={"30%"}
            left={"50%"}
            transform={"translateX(-50%)"}
            display={"flex"}
            alignItems={"center"}
          >
            <Box
              className={current === index ? "slide-text-active" : "slide-text"}
            >
              <h3 className="text-cream">{each.text}</h3>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </>
  );
};

export default Fade;
