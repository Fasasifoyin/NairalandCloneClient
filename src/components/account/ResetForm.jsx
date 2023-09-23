/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { generateotp } from "../../app/actions/User";
import { useDispatch } from "react-redux";

const ResetForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  buttonText,
  title,
  subtitle,
  status,
  step,
  number,
  email,
  setNumber,
  setSteps,
}) => {
  const dispatch = useDispatch();
  const resendOTP = () => {
    dispatch(generateotp({ email, setSteps, setNumber }));
  };

  return (
    <Box>
      <h4 className="fw-bold Xlarge-text" style={{ marginBottom: "7px" }}>
        {title}
      </h4>
      <h5 className="small-text" style={{ marginBottom: "30px" }}>
        <i>{subtitle}</i>
      </h5>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Box mb={"40px"}>{children}</Box>
            <Button
              className="bg-green text-cream bg-hover-cream2 text-hover-green"
              h={"53px"}
              w={"100%"}
              isLoading={status === "pending"}
              type="submit"
            >
              <h4 className="btn-large-text">{buttonText}</h4>
            </Button>
          </Form>
        )}
      </Formik>
      <Flex
        align={"center"}
        justify={step ? "space-between" : "center"}
        mt={"50px"}
      >
        {step && (
          <Button
            isDisabled={number > 0}
            variant={"ghost"}
            className="bg-hover-white text-hover-green"
            onClick={resendOTP}
          >
            <span
              className={`text-black fw-bold ${
                number < 1 ? "text-hover-green" : ""
              }`}
            >
              Resend OTP {number > 0 && `in ${number}`}
            </span>
          </Button>
        )}
        <Link to="/signin">
          <span className="link text-green fw-bold text-green-light-5-hover">
            Sign In
          </span>
        </Link>
      </Flex>
    </Box>
  );
};

export default ResetForm;
