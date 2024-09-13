"use client";

import { useState, useEffect } from "react";
import api from "@/api";
import { Product } from "@/modules/common/interfaces/product.interface";
import { PuffLoader } from "react-spinners";
import DeleteModal from "@/modules/common/components/DeleteModal";
import toast from "react-hot-toast";
const pageSize = 10;

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = (product: Product) => {
    setIsDeleteModalOpen(true);
    setProductToDelete(product);
  };

  const onDelete = async () => {
    const toastId = toast.loading(`Deleting product ${productToDelete?.name}`);
    try {
      await api.products.delete(productToDelete!.id);
      toast.success(`${productToDelete?.name} deleted`, { id: toastId });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete?.id)
      );
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(`$Failed to delete product {productToDelete?.name}`, {
        id: toastId,
      });
    }
  };

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.products.getAll(page, pageSize);
      const newProducts = response.data as Product[];
      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
      setShowMore(newProducts.length === pageSize);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  return (
    <div className="container px-6 py-8 mx-auto">
      <h3 className="text-3xl font-medium text-gray-700">Products</h3>

      <div className="mt-8 grid grid-cols-1">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:pl-8 lg:pr-20">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full mr-6">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Description
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Price
                  </th>
                  <th className="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Created At
                  </th>
                  <th className="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Files
                  </th>
                  <th className="x-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {product.description.length > 50
                          ? `${product.description.substring(0, 50)}...`
                          : product.description}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {product.filePaths.map((path, index) => (
                          <span key={index} className="inline-block mr-2">
                            {path.split("/").pop()}{" "}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-1 py-4 text-sm text-center font-medium leading-5  whitespace-no-wrap border-b border-gray-200">
                      <button
                        type="button"
                        className="focus:outline-none border-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={handleDelete.bind(null, product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {loading && <PuffLoader color="#4f46e5" size={30} />}
      </div>

      {showMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        itemName={productToDelete?.name || ""}
      />
    </div>
  );
}
