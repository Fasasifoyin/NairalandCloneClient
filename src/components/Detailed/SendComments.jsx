import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { IoIosSend } from "react-icons/io";
import { commentValidation } from "../formik/FormikValidation";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../app/actions/Comment";
import { CreateStatus, setEmpty } from "../../app/slice/Detailed/CommentSlice";

const SendComments = ({ blogId, auth }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const status = useSelector(CreateStatus);

  const initialValues = {
    comment: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    if (auth) {
      const form = { ...values, blogId };
      dispatch(createComment(form));
      onSubmitProps.resetForm();
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };

  return (
    <Box mt={"20px"}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={commentValidation}
      >
        {() => (
          <Form>
            <Field name="comment">
              {({ meta, field }) => (
                <FormControl isInvalid={meta.error && meta.touched}>
                  <Box position={"relative"}>
                    <Input
                      {...field}
                      pr={"35px"}
                      autoComplete="off"
                      type="text"
                      placeholder={"Write comment"}
                      borderRadius={"0px"}
                      borderTop={"none"}
                      borderLeft={"none"}
                      borderRight={"none"}
                      focusBorderColor="transparent"
                      _focus={{
                        borderBottomColor: "black",
                      }}
                      _invalid={{
                        borderBottomColor: "red.500",
                      }}
                    />
                    <Button
                      type="submit"
                      pos={"absolute"}
                      zIndex={10}
                      top={"50%"}
                      right={0}
                      transform={"translateY(-50%)"}
                      px={0}
                      bg={"none"}
                      _hover={{
                        bg: "none",
                      }}
                      isLoading={status === "pending"}
                    >
                      <Icon as={IoIosSend} boxSize={7} className="text-green" />
                    </Button>
                  </Box>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SendComments;
