/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import AccountLayout from "../components/account/AccountLayout";
import { signinSliders } from "../utils/Data";
import { Formik, Form } from "formik";
import FormikControl from "../components/formik/FormikControl";
import { loginSchema } from "../components/formik/FormikValidation";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/actions/User";
import { UserStatus } from "../app/slice/UserSlice";
import GoogleButton from "../components/account/GoogleButton";
// import GoogleButton from "../components/account/GoogleButton";

const Signin = () => {
  const dispatch = useDispatch();
  const status = useSelector(UserStatus);
  const [remember, setRemember] = useState(
    localStorage.getItem("rememberUser")
      ? JSON.parse(localStorage.getItem("rememberUser"))
      : {}
  );

  useEffect(() => {
    setRemember(
      localStorage.getItem("rememberUser")
        ? JSON.parse(localStorage.getItem("rememberUser"))
        : {}
    );
  }, []);

  const initialValues = {
    userName: remember.userName || "",
    password: remember.password || "",
    remember: remember.password ? true : "",
  };

  const onSubmit = (values) => {
    const formData = { ...values };
    dispatch(login(formData));
  };

  return (
    <AccountLayout slides={signinSliders}>
      <Text className="fw-bold large-text" mb={"7px"}>
        Login to your account
      </Text>
      <Text className="small-text" as={"i"}>
        Welcome back
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {() => (
          <Form>
            <Flex mt={"20px"} mb={"30px"} direction={"column"} gap={"20px"}>
              <FormikControl
                control="Input"
                name="userName"
                placeholder="User Name"
                type="text"
              />
              <FormikControl
                control="Password"
                name="password"
                placeholder="Password"
              />
              <Flex align={"center"} justify={"space-between"}>
                <Box width={"65%"}>
                  <FormikControl
                    control="Checkbox"
                    name="remember"
                    label2={"Remember me"}
                  />
                </Box>
                <Link to={"/password/reset"}>
                  <Text className="tiny-text text-green text-green-light-5-hover cursor">
                    Forget password?
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <Button
              className="bg-green text-cream bg-hover-cream2 text-hover-green"
              w={"100%"}
              isLoading={status === "pending"}
              type="submit"
              py={"25px"}
            >
              <Text className="medium-text">Log in</Text>
            </Button>
          </Form>
        )}
      </Formik>
      <GoogleButton text={"Sign in with Google"} status={status} />
      <Box mt={"30px"}>
        <Text className="small-text" textAlign={"center"}>
          Don't have an account?{" "}
          <Link to="/signup">
            <Text
              as={"span"}
              className="link text-green fw-bold text-green-light-5-hover"
            >
              Sign up
            </Text>
          </Link>
        </Text>
      </Box>
    </AccountLayout>
  );
};

export default Signin;
