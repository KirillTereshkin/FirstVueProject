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
        <tr v-for="(rec, index) in items" :key="rec[0]">
          <td>{{ pageSize * (currentPage - 1) + index + 1 }}</td>
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
            <router-link :to="`/detail-record/${rec[0]}`" class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="currentPage"
      :pagesNumber="pageCount"
      :changePage="changePage"
    />
  </section>
</template>

<script>
import Pagination from "@/components/app/Pagination";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "history-table",
  mixins: [paginationMixin],
  data() {
    return {
      records: this.$store.getters.getRecords,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getCategoryName(id) {
      return this.$store.getters.getCategories[id].name || "Без категории";
    },
  },
  mounted() {
    this.setUpPagination(Object.entries(this.$store.getters.getRecords), 3);
  },
};
</script>