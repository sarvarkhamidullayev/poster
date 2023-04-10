import { defineStore } from "pinia";
import { getToken } from "src/composable/getToken";
import { useUtils } from "src/utils/utils";
const { makeRequest } = useUtils();

export const useProductStore = defineStore("product", {
  state: () => ({
    file: null,
    products: [],
    selection: [],
    cart: [],
    select: null,
    productInfo: {},
    search: "",
    product: {
      title: "",
      category: "",
      description: "",
      measure: "",
      price: null,
    },
  }),
  getters: {
    searchProducts() {
      return this.products.filter((item) => {
        if (
          item.title.includes(this.search) ||
          item.category.includes(this.search) ||
          item.description.includes(this.search)
        ) {
          return item;
        }
      });
    },
  },
  actions: {
    async getProduct() {
      localStorage.removeItem("product");
      this.product = {
        title: "",
        category: "",
        description: "",
        measure: "",
        price: null,
      };
      const response = await makeRequest("get", "/product");
      if (response.success) {
        this.products = response.data.map((item, index) => {
          if (!item.inBasket) {
          }
          item.idx = index;
          item.quantity = item.measure === "dona" ? 1 : (1.0).toFixed(2);
          item.inBasket = false;
          return item;
        });
      }
    },
    async getByIdProduct(id) {
      const response = await makeRequest("get", `/product/${id}`);
      if (response.success) {
        const idx = this.products.findIndex((item) => {
          if (item._id === response.data._id) {
            return item;
          }
        });
        this.productInfo = response.data;
        this.productInfo.quantity =
          this.productInfo.measure === "dona" ? 1 : (1.0).toFixed(2);
        this.productInfo.idx = idx;
      }
    },
    async createProduct() {
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", this.product.title);
      formData.append("category", this.product.category);
      formData.append("description", this.product.description);
      formData.append("measure", this.product.measure);
      formData.append("price", this.product.price);
      const response = await makeRequest("post", "/product", formData, {
        headers: {
          "x-auth-token": getToken(),
        },
      });
      if (response.success) {
        this.products.push(response.data);
        return;
      }
    },
    async updateProduct() {
      const id = this.product._id;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", this.product.title);
      formData.append("category", this.product.category);
      formData.append("description", this.product.description);
      formData.append("measure", this.product.measure);
      formData.append("price", this.product.price);
      const response = await makeRequest("put", `/product/${id}`, formData, {
        headers: {
          "x-auth-token": getToken(),
        },
      });
      if (response.success) {
        this.router.replace("/product");
      }
    },

    async deleteProduct(id) {
      const response = await makeRequest("delete", `/product/${id}`, {
        headers: {
          "x-auth-token": getToken(),
        },
      });
      if (response.success) {
        this.products.splice(
          this.products.findIndex((item) => item._id === id),
          1
        );
        this.router.replace("/product");
      }
    },

    async postProduct() {
      const response = await makeRequest(
        "post",
        "/post",
        {
          data: this.selection,
        },
        {
          headers: {
            "x-auth-token": getToken(),
          },
        }
      );
      if (response.success) {
        return true;
      }
    },
    async orderProduct(user, productsItems) {
      user.phone = "+" + user.phone.replace(/\D/g, "");
      const response = await makeRequest("post", "/order", {
        user: user,
        products: productsItems,
      });
      if (response.success) {
        this.cart = [];
        this.router.replace("/dashboard");
        return true;
      }
    },
    async addToCart(idx) {
      this.products[idx].inBasket = true;
      const cartItem = this.cart.findIndex((item) => item.idx === idx);
      const quantity = 1;
      if (cartItem === -1) {
        this.products[idx].quantity =
          this.products[idx].measure === "dona"
            ? quantity
            : quantity.toFixed(2);
        this.cart.push(this.products[idx]);
        return;
      }
      this.cart[cartItem].quantity +=
        this.products[idx].measure === "dona" ? 1 : (1.0).toFixed(2);
    },
    async removeFromCart(idx) {
      const index = this.cart.findIndex((product) => product.idx === idx);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
      this.products[idx].inBasket = false;
    },
  },
});
