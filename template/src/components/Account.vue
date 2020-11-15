<template>
  <div class="account-container">
    <div class="account-info">
      <img
        :src="avatar ? avatar : require('@/assets/avatar.svg')"
        alt="Avatar"
      />
      <div v-if="!signin" class="account-text">
        <button class="p-link account-link" @click="onClick">
          <span class="name">{{ name }}</span>
          <i v-if="showOptions && options" class="pi pi-fw pi-angle-down" />
        </button>
        <br />
        <span class="subtext" v-if="subtext">{{ subtext }}</span>
      </div>
      <Button
        class="sign-in-button"
        v-if="signin"
        icon="pi pi-user"
        iconPos="left"
        label="Sign In"
        @click="onSignIn"
      />
    </div>
    <transition name="options-slide">
      <ul v-if="!signin" v-show="optionsVisible">
        <li v-for="(option, index) in options" :key="index">
          <button class="p-link" @click="onOptionClick(option)">
            <i :class="option.icon" />
            <span>{{ option.label }}</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import Button from "primevue/button";

export default {
  props: {
    avatar: {
      type: String,
      default: null
    },
    name: String,
    subtext: String,
    showOptions: {
      type: Boolean,
      default: true
    },
    options: Array,
    signin: {
      type: Boolean,
      default: true
    }
  },
  components: { Button },
  setup(props, { emit }) {
    const optionsVisible = ref(false);
    const onClick = () => (optionsVisible.value = !optionsVisible.value);

    const onOptionClick = option => {
      //execute command
      if (option.command) {
        option.command({ option: option });
      }

      emit("option", option);
    };

    const onSignIn = () => {
      emit("signin");
    };

    return { onClick, onSignIn, onOptionClick, optionsVisible };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";

ul {
  background-color: white;
  list-style-type: none;
  padding: 0;
  margin-top: 0.5em;

  li {
    button {
      width: 100%;
      padding: 1em;
      border: 0 none;
      cursor: pointer;

      &:hover {
        color: $sideMenuItemHoverBackground;
      }

      span {
        margin-left: 0.25em;
        vertical-align: middle;
      }
    }
  }
}

.sign-in-button {
  margin-top: 1em;
  margin-left: 2em;
  height: 2.5em;
}

.account-info {
  display: flex;

  img {
    width: 64px;
    vertical-align: middle;
  }

  .account-text {
    margin-left: 1em;

    .account-link {
      position: relative;
      top: 20%;
      cursor: pointer;
      display: inline-block;

      i {
        display: inline-block;
        font-size: 16px;
        margin-left: 0.5em;
        vertical-align: middle;
      }
    }

    .subtext {
      position: relative;
      top: 20%;
      color: $textColorLight;
      font-style: italic;
    }
  }
}

.account-container {
  padding: 10px 0;
  margin-left: 10px;
}

.options-slide-enter-from,
.options-slide-leave-to {
  max-height: 0;
}

.options-slide-enter-to,
.options-slide-leave-from {
  max-height: 1000px;
}

.options-slide-leave-active {
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.options-slide-enter-active {
  overflow: hidden;
  transition: max-height 1s ease-in-out;
}
</style>
