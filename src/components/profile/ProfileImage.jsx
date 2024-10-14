/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import { convertImageToBase64 } from "../../utils/Convert";
import toast from "react-hot-toast";

const ProfileImage = ({ userProfile, user }) => {
  const [file, setFile] = useState("");
  const [wantToChange, setWantToChange] = useState(false);

  const onUpload = async (e) => {
    if (e.target.files[0].size > 1000000) {
      e.target.reset();
      setFile("");
      return toast.error("Image cannot be larger than 1MB");
    }
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
    setWantToChange(true);
  };

  const handleReset = (e) => {
    e.target.reset();
    setFile("");
    setWantToChange(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const onSubmit = (e) => {
  //   if (button === 1) {
  //     e.target.reset();
  //     dispatch(updatePhoto({ file, userName: userProfile.userName, setFile }));
  //   } else {

  //   }
  // };

  return (
    <form onReset={handleReset} onSubmit={handleSubmit}>
      <Box width={"120px"} h={"120px"} pos={"relative"}>
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          borderRadius={"50%"}
          src={file || userProfile.image}
          alt="Your profile image"
        />
        {userProfile.userName === user.userName && (
          <Box pos={"absolute"} bottom={"0"} right={"0"}>
            <FormControl>
              <FormLabel m={0} htmlFor="profile">
                <Flex
                  w={"40px"}
                  h={"40px"}
                  borderRadius={"50%"}
                  bg={"white"}
                  justify={"center"}
                  align={"center"}
                  className="cursor"
                >
                  <Icon
                    as={AiOutlineCamera}
                    boxSize={6}
                    className="text-green"
                  />
                </Flex>
              </FormLabel>
              <Input
                type="file"
                id="profile"
                display={"none"}
                onChange={onUpload}
                accept="image/png, image/jpeg"
              />
            </FormControl>
          </Box>
        )}
      </Box>
      {wantToChange ? (
        <Flex mt={"10px"} justifyContent={"space-between"} width={"120px"}>
          <Button
            borderRadius={"3px"}
            size={"xs"}
            bg={"green"}
            width={"55px"}
            color={"white"}
            type="submit"
          >
            <Text className="tiny-text">Set</Text>
          </Button>
          <Button
            borderRadius={"3px"}
            size={"xs"}
            bg={"red"}
            width={"55px"}
            color={"white"}
            type="reset"
          >
            <Text className="tiny-text">Clear</Text>
          </Button>
        </Flex>
      ) : (
        userProfile.image !==
          "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg" && (
          <Button
            size={"xs"}
            borderRadius={"3px"}
            mt={"10px"}
            bg={"white"}
            type="submit"
          >
            <Text className="tiny-text">Set to default image</Text>
          </Button>
        )
      )}
    </form>
  );
};

export default ProfileImage;
