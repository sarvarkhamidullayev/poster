import money from "v-money";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(money);
});
