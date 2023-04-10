<template>
  <q-page>
    <q-card>
      <q-tab-panels
        style="height: calc(100vh - 100px)"
        class="bg-accent"
        v-model="tab"
        animated
        swipeable
        infinite
      >
        <q-tab-panel name="pending" class="q-pa-none">
          <div
            v-if="getPendings.length === 0"
            class="fit column flex flex-center"
          >
            <span class="text-subtitle2 text-grey-5">
              Hozircha buyurtmalar mavjud emas!</span
            >
          </div>
          <q-virtual-scroll
            scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
            :items="getPendings"
            :virtual-scroll-item-size="15"
            separator
            v-slot="{ item, index }"
          >
            <q-expansion-item
              :key="item._id"
              dark
              class="text-white"
              group="somegroup"
              expand-separator
              header-class="listGroup"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" size="50px" text-color="white">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <span style="font-size: 18px">{{ item.user.phone }}</span>
                  <span style="width: 100%" class="text-subtitle ellipsis">{{
                    formatNumber(item.total) + " so'm"
                  }}</span>
                </q-item-section>

                <q-item-section side>
                  <q-icon
                    name="phone"
                    color="white"
                    @click="callNumber(item.user.phone)"
                  ></q-icon>
                </q-item-section>
              </template>
              <q-card dark class="bg-accent">
                <q-card-section class="q-py-none">
                  <q-list separator>
                    <q-item
                      v-for="product in item.products"
                      :key="product.id"
                      class="q-my-sm"
                      clickable
                      v-ripple
                    >
                      <q-item-section>
                        <q-item-label>{{ product.title }}</q-item-label>
                        <q-item-label caption class="text-white" lines="1">{{
                          formatNumber(product.price) + " so'm"
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-badge
                          style="width: 50px"
                          class="q-pa-sm bg-accent text-end"
                          >{{
                            product.quantity + " " + product.measure
                          }}</q-badge
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    dense
                    class="text-grey-5"
                    label="Bekor qilish"
                    @click="acceptOrder(item.idx, 'bekor')"
                  >
                  </q-btn>
                  <q-btn
                    flat
                    dense
                    label="Qabul qilish"
                    @click="acceptOrder(item.idx, 'tasdiqlandi')"
                  >
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-expansion-item>
          </q-virtual-scroll>
        </q-tab-panel>

        <q-tab-panel name="accepted" class="q-pa-none">
          <div
            v-if="getAccepted.length === 0"
            class="fit column flex flex-center"
          >
            <span
              style="width: 250px"
              class="text-subtitle2 text-center text-grey-5"
            >
              Hozircha qabul qilingan buyurtmalar mavjud emas!</span
            >
          </div>
          <q-virtual-scroll
            scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
            :items="getAccepted"
            :virtual-scroll-item-size="15"
            separator
            v-slot="{ item, index }"
          >
            <q-expansion-item
              :key="item._id"
              class="text-white"
              group="somegroup"
              expand-separator
              header-class="listGroup"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" size="50px" text-color="white">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <span class="text-h6">{{ item.user.phone }}</span>
                  <span class="text-subtitle">{{
                    formatNumber(item.total) + " so'm"
                  }}</span>
                </q-item-section>

                <q-item-section side>
                  <q-icon
                    name="phone"
                    color="white"
                    @click="callNumber(item.user.phone)"
                  ></q-icon>
                </q-item-section>
              </template>
              <q-card dark class="bg-accent">
                <q-card-section class="q-py-none">
                  <q-list separator>
                    <q-item
                      v-for="product in item.products"
                      :key="product.id"
                      class="q-my-sm"
                      clickable
                      v-ripple
                    >
                      <q-item-section>
                        <q-item-label>{{ product.title }}</q-item-label>
                        <q-item-label caption class="text-white" lines="1">{{
                          formatNumber(product.price) + " so'm"
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-badge
                          style="width: 50px"
                          class="q-pa-sm bg-accent text-end"
                          >{{
                            product.quantity + " " + product.measure
                          }}</q-badge
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-virtual-scroll>
        </q-tab-panel>

        <q-tab-panel name="rejected" class="q-pa-none">
          <div
            v-if="getRejected.length === 0"
            class="fit column flex flex-center"
          >
            <span
              style="width: 250px"
              class="text-subtitle2 text-center text-grey-5"
            >
              Hozircha rad etilgan buyurtmalar mavjud emas!</span
            >
          </div>
          <q-virtual-scroll
            scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
            :items="getRejected"
            :virtual-scroll-item-size="15"
            separator
            v-slot="{ item, index }"
          >
            <q-expansion-item
              :key="item._id"
              class="text-white"
              group="somegroup"
              expand-separator
              header-class="listGroup"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" size="50px" text-color="white">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <span class="text-h6">{{ item.user.phone }}</span>
                  <span class="text-subtitle">{{
                    formatNumber(item.total) + " so'm"
                  }}</span>
                </q-item-section>

                <q-item-section side>
                  <q-icon
                    name="phone"
                    color="white"
                    @click="callNumber(item.user.phone)"
                  ></q-icon>
                </q-item-section>
              </template>
              <q-card dark class="bg-accent">
                <q-card-section class="q-py-none">
                  <q-list separator>
                    <q-item
                      v-for="product in item.products"
                      :key="product.id"
                      class="q-my-sm"
                      clickable
                      v-ripple
                    >
                      <q-item-section>
                        <q-item-label>{{ product.title }}</q-item-label>
                        <q-item-label caption class="text-white" lines="1">{{
                          formatNumber(product.price) + " so'm"
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-badge
                          style="width: 50px"
                          class="q-pa-sm bg-accent text-end"
                          >{{
                            product.quantity + " " + product.measure
                          }}</q-badge
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        v-model="tab"
        style="height: 50px"
        indicator-color="transparent"
        draggable
        stretch
        dense
        class="text-grey-5 bg-primary"
        active-color="white"
        align="justify"
      >
        <q-tab name="pending" label="Yangilari" />
        <q-tab name="accepted" label="Tasdiqlangan" />
        <q-tab name="rejected" label="Bekor" />
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useOrderStore } from "src/stores/order";
import { storeToRefs } from "pinia";
import { useUtils } from "src/utils/utils";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const { getOrders, acceptOrder } = useOrderStore();
    const { formatNumber } = useUtils();
    const { getPendings, getAccepted, getRejected, orders } = storeToRefs(
      useOrderStore()
    );
    const tab = ref("pending");
    getOrders();

    function callNumber(number) {
      window.open(`tel:${number}`, "_system");
    }

    return {
      tab,
      orders,
      getPendings,
      getAccepted,
      getRejected,
      formatNumber,
      acceptOrder,
      callNumber,
    };
  },
});
</script>
<style scoped>
.listGroup {
  color: white;
  font-size: 60px !important;
}
</style>
