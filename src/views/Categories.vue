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
  data() {
    return {
      isLoaded: null,
    };
  },
  computed: {
    isUpdateCardAvailiable(){
      return Object.keys(this.$store.getters.getCategories).length;
    }
  },
  components: {
    CategoriesFormCreate,
    CategoriesFormChange
  },
  async mounted() {
    await this.$store.dispatch("getCategories");
    this.isLoaded = this.$store.getters.getCategoriesLoadingStatus;
  }
};
</script>
