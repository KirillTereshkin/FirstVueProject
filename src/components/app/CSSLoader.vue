<template>
  <div class="loader-wrapper">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="loaderColor">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    loaderColor() {
      const colorArr = [
        "spinner-red-only",
        "spinner-blue-only",
        "spinner-green-only"
      ];
      return colorArr[Math.round(Math.random() * colorArr.length) - 1];
    }
  }
};
</script>
<style scoped>
.loader-wrapper{
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>