<template>
  <div class="container mt-5 p-2">
    <h1>Pizzas</h1>

    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="pizzasConStock">
      <div class="card col" v-for="(pizza, i) in pizzasConStock" :key="i">
        <img :src="pizza.img" class="card-img-top" alt="pizza" />
        <div class="card-body">
          <h5 class="card-title">{{ pizza.name }}</h5>
          <p class="card-text">
            {{ pizza.desc }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(ing, id) in pizza.ing" :key="id">
            {{ ing.name }}
          </li>
        </ul>
        <div class="card-body">
          <button
            class="btn btn-primary"
            @click="[agregarPizza({
                id: pizza.id,
                nombre: pizza.name,
                precio: pizza.price,
              })]">Agregar al carrito <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(['carrito', 'pizzas']),
    ...mapGetters(["pizzasConStock"]),
/*     deshabilitar() {
      return this.pizzasConStock.validacionStock === 0 ? true : false;
    }, */
  },
  methods: {
    ...mapMutations(["agregarPizza"])
  }
};
</script>

<style scoped></style>
