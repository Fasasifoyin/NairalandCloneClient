import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AccountLayout from "../components/account/AccountLayout";
import { signupSliders } from "../utils/Data";
import { Form, Formik } from "formik";
import FormikControl from "../components/formik/FormikControl";
import { signUpSchema } from "../components/formik/FormikValidation";
import GoogleButton from "../components/account/GoogleButton";

import { useDispatch, useSelector } from "react-redux";
import { UserStatus } from "../app/slice/UserSlice";
import { signUp } from "../app/actions/User";

const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(UserStatus);

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirm: "",
    agree: "",
  };

  const onSubmit = (values) => {
    dispatch(signUp({ ...values }));
  };

  return (
    <AccountLayout slides={signupSliders}>
      <Text className="fw-bold large-text" mb={"7px"}>
        Create Your Account
      </Text>
      <Text className="small-text" as={"i"}>
        Hi! Come Join Us
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signUpSchema}
      >
        {() => (
          <Form>
            <Flex mt={"20px"} mb={"30px"} direction={"column"} gap={"20px"}>
              <Flex
                justify={"space-between"}
                direction={{ base: "column", lg: "row" }}
              >
                <Box width={{ lg: "48%" }} mb={{ base: "20px", lg: 0 }}>
                  <FormikControl
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    control="Input"
                  />
                </Box>
                <Box width={{ lg: "48%" }}>
                  <FormikControl
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    control="Input"
                  />
                </Box>
              </Flex>
              <FormikControl
                name="userName"
                placeholder="Username"
                type="text"
                control="Input"
              />
              <FormikControl
                name="email"
                placeholder="E-mail Address"
                type="text"
                control="Input"
              />
              <Flex
                justify={"space-between"}
                direction={{ base: "column", lg: "row" }}
              >
                <Box width={{ lg: "48%" }} mb={{ base: "20px", lg: 0 }}>
                  <FormikControl
                    name="password"
                    placeholder="Password"
                    control="Password"
                  />
                </Box>
                <Box width={{ lg: "48%" }}>
                  <FormikControl
                    name="confirm"
                    placeholder="Confirm Password"
                    control="Password"
                  />
                </Box>
              </Flex>
              <FormikControl
                control="Checkbox"
                name="agree"
                label2={"I agree to Terms and Privacy Policy"}
              />
            </Flex>
            <Button
              className="bg-green text-cream bg-hover-cream2 text-hover-green"
              w={"100%"}
              isLoading={status === "pending"}
              type="submit"
              py={"25px"}
            >
              <Text className="medium-text">Sign up</Text>
            </Button>
          </Form>
        )}
      </Formik>
       <GoogleButton signup text="Sign up with Google" status={status} />
      <Box mt={"30px"}>
        <Text className="small-text" textAlign={"center"}>
          Have an account?{" "}
          <Link to="/signin">
            <Text
              as={"span"}
              className="link text-green fw-bold text-green-light-5-hover"
            >
              Log in
            </Text>
          </Link>
        </Text>
      </Box>
    </AccountLayout>
  );
};

export default Signup;
