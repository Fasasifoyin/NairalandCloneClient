import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const errorHandler = (errorObject) => {
  let message = "An unknown error occurred";

  if (errorObject.error instanceof AxiosError) {
    message =
      errorObject.error.response && errorObject.error.response.data.error
        ? errorObject.error.response.data.error
        : errorObject.error.message;
  } else if (errorObject.error instanceof Error) {
    message = errorObject.error.message;
  }
  if (errorObject.toast === true) {
    toast.error(message);
  }

  return message;
};
