/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";
import FormikControl from "../formik/FormikControl";
import { Form, Formik } from "formik";
import { childCommentValidation } from "../formik/FormikValidation";

import { ChildCommentStatus } from "../../app/slice/Detailed/CommentSlice";
import { useSelector } from "react-redux";

const ChildCommentForm = ({ initialValues, onSubmit, reply, index }) => {
  const status = useSelector(ChildCommentStatus);

  return (
    <Box
      className={reply === index ? "seen" : "not-seen"}
      my={"15px"}
      w={{ base: "calc(98% - 60px)", md: "calc(98% - 80px)" }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={childCommentValidation}
      >
        {() => (
          <Form>
            <Flex
              align={{ lg: "center" }}
              gap={"5px"}
              justify={"space-between"}
              direction={{ base: "column", md: "row" }}
            >
              <Box width={{ base: "100%", md: "75%" }}>
                <FormikControl
                  control="Textarea"
                  name="childComment"
                  baseH="px"
                  mdH="78px"
                />
              </Box>
              <Box width={{ lg: "20%" }}>
                <Button
                  width={{ lg: "100%" }}
                  height={{ md: "40px", base: "30px" }}
                  type="submit"
                  bg={"#175616"}
                  color={"#E8ECE0"}
                  borderRadius={"5px"}
                  _hover={{ bg: "#175616" }}
                  isLoading={status === "pending"}
                >
                  <p>Send Comment</p>
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChildCommentForm;
