<template>
  <v-app light>
    <v-navigation-drawer
      v-if="this.$store.state.validated"
      v-model="drawer"
      fixed
      floating
      permanent
      :mini-variant.sync="mini"
      app
    >
      <template v-slot:prepend>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <img src="../static/logo.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>IMS</v-list-item-title>
          </v-list-item-content>

          <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        </v-list-item>
      </template>
      <NavList />
    </v-navigation-drawer>
    <v-app-bar v-if="this.$store.state.validated" flat fixed app>
      <div class="toolbar-content">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          class="py-3"
          outlined
          dense
          placeholder="Search here..."
        />
        <v-spacer />
        <div class="avatar">
          <v-avatar color="indigo">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavList from "../components/main/NavList.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {
      mini: false,
      drawer: false,
    };
  },
  components: { NavList },
};
</script>

<style scoped>
nav {
  border-right: none !important;
}

.v-navigation-drawer {
  box-shadow: 0px 16px 15px 0px rgb(0 0 0 / 7%);
}

.v-app-bar {
  background-color: #fff !important;
  border: none;
  box-shadow: 0px 16px 15px 0px rgb(0 0 0 / 7%) !important;
  margin: 3px;
}

.toolbar-content {
  height: inherit;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.v-text-field {
  max-width: 250px;
  border-radius: 20px;
}

.avatar {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>