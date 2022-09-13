<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="sm"
      fixed
      floating
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
        </v-list-item>
      </template>
      <NavList />
    </v-navigation-drawer>
    <v-app-bar flat fixed app>
      <div class="toolbar-content">
        <div class="icon-container">
          <v-btn v-if="mini" @click.stop="mini = !mini" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn v-else @click.stop="mini = !mini" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="justify-self-center"
          ></v-app-bar-nav-icon>
        </div>

        <v-text-field
          prepend-inner-icon="mdi-magnify"
          class="py-3"
          outlined
          dense
          placeholder="Search here..."
        />
        <v-spacer />
        <v-menu transition="slide-y-transition" :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-list>
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-avatar>
                  <v-icon large>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong class="text-capitalize">{{
                      user.firstName
                    }}</strong>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </template>
          <v-list>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                router
                exact
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavList from "../components/base/NavList.vue";
import Notify from "../utils/Notifilix";

export default {
  name: "DefaultLayout",
  async created() {
    if (!this.$store.state.user) {
      console.log("No user");

      const token = localStorage.getItem("token");
      console.log("Token ", token);

      this.$axios.setHeaders("AUTH_TOKEN", token);

      try {
        const user = await this.$axios.$get("/auth/profile");
        this.$store.commit("SET_USER", user);
      } catch (err) {
        Notify.failure(err.response);
      }
    }
  },
  data() {
    return {
      mini: true,
      drawer: true,
      selectedItem: 1,
      user: {
        firstName: "aaliyah",
      },
      items: [{ text: "SignOut", to: "/signout", icon: "mdi-logout" }],
    };
  },
  components: { NavList },
  middleware: ["auth"],
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

.icon-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>