<template>
  <div class="hello">
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button
        :disabled="!productIsInStock (product)"
          @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
// import shop from "@/api/shop.js";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    productIsInStock()
    {
      return this.$store.getters.productIsInStock;
    }
  },
  methods: {
    addProductToCart(product) {
      
      this.$store.dispatch("addProductToCart", product);
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
