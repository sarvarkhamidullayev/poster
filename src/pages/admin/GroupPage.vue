<template>
  <q-page>
    <q-bar reveal style="height: 60px" dark class="bg-primary">
      <q-form class="q-px-md fit" @submit="handleCreateCategory">
        <q-input
          class="fit q-ma-none"
          color="white"
          v-model="category.title"
          label="Bo'lim qoshish"
        >
          <template v-slot:append>
            <q-btn
              :disable="!category"
              class="bg-primary text-white"
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
    <q-scroll-area style="height: calc(100vh - 110px)">
      <q-list class="row justify-center">
        <q-item
          dark
          style="width: 340px"
          v-for="category in categories"
          :key="category.id"
          class="q-ma-sm rounded-borders bg-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar color="accent" text-color="white">{{
              category.title.slice(0, 1)
            }}</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-weight-bold">
              <div class="cursor-pointer ellipsis-2-lines" style="width: ">
                {{ category.title }}
                <q-popup-edit
                  class="bg-primary"
                  v-model="category.title"
                  auto-save
                  v-slot="scope"
                >
                  <q-input
                    dark
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    @keyup.enter="
                      handleUpdateCategory(scope, scope.value, category)
                    "
                  />
                </q-popup-edit>
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="delete"
              color="red-4"
              @click="handleDeleteCategory(category)"
            />
          </q-item-section>
        </q-item>
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
      createCategory();
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
