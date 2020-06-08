<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "@/assets/style/base.scss";
@import "@/assets/style/variable.scss";
@import "@/assets/style/element_reset.scss";
@import url("//at.alicdn.com/t/font_1869232_l0lr3ak5t3n.css");
#app {
  width: 100%;
  height: 100%;
}
</style>
