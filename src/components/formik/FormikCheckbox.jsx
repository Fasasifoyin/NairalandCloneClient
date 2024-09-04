/* eslint-disable react/prop-types */
import { Field } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const FormikCheckbox = (props) => {
  const { name, label, label2 } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          {label && <FormLabel>{label}</FormLabel>}
          <Flex align={"center"} gap={"7px"}>
            <input
              type="checkbox"
              className={meta.error && meta.touched ? "checkboxError" : ""}
              {...field}
              id={name}
              // value={"true"}
              checked={Boolean(field.value === true)}
            />
            <FormLabel className="cursor" htmlFor={name} mb={"0px"}>
              <Text>{label2}</Text>
            </FormLabel>
          </Flex>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikCheckbox;
