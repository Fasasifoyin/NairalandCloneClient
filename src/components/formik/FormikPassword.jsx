/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const FormikPassword = (props) => {
  const { name, placeholder, label, defaultLabel } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name}>
      {({ field, meta }) => (
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
          <Box pos={"relative"}>
            <Input
              type={showPassword ? "text" : "password"}
              {...field}
              placeholder={placeholder}
              autoComplete="off"
              focusBorderColor="#175616"
              borderRadius={"5px"}
              h={"50px"}
              border={"1px solid #175616"}
              paddingRight={"35px"}
              _placeholder={{ color: "rgb(0, 0, 0, 0.7)" }}
            />
            <Icon
              pos={"absolute"}
              zIndex={10}
              top={"50%"}
              right={"10px"}
              transform={"translateY(-50%)"}
              boxSize={5}
              as={showPassword ? BsFillEyeSlashFill : BsFillEyeFill}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor"
            />
          </Box>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikPassword;
