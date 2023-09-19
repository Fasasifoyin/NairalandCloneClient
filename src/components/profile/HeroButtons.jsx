/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { updatePhoto } from "../../app/actions/User";
import { PhotoStatus } from "../../app/slice/ProfileSlice";

const HeroButtons = ({ file, userName, setFile, image }) => {
  const dispatch = useDispatch();
  const status = useSelector(PhotoStatus);

  const setProfile = () => {
    dispatch(updatePhoto({ file, userName, setFile }));
  };

  const clearProfile = () => {
    dispatch(updatePhoto({ file: "", userName, setFile }));
  };

  return (
    <Flex
      mt={"20px"}
      gap={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }}
      flexWrap={"wrap"}
      justify={file ? "center" : "start"}
    >
      {!file &&
        image !==
          "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg" && (
          <Box>
            <Button
              size={"sm"}
              className="bg-red text-white bg-red-light-5-hover "
              width={"150px"}
              isLoading={status === "pending"}
              onClick={clearProfile}
            >
              Clear Profile Picture
            </Button>
          </Box>
        )}

      {file && (
        <Box>
          <Button
            size={"sm"}
            className="bg-green text-white bg-green-light-5-hover "
            width={"150px"}
            onClick={setProfile}
            isLoading={status === "pending"}
          >
            Set Profile Picture
          </Button>
        </Box>
      )}
      {file && (
        <Box>
          <Button
            size={"sm"}
            className="bg-red text-white bg-red-light-5-hover "
            form="profileForm"
            type="submit"
            width={"150px"}
            isDisabled={status === "pending"}
          >
            Remove
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default HeroButtons;
