<template>
  <ul class="pagination center" v-if="pagesNumber > 1">
    <li
      class="waves-effect"
      :class="{ disabled: page === 1 }"
      @click="page !== 1 && $emit('change-page', page - 1)"
    >
      <a href="#!"><i class="material-icons">chevron_left</i></a>
    </li>
    <li
      v-for="index in pagesNumber"
      :key="index"
      @click="$emit('change-page', index)"
      class="waves-effect"
      :class="{ active: page === index }"
    >
      <a href="#!">{{ index }}</a>
    </li>

    <li
      class="waves-effect"
      :class="{ disabled: page === pagesNumber }"
      @click="page !== pagesNumber && $emit('change-page', page + 1)"
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
  },
};
</script>