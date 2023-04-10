<template>
  <q-page-container class="q-pa-none" style="padding: 0px">
    <q-page>
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            :icon="drawer ? 'close' : 'menu'"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title> {{ link }} </q-toolbar-title>
          <div v-if="link === 'Mahsulotlar'">
            <q-btn
              v-if="selection.length <= 0"
              icon="add"
              round
              flat
              dense
              @click="handleRoute"
            >
            </q-btn>
            <q-btn
              v-else
              icon="telegram"
              flat
              dense
              rounded
              clickable
              v-close-popup
              @click="postProduct"
            >
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        behavior="mobile"
        v-model="drawer"
        style="width: 250px"
        class="bg-primary column text-white"
      >
        <div
          class="items-center justify-center column logo"
          style="height: 200px"
        >
          <div>ZOBOT</div>
          <div style="font-size: 15px">admin</div>
        </div>
        <div style="height: calc(100vh - 200px)">
          <q-scroll-area class="flex fit">
            <div class="text-grey-5 text-subtitle1">
              <q-list>
                <q-item
                  style="border-left: 2px solid transparent"
                  v-for="item in drawerItems"
                  :key="item.label"
                  clickable
                  v-ripple
                  :to="item.to"
                  :active="link === item.label"
                  active-class="my-menu-link"
                  @click="changeLocationPage(item.label)"
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
                <q-item
                  style="border-left: 2px solid transparent"
                  clickable
                  v-ripple
                  @click="$router.replace('/')"
                >
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Чиқиш</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-scroll-area>
        </div>
      </q-drawer>

      <q-page-container class="bg-accent q-pa-none">
        <router-view></router-view>
      </q-page-container>
    </q-page>
  </q-page-container>
</template>

<script>
import { useUniversalStore } from "src/stores/universal";
import { useProductStore } from "src/stores/product";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDrawerItems } from "src/composable/drawerItems";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const { changeLocationPage } = useUniversalStore();
    const { link, disabled } = storeToRefs(useUniversalStore());
    const { selection } = storeToRefs(useProductStore());
    const { deleteProduct, postProduct } = useProductStore();
    const route = useRoute();
    const router = useRouter();
    const drawerItems = getDrawerItems();
    const $q = useQuasar();

    var drawer = ref(false);
    //functions
    link.value = ref(route.meta.page);
    function handleRoute() {
      router.push("/income");
    }
    function confirm() {
      $q.dialog({
        dark: false,
        color: "red",
        style: { background: "#2d303d", color: "white" },
        title: "Confirm",
        message: `Rostanham shu mahsulotni o'chirmoqchimisz?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const res = await deleteProduct();
        if (res) {
          $q.notify({
            message: "Mahsulot muvofaqiyatli o'chirildi!",
            type: "positive",
          });
          router.replace("/product");
        }
      });
    }
    return {
      confirm,
      link,
      drawer,
      drawerItems,
      disabled,
      selection,
      postProduct,
      changeLocationPage,
      handleRoute,
      toggleLeftDrawer() {
        drawer.value = !drawer.value;
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.line {
  width: 70%;
  margin: 10px 0px;
  height: 3px;
  border-radius: 2px;
  background: white;
}
.my-menu-link {
  color: white;
  border-right: 2px solid white;
  border-left: 2px solid white !important;
}
</style>
