<template>
  <div class="appeals-view">
    <div class="appeals-view__header">
      <div class="appeals-view__header-title">Список заявок</div>
    </div>

    <div class="appeals-view__body">
      <div class="appeals-view__card">
        <div class="appeals-view__actions">
          <v-dialog v-model="dialog" max-width="738px">
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="appeals-view__actions-btn"
              >
                Создать
              </v-btn>
            </template>

            <appeals-form />
          </v-dialog>
        </div>

        <div class="appeals-view__filters">
          <appeals-filters
            :search.sync="filters.search"
            :premise-id.sync="filters.premiseId"
          />
        </div>

        <div class="appeals-view__table">
          <appeals-table :loading="loading" />
        </div>

        <div v-if="$store.state.appeals.count > 0" class="appeals-view__footer">
          <div class="appeals-view__limit">
            <div class="appeals-view__limit-info">
              <strong>
                {{ showedSegment }}
              </strong>
              из
              <strong>
                {{ $store.state.appeals.count }}
              </strong>
              записей
            </div>

            <div class="appeals-view__limit-select">
              <v-select
                v-model="pagination.pageSize"
                hide-details
                :items="limitItems"
              />
            </div>
          </div>

          <app-pagination
            v-if="$store.state.appeals.count > pagination.pageSize"
            v-model="pagination.page"
            :total="$store.state.appeals.count"
            :page-size="pagination.pageSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppealsTable from '@/components/AppealsTable.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppealsFilters from '@/components/AppealsFilters.vue';
import AppealsForm from '@/components/AppealsForm.vue';

export default {
  components: {
    AppealsTable,
    AppPagination,
    AppealsFilters,
    AppealsForm,
  },

  data() {
    return {
      pagination: {
        page: 1,
        pageSize: 10,
      },
      filters: {
        search: undefined,
        premiseId: undefined,
      },
      loading: false,
      limitItems: [10, 20, 50, 100],
      dialog: false,
    };
  },

  created() {
    this.fetchItems();
  },

  computed: {
    showedSegment() {
      let start = 1;
      let end = this.pagination.pageSize;

      if (this.pagination.pageSize > this.$store.state.appeals.count) {
        end = this.$store.state.appeals.count;
      }

      if (this.pagination.page > 1) {
        start +=
          this.pagination.pageSize * this.pagination.page -
          this.pagination.pageSize;
        end = this.pagination.page * this.pagination.pageSize;
      }

      return `${start} - ${end}`;
    },
  },

  watch: {
    pagination: {
      handler() {
        this.fetchItems();
      },
      deep: true,
    },

    filters: {
      handler() {
        if (this.pagination.page !== 1) {
          this.pagination.page = 1;
        } else {
          this.fetchItems();
        }
      },
      deep: true,
    },
  },

  methods: {
    async fetchItems() {
      this.loading = true;

      await this.$store.dispatch('appeals/fetchItems', {
        filters: this.filters,
        pagination: this.pagination,
      });

      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.appeals-view {
  background-color: $color-bg;
  min-height: 100vh;

  &__header {
    padding: 0 32px;
    height: 71px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
      line-height: 24px;
    }
  }

  &__body {
    margin-top: 20px;
    padding: 27px 15px;
  }

  &__card {
    background: white;
    padding: 10px 20px;
    border-radius: 8px;
  }

  &__table {
    margin-top: 10px;
  }

  &__actions {
    display: flex;
    justify-content: end;

    &-btn {
      letter-spacing: 0;
      border-radius: 2px;

      &.v-btn:not(.v-btn--round).v-size--default {
        height: 26px;
      }

      .v-btn__content {
        font-size: 10px;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
  }

  &__limit {
    display: flex;
    align-items: center;
    gap: 16px;

    &-info {
      font-size: 14px;
      color: $color-text;
      // margin-top: -8px;
    }

    &-select {
      max-width: 90px;

      .v-input {
        padding-top: 0;
        margin-top: 0;
      }
    }
  }

  &__filters {
    margin-top: 16px;
  }
}
</style>
