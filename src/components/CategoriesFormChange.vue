<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler()">
        <div class="input-field">
          <select ref="selectRef" v-model="selectedCategoryKey">
            <option
              v-for="categoryKey in Object.keys(categories)"
              :key="categoryKey"
              :value="categoryKey"
              >{{ categories[categoryKey].name }}</option
            >
          </select>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            :class="{ invalid: isCategoryNameValid() }"
            v-model="selectedCategoryName"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="isCategoryNameValid()"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            :class="{ invalid: isCategoryLimitValid() }"
            v-model="selectedCategoryLimit"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="isCategoryLimitValid()"
            >Минимальная величина - {{ categoryLimitMinValue }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
import { toastStyles } from "@/utils/toast-info";

export default {
  name: "categories-form-change",
  data() {
    return {
      selectedCategoryKey: null,
      selectedCategoryName: undefined,
      selectedCategoryLimit: undefined,
      selectPlugin: null,
      categoryLimitMinValue: 0
    };
  },
  computed: {
    categories(){
      return this.$store.getters.getCategories;
    }
  },
  validations() {
    return {
      selectedCategoryName: {
        required
      },
      selectedCategoryLimit: {
        required,
        minValue: minValue(this.categoryLimitMinValue)
      }
    };
  },
  watch: {
    selectedCategoryKey(val) {
      this.selectedCategoryName = this.categories[val].name;
      this.selectedCategoryLimit = this.categories[val].limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.$store.dispatch("updateCategory", {
          id: this.selectedCategoryKey,
          limit: this.selectedCategoryLimit,
          name: this.selectedCategoryName
        });
        this.$addToast('Категория успешно создана', toastStyles.success);
        this.$forceUpdate();
      } catch (e) {}
    },
    isCategoryNameValid() {
      return (
        this.$v.selectedCategoryName.$dirty &&
        !this.$v.selectedCategoryName.required
      );
    },
    isCategoryLimitValid() {
      return (
        this.$v.selectedCategoryLimit.$dirty &&
        !this.$v.selectedCategoryLimit.minValue
      );
    },
    updateSelect(){
      this.selectPlugin = M.FormSelect.init(this.$refs.selectRef);
      M.updateTextFields();
    }
  },
  created() {
    this.selectedCategoryKey = Object.keys(this.categories)[0];
  },
  mounted() {
    this.updateSelect();
  },
  updated() {
    this.updateSelect();
  },
  destroyed() {
    if (this.selectPlugin && this.selectPlugin.destroy)
      this.selectPlugin.destroy();
  }
};
</script>
