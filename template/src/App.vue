<template>
  <Toast />
  <div class="app">
    <!-- The top bar / header -->
    <Header
      :class="['sidebar-transition', { 'sidebar-visible': sidebarVisible }]"
      @menu-toggle="onMenuToggle"
    >
      Title
      <template v-slot:right> Header Right </template>
    </Header>

    <!-- Sidebar / Navigation drawer including branding, account and navigation menu  -->
    <Sidebar :visible="sidebarVisible" class="sidebar.sidebar">
      <Branding :logo="require('@/assets/logo.png')" name="Branding" />
      <hr />
      <Account
        name="User"
        :options="accountOptions"
        subtext="This is an account"
        :signin="false"
      />
      <hr />
      <SideMenu :items="menuItems" @click="onMenuClick" />
    </Sidebar>

    <!-- Wrapper for content -->
    <div
      :class="[
        'content',
        'sidebar-transition',
        { 'sidebar-visible': sidebarVisible },
      ]"
    >
      <router-view />
    </div>

    <!-- The footer -->
    <Footer
      :class="['sidebar-transition', { 'sidebar-visible': sidebarVisible }]"
    >
      <template v-slot:left>
        <b>Left</b>
      </template>
      <template v-slot:center>
        <b>Center</b>
      </template>
      <template v-slot:right>
        <b>Right</b>
      </template>
    </Footer>

    <!-- Overlay to cover content when sidebar is open on mobile devices -->
    <div v-if="sidebarVisible" class="overlay" @click="onMenuToggle" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Branding from "@/components/Branding";
import Account from "@/components/Account";
import SideMenu from "@/components/SideMenu";
import Sidebar from "@/components/Sidebar";
import Toast from "primevue/toast";

import { onMounted, ref, computed } from "vue";

export default {
  components: { Footer, Header, SideMenu, Branding, Sidebar, Account, Toast },
  setup() {
    const sidebarVisible = ref(true);
    const deviceWidth = ref(0);
    const isMobile = computed(() => deviceWidth.value < 1024);

    const onMenuToggle = () => (sidebarVisible.value = !sidebarVisible.value);
    const onMenuClick = () => {
      if (isMobile.value) {
        // Close drawer on mobile devices
        sidebarVisible.value = false;
      }
    };

    const menuItems = [
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
      { label: "Badge", icon: "pi pi-fw pi-home", to: "/", badge: "1234" },
      { label: "Header", icon: "pi pi-fw pi-sitemap" },
      { label: "Disabled", icon: "pi pi-fw pi-home", to: "/", disabled: true },
    ];

    const accountOptions = [
      {
        label: "Settings",
        icon: "pi pi-fw pi-cog",
      },
    ];

    onMounted(() => {
      window.onresize = () => {
        deviceWidth.value = window.innerWidth;
      };
    });

    return {
      onMenuToggle,
      menuItems,
      accountOptions,
      sidebarVisible,
      onMenuClick,
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

// Mobile devices
@media (max-width: 1024px) {
  .overlay {
    cursor: pointer;
    position: fixed;
    display: block;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 50px;
    z-index: 998;
    background-color: $overlayColor;
    @include opacity(0.7);
  }

  .sidebar {
    top: 50px;
  }
}

// Desktop devices
@media (min-width: 1025px) {
  .sidebar-visible {
    margin-left: $sidebarWidth;
  }

  .overlay {
    display: none;
  }
}

.sidebar-transition {
  transition: margin-left $transitionTime;
}

.content {
  flex: 1 1 auto;
  padding: 2em;
}
</style>
