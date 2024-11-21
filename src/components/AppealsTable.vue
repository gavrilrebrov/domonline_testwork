<template>
  <div class="appeals-table">
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="-1"
      no-data-text="Ничего не найдено"
      loading-text="Заргузка"
    >
      <template #[`item.number`]="{ item }">
        <v-chip color="primary">
          {{ item.number }}
        </v-chip>
      </template>

      <template #[`item.created_at`]="{ item }">
        {{ formatDate(item.created_at, 'DD.MM.YYYY') }}
      </template>

      <template #[`item.address`]="{ item }">
        {{ formatAddress(item.premise, item.apartment) }}
      </template>

      <template #[`item.applicant`]="{ item }">
        {{ formatApplicant(item.applicant) }}
      </template>

      <template #[`item.due_date`]="{ item }">
        {{ formatDate(item.due_date, 'DD.MM.YYYY HH:mm') }}
      </template>

      <template #[`item.status`]="{ item }">
        {{ item.status?.name }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ['loading'],

  data() {
    return {
      headers: [
        {
          text: '№',
          value: 'number',
        },
        {
          text: 'Создана',
          value: 'created_at',
        },
        {
          text: 'Адрес',
          value: 'address',
        },
        {
          text: 'Заявитель',
          value: 'applicant',
        },
        {
          text: 'Описание',
          value: 'description',
        },
        {
          text: 'Срок',
          value: 'due_date',
        },
        {
          text: 'Статус',
          value: 'status',
        },
      ],
    };
  },

  computed: {
    items() {
      return this.$store.state.appeals.items;
    },
  },

  methods: {
    formatDate(date, format) {
      return dayjs(date).format(format);
    },

    formatAddress(premise, apartment) {
      const address = [];

      if (premise?.address) address.push(premise.address);
      if (apartment?.label) address.push(apartment.label);

      return address.join(', ');
    },

    formatApplicant(applicant) {
      const nameArray = [];
      let initials = '';

      if (applicant.last_name) nameArray.push(applicant.last_name);
      if (applicant.first_name) initials += `${applicant.first_name[0]}.`;
      if (applicant.patronymic_name)
        initials += `${applicant.patronymic_name[0]}.`;

      if (initials) nameArray.push(initials);

      return nameArray.join(' ');
    },
  },
};
</script>

<style lang="scss">
.appeals-table {
  .v-chip {
    height: 28px;
    border-radius: 4px;
    color: white;
  }

  .v-data-table {
    th:first-child {
      padding: 0 8px;
    }

    th {
      span {
        font-weight: 400;
        color: var(--v-primary-base);
        font-size: 14px;
      }
    }

    td:first-child {
      padding: 0 4px;
    }

    & > .v-data-table__wrapper > table > tbody > tr > td {
      color: $color-text;
      height: 56px;
    }
  }
}
</style>
