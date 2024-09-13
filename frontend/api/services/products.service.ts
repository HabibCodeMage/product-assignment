import ApiBase from "../common/ApiBase";
import { ProductPayload } from "../payloads/product.payload";

export default class ProductsService extends ApiBase {
  async create(data: ProductPayload, files: File[]) {
    // Create a FormData object
    const formData = new FormData();

    // Append data fields to FormData
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());

    // Append files to FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // Field name must match with backend
    }

    // Make the API request
    return this.axios.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async getAll(page: number, limit: number) {
    return this.axios.get("/products", { params: { page, limit } });
  }

  async getById(id: string) {
    return this.axios.get(`/products/${id}`);
  }

  async delete(id: string) {
    return this.axios.delete(`/products/${id}`);
  }
}
