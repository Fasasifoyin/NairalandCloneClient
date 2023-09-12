/* eslint-disable react/prop-types */
import { Box, Image } from "@chakra-ui/react";

const CreateHero = ({ user, header }) => {
  return (
    <Box
      mb={{ base: "40px", lg: "60px" }}
      py={{ base: "20px", lg: "0px" }}
      px={"30px"}
      display={"grid"}
      placeContent={"center"}
      className="bg-cream"
      h={{ lg: "160px" }}
      boxShadow={"0px 4px 5px rgb(0,0,0,0.2)"}
      pos={"relative"}
    >
      <h2 style={{ textAlign: "center" }} className="fw-bold">
        {header}
      </h2>

      <Box
        display={{ base: "none", lg: "block" }}
        position={"absolute"}
        w={"100px"}
        h={"100px"}
        borderRadius={"50%"}
        top={"50%"}
        transform={"translateY(-50%)"}
        right={"30px"}
        boxShadow={
          user.image ===
          "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
            ? ""
            : "0px 15px rgb(0,0,0,0.2)"
        }
      >
        <Image
          w={"100%"}
          h={"100%"}
          borderRadius={"50%"}
          src={user.image}
          alt={user.userName}
        />
      </Box>
    </Box>
  );
};

export default CreateHero;
