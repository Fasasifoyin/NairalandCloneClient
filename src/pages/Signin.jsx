/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex } from "@chakra-ui/react";
import AccountLayout from "../components/account/AccountLayout";
import { signinSliders } from "../utils/Data";
import { Formik, Form } from "formik";
import FormikControl from "../components/formik/FormikControl";
import { loginSchema } from "../components/formik/FormikValidation";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/actions/User";
import { UserStatus } from "../app/slice/UserSlice";
import { useEffect, useState } from "react";

const Signin = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(UserStatus);
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";
  console.log(redirect);
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

  const options = [{ key: "Remember me", value: "true" }];

  const initialValues = {
    userName: remember.userName || "",
    password: remember.password || "",
    remember: remember.password ? ["true"] : [],
  };

  const onSubmit = (values) => {
    const formData = { ...values, navigate, redirect };
    dispatch(login(formData));
  };

  return (
    <AccountLayout slides={signinSliders}>
      <h4 className="fw-bold Xlarge-text" style={{ marginBottom: "7px" }}>
        Log In To Your Account
      </h4>
      <h5 className="small-text" style={{ marginBottom: "30px" }}>
        <i>Welcome Back!</i>
      </h5>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {() => (
          <Form>
            <Box mb={"10px"}>
              <FormikControl
                control="Input"
                name="userName"
                placeholder="User Name"
                type="text"
                base={"56px"}
                lg={"56px"}
              />
            </Box>
            <Box w={"100%"} mb={"25px"}>
              <FormikControl
                control="Password"
                name="password"
                placeholder="Password"
                base={"56px"}
                lg={"56px"}
              />
            </Box>
            <Flex mb={"40px"} justify={"space-between"}>
              <Box>
                <FormikControl
                  control="Checkbox"
                  name="remember"
                  options={options}
                />
              </Box>
              <h6 className="tiny-text text-green text-green-light-5-hover cursor">
                Forget password?
              </h6>
            </Flex>
            <Button
              className="bg-green text-cream bg-hover-cream2 text-hover-green"
              h={"53px"}
              w={"100%"}
              isLoading={status === "pending"}
              type="submit"
            >
              <h4 className="btn-large-text">Log In</h4>
            </Button>
          </Form>
        )}
      </Formik>
      <Box mt={"50px"}>
        <h5 className="small-text" style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="link text-green fw-bold text-green-light-5-hover">
              Sign Up
            </span>
          </Link>
        </h5>
      </Box>
    </AccountLayout>
  );
};

export default Signin;
