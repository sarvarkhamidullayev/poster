<template>
  <q-page>
    <q-bar reveal style="height: 60px" dark class="bg-accent">
      <q-form class="q-px-xs fit" @submit="handleCreateCategory">
        <q-input
          class="fit q-ma-none"
          color="white"
          dark
          v-model="category.title"
          label="Bo'lim momi"
        >
          <template v-slot:append>
            <q-btn
              :disable="!category"
              class="bg-accent text-white"
              @click="handleCreateCategory()"
              dense
              flat
              size="md"
              rounded
              icon="add"
            ></q-btn>
          </template>
        </q-input>
      </q-form>
    </q-bar>
    <q-scroll-area
      style="height: calc(100vh - 128px)"
      :thumb-style="{ width: '5px' }"
    >
      <q-list>
        <template v-for="category in categories" :key="category._id">
          <q-item class="q-py-md">
            <q-item-section class="text-white text-subtitle1 ellipsis">
              <div class="cursor-pointer ellipsis" style="width: 70vw">
                {{ category.title }}
                <q-popup-edit
                  v-model="category.title"
                  class="bg-primary text-white"
                  v-slot="scope"
                >
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    @keyup.enter="
                      handleUpdateCategory(scope, scope.value, category)
                    "
                  >
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </div>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                color="white"
                flat
                dense
                round
                icon="delete"
                @click="handleDeleteCategory(category._id)"
              />
            </q-item-section>
          </q-item>
          <q-separator color="grey-7" class="q-mx-md" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useCategoryStore } from "src/stores/category";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const {
      createCategory,
      getCategories,
      updateCategories,
      deleteCategories,
    } = useCategoryStore();

    const { categories, category } = storeToRefs(useCategoryStore());

    getCategories();

    const handleCreateCategory = () => {
      if (category.value.title) {
        createCategory();
      }
    };
    const handleDeleteCategory = (category) => {
      deleteCategories(category);
    };
    const handleUpdateCategory = (scope, title, category) => {
      const check = categories.value.findIndex((item) => item.title === title);
      if (check === -1) {
        scope.set();
        updateCategories(category._id, title);
        return;
      }
      scope.value = category.title;
      scope.set();
      $q.notify({
        message: "Bu bo'lim allaqachon yaratilgan!",
        type: "negative",
      });
    };
    return {
      handleCreateCategory,
      handleDeleteCategory,
      handleUpdateCategory,
      categories,
      category,
    };
  },
});
</script>
