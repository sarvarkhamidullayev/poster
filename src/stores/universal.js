import { defineStore } from "pinia";

export const useUniversalStore = defineStore("universal", {
  state: () => ({
    url: "http://172.105.121.27:5000",
    disabled: true,
    link: "",
  }),

  actions: {
    changeLocationPage(menu) {
      this.link = menu;
    },
  },
});
