<template>
  <div class="p-col-12" @click="onClick">
    <div class="card summary p-shadow-3">
      <span class="title" v-text="title"></span>
      <span class="detail" v-text="detail"></span>
      <span class="value" :style="style" v-text="value"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    detail: String,
    value: String,
    style: Object,
  },
  setup(props, { emit }) {
    const onClick = () => {
      emit("summaryClick");
    };

    return { onClick };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

.summary {
  position: relative;

  .title {
    font-size: 20px;
  }

  .detail {
    color: $textColorLight;
    display: block;
    margin-top: 10px;
  }

  .value {
    color: #ffffff;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    padding: 7px 14px;
    border-radius: $borderRadius;

    background-color: $primaryColor;
  }

  &:hover {
    cursor: pointer;
    background-color: darken(#ffffff, 3%);
  }

  &:active {
    background-color: darken(#ffffff, 5%);
  }
}
.card {
  background-color: #ffffff;
  padding: 1em;
  margin-bottom: 16px;
  border-radius: $borderRadius;
}
</style>
