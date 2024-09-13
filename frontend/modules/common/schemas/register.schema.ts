import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username is required")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
