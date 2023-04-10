<template>
  <q-page>
    <!-- :to="`/details/${item._id}`" -->
    <q-input
      class="q-mx-md"
      dark
      color="white"
      v-model="search"
      label="Qidirish"
    >
      <template v-slot:append>
        <q-icon v-if="!search" name="search" />
        <q-icon v-else name="clear" @click="search = ''"></q-icon>
      </template>
    </q-input>
    <q-scroll-area
      style="height: calc(100vh - 100px)"
      :thumb-style="{ width: '5px' }"
    >
      <q-list separator class="q-pa-md">
        <template v-for="product in searchProducts" :key="product._id">
          <q-item
            class="q-px-none"
            dark
            clickable
            :to="`/details/${product._id}`"
          >
            <q-item-section avatar>
              <q-avatar size="60px">
                <q-img :src="url + product.images"></q-img>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                lines="1"
                style="width: 50vw"
                class="ellipsis text-subtitle1 text-weight-bold"
                >{{ product.title }}</q-item-label
              >
              <q-item-label
                class="ellipsis"
                style="width: 55vw"
                caption
                lines="1"
              >
                {{ product.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side class="q-pa-none">
              <q-btn
                v-if="!product.inBasket"
                class="q-mr-xs bg-white"
                @click.prevent="addToCart(product.idx)"
                icon="add"
                color="primary"
                flat
                dense
                rounded
              ></q-btn>
              <q-btn
                v-else
                class="q-mr-xs bg-white"
                @click.prevent="removeFromCart(product.idx)"
                icon="delete"
                color="primary"
                flat
                dense
                rounded
              ></q-btn>
            </q-item-section> </q-item
        ></template>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useUniversalStore } from "src/stores/universal";
import { useProductStore } from "src/stores/product";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const { url } = storeToRefs(useUniversalStore());
    const { getProduct, addToCart, removeFromCart } = useProductStore();
    const { search, selection, cart, searchProducts } = storeToRefs(
      useProductStore()
    );
    const { link } = storeToRefs(useUniversalStore());
    const { changeLocationPage } = useUniversalStore();
    const route = useRoute();
    if (cart.value.length === 0) {
      getProduct();
    }
    changeLocationPage(route.meta.page);

    return {
      search,
      searchProducts,
      link,
      url,
      selection,
      cart,
      addToCart,
      removeFromCart,
    };
  },
});
</script>
