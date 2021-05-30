import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Firebase from "firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizzas: [],
    carrito: [],
    ventas: [],
  },
  getters: {
    pizzasConStock(state) {
      return state.pizzas.filter((pizza) => pizza.stock > 0);
    },
    numeroCarrito(state) {
      return state.carrito.length;
    },
    totalCarrito(state) {
      return state.carrito.reduce((acc, x) => acc + x.subtotal, 0);
    },
  },
  mutations: {
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
      state.carrito = [];
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
            registro: Date.now(),
          };
          return obj2;
        });

        state.ventas = state.ventas.concat(venta);

        state.pizzas.forEach((pizza) => {
          const id = pizza.id;

          state.carrito.forEach((el) => {
            if (el.id === id) {
              pizza.stock = pizza.stock - el.cantidad;
            }
          });
        });

        state.carrito = [];
      }
    },
  },
  actions: {
    async getData({ dispatch }) {
      const url =
        "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria";
      try {
        const req = await axios(url);
        const data = req.data;

        await dispatch("addPizzasDB", data);
        await dispatch("addStockDB");
        await dispatch("getPizzas");
      } catch (error) {
        console.log(error);
      }
    },
    addPizzasDB(state, payload) {
      payload.forEach(async (pizza) => {
        try {
          let db = Firebase.firestore();
          await db.collection("pizzas").add(pizza);
        } catch (error) {
          console.log(error);
        }
      });
    },
    addStockDB() {
      try {
        let db = Firebase.firestore();
        db.collection("pizzas")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.set(
                {
                  stock: 10,
                },
                { merge: true }
              );
            });
          });

          
      } catch (error) {
        console.log(error);
      }
    },
    getPizzas({ state }) {
      try {
        let db = Firebase.firestore();
        db.collection("pizzas")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              state.pizzas.push(doc.data());
            });
            console.log(state.pizzas);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async crearNuevaPizza(state, payload) {
      const pizza = payload;
      if (!pizza || pizza.length == 0) return;

      let db = Firebase.firestore();
      // Actualizar Firebase
      // Preguntar si el ID existe en Firebase: (TAREA)
       try {
         const req = await db.collection("pizza").get();
         req.docs.forEach(obj => {
           const pizzaFirebase = obj.data();
           const idFirebase = pizzaFirebase.id;

           // Tiene un problema: ¿Cuál es? (Tarea)
           if (idFirebase === pizza.id) return;
            db.collection("pizzas").add(pizza);
         })
       } catch (error) {
         console.log(error);
       }
      await db.collection("pizzas").add(pizza);
    },
    async borrarPizzas(id) {
      let db = Firebase.firestore();
      db.collection("pizzas").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }
  },
  modules: {},
});
