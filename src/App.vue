<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'

export default {
  computed: {
    layout () { 
      return (this.$route.meta.layout || 'empty') + '-layout';
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>
<style lang="scss">
@import '~materialize-css/dist/css/materialize.css';
@import "assets/index.css";

.toast{
  &_error{
    background-color: #ee6e73;
  }
  &_success{
    background-color: #26a69a;
  }
}

</style>
