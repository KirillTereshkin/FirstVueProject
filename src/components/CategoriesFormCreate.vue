<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="categoryName"
            :class="{ invalid: isCategoryNameValid() }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="isCategoryNameValid()"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="categoryLimit"
            :class="{ invalid: isCategoryLimitValid() }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="isCategoryLimitValid()"
            >Минимальная величина - {{ categoryLimitMinValue }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
import { toastStyles, toastMessages } from "@/utils/toast-info";

export default {
  name: "categories-form-create",
  data: () => ({
    categoryName: "",
    categoryLimit: 0,
    categoryLimitMinValue: 1
  }),
  validations() {
    return {
      categoryName: {
        required
      },
      categoryLimit: {
        required,
        minValue: minValue(this.categoryLimitMinValue)
      }
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    isCategoryNameValid() {
      return this.$v.categoryName.$dirty && !this.$v.categoryName.required;
    },
    isCategoryLimitValid() {
      return this.$v.categoryLimit.$dirty && !this.$v.categoryLimit.minValue;
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch("createCategory", {
          name: this.categoryName,
          limit: this.categoryLimit
        });
        this.categoryName = "";
        this.categoryLimit = 0;
        this.$v.$reset();
        this.$addToast(toastMessages.categoryCreated, toastStyles.success);

        this.$emit('addCreatedCategory', category)
      } catch (e) {}
    }
  }
};
</script>
