<template>
  <div class="app-pagination">
    <div
      class="app-pagination__first"
      :class="{
        'app-pagination__first_disabled': modelValue === 1,
      }"
      @click="toFirst"
    >
      <v-icon> mdi-chevron-double-left </v-icon>
    </div>

    <v-pagination
      v-model="modelValue"
      :total-visible="7"
      :length="totalPages"
      circle
    />

    <div
      class="app-pagination__last"
      :class="{
        'app-pagination__last_disabled': modelValue === totalPages,
      }"
      @click="toLast"
    >
      <v-icon> mdi-chevron-double-right </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total', 'value', 'pageSize'],

  emits: ['input'],

  data() {
    return {
      modelValue: this.value,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
  },

  watch: {
    modelValue(value) {
      this.$emit('input', value);
    },

    value(value) {
      this.modelValue = value;
    },
  },

  methods: {
    toFirst() {
      if (this.modelValue !== 1) this.modelValue = 1;
    },

    toLast() {
      if (this.modelValue !== this.totalPages) {
        this.modelValue = this.totalPages;
      }
    },
  },
};
</script>

<style lang="scss">
.app-pagination {
  display: flex;
  align-items: center;

  &__first,
  &__last {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &_disabled {
      opacity: 0.6;
      cursor: default;
    }

    .v-icon {
      font-size: 16px;
    }

    .theme--light.v-icon {
      color: $color-text-muted;
    }
  }
}
</style>
