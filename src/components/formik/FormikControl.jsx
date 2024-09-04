/* eslint-disable react/prop-types */
import FormikCheckbox from "./FormikCheckbox";
import FormikInput from "./FormikInput";
import FormikPassword from "./FormikPassword";
import FormikTextArea from "./FormikTextarea";

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "Input":
      return <FormikInput {...rest} />;
    case "Password":
      return <FormikPassword {...rest} />;
    case "Checkbox":
      return <FormikCheckbox {...rest} />;
    case "Textarea":
      return <FormikTextArea {...rest} />;
  }
};

export default FormikControl;
