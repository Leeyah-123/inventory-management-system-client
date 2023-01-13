<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="sm"
      fixed
      floating
      :mini-variant="mini"
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

        <v-autocomplete
          v-model="searchText"
          prepend-inner-icon="mdi-magnify"
          class="py-3 hidden-xs-only"
          outlined
          dense
          placeholder="Search here..."
          @input="search"
          :items="searchItems"
          :filter="customFilter"
          color="white"
          item-text="name"
          label="Search here..."
        ></v-autocomplete>
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

export default {
  name: "DefaultLayout",
  data() {
    return {
      mini: true,
      drawer: true,
      selectedItem: 1,
      searchText: "",
      items: [
        { text: "Profile", to: "/profile", icon: "mdi-account" },
        { text: "SignOut", to: "/signout", icon: "mdi-logout" },
      ],
      searchItems: [
        { name: "Dashboard", abbr: "Dash", id: 1 },
        { name: "Categories", abbr: "Category", id: 2 },
        { name: "Suppliers", abbr: "Supplier", id: 3 },
        { name: "Sales", abbr: "Sale", id: 4 },
        { name: "Products", abbr: "Product", id: 5 },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.modules.auth.user;
    },
  },
  methods: {
    search() {
      if (this.searchText === "Dashboard") this.$router.push("/");
      else if (this.searchText === "Categories")
        this.$router.push("../categories");
      else if (this.searchText === "Suppliers")
        this.$router.push("../suppliers");
      else if (this.searchText === "Sales") this.$router.push("../sales");
      else if (this.searchText === "Products") this.$router.push("../products");

      if (this.searchText !== null) this.searchText === "";
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
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