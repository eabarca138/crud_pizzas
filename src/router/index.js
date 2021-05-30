import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Inventario from "../views/Inventario.vue"
import Ventas from "../views/Ventas.vue"
import Carrito from "../views/Carrito.vue"
import AñadirPizzas from "../views/AñadirPizzas.vue"
import Error404 from "../views/Error404.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: Inventario
  },
  {
    path: "/ventas",
    name: "Ventas",
    component: Ventas
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: Carrito
  },
  {
  path: "/añadirpizzas",
  name: "AñadirPizzas",
  component: AñadirPizzas
},
  {
    path: "*",
    name: "Error404",
    component: Error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
