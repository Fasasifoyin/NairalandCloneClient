/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

const FormikTextArea = (props) => {
  const { name, label, placeholder, labelSize, labelColor, baseH, mdH } = props;

  return (
    <Field name={name}>
      {({ meta, field }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          {label && (
            <FormLabel width={"min-content"}>
              <h3
                style={{ marginBottom: "10px", color: labelColor }}
                className={`fw-medium ${labelSize}`}
              >
                {label}
              </h3>
            </FormLabel>
          )}
          <Textarea
            {...field}
            borderRadius={"10px"}
            focusBorderColor="#175616"
            h={{ base: baseH || "250px", md: mdH || "350px" }}
            borderColor={"#175616"}
            placeholder={placeholder}
            fontSize={{ md: "18px", base: "14px" }}
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextArea;
