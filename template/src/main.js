import { createApp } from "vue";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Ripple from "primevue/ripple";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ToastService)
  .directive("ripple", Ripple)
  .mount("#app");

app.config = {
  globalProperties: {
    $primevue: { ripple: true },
  },
};
