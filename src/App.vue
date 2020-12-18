<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
