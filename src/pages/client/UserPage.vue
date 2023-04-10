<template>
  <q-page-container>
    <q-header>
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn
          v-if="link !== 'Asosiy'"
          round
          dense
          flat
          icon="arrow_back"
          class="q-mr-xs"
          @click="$router.go(-1)"
        />
        <q-btn
          v-if="link === 'Asosiy'"
          round
          dense
          flat
          icon="menu"
          class="q-mr-xs"
        />
        <q-toolbar-title>{{ link }}</q-toolbar-title>

        <q-btn
          v-if="link === 'Asosiy' || link === 'Ma\'lumot'"
          @click="openCart"
          dense
          round
          flat
          icon="shopping_cart"
        >
          <q-badge color="orange" floating transparent>
            {{ cart.length }}
          </q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>
    <router-view></router-view>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "src/stores/product";
import { useUniversalStore } from "src/stores/universal";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const { selection, cart, search } = storeToRefs(useProductStore());
    const { link } = storeToRefs(useUniversalStore());
    const { changeLocationPage } = useUniversalStore();
    const route = useRoute();
    const router = useRouter();
    changeLocationPage(route.meta.page);

    function openCart() {
      router.push("/order");
    }

    return {
      cart,
      link,
      search,
      selection,
      openCart,
    };
  },
});
</script>
