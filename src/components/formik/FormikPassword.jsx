/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const FormikPassword = (props) => {
  const { name, placeholder } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          <Box pos={"relative"}>
            <Input
              type={showPassword ? "text" : "password"}
              {...field}
              placeholder={placeholder}
              autoComplete="off"
              focusBorderColor="#175616"
              borderRadius={"5px"}
              fontSize={{ md: "18px", base: "14px" }}
              h={"56px"}
              border={"1px solid #175616"}
              paddingLeft={"17px"}
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
