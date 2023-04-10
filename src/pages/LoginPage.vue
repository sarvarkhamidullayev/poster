<template>
  <q-page-container class="">
    <q-page class="flex bg-primary flex-center">
      <q-card flat dark class="bg-primary column" style="width: 300px">
        <div class="logo flex justify-center">
          <div class="text-h4 q-pb-md">POSTER</div>
          <div class="text-h4 q-pb-md">BOT</div>
        </div>
        <div class="text-center text-h6">Kirish</div>

        <q-card-section>
          <q-list class="text-h6">
            <q-item
              class="bg-accent justify-center rounded-borders q-ma-md"
              clickable
              v-ripple
              to="/auth"
            >
              <q-item-section class="text-center">
                <div>Admin</div>
              </q-item-section>
            </q-item>
            <q-item
              class="bg-accent rounded-borders q-ma-md"
              clickable
              v-ripple
              to="/user"
            >
              <q-item-section class="text-center">
                <div>User</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    function prompt() {
      $q.dialog({
        dark: true,
        color: "white",
        style: { background: "#2d303d" },
        title: "Admin sifatida kirish",
        message: "Parolingizni kiriting!",
        prompt: {
          model: "",
          type: "password", // optional
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          if (data == 1234) {
            console.log(">>>> OK, received", data);
            router.replace("/admin");
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    return {
      prompt,
    };
  },
});
</script>
