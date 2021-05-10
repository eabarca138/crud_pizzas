<template>
  <div class="mt-5 p-2 container">
    <h1>Carrito de compra</h1>


    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody v-if="carrito && carrito.length > 0">
        <tr v-for="(venta, i) in carrito" :key="i">
          <td>{{ venta.nombre }}</td>
          <td>${{ venta.precio }}</td>
          <td>{{ venta.cantidad }}</td>
          <td>${{ venta.subtotal }}</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>${{ totalCarrito }}</td>
        </tr>
      </tbody>
      <tbody v-else>
          <td class="text-secondary" colspan="4">No hay productos en el carrito</td>
      </tbody>
    </table>


    <button class="btn btn-danger me-1" @click="limpiarCarrito()">Limpiar carrito</button>
    <button class="btn btn-success ms-1" @click="comprar()">Comprar</button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["totalCarrito"])
  },
  methods: {
    ...mapMutations(["comprar", "limpiarCarrito"]),
  },
};
</script>

<style lang="scss" scoped></style>
