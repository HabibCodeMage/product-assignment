export class ProductsService {
  async getAllProducts() {
    // Fetch products from a database
    return [{ id: 1, name: 'Product A' }];
  }

  async getProductById(id: string) {
    // Retrieve product by ID from a database
    return { id, name: 'Product A' };
  }
}
