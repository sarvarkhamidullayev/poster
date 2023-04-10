<template>
  <q-page>
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
      <q-list separator>
        <template v-for="product in searchProducts" :key="product._id">
          <q-item
            class="q-pr-sm q-pl-md"
            dark
            clickable
            v-ripple
            @click="handleDetail(product)"
          >
            <q-item-section>
              <q-item-label
                lines="1"
                class="ellipsis text-subtitle1 text-weight-bold"
                >{{ product.title }}</q-item-label
              >
              <q-item-label
                class="ellipsis"
                style="width: 70vw"
                caption
                lines="1"
              >
                {{ product.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-checkbox
                dark
                keep-color
                v-model="selection"
                :val="product._id"
                color="grey-5"
              />
            </q-item-section> </q-item
        ></template>
      </q-list>
    </q-scroll-area>
    <div class="column flex flex-center" style="height: calc(100vh - 100px)">
      <div class="text-white">Hech narsa topilmadi !?</div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useProductStore } from "src/stores/product";
import { useUniversalStore } from "src/stores/universal";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const { getProduct } = useProductStore();
    const { products, searchProducts, search, selection } = storeToRefs(
      useProductStore()
    );
    const { url } = storeToRefs(useUniversalStore());
    const { changeLocationPage } = useUniversalStore();
    getProduct();
    const route = useRoute();
    const router = useRouter();
    changeLocationPage(route.meta.page);
    const handleDetail = (item) => {
      localStorage.setItem("product", JSON.stringify(item));
      router.push("/details");
    };
    return {
      handleDetail,
      searchProducts,
      products,
      search,
      selection,
      url,
    };
  },
});
</script>
