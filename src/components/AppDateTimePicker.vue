<template>
  <v-dialog v-model="modal" persistent width="590px">
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="formattedValue"
        :label="label"
        v-bind="attrs"
        v-on="on"
        readonly
      />
    </template>

    <div class="app-datetime-picker">
      <div class="app-datetime-picker__pickers">
        <v-date-picker
          v-model="values.date"
          color="primary"
          locale="ru"
          no-title
          scrollable
        />

        <v-time-picker
          v-model="values.time"
          color="primary"
          locale="ru"
          no-title
          scrollable
          :flat="true"
          :active-picker.sync="activeTimePicker"
        />
      </div>

      <div class="app-datetime-picker__footer">
        <div class="app-datetime-picker__value">
          {{ preview || 'Выберите дату и время' }}

          <v-btn
            @click="activeTimePicker = 'HOUR'"
            v-if="preview"
            icon
            small
            color="primary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <div class="app-datetime-picker__actions">
          <v-btn color="primary" text @click="onClose">Закрыть</v-btn>

          <v-btn
            color="primary"
            :disabled="!values.date || !values.time"
            @click="onApply"
          >
            Применить
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ['value', 'label', 'format'],

  emits: ['input'],

  data() {
    return {
      modal: false,

      preview: null,

      values: {
        date: this.value ? dayjs(this.value).format('YYYY-MM-DD') : null,
        time: this.value ? dayjs(this.value).format('HH:mm') : null,
      },

      modelValue: this.value,
      activeTimePicker: 'HOUR',
    };
  },

  computed: {
    formattedValue() {
      return this.modelValue
        ? dayjs(this.modelValue).format(this.format)
        : undefined;
    },
  },

  methods: {
    onClose() {
      this.modal = false;
    },

    onApply() {
      const time = this.values.time.split(':');

      const date = dayjs(this.values.date)
        .set('hours', time[0])
        .set('minutes', time[1]);

      this.modelValue = date.format();
      this.modal = false;
    },

    formatDate(date) {
      return dayjs(date).format(this.format);
    },

    resetValues() {
      this.values = {
        date: this.value ? dayjs(this.value).format('YYYY-MM-DD') : null,
        time: this.value ? dayjs(this.value).format('HH:mm') : null,
      };
    },
  },

  watch: {
    values: {
      handler(values) {
        if (values.date && values.time) {
          const time = values.time.split(':');

          const date = dayjs(values.date)
            .set('hours', time[0])
            .set('minutes', time[1]);

          this.preview = date.format(this.format);
        }
      },
      deep: true,
    },

    modelValue(value) {
      this.$emit('input', value);
    },

    value(value) {
      if (value) {
        this.values.date = dayjs(value).format('YYYY-MM-DD');
        this.values.time = dayjs(value).format('HH:mm');
      } else {
        this.values.date = null;
        this.values.time = null;
      }

      this.modelValue = value;
    },
  },
};
</script>

<style lang="scss">
.app-datetime-picker {
  background-color: white;

  &__pickers {
    display: flex;
  }

  &__footer {
    display: flex;
    padding: 16px 24px;
    align-items: center;
  }

  &__value {
    flex-grow: 1;
    color: $color-text-muted;
    display: flex;
    align-items: center;

    .v-btn {
      margin-left: 8px;
    }
  }

  &__actions {
    display: flex;
    gap: 14px;
  }
}
</style>
