<template>
  <div class="appeals-filters">
    <v-text-field
      v-model="searchInput"
      label="Поиск (№ заявки, название)"
      append-icon="mdi-magnify"
    />

    <v-autocomplete
      v-model="premises.value"
      :search-input.sync="premises.input"
      :loading="premises.loading"
      label="Дом"
      :items="premisesItems"
      item-text="label"
      item-value="value"
      hide-no-data
    />
  </div>
</template>

<script>
export default {
  props: ['search', 'premiseId'],

  emits: ['update:search', 'update:premiseId'],

  data() {
    return {
      searchInput: this.search,
      searchTimeout: undefined,
      premises: {
        loading: false,
        input: null,
        value: this.premiseId,
      },
    };
  },

  computed: {
    premisesItems() {
      return this.$store.state.premises.items.map((i) => ({
        label: i.address,
        value: i.id,
      }));
    },
  },

  watch: {
    search(value) {
      this.searchInput = value;
    },

    searchInput(value) {
      clearTimeout(this.searchTimeout);

      if (value) {
        this.searchTimeout = setTimeout(() => {
          this.$emit('update:search', value);
        }, 700);
      } else {
        this.$emit('update:search', value);
      }
    },

    'premises.input'(value) {
      if (this.premises.loading) return;

      this.fetchPremises(value);
    },

    'premises.value'(value) {
      this.$emit('update:premiseId', value);
    },

    premiseId(value) {
      this.premises.value = value;
    },
  },

  methods: {
    async fetchPremises(search) {
      this.premises.loading = true;

      await this.$store.dispatch('premises/fetchItems', {
        search,
      });

      this.premises.loading = false;
    },
  },
};
</script>

<style lang="scss">
.appeals-filters {
  display: flex;
  gap: 15px;

  @include large-field;
}
</style>
