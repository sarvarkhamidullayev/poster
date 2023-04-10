import { defineStore } from "pinia";
import { getToken } from "src/composable/getToken";
import { useUtils } from "src/utils/utils";
const { makeRequest } = useUtils();
export const useOrderStore = defineStore("cart", {
  state: () => ({
    orders: [],
  }),
  getters: {
    getPendings() {
      return this.orders.filter((item) => {
        if (item.status === "kutilmoqda") return item;
      });
    },
    getAccepted() {
      return this.orders.filter((item) => {
        if (item.status === "tasdiqlandi") return item;
      });
    },
    getRejected() {
      return this.orders.filter((item) => {
        if (item.status === "bekor") {
          return item;
        }
      });
    },
  },
  actions: {
    async getOrders() {
      const response = await makeRequest("get", "order");
      if (response.success) {
        this.orders = response.data.map((item, index) => {
          item.idx = index;
          return item;
        });
      }
    },
    async acceptOrder(idx, status) {
      const response = await makeRequest(
        "put",
        `/order/${this.orders[idx]._id}`,
        {
          status: status,
        },
        {
          headers: {
            "x-auth-token": getToken(),
          },
        }
      );
      if (response.success) {
        this.getOrders();
      }
    },
  },
});
