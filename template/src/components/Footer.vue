<template>
  <div class="footer-container">
    <div class="footer-content">
      <slot name="left" />
    </div>
    <div class="footer-content center p-d-none p-d-md-inline-flex">
      <slot name="center" />
    </div>
    <div class="footer-content right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";

.footer-container {
  background-color: $footerBackgroundColor;
  padding: 1em 2em;
  vertical-align: middle;
  display: flex;
  align-items: center;
}

.footer-content {
  color: $footerFontColor;
}

.center {
  float: left;
  position: relative;
  left: 50%;
}

.right {
  margin-left: auto;
  order: 2;
}
</style>
