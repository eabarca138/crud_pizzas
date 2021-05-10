<template>
  <div class="mt-5 pt-2 container">
    <h1>Inventario</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
      <tbody v-if="pizzas && pizzas.length > 0">
        <tr v-for="(pizza, i) in pizzas" :key="i" :class="{'bg-danger': pizza.stock === 0}">
          <th scope="row">{{ i + 1 }}</th>
              <td>{{ pizza.id }}</td>
              <td>{{ pizza.name }}</td>
              <td>${{ pizza.price }}</td>
              <td>{{ pizza.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex"
  export default {
    computed: {
      ...mapState(['pizzas'])
    },
  }
</script>

<style lang="scss" scoped>

</style>