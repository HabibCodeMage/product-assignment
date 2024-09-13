"use client";
import api from "@/api";
import { RegisterSchema } from "@/modules/common/schemas/register.schema";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Creating account");
      try {
        setLoading(true);
        await api.auth.register(values);
        resetForm();
        toast.success("Account Created", { id: toastId });
        router.push("/login");
      } catch (error) {
        const errorMsg =
          error instanceof AxiosError
            ? error?.response?.data.message
            : error instanceof Error
            ? error.message
            : "Something went wrong please ask support";
        toast.error(errorMsg, { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto shadow-custom-lg px-[30px] py-[30px] rounded-lg mt-[100px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="text-white w-[100%] p-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={loading}
        >
          <div className="flex justify-center gap-4 items-center relative">
            <span>Register</span>
            {loading && (
              <span className="absolute -bottom-2">
                <PulseLoader size={10} />
              </span>
            )}
          </div>
        </button>
      </form>
      <p>
        Already have an account login{" "}
        <Link className=" no-underline" href={"/login"}>
          here.
        </Link>
      </p>
    </div>
  );
};

export default Register;
