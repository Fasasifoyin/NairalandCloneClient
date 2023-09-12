/* eslint-disable react/prop-types */
import Modal from "../layouts/Modal";
import { Box, Text } from "@chakra-ui/react";

const LikesModal = ({ view, index, child, setView }) => {
  return (
    <Modal view={view} index={index}>
      <Box
        
      >
        <Box width={"500px"} height={"500px"} bg={"white"}>
          <Text onClick={() => setView(-1)}>{child.length}</Text>
        </Box>
      </Box>
    </Modal>
  );
};

export default LikesModal;
