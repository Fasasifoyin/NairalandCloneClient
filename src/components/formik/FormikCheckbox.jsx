import { Field } from "formik";
import {
  Flex,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

const FormikCheckbox = (props) => {
  // eslint-disable-next-line react/prop-types
  const { options, name, label } = props;
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          {label && <FormLabel>{label}</FormLabel>}
          <CheckboxGroup>
            {/* eslint-disable-next-line react/prop-types */}
            {options.map((each, index) => (
              <Flex align={"center"} gap={"7px"} key={index}>
                <input
                  type="checkbox"
                  className={meta.error && meta.touched ? "checkboxError" : ""}
                  {...field}
                  value={each.value}
                  id={name}
                  checked={Boolean(field.value.includes(each.value))}
                />
                <FormLabel className="cursor" fontWeight={"300"} htmlFor={name} mb={"0px"}>
                  <h6 className="tiny-text">{each.key}</h6>
                </FormLabel>
              </Flex>
            ))}
          </CheckboxGroup>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikCheckbox;
