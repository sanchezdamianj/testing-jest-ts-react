import * as yup from "yup";
type LoginFormSchema = {};
export const LoginFormSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .max(12, "Username can not be more than 12 characters"),
  password: yup
    .string()
    .required("Password is required")
    .max(12, "Password can not be more than 12 characters")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must be alphanumeric, and contain maximun 12 characters, one uppercase and one special character"
    )
    .required(),
});
