import { defineStore } from "pinia";
import { Cookies } from "quasar";
import { useUtils } from "src/utils/utils";
const { makeRequest } = useUtils();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      login: "",
      password: "",
    },
  }),
  getters: {},
  actions: {
    async login() {
      const response = await makeRequest("post", "/auth/signin", this.user);
      if (response.success) {
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("user", response.data.user, { expires: 1 });
        return true;
      }
    },
  },
});
