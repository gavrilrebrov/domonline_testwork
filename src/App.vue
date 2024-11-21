<template>
  <v-app>
    <router-view />

    <app-notice />
  </v-app>
</template>

<script>
import AppNotice from '@/components/AppNotice.vue';

export default {
  components: { AppNotice },
};
</script>
