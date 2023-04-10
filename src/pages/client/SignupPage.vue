<template>
  <q-page-container class="bg-primary" style="padding: 0px">
    <q-page class="bg-accent">
      <q-scroll-area
        style="height: calc(100vh - 50px)"
        class="positon-relative"
      >
        <q-card
          flat
          dark
          class="flex q-pa-md absolute bg-accent"
          style="height: 100%"
        >
          <div class="column fit justify-center">
            <div class="text-center text-grey-5 text-subtitle1">
              Iltimos bog'lanish uchun ma'lumotlaringizni qoldiring!
            </div>
            <q-card-section>
              <q-form @submit="handleRegister">
                <q-input
                  class="q-pb-xs"
                  dark
                  v-model="user.nickname"
                  color="white"
                  label-color="grey-5"
                  label="Ismingiz"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type name',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="abc"></q-icon>
                  </template>
                </q-input>

                <q-input
                  dark
                  color="white"
                  label-color="grey-5"
                  type="tel"
                  v-model="user.phone"
                  label="Raqamingiz"
                  lazy-rules
                  mask="+##8-## ###-##-##"
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Please type your phone',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="phone"></q-icon>
                  </template>
                </q-input>

                <div class="fit row justify-center">
                  <q-btn
                    class="text-white bg-primary q-pa-sm q-mt-md"
                    style="border-radius: 20px; width: 200px"
                    label="Tasdiqlash"
                    type="submit"
                    color="primary"
                  />
                </div>
              </q-form>
            </q-card-section>
          </div>
        </q-card>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useProductStore } from "src/stores/product";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const { orderProduct } = useProductStore();
    const { cart } = storeToRefs(useProductStore());
    const user = reactive({
      name: "",
      phone: "",
      tgId: "",
      nickname: "",
    });
    function handleRegister() {
      orderProduct(user, cart.value);
    }
    return {
      user,
      handleRegister,
    };
  },
});
</script>
