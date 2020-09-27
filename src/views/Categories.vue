<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesFormCreate @addCreatedCategory="categories.push($event)" />
        <CategoriesFormChange :categories="categories" />
      </div>
    </section>
  </div>
</template>
<script>
import CategoriesFormCreate from "@/components/CategoriesFormCreate";
import CategoriesFormChange from "@/components/CategoriesFormChange";

export default {
  name: "categories",
  data: () => ({
    categories: []
  }),
  components: {
    CategoriesFormCreate,
    CategoriesFormChange
  }
};
</script>
