import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizzas: [],
    carrito: [],
    ventas: []
  },
  getters:{
    pizzasConStock(state) {
      return state.pizzas.filter((pizza) => pizza.stock > 0)
    },
    numeroCarrito(state) {
      return state.carrito.length
    },
    totalCarrito(state) {
      return state.carrito.reduce((acc, x) => acc + x.subtotal, 0);
    }

  },
  mutations: {
    getPizzas( state, payload ) {
      state.pizzas = payload
    },
    agregarPizza(state, payload) {
      const agregar = payload.id;
      const cantidad = 1;
      const nombre = payload.nombre;
      const precio = payload.precio;
      const subtotal = precio * cantidad;
      
      const finder = state.carrito.find((obj) => obj.id === agregar);
      
      if (!finder) {
        const obj = {
          id: agregar,
          cantidad,
          nombre,
          precio,
          subtotal,
        };
        state.carrito.push(obj);
      } else {
        finder.cantidad = cantidad + finder.cantidad;
        finder.subtotal = finder.cantidad * precio;
      }

    },
    limpiarCarrito(state) {
      state.carrito = []
    },
    comprar(state) {
      const respuesta = confirm("Confirmar compra");
      if (respuesta) {
        const venta = state.carrito.map((obj) => {
          const obj2 = {
            id: obj.id,
            nombre: obj.nombre,
            precioSubtotal: obj.subtotal,
            cantidadVendida: obj.cantidad,
            registro: Date.now()
          };
          return obj2;
        });

        state.ventas = state.ventas.concat(venta)

        state.pizzas.forEach((pizza) => {
          const id = pizza.id;

          state.carrito.forEach((el) => {
            if (el.id === id) {
              pizza.stock = pizza.stock - el.cantidad;
            }
          });
        });

        state.carrito = []
      }
    }
  },
  actions: {
    async getData({ state, commit }) {
      const url = 'https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria'
      try {
        const req = await axios(url)
        const data = req.data
        console.log(data);
        commit("getPizzas", data)

        state.pizzas.map(x => x.stock = 10)
        state.pizzas.map(x => x.validacionStock = 10)
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
