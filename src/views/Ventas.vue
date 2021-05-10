<template>
    <div class="mt-5 pt-2 container">
        <h1>Ventas</h1>

            <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
          <th scope="col">ID compra</th>  
        </tr>
      </thead>
      <tbody v-if="ventas && ventas.length > 0">
        <tr v-for="(ventas, i) in ventas" :key="i">
          <td>{{ ventas.id }}</td>
          <td>{{ ventas.nombre }}</td>
          <td>{{ ventas.cantidadVendida }}</td>
          <td>${{ ventas.precioSubtotal }}</td>
          <td>{{ ventas.registro }}</td>
        </tr>
      </tbody>
      <tbody v-else>
          <td class="text-secondary" colspan="4">No hay ventas</td>
      </tbody>
    </table>
    </div>
</template>

<script>
import { mapState } from "vuex"
    export default {
        computed: {
            ...mapState(['ventas'])
        },
    }
</script>

<style lang="scss" scoped>

</style>