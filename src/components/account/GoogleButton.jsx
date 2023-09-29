/* eslint-disable react/prop-types */
import { Box, Flex, Image } from "@chakra-ui/react";
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
    onError: (error) => console.log(error),
  });

  return (
    <Box mt={"15px"}>
      <Box>
        <p className="fw-bold" style={{ textAlign: "center" }}>
          OR
        </p>
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
          h={"53px"}
          w={"100%"}
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
          <h4 className="medium-text">{text}</h4>
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
          h={"53px"}
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
          <h4 className="medium-text">{text}</h4>
        </Flex>
      )}
    </Box>
  );
};

export default GoogleButton;
