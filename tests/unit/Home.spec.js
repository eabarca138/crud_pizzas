import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex)

const storeMock = {
  state: {
    pizzas: [],
  },
  getters: {
    pizzasConStock(state) {
      return state.pizzas.filter((pizza) => pizza.stock > 0)
    }
  },
};

const store = new Vuex.Store(storeMock)

describe("Vista Home", () => {
  test("Presencia de Título", () => {
    const wrapper = shallowMount(Home, {
      localVue, store
    });
    const h1 = wrapper.find("h1");
    const titulo = "Pizzas";
    expect(h1.text()).toBe(titulo)
  })
})