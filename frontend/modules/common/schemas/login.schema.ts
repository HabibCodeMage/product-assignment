import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username is required")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
