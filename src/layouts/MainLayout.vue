<template>
  <q-layout view="lHh Lpr lFf" class="bg-accent">
    <router-view></router-view>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },
});
</script>
