"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/api";
import { ProductPayload } from "@/api/payloads/product.payload";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
});

export default function AddProduct() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);

      const productData: ProductPayload = {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
      };
      const toastId = toast.loading("Creating Product");
      try {
        await api.products.create(productData, files);
        toast.success("Product Create", { id: toastId });
        router.push("/dashboard");
      } catch (err) {
        setError("Failed to create product. Please try again.");
        console.error("Error creating product:", err);
        toast.error("Failed to create product. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-[90%]">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...formik.getFieldProps("description")}
            className="mt-1  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...formik.getFieldProps("price")}
            className="mt-1  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.price}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="files"
            className="block text-sm font-medium text-gray-700"
          >
            Product Files
          </label>
          <input
            id="files"
            type="file"
            onChange={handleFileChange}
            multiple
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {formik.isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Product
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
}
