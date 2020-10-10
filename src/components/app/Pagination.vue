<template>
  <ul class="pagination center" v-if="pagesNumber > 1">
    <li
      class="waves-effect"
      :class="{ disabled: page === 1 }"
      @click="page !== 1 && changePage(page - 1)"
    >
      <a href="#!"><i class="material-icons">chevron_left</i></a>
    </li>
    <li
      v-for="index in pagesNumber"
      :key="index"
      @click="changePage(index)"
      class="waves-effect"
      :class="{ active: page === index }"
    >
      <a href="#!">{{ index }}</a>
    </li>

    <li
      class="waves-effect"
      :class="{ disabled: page === pagesNumber }"
      @click="page !== pagesNumber && changePage(page + 1)"
    >
      <a href="#!"><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "pagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    pagesNumber: {
      type: Number,
      required: true,
    },
    changePage: {
      type: Function,
      required: true,
    },
  },
};
</script>