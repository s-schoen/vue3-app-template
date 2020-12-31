<template>
  <transition name="sidebar-slide">
    <div class="sidebar" v-show="visible">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";
@import "../assets/scss/mixins.scss";

.sidebar {
  @include linear-gradient($sidebarBackgroundTop, $sidebarBackgroundBottom);
  position: fixed;
  width: $sidebarWidth;
  height: 100%;
  z-index: 999;
  overflow-y: auto;
  user-select: none;
  transition: transform $transitionTime;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}
</style>
