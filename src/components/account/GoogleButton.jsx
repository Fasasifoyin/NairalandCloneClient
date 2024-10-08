/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import { login, signUp } from "../../app/actions/User";

const GoogleButton = ({ text, signup, status }) => {
  const dispatch = useDispatch();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    if (signup) {
      dispatch(signUp({ googleAccessToken: accessToken }));
    } else {
      dispatch(login({ googleAccessToken: accessToken }));
    }
  }

  const Login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (error) => console.log(error.message),
    redirect_uri: `https://nairaland-clone-client.vercel.app/${
      signup ? "signup" : "signin"
    }`,
  });

  return (
    <Box mt={"15px"}>
      <Box>
        <Text className="fw-bold" textAlign={"center"}>
          OR
        </Text>
      </Box>

      {status === "pending" ? (
        <Flex
          alignItems={"center"}
          justify={"center"}
          gap={"15px"}
          mt={"15px"}
          bg={" rgba(240, 240, 240, 0.3)"}
          color={"rgb(84, 84, 84)"}
          border={"rgba(118, 118, 118, 0.3)"}
          w={"100%"}
          h={"45px"}
          type="submit"
          className="disabled"
        >
          <Box w={"30px"} h={"30px"}>
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              alt="Google Logo"
              src="https://res.cloudinary.com/dbxvk3apv/image/upload/v1695920977/Nairaland/768px-Google__22G_22_Logo.svg_nktfyk.webp"
            />
          </Box>
          <Text>{text}</Text>
        </Flex>
      ) : (
        <Flex
          alignItems={"center"}
          justify={"center"}
          gap={"15px"}
          mt={"15px"}
          bg={"transparent"}
          border={"1px solid rgb(0,0,0,0.3)"}
          _hover={{
            bg: "transparent",
            border: "1px solid rgb(0,0,0)",
            transition: "0.3s ease-in-out",
          }}
          h={"45px"}
          w={"100%"}
          type="submit"
          onClick={() => Login()}
          className="cursor"
        >
          <Box w={"30px"} h={"30px"}>
            <Image
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              alt="Google Logo"
              src="https://res.cloudinary.com/dbxvk3apv/image/upload/v1695920977/Nairaland/768px-Google__22G_22_Logo.svg_nktfyk.webp"
            />
          </Box>
          <Text>{text}</Text>
        </Flex>
      )}
    </Box>
  );
};

export default GoogleButton;
