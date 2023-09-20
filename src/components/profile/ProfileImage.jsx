/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";

const ProfileImage = ({ file, onUpload, userProfile, onSubmit, user }) => {
  return (
    <form id="profileForm" onSubmit={onSubmit}>
      <Box
        h={{ base: "120px", sm: "130px", md: "150px", lg: "200px" }}
        width={{ base: "120px", sm: "130px", md: "150px", lg: "200px" }}
        borderRadius={"50%"}
        pos={"relative"}
      >
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          borderRadius={"50%"}
          src={file || userProfile.image}
          alt="Your profile image"
        />

        {userProfile.userName === user.userName && (
          <Box pos={"absolute"} bottom={{ base: "-10px", lg: 0 }} right={0}>
            <FormControl>
              <FormLabel htmlFor="profile">
                <Flex
                  w={{ base: "40px", lg: "50px" }}
                  h={{ base: "40px", lg: "50px" }}
                  bg={{ base: "white", lg: "#175616" }}
                  borderRadius={"50%"}
                  justify={"center"}
                  align={"center"}
                  className="cursor"
                >
                  <Icon
                    as={AiOutlineCamera}
                    boxSize={{ base: 6, lg: 8 }}
                    color={{ base: "#175616", lg: "white" }}
                  />
                </Flex>
              </FormLabel>
              <Input
                type="file"
                id="profile"
                display={"none"}
                onChange={onUpload}
              />
            </FormControl>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default ProfileImage;
