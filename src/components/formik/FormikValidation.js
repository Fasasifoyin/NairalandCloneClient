import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    // .matches(/^\S*$/, "Name without spaces")
    .matches(/^\w*$/, "Cannot contain white spaces and special characters")
    .min(3)
    .max(15)
    .required("Enter First Name"),
  lastName: yup
    .string()
    // .matches(/^\S*$/, "Name without spaces")
    .matches(/^\w*$/, "Cannot contain white spaces and special characters")
    .min(3)
    .max(15)
    .required("Enter Last Name"),
  userName: yup
    .string()
    .matches(/^\S*$/, "Should not contain white spaces")
    .min(3)
    .required("Enter UserName"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
  password: yup
    .string()
    .min(5)
    .matches(/^\S*$/, "Password cannot contain space")
    .matches(passwordRules, {
      message:
        "Minimum of 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .required("Enter Password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password"),
  agree: yup.boolean().required("Please agree to our terms and privacy policy"),
});

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(/^\S*$/, "Password cannot contain space")
    .matches(passwordRules, {
      message:
        "Minimum of 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .required("Enter Password"),
  userName: yup
    .string()
    .matches(/^\S*$/, "Should not contain white spaces")
    .min(3)
    .required("Enter UserName"),
});

export const createValidation = yup.object().shape({
  title: yup.string().min(5).max(200).required("Give your post a headline"),
  body: yup.string().min(5).required("Write a post"),
});

export const commentValidation = yup.object().shape({
  comment: yup.string().required("Write a comment"),
});

export const childCommentValidation = yup.object().shape({
  childComment: yup.string().required("Write a comment"),
});

export const updateProfileValidation = yup.object().shape({
  firstName: yup
    .string()
    // .matches(/^\S*$/, "Name without spaces")
    .matches(/^\w*$/, "Cannot contain white spaces and special characters")
    .min(3)
    .max(15)
    .required("Enter First Name"),
  lastName: yup
    .string()
    // .matches(/^\S*$/, "Name without spaces")
    .matches(/^\w*$/, "Cannot contain white spaces and special characters")
    .min(3)
    .max(15)
    .required("Enter Last Name"),
  userName: yup
    .string()
    .matches(/^\S*$/, "Should not contain white spaces")
    .min(3)
    .required("Enter UserName"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
});

export const updatePasswordValidation = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(/^\S*$/, "Password cannot contain space")
    .matches(passwordRules, {
      message:
        "Minimum of 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .required("Enter Password"),
  newPassword: yup
    .string()
    .min(5)
    .matches(/^\S*$/, "Password cannot contain space")
    .matches(passwordRules, {
      message:
        "Minimum of 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .required("Enter New Password"),
});

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
});

export const resetPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(/^\S*$/, "Password cannot contain space")
    .matches(passwordRules, {
      message:
        "Minimum of 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .required("Enter Password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password"),
});
