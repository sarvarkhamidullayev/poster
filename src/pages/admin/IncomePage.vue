<template>
  <q-page-container>
    <q-header>
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          type="reset"
          @click="handleReset"
          flat
          dense
          round
        ></q-btn>
        <q-toolbar-title>{{ link }}</q-toolbar-title>
        <q-btn
          type="submit"
          icon="done"
          @click="handleCreate"
          flat
          dense
          round
        ></q-btn>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-scroll-area style="height: calc(100vh - 50px)">
        <q-card flat class="bg-accent q-pa-md" dark>
          <q-form enctype="multipart/form-data">
            <q-input
              dark
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
              color="white"
              v-model="product.title"
              label="Mahsulot nomi"
            >
              <template v-if="product.title" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="product.title = null"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-input
              dark
              color="white"
              autogrow
              v-model="product.description"
              type="textarea"
              label="Mahsulot haqida"
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
            >
              <template v-if="product.description" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="product.description = null"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-select
              dark
              color="white"
              v-model="product.category"
              transition-show="flip-up"
              transition-hide="flip-down"
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
              :options="categories.map((item) => item.title)"
              label="Bo'lim"
            />
            <q-select
              color="white"
              dark
              v-model="product.measure"
              transition-show="flip-up"
              transition-hide="flip-down"
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
              :options="['kg', 'metr', 'dona', 'litr']"
              label="O'lchov birligi"
            />
            <q-input
              dark
              color="white"
              v-model="product.price"
              label="Mahsulot narxi"
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
            >
              <template v-if="product.price" v-slot:append>
                <span style="font-size: 20px">so'm</span>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="product.price = null"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-file
              dark
              color="white"
              clearable
              class="q-my-sm q-pa-none"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
              v-model="file"
              accept="image/*"
              label="Rasmni tanlang"
            />
          </q-form>
        </q-card>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useProductStore } from "src/stores/product";
import { useCategoryStore } from "src/stores/category";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useUniversalStore } from "src/stores/universal";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const { createProduct } = useProductStore();
    const { getCategories } = useCategoryStore();
    const { product, file } = storeToRefs(useProductStore());
    const { categories } = storeToRefs(useCategoryStore());
    const { changeLocationPage } = useUniversalStore();
    const { link } = storeToRefs(useUniversalStore());
    const $q = useQuasar();
    getCategories();
    const route = useRoute();
    const router = useRouter();
    const handleReset = () => {
      product.value = {
        title: "",
        category: "",
        description: "",
        measure: "",
        price: null,
      };
      file.value = null;
      router.go(-1);
    };
    changeLocationPage(route.meta.page);
    const handleCreate = () => {
      if (
        product.value.title == "" ||
        product.value.description == "" ||
        product.value.category == "" ||
        product.value.measure == "" ||
        product.value.price <= 0 ||
        file.value == ""
      ) {
        $q.notify({
          type: "negative",
          message: "Iltimos barcha qatorlarni to'ldiring!",
        });
        return;
      }
      const res = createProduct();
      if (res) {
        handleReset();
      }
    };

    return {
      product,
      link,
      file,
      handleCreate,
      handleReset,
      categories,
    };
  },
});
</script>
