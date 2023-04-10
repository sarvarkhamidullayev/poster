import { Notify } from "quasar";
import Cookies from "js-cookie";

export function getToken() {
  const token = Cookies.get("token");
  if (!token) {
    Notify.create({
      message: "Avtorizatsiyadan o'tishingiz kerak",
      type: "negative",
    });
  }
  return token;
}
