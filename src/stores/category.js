import { defineStore } from "pinia";
import { getToken } from "src/composable/getToken";
import { useUtils } from "src/utils/utils";
const { makeRequest } = useUtils();

export const useCategoryStore = defineStore("category", {
  state: () => ({
    category: {
      title: "",
    },
    categories: [],
  }),
  actions: {
    //create category
    async createCategory() {
      const response = await makeRequest("post", "/category", this.category, {
        headers: {
          "x-auth-token": getToken(),
        },
      });
      if (response.success) {
        this.categories.push(response.data);
        this.category.title = "";
        return;
      }
    },

    //get all categories
    async getCategories() {
      const response = await makeRequest("get", "category");
      if (response.success) {
        this.categories = response.data.categories;
      }
    },

    //delete category
    async deleteCategories(category) {
      const response = await makeRequest("delete", `/category/${category}`, {
        headers: {
          "x-auth-token": getToken(),
        },
      });
      if (response.success) {
        this.categories.splice(
          this.categories.findIndex((item) => item._id === category),
          1
        );
      }
      if (response.data.status === 401) {
        // this.router.replace("/");
      }
    },

    //update category
    async updateCategories(id, category) {
      const response = await makeRequest(
        "put",
        `/category/${id}`,
        {
          title: category,
        },
        {
          headers: {
            "x-auth-token": getToken(),
          },
        }
      );
    },
  },
});
