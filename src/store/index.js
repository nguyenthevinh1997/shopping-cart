import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";
import { promised, resolve, reject } from "q";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: []
  },
  getters: {
    // = computed propertises
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve()
        });
      });
      //Make the call
    }
  },
  mutations: {
    setProducts(state, products) {
      //Update products
      state.products = products;
    }
  }
});
