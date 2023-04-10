<template>
  <q-page>
    <q-virtual-scroll
      v-if="cart.length > 0"
      style="height: calc(100vh - 50px)"
      :items="cart"
      separator
      v-slot="{ item }"
    >
      <q-card dark class="my-card q-ma-md bg-primary text-white">
        <q-item>
          <q-item-section avatar>
            <q-avatar square class="rounded-borders" size="70px">
              <img :src="url + item.images" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="column" style="justify-content: flex-start">
            <q-item-label class="text-h6">{{ item.title }}</q-item-label>
            <q-item-label
              caption
              class="ellipsis-2-lines text-white text-subtitle2"
            >
              {{ item.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section class="q-py-none">
          <q-input
            color="white"
            dark
            maxlength="6"
            v-model="item.quantity"
            label="Miqdori"
            v-money="{
              decimal: item.measure !== 'dona' ? '.' : '',
              thousands: ' ',
              precision: item.measure !== 'dona' ? 2 : 0,
            }"
          >
            <template v-slot:append>
              <span class="text-subtitle1 q-mt-md">{{ item.measure }}</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-badge class="text-h6">{{
            formatNumber(item.price * getNumber(item.quantity)) + " so'm"
          }}</q-badge>
          <q-space></q-space>
          <q-btn
            flat
            dense
            rounded
            icon="delete"
            @click="removeFromCart(item.idx)"
          ></q-btn>
        </q-card-actions>
      </q-card>

      <q-scroll-observer @scroll="onScroll" />
    </q-virtual-scroll>
    <div
      class="flex column flex-center text-grey-5 text-h6"
      style="height: calc(100vh - 50px)"
    >
      <div>Mahsulot tanlamadingiz!</div>
      <q-icon size="50px" name="production_quantity_limits"></q-icon>
    </div>
    <q-slide-transition>
      <q-footer v-if="cart.length > 0" v-show="fab">
        <q-toolbar class="q-pa-none">
          <q-btn
            @click="$router.push('/signup')"
            flat
            v-money="{
              decimal: '.',
              thousands: ' ',
              precision: 2,
            }"
            :label="`Buyurtma qilish: ${formatNumber(
              cart.reduce(
                (acc, item) => acc + item.price * getNumber(item.quantity),
                0
              )
            )} so'm`"
            class="fit q-ma-none"
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
  setup() {
    const { cart } = storeToRefs(useProductStore());
    const { removeFromCart } = useProductStore();
    const { changeLocationPage } = useUniversalStore();
    const { url } = storeToRefs(useUniversalStore());
    const route = useRoute();
    const { formatNumber, getNumber } = useUtils();

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

    return {
      cart,
      url,
      fab,
      onScroll,
      removeFromCart,
      formatNumber,
      getNumber,
    };
  },
});
</script>
