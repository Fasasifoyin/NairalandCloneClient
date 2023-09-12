/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import AccountLayout from "../components/account/AccountLayout";
import { Form, Formik } from "formik";
import { signUpSchema } from "../components/formik/FormikValidation";
import { Box, Button, Flex } from "@chakra-ui/react";
import FormikControl from "../components/formik/FormikControl";
import { signupSliders } from "../utils/Data";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../app/actions/User";
import { UserStatus } from "../app/Slice/UserSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(UserStatus);

  const options = [
    {
      key: (
        <span className="tiny-text">
          I agree to all{" "}
          <span
            onClick={() => console.log("terms")}
            color={"#175616"}
            className="link tiny-text"
          >
            Terms
          </span>{" "}
          &{" "}
          <span
            onClick={() => console.log("policy")}
            color={"#175616"}
            className="link tiny-text"
          >
            Privacy Policy
          </span>
        </span>
      ),
      value: "true",
    },
  ];

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirm: "",
    agree: [],
  };

  const onSubmit = (values) => {
    dispatch(signUp({ ...values, navigate }));
  };

  return (
    <AccountLayout slides={signupSliders}>
      <h4 className="fw-bold Xlarge-text" style={{ marginBottom: "7px" }}>
        Create Your Account
      </h4>
      <h5 className="small-text" style={{ marginBottom: "30px" }}>
        <i>Hi! Come Join Us</i>
      </h5>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signUpSchema}
      >
        {() => (
          <Form>
            <Flex
              justify={"space-between"}
              width={"100%"}
              mb={"10px"}
              direction={{ base: "column", lg: "row" }}
            >
              <Box width={{ lg: "47%" }} mb={{ base: "10px", lg: "0px" }}>
                <FormikControl
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  control="Input"
                  base={"56px"}
                  lg={"56px"}
                />
              </Box>
              <Box width={{ lg: "47%" }}>
                <FormikControl
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  control="Input"
                  base={"56px"}
                  lg={"56px"}
                />
              </Box>
            </Flex>
            <Box width={"100%"} mb={"10px"}>
              <FormikControl
                name="userName"
                placeholder="Username"
                type="text"
                control="Input"
                base={"56px"}
                lg={"56px"}
              />
            </Box>
            <Box width={"100%"} mb={"10px"}>
              <FormikControl
                name="email"
                placeholder="E-mail Address"
                type="text"
                control="Input"
                base={"56px"}
                lg={"56px"}
              />
            </Box>
            <Flex
              justify={"space-between"}
              width={"100%"}
              mb={"25px"}
              direction={{ base: "column", lg: "row" }}
            >
              <Box width={{ lg: "49%" }} mb={{ base: "10px", lg: "0px" }}>
                <FormikControl
                  name="password"
                  placeholder="Password"
                  control="Password"
                />
              </Box>
              <Box width={{ lg: "49%" }}>
                <FormikControl
                  name="confirm"
                  placeholder="Confirm Password"
                  control="Password"
                />
              </Box>
            </Flex>
            <Box mb={"40px"}>
              <FormikControl
                control="Checkbox"
                name="agree"
                options={options}
              />
            </Box>
            <Button
              className="bg-green text-cream bg-hover-cream2 text-hover-green"
              h={"53px"}
              w={"100%"}
              isLoading={status === "pending"}
              type="submit"
            >
              <h4 className="btn-large-text">Sign up</h4>
            </Button>
            <Box mt={"50px"}>
              <h5 className="small-text" style={{ textAlign: "center" }}>
                Have an account?{" "}
                <Link to="/signin">
                  <span className="link text-green fw-bold text-green-light-5-hover">
                    Log in
                  </span>
                </Link>
              </h5>
            </Box>
          </Form>
        )}
      </Formik>
    </AccountLayout>
  );
};

export default Signup;
