<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid container">
      <router-link to="/" class="navbar-brand">Pizzería</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Inventario'}" class="nav-link">Inventario</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Ventas'}" class="nav-link">Ventas</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'AñadirPizzas'}" class="nav-link">Añadir Pizzas</router-link>
          </li>
        </ul>

        <span @click="$router.push('/carrito')" class="numeroCarrito">{{numeroCarrito}}</span><i class="fas fa-shopping-cart" @click="$router.push('/carrito')"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(['numeroCarrito'])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.numeroCarrito{
  background: red;
  color: white;
  border-radius: 0.8em;
  width: 1.6em;
}
i{
  font-size: 1.5rem;
}
span, i{
  cursor: pointer;
}
</style>
