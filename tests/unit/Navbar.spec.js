import { shallowMount, createLocalVue } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import Vuex from 'vuex';
import VueRouter from 'vue-router'


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const storeMock = {
  state: {
    carrito: [],
  },
  getters: {
    numeroCarrito(state) {
      return state.carrito.length
    }
  },
};

const store = new Vuex.Store(storeMock)

describe("Componente Navbar", () => {
  test("clase numeroCarrito", () => {
    const wrapper = shallowMount(Navbar, {
      localVue, store
    }
    );
    const numeroCarrito = wrapper.find(".numeroCarrito");
    expect(numeroCarrito.exists());
  })
})