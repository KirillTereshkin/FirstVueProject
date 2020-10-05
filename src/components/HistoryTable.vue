<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(rec, index) in Object.entries(records).slice(
            (page - 1) * maxRecordsOnPage,
            page * maxRecordsOnPage
          )"
          :key="rec[0]"
        >
          <td>{{ (page - 1) * maxRecordsOnPage + index + 1 }}</td>
          <td>{{ rec[1].sum | currency }}</td>
          <td>{{ rec[1].date | date }}</td>
          <td>{{ getCategoryName(rec[1].id) }}</td>
          <td>
            <span
              class="white-text badge"
              :class="rec[1].type === 'income' ? 'green' : 'red'"
              >{{ rec[1].type === "income" ? "Доход" : "Расход" }}</span
            >
          </td>
          <td v-tooltip="{ html: 'Детальное описание', position: 'top' }">
            <router-link
              :to="`/detail-record?id=${rec[0]}`"
              class="btn-small btn"
            >
              <i class="material-icons">open_in_new</i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="page"
      :pages-number="getPagesNumber"
      @change-page="page = $event"
    />
  </section>
</template>

<script>
import Pagination from "@/components/app/Pagination";

export default {
  name: "history-table",
  data() {
    return {
      page: 1,
      maxRecordsOnPage: 5,
      records: this.$store.getters.getRecords,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    getPagesNumber() {
      return Math.ceil(
        Object.keys(this.records).length / this.maxRecordsOnPage
      );
    },
  },
  methods: {
    getCategoryName(id) {
      return this.$store.getters.getCategories[id].name || "Без категории";
    },
  },
};
</script>