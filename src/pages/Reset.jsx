import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccountLayout from "../components/account/AccountLayout";
import { signinSliders } from "../utils/Data";
import FormikControl from "../components/formik/FormikControl";
import ResetForm from "../components/account/ResetForm";
import {
  emailValidation,
  resetPasswordValidation,
} from "../components/formik/FormikValidation";

import { useDispatch, useSelector } from "react-redux";
import { generateotp, resetPassword, verifyotp } from "../app/actions/User";
import { ResetEmail, ResetStatus } from "../app/slice/ResetSlice";

const Reset = () => {
  const dispatch = useDispatch();
  const resetEmail = useSelector(ResetEmail);
  const resetStatus = useSelector(ResetStatus);
  const [steps, setSteps] = useState(1);

  const [number, setNumber] = useState(60);
  console.log(number);

  useEffect(() => {
    if (number > 0) {
      const interval = setInterval(() => {
        setNumber((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [number]);

  const emailInitialValues = {
    email: "",
  };

  const OTPInitialValues = {
    code: "",
  };

  const resetInitialValues = {
    password: "",
    confirm: "",
  };

  const onSubmit = (values) => {
    if (steps === 1) {
      dispatch(generateotp({ ...values, setSteps, setNumber }));
    } else if (steps === 2) {
      dispatch(verifyotp({ ...values, setSteps }));
    } else if (steps === 3) {
      dispatch(resetPassword({ ...values, email: resetEmail }));
    }
  };

  return (
    <AccountLayout slides={signinSliders}>
      {steps === 1 && (
        <ResetForm
          initialValues={emailInitialValues}
          onSubmit={onSubmit}
          validationSchema={emailValidation}
          buttonText={"Get OTP"}
          title={"Forget Password"}
          subtitle={"Enter email of forgotten password"}
          status={resetStatus}
        >
          <Box width={"100%"}>
            <FormikControl
              name="email"
              placeholder="E-mail Address"
              type="text"
              control="Input"
              base={"56px"}
              lg={"56px"}
            />
          </Box>
        </ResetForm>
      )}
      {steps === 2 && (
        <ResetForm
          initialValues={OTPInitialValues}
          onSubmit={onSubmit}
          buttonText={"Verify OTP"}
          title={"OTP Verification"}
          subtitle={"Enter OTP that was sent to your email address"}
          status={resetStatus}
          step
          number={number}
          email={resetEmail}
          setSteps={setSteps}
          setNumber={setNumber}
        >
          <Box width={"100%"}>
            <FormikControl
              name="code"
              placeholder="OTP Code"
              type="number"
              control="Input"
              base={"56px"}
              lg={"56px"}
            />
          </Box>
        </ResetForm>
      )}
      {steps === 3 && (
        <ResetForm
          initialValues={resetInitialValues}
          onSubmit={onSubmit}
          validationSchema={resetPasswordValidation}
          buttonText={"Reset Password"}
          title={"Reset Password"}
          subtitle={"You can now reset your password"}
          status={resetStatus}
        >
          <Box mb={"25px"} w={"100%"}>
            <FormikControl
              name="password"
              placeholder="Password"
              control="Password"
            />
          </Box>
          <Box w={"100%"}>
            <FormikControl
              name="confirm"
              placeholder="Confirm Password"
              control="Password"
            />
          </Box>
        </ResetForm>
      )}
    </AccountLayout>
  );
};

export default Reset;
