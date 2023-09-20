/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";

const InfoBox = ({ title, body }) => {
  return (
    <Box>
      <p style={{ color: "rgb(0,0,0,0.7)" }}>{title}</p>
      <h5 className="medium-text fw-bold">{body}</h5>
    </Box>
  );
};

export default InfoBox;
