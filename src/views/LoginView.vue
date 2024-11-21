<template>
  <div class="login-view">
    <div class="login-view__card">
      <div class="login-view__title">Авторизация</div>

      <v-form ref="formRef" v-model="valid" class="login-view__form">
        <v-text-field
          v-model="formState.username"
          v-maska="isPhone ? '+7 ### ### ## ##' : undefined"
          :rules="rules.username"
          label="Логин или Телефон"
          prepend-inner-icon="mdi-phone"
        />

        <v-text-field
          v-model="formState.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Пароль"
          :rules="rules.password"
          prepend-inner-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
        />
      </v-form>

      <div class="login-view__actions">
        <v-btn
          :loading="loading"
          :disabled="loading"
          @click="onSubmit"
          color="primary"
          class="login-view__submit-btn"
        >
          Войти
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from 'maska/vue';

export default {
  directives: {
    maska: vMaska,
  },

  data() {
    return {
      loading: false,
      formState: {
        username: null,
        password: null,
      },
      valid: false,
      rules: {
        username: [
          (v) => !!v || 'Обязательное поле',
          (v) =>
            this.validateUsername(v) || 'Введите правильный номер телефона',
        ],
        password: [(v) => !!v || 'Обязательное поле'],
      },
      showPassword: false,
      isPhone: false,
    };
  },

  watch: {
    'formState.username'(value) {
      this.$refs.formRef.resetValidation();

      if (
        /^\+7\s?\d*$/.test(value.replace(/\s/g, '')) ||
        /^\d+$/.test(value.replace(/\s/g, ''))
      ) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    },
  },

  methods: {
    async onSubmit() {
      this.$refs.formRef.validate();

      if (this.valid) {
        this.loading = true;

        await this.$store.dispatch('auth/login', {
          password: this.formState.password,
          username: this.isPhone
            ? this.formState.username.replace(/[+\s]/g, '')
            : this.formState.username,
        });

        this.loading = false;
      }
    },

    validateUsername(v) {
      if (this.isPhone && v.length <= 15) {
        return false;
      }

      return true;
    },
  },
};
</script>

<style lang="scss">
.login-view {
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    background-color: white;
    border-radius: 5px;
    padding: 0px 20px 20px;
    width: 100%;
    max-width: 340px;
  }

  &__title {
    padding: 18px;
    background-color: var(--v-primary-base);
    color: white;
    border-radius: 5px;
    font-weight: 500;
    text-align: center;
    margin: -19px -4px 0;
    font-family: Inter;
  }

  &__form {
    margin-top: 49px;
  }

  &__actions {
    margin-top: 4px;
    text-align: center;
  }

  &__submit-btn {
    letter-spacing: 0;
    text-transform: capitalize;
    padding: 0 35px !important;
  }
}
</style>
