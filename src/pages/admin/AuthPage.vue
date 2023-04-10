<template>
  <q-page-container>
    <q-page class="bg-primary">
      <q-scroll-area style="height: calc(100vh - 50px)">
        <q-card flat dark class="bg-primary flex flex-center column">
          <div
            class="column justify-center"
            style="height: calc(100vh - 50px); width: 300px"
          >
            <div class="logo flex justify-center">
              <div>ADMIN</div>
            </div>
            <div class="text-center text-h6 q-pt-md">Kirish</div>

            <q-card-section>
              <q-form @submit="handleLogin">
                <q-input
                  class="q-pb-xs"
                  dark
                  v-model="user.login"
                  color="white"
                  label-color="grey-5"
                  label="Login"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
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
                  type="password"
                  v-model="user.password"
                  label="Parol"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Please type your password',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="key"></q-icon>
                  </template>
                </q-input>

                <div class="fit row justify-center">
                  <q-btn
                    class="text-black bg-white q-pa-sm q-mt-md"
                    style="border-radius: 20px; width: 200px"
                    label="Submit"
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
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { login } = useAuthStore();
    const { user } = storeToRefs(useAuthStore());
    const handleLogin = async () => {
      const res = await login();
      if (res) {
        router.replace("/admin");
        $q.notify({
          message: "Siz tizimga muvofaqiyatli kirdingiz!",
          type: "positive",
        });
      }
    };

    return {
      handleLogin,
      user,
    };
  },
});
</script>
