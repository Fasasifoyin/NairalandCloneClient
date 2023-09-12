/* eslint-disable react/prop-types */
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { commentValidation } from "../formik/FormikValidation";
import FormikControl from "../formik/FormikControl";

import { useSelector } from "react-redux";
import { CreateStatus } from "../../app/slice/Detailed/CommentSlice";

const DetailedForm = ({ onSubmit, initialValues }) => {
  const status = useSelector(CreateStatus);

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={commentValidation}
      >
        {() => (
          <Form>
            <Box mb={"30px"}>
              <FormikControl
                control="Textarea"
                name="comment"
                label="Comment"
                labelSize={"medium-text"}
                labelColor={"#AAAAAA"}
              />
            </Box>
            <Button
              type="submit"
              width={"229px"}
              height={"50px"}
              bg={"#175616"}
              color={"#E8ECE0"}
              borderRadius={"5px"}
              _hover={{ bg: "#175616" }}
              isLoading={status === "creating"}
            >
              <h4 className="medium-text fw-medium">SEND COMMENT</h4>
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DetailedForm;
