<template>
  <div class="appeals-form">
    <div class="appeals-form__header">
      <div class="appeals-form__title">
        {{ selectedId ? '' : 'Создание заявки' }}
      </div>

      <div class="appeals-form__status">
        {{ selectedId ? '' : 'Новая' }}
      </div>
    </div>

    <v-form class="appeals-form__form">
      <div class="appeals-form__row">
        <div class="appeals-form__field">
          <v-autocomplete label="Дом" />
        </div>

        <div class="appeals-form__field">
          <v-autocomplete label="Квартира" />
        </div>

        <div class="appeals-form__field">
          <app-date-time-picker label="Срок" format="DD.MM.YYYY HH:mm" />
        </div>
      </div>

      <div class="appeals-form__row">
        <div class="appeals-form__field">
          <v-text-field label="Фамилия" />
        </div>

        <div class="appeals-form__field">
          <v-text-field label="Имя" />
        </div>

        <div class="appeals-form__field">
          <v-text-field label="Отчество" />
        </div>

        <div class="appeals-form__field">
          <v-text-field label="Телефон" />
        </div>
      </div>

      <div class="appeals-form__row">
        <div class="appeals-form__field">
          <v-textarea label="Описание заявки" />
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import AppDateTimePicker from './AppDateTimePicker.vue';

export default {
  components: { AppDateTimePicker },

  props: ['selectedId'],

  data() {
    return {
      formState: {
        premise_id: null,
        apartment_id: null,
        applicant: {
          first_name: null,
          last_name: null,
          patronymic_name: null,
          username: null,
        },
        description: null,
        due_date: null,
      },
    };
  },
};
</script>

<style lang="scss">
.appeals-form {
  background-color: white;
  padding: 24px 32px;

  &__header {
    display: flex;
    height: 40px;
    align-items: center;
  }

  &__title {
    flex-grow: 1;
    font-weight: 500;
  }

  &__status {
    font-size: 14px;
    font-family: 'Inter';
  }

  &__form {
    margin-top: 24px;
  }

  &__row {
    display: flex;
    width: 100%;
    gap: 14px;
  }

  &__field {
    width: 100%;
  }

  // @include large-field;
}
</style>
