import _ from "lodash";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    };
  },
  watch: {
    currentPage(val) {
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0];
    }
  },
  methods: {
    setUpPagination(allItems, pageSize = 5) {
      this.pageSize = pageSize;
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.currentPage = Number(this.$route.query.page) || 1;
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0];
    },
    changePage(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.currentPage = page;
    }
  }
};
