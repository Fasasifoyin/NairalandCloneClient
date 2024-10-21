/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";

const FormikTextArea = (props) => {
  const { name, label, placeholder, defaultLabel } = props;

  return (
    <Field name={name}>
      {({ meta, field }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          {label && (
            <FormLabel width={"max-content"}>
              {defaultLabel ? (
                <Text className="fw-bold">{label}</Text>
              ) : (
                <Text className="medium-text fw-bold">{label}</Text>
              )}
            </FormLabel>
          )}
          <Textarea
            {...field}
            borderRadius={"5px"}
            placeholder={placeholder}
            autoComplete="off"
            focusBorderColor="#175616"
            h={"350px"}
            border={"1px solid #175616"}
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextArea;
