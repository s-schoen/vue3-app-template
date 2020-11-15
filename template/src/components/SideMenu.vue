<template>
  <div>
    <ul v-if="items">
      <template v-for="(item, index) in items">
        <li
          v-if="isVisible(item)"
          :key="index"
          :class="[
            { 'selected-menuitem': selectedIndex === index },
            { hoverable: item.to || item.url }
          ]"
          @click="onClick($event, item, index)"
        >
          <!-- Internal Navigation -->
          <router-link
            v-if="item.to"
            :to="item.to"
            :target="item.target"
            :style="item.style"
            :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
            exact
            v-ripple
            role="menuitem"
          >
            <i :class="item.icon" />
            <span v-text="item.label"></span>
            <span v-if="item.badge" class="p-tag" v-text="item.badge"></span>
          </router-link>

          <!-- External Navigation -->
          <a
            v-if="!item.to && item.url"
            :href="item.url"
            :target="item.target"
            :style="item.style"
            :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
            v-ripple
            role="menuitem"
          >
            <i :class="item.icon" />
            <span v-text="item.label"></span>
            <span v-if="item.badge" class="badge" v-text="item.badge"></span>
          </a>

          <!-- Header -->
          <span v-if="!item.to && !item.url" class="header-menuitem">
            <i :class="item.icon" />
            <span v-text="item.label"></span>
            <span v-if="item.badge" class="badge" v-text="item.badge"></span>
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    items: Array
  },
  setup(props, { emit }) {
    const selectedIndex = ref(0);

    const onClick = (event, item, index) => {
      if (item.disabled || (!item.to && !item.url)) {
        event.preventDefault();
        return;
      }
      if (!item.to && !item.url) {
        event.preventDefault();
      }
      //execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item });
      }
      selectedIndex.value = index === selectedIndex.value ? null : index;
      emit("click", {
        originalEvent: event,
        item: item
      });
    };

    const isVisible = item =>
      typeof item.visible === "function"
        ? item.visible()
        : item.visible !== false;

    return { onClick, isVisible, selectedIndex };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars.scss";
@import "../assets/scss/mixins.scss";

ul {
  list-style-type: none;
  margin: 0;
  padding: 0em;
}

li {
  font-size: $fontSize;
  padding: 1em 2em;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 18px;
  }

  span {
    margin-left: 1em;
  }

  .header-menuitem {
    font-size: 16px;
    margin-left: -15px;
  }
}

.selected-menuitem {
  background-color: $sideMenuItemSelectedBackground;
  color: $sideMenuItemSelectedColor;

  a {
    color: $sideMenuItemHoverColor;
  }
}

a {
  text-decoration: none;
  color: $sideMenuItemColor;
}

.hoverable {
  &:hover {
    background-color: $sideMenuItemHoverBackground;
    transition: $transitionTime;

    a {
      color: $sideMenuItemHoverColor;
    }
  }
}
</style>
