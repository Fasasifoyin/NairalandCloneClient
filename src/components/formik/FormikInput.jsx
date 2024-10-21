/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
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
                <Text className="fw-bold">{label}</Text>
              ) : (
                <Text className="medium-text fw-bold">{label}</Text>
              )}
            </FormLabel>
          )}
          <Input
            {...field}
            type={type}
            borderRadius={"5px"}
            placeholder={placeholder}
            autoComplete="off"
            focusBorderColor="#175616"
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
