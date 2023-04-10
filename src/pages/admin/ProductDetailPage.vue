<template>
  <q-page-container>
    <q-header>
      <q-toolbar>
        <q-toolbar-title>{{ link }}</q-toolbar-title>
        <q-btn icon="more_vert" flat dense round>
          <q-menu
            anchor="bottom left"
            self="top right"
            transition-show="scale"
            transition-hide="scale"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item @click="handleupdate" clickable>
                <q-item-section> Saqlash </q-item-section>
              </q-item>
              <q-item @click="deleteProduct(product._id)" clickable>
                <q-item-section>O'chirish</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-scroll-area style="height: calc(100vh - 50px)">
        <q-card flat class="bg-accent q-pa-md" dark>
          <q-form enctype="multipart/form-data">
            <div class="justify-center row">
              <q-avatar
                @click="openFilePicker"
                size="150px"
                color="primary"
                text-color="white"
              >
                <q-img :src="imageUrl"> </q-img>
                <input
                  type="file"
                  ref="fileInput"
                  style="display: none"
                  @change="handleFileChange"
                />
              </q-avatar>
            </div>

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
              behavior="menu"
              v-model="product.category"
              transition-show="flip-up"
              transition-hide="flip-down"
              class="q-my-sm q-pa-none"
              :popup-content-style="{
                backgroundColor: '#2D303D',
                color: '#fff',
              }"
              :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
              :options="categories.map((item) => item.title)"
              label="Bo'lim"
            />
            <q-select
              color="white"
              dark
              behavior="menu"
              :popup-content-style="{
                backgroundColor: '#2D303D',
                color: '#fff',
              }"
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
              type="number"
              color="white"
              @press.enter="handleupdate"
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
          </q-form>
        </q-card>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useProductStore } from "src/stores/product";
import { useCategoryStore } from "src/stores/category";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useUniversalStore } from "src/stores/universal";

export default defineComponent({
  setup() {
    const { updateProduct, deleteProduct } = useProductStore();
    const { getCategories } = useCategoryStore();
    const { changeLocationPage } = useUniversalStore();
    const { file, product } = storeToRefs(useProductStore());
    const { categories } = storeToRefs(useCategoryStore());
    const { link, url } = storeToRefs(useUniversalStore());
    const route = useRoute();
    getCategories();
    changeLocationPage(route.meta.page);

    product.value = JSON.parse(localStorage.getItem("product"));
    const imageUrl = ref(url.value + product.value.images[0]);

    const fileInput = ref(null);

    const openFilePicker = () => {
      fileInput.value.click();
    };

    const handleFileChange = (e) => {
      file.value = event.target.files[0];
      imageUrl.value = URL.createObjectURL(file.value);
    };
    const handleupdate = () => {
      updateProduct();
    };
    return {
      product,
      link,
      file,
      url,
      fileInput,
      categories,
      imageUrl,
      handleupdate,
      deleteProduct,
      openFilePicker,
      handleFileChange,
    };
  },
});
</script>
