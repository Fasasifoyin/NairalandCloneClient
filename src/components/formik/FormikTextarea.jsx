/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

const FormikTextArea = (props) => {
  const {
    name,
    label,
    placeholder,
    baseH,
    mdH,
    defaultLabel,
  } = props;

  return (
    <Field name={name}>
      {({ meta, field }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          {label && (
            <FormLabel width={"max-content"}>
              {defaultLabel ? (
                <p style={{ color: "rgb(0,0,0,0.7)" }}>{label}</p>
              ) : (
                <h3 style={{ marginBottom: "10px" }} className="fw-medium">
                  {label}
                </h3>
              )}
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
