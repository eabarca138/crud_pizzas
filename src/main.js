import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Firebase from "firebase"
import FirebaseConfig from "../config/Firebase"

Firebase.initializeApp(FirebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
