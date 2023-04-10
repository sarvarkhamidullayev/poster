<script>
// import { toRefs } from "vue";
export default {
  name: "MyComponent",
  props: {
    product: {
      type: Object,
      default: () => ({
        title: "",
        category: "",
        description: "",
        measure: "",
        price: null,
      }),
    },
    setup(props) {
      // const { pro } = toRefs(props);
      console.log("/////////////");
      console.log(props, "//////////");
      // const product = reactive(props.product);
    },
  },
};
</script>
<template>
  {{ product }}
  <!-- <q-input v-model="pro"></q-input> -->
  <!-- <div>
    <q-input
      class="q-my-sm q-pa-none"
      outlined
      bg-color="primary"
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
      color="white"
      bg-color="primary"
      v-model="product.description"
      label="Mahsulot haqida"
      class="q-my-sm q-pa-none"
      outlined
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
      square
      bg-color="primary"
      v-model="product.category"
      transition-show="flip-up"
      transition-hide="flip-down"
      class="q-my-sm q-pa-none"
      outlined
      :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
      :options="categories.map((item) => item.title)"
      label="Bo'lim"
    />
    <q-select
      square
      bg-color="primary"
      v-model="product.measure"
      transition-show="flip-up"
      transition-hide="flip-down"
      class="q-my-sm q-pa-none"
      outlined
      :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
      :options="['kg', 'metr', 'dona', 'litr']"
      label="O'lchov birligi"
    />
    <q-input
      type="number"
      color="white"
      bg-color="primary"
      outlined
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
      bg-color="primary"
      color="white"
      clearable
      class="q-my-sm q-pa-none"
      outlined
      :rules="[(val) => !!val || 'Bu qatorni to`ldiring!']"
      v-model="file"
      accept="image/*"
      label="Rasmni tanlang"
    />
    <q-card-actions class="row justify-end">
      <q-btn flat color="grey-5" label="Bekor qilish" type="reset" />
      <q-btn flat label="Saqlash" type="submit" />
    </q-card-actions>
  </div> -->
</template>
