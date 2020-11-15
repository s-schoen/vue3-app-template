<template>
  <div class="header-container">
    <button v-if="showToggle" class="p-link menu-button" @click="onMenuToggle">
      <span class="pi pi-bars"></span>
    </button>
    <div class="title">
      <slot />
    </div>
    <div class="right p-d-none p-d-md-inline-flex">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showToggle: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const onMenuToggle = () => emit("menu-toggle");
    return { onMenuToggle };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";

.header-container {
  background-color: $headerBackgroundColor;
  padding: 1em 2em;
  color: $headerFontColor;
  height: 50px;
  display: flex;
  align-items: center;
}

.menu-button {
  color: $headerFontColor;
  margin-left: 1vw;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;

  span {
    font-size: 1.5em;
  }

  &:hover {
    color: $headerHoverColor;
  }
}

.title {
  margin-left: 20px;
  font-size: $fontSize * 1.5;
  font-weight: bold;
}

.right {
  margin-left: auto;
  order: 2;
}
</style>
