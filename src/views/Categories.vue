<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section v-if="isLoaded">
      <div class="row">
        <CategoriesFormCreate />
        <CategoriesFormChange v-if="isUpdateCardAvailiable"/>
        <h4 v-else class="center">Категорий пока нет</h4>
      </div>
    </section>
    <Loader v-else/>
  </div>
</template>
<script>
import CategoriesFormCreate from "@/components/CategoriesFormCreate";
import CategoriesFormChange from "@/components/CategoriesFormChange";
import Loader from "@/components/app/CSSLoader";

export default {
  name: "categories",
  computed: {
    isUpdateCardAvailiable(){
      return Object.keys(this.$store.getters.getCategories).length;
    },
    isLoaded(){
      return this.$store.getters.getCategoriesLoadingStatus;
    }
  },
  components: {
    CategoriesFormCreate,
    CategoriesFormChange,
    Loader
  },
};
</script>
