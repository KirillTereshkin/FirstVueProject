<template>
  <Loader v-if="!record" />
  <main v-else class="app-content">
    <div class="app-page">
      <div>
        <div>
          <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">История</router-link>
            <a @click.prevent class="breadcrumb">
              {{ record.type === "income" ? "Доход" : "Расход" }}
            </a>
          </div>
          <div class="row">
            <div class="col s12 m6">
              <div
                class="card"
                :class="record.type === 'income' ? 'green' : 'red'"
              >
                <div class="card-content white-text">
                  <p>Описание: {{ record.description }}</p>
                  <p>Сумма: {{ record.sum | currency }}</p>
                  <p>Категория: {{ category.name }}</p>

                  <small>{{ record.date | date("datetime") }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Loader from "@/components/app/CSSLoader";
import { toastMessages, toastStyles } from "@/utils/toast-info";

export default {
  name: "detail-record",
  data: () => ({
    record: null,
    category: null,
  }),
  components: {
    Loader,
  },
  mounted() {
    this.record = this.$store.getters.getRecords[this.$route.params.id];
    if (!this.record) {
      this.$router.push("/history");
      this.$addToast(toastMessages.noRecord, toastStyles.error);
      return;
    }
    this.category = this.$store.getters.getCategories[this.record.id];
  },
};
</script>
