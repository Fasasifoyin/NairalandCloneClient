/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { childCommentValidation } from "../formik/FormikValidation";
import { IoIosSend } from "react-icons/io";

import {
  ChildCommentStatus,
  setEmpty,
} from "../../app/slice/Detailed/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { createChildComment } from "../../app/actions/Comment";

const ChildCommentForm = ({ commentId, auth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(ChildCommentStatus);

  const initialValues = {
    childComment: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    if (auth.token) {
      const form = { ...values, commentId };
      dispatch(createChildComment(form));
      onSubmitProps.resetForm();
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };

  return (
    <Flex justifyContent={"flex-end"} mt={"25px"} mb={"10px"}>
      <Box width={"calc(100% - 50px)"} direction={"column"} gap={"10px"}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={childCommentValidation}
        >
          {() => (
            <Form>
              <Field name="childComment">
                {({ meta, field }) => (
                  <FormControl isInvalid={meta.error && meta.touched}>
                    <Box position={"relative"}>
                      <Input
                        {...field}
                        autoComplete="off"
                        type="text"
                        pr={"35px"}
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
                        <Icon
                          as={IoIosSend}
                          boxSize={7}
                          className="text-green"
                        />
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
    </Flex>
  );
};

export default ChildCommentForm;
