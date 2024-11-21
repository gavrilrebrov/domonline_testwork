<template>
  <div class="app-notice">
    <v-snackbar v-model="$store.state.notices.isShow" color="white">
      <div class="app-notice__body">
        <div class="app-notice__icon">
          <v-icon v-if="$store.state.notices.type === 'error'" color="error">
            mdi-alert-circle
          </v-icon>
        </div>

        <div class="app-notice__message">
          {{ $store.state.notices.message }}
        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script></script>

<style lang="scss">
.app-notice {
  &__body {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    color: red !important;
  }

  &__message {
    color: $color-text;
  }
}
</style>
