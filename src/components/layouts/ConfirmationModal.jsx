/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";

const ConfirmationModal = ({
  actiontype,
  buttonText,
  setFalse,
  warningNote,
  status,
  action
}) => {
  return (
    <Box>
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        w={"100%"}
        h={"100%"}
        className="cursor"
        zIndex={30}
        onClick={() => setFalse(false)}
      >
        <Box
          pos={"fixed"}
          top={0}
          left={0}
          width={"100%"}
          h={"100%"}
          bg={"black"}
          opacity={0.5}
        />
      </Box>
      <Box
        pos={"fixed"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        width={"100%"}
        maxWidth={"550px"}
        height={"170px"}
        maxH={"100vh"}
        zIndex={40}
        bg={"white"}
      >
        <Flex
          px={"30px"}
          pt={"30px"}
          pb={"10px"}
          direction={"column"}
          justify={"space-between"}
          h={"100%"}
        >
          <Box>
            <p className="medium-text">{actiontype}</p>
            {warningNote && (
              <Box px={"20px"} mt={"5px"}>
                <li className="small-text text-red">{warningNote}</li>
              </Box>
            )}
          </Box>
          <Flex justify={"space-between"}>
            <Button
              rounded={0}
              size={"sm"}
              className="bg-green text-white bg-green-light-5-hover"
              onClick={() => setFalse(false)}
            >
              Cancel
            </Button>
            <Button
              variant={"outline"}
              border={"1px solid red"}
              size={"sm"}
              rounded={0}
              className="bg-hover-red text-hover-white"
              isLoading={status === "pending"}
              onClick={action}
            >
              {buttonText}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ConfirmationModal;
