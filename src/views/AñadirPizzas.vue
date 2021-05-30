<template>
  <div>
    <form class="mt-5 pt-3 container" >
      <label>ID</label>
      <input type="text" class="form-control mt-3" v-model="pizza.id">
      <label>Nombre</label>
      <input type="text" class="form-control mt-3" v-model="pizza.name">
      <label>Imagen</label>
      <input type="text" class="form-control mt-3" v-model="pizza.image">
      <label>Ingredientes</label>
        <input type="text" class="form-control mt-3" v-model="pizza.ing">
      <label>Precio</label>
        <input type="text" class="form-control mt-3" v-model="pizza.price">
      <label>Stock</label>
        <input type="text" class="form-control mt-3" v-model="pizza.stock">
      <label>Descripción</label>
      <textarea cols="30" rows="10" class="form-control" v-model="pizza.desc"></textarea>

      <button type="button" class="btn btn-primary mt-3" @click="crearPizza()">Añadir Pizza</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AñadirPizzas",
  data() {
    return {
      pizza: {
        id: "",
        name: "",
        image: "",
        ing: "",
        price: "",
        stock: "",
        desc: ""
      }
    }
  },
  methods: {
    ...mapActions(["crearNuevaPizza"]),
        crearPizza() {
      const pizza = this.pizza;
      if (!pizza.id || !pizza.name || !pizza.desc || !pizza.price || !pizza.ing || !pizza.image) return;

      this.crearNuevaPizza(pizza);
    },
  },
};
</script>

<style lang="scss" scoped>
form{
  width: 50%;
}
</style>
