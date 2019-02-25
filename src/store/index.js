import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";
import { promised, resolve, reject } from "q";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    cart: []
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
          resolve();
        });
      });
      //Make the call
    },
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        //find the cart item
        const cartItem = context.state.cart.find(item => item.id === product.id);
        console.log(product);
        if (!cartItem) {
          //push the product to cart
          console.log('push the product to cart');
          context.commit('pushProductToCart', product.id);
        } else {
          //increment item quantity
          console.log('increment item quantity');
          context.commit('incrementItemQuantity', cartItem);
        }
        //decrement product inventory
        console.log('decrement product inventory');
        context.commit('decrementProductInventory', product);
      }
    }
  },
  mutations: {
    setProducts(state, products) {
      //Update products
      state.products = products;
    },

    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++;
    },
    decrementProductInventory(state, product){
      product.inventory--;
    }

  }
});
