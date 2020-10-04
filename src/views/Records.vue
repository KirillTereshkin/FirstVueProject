<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Новая запись</h3>
        </div>

        <p v-if="!Object.keys(categories).length">
          Категории отсутствуют,
          <router-link to="/categories">добавить категорию</router-link>
        </p>

        <form class="form" @submit.prevent="submitHandler" v-else>
          <div class="input-field">
            <select v-model="selectedCategoryId" ref="selectRef">
              <option
                v-for="category in Object.entries(categories)"
                :key="category[0]"
                :value="category[0]"
              >
                {{ category[1].name }}
              </option>
            </select>
            <label>Выберите категорию</label>
          </div>

          <p>
            <label>
              <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="selectedCategoryFinanceDirection"
              />
              <span>Доход</span>
            </label>
          </p>

          <p>
            <label>
              <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="selectedCategoryFinanceDirection"
              />
              <span>Расход</span>
            </label>
          </p>

          <div class="input-field">
            <input
              id="amount"
              type="number"
              :class="{ invalid: isSumValid() }"
              v-model.number="selectedCategorySum"
            />
            <label for="amount">Сумма</label>
            <span class="helper-text invalid" v-if="isSumValid()"
              >Минимальная сумма - {{ minSumValue }}</span
            >
          </div>

          <div class="input-field">
            <input
              id="description"
              type="text"
              :class="{ invalid: isDescriptionValid() }"
              v-model="selectedCategoryDescription"
            />
            <label for="description">Описание</label>
            <span class="helper-text invalid" v-if="isDescriptionValid()"
              >Введите описание</span
            >
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            Создать
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import { minValue, required } from "vuelidate/lib/validators";
import { toastStyles } from "@/utils/toast-info";

export default {
  name: "records",
  data() {
    return {
      selectedCategoryId: null,
      selectedCategorySum: 0,
      selectedCategoryDescription: "",
      selectedCategoryFinanceDirection: "outcome",
      selectPlugin: null,
      minSumValue: 1,
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },

    totalBill() {
      return (
        this.$store.getters.getUserInfo.bill +
        (this.selectedCategoryFinanceDirection === "income" ? 1 : -1) *
          this.selectedCategorySum
      );
    },
  },
  validations() {
    return {
      selectedCategorySum: {
        required,
        minValue: minValue(this.minSumValue),
      },
      selectedCategoryDescription: {
        required,
      },
    };
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.totalBill < 0) {
        this.$addToast(
          `Недостаточно средств для совершения операции (${-this
            .totalBill})`,
          toastStyles.error
        );
        return;
      }

      try {
        await this.$store.dispatch("uploadRecord", {
          id: this.selectedCategoryId,
          sum: this.selectedCategorySum,
          desciption: this.selectedCategoryDescription,
          date: new Date().toJSON(),
          type: this.selectedCategoryFinanceDirection,
        });
        
        await this.$store.dispatch("updateUserInfo", {
          ...this.$store.getters.getUserInfo,
          bill: this.totalBill
        })
        
        this.$addToast("Запись успешно создана", toastStyles.success);
        
        this.$v.$reset();
        this.selectedCategorySum = 0;
        this.selectedCategoryDescription = "";
      } catch (e) {}
    },
    isSumValid() {
      return (
        this.$v.selectedCategorySum.$dirty &&
        !this.$v.selectedCategorySum.minValue
      );
    },
    isDescriptionValid() {
      return (
        this.$v.selectedCategoryDescription.$dirty &&
        !this.$v.selectedCategoryDescription.required
      );
    },
  },
  created() {
    this.selectedCategoryId = Object.keys(this.categories)[0];
  },
  mounted() {
    this.selectPlugin = M.FormSelect.init(this.$refs.selectRef);
    M.updateTextFields();
  },
  destroyed() {
    if (this.selectPlugin && this.selectPlugin.destroy)
      this.selectPlugin.destroy();
  },
};
</script>