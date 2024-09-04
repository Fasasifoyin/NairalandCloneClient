/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const FormikInput = (props) => {
  const { type, name, placeholder, label, defaultLabel } = props;

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
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            focusBorderColor="#175616"
            borderRadius={"5px"}
            h={"50px"}
            border={"1px solid #175616"}
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikInput;
