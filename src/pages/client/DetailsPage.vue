<template>
  <q-page>
    <q-scroll-area style="height: calc(100vh - 50px)">
      <div class="row justify-center q-ma-md rounded-borders">
        <q-img :ratio="16 / 9" :src="url + productInfo.images"> </q-img>
      </div>
      <q-card flat class="bg-accent q-ma-md" dark>
        <q-card-section class="q-pa-none row">
          <q-toolbar s style="height: 80px" class="q-pa-none rounded-borders">
            <q-toolbar-title class="column q-pa-none text-h6">
              <span class="text-h5 ellipsis" style="width: 100%">{{
                productInfo.title
              }}</span>
              <span class="text-h6">{{ productInfo.category }}</span>
            </q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator dark></q-separator>
        <q-card-section
          class="q-pa-xs bg-primary rounded-borders q-my-sm q-pa-sm justify-between items-center row"
        >
          <q-input
            class="bg-accent q-pa-none rounded-borders text-h6"
            color="white"
            dark
            maxlength="6"
            borderless
            v-money="{
              decimal: productInfo.measure !== 'dona' ? '.' : '',
              thousands: ' ',
              precision: productInfo.measure !== 'dona' ? 2 : 0,
            }"
            :input-style="{
              width: '100px',
              height: '50px',
              textAlign: 'center',
            }"
            v-model="productInfo.quantity"
          >
          </q-input>
          <q-icon name="sync_alt"></q-icon>
          <q-badge class="text-h5 bg-accent input-style ellipsis text-center">{{
            formatNumber(
              getNumber(productInfo.price) * getNumber(productInfo.quantity)
            )
          }}</q-badge>
        </q-card-section>
        <q-card-actions align="center">
          <div class="text-subtitle1 text-capitalize" style="min-height: 100px">
            {{ productInfo.description }}
          </div>
        </q-card-actions>
      </q-card>
      <q-scroll-observer @scroll="onScroll" />
    </q-scroll-area>
    <q-slide-transition>
      <q-footer v-show="fab">
        <q-toolbar class="justify-center q-pa-none">
          <q-btn
            @click="handleOrder"
            flat
            label="Savatga qoshish"
            class="q-ma-none"
            icon-right="add_shopping_cart"
          >
          </q-btn
        ></q-toolbar>
      </q-footer>
    </q-slide-transition>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUniversalStore } from "src/stores/universal";
import { useProductStore } from "src/stores/product";
import { storeToRefs } from "pinia";
import { useUtils } from "src/utils/utils";
export default defineComponent({
  props: ["id"],
  setup(props) {
    const { link, url } = storeToRefs(useUniversalStore());
    const { changeLocationPage } = useUniversalStore();
    const { getByIdProduct, addToCart } = useProductStore();
    const { productInfo, cart } = storeToRefs(useProductStore());
    const { formatNumber, getNumber } = useUtils();
    const route = useRoute();
    const router = useRouter();
    const id = ref(props.id);
    const handleDetail = async () => {
      await getByIdProduct(id.value);
    };
    handleDetail();
    changeLocationPage(route.meta.page);
    const fab = ref(true);

    function onScroll(info) {
      if (info.direction === "up") {
        fab.value = true;
      }
      if (info.direction === "down") {
        fab.value = false;
      }
    }
    function handleOrder() {
      addToCart(productInfo.value.idx);
      router.go(-1);
    }
    return {
      link,
      url,
      productInfo,
      cart,
      fab,
      formatNumber,
      getNumber,
      onScroll,
      handleOrder,
    };
  },
});
</script>
<style scoped>
.input-style {
  min-width: 100px;
  text-align: center;
  max-width: 130px;
  height: 55px;
}
</style>
