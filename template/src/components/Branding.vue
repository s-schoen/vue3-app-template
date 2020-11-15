<template>
  <div>
    <router-link to="/">
      <img :src="logo" alt="Logo" />
      <span v-if="name" v-text="name"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    logo: String,
    name: String
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";

div {
  margin: 2em;
  display: table;

  a {
    text-decoration: none;
    color: $sideMenuItemColor;
  }

  img {
    height: 64px;
    vertical-align: middle;
  }

  span {
    margin-left: 0.5em;
    font-size: $fontSize * 1.5;
    font-weight: bold;
    vertical-align: middle;
  }
}
</style>
