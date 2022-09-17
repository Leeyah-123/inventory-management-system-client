<template>
  <v-list>
    <v-list-item v-for="(link, i) in links" :key="i" :to="link.to" router exact>
      <v-list-item-action>
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="link.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavList",
  data() {
    return {
      fixed: false,
    };
  },
  computed: {
    links() {
      const user = this.$store.state.modules.auth.user;

      const allLinks = [
        {
          icon: "mdi-cube-outline",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-cart-outline",
          title: "Products",
          to: "/products",
        },
        {
          icon: "mdi-animation-outline",
          title: "Categories",
          to: "/categories",
        },
        {
          icon: "mdi-finance",
          title: "Sale",
          to: "/sales",
        },
        {
          icon: "mdi-cash-multiple",
          title: "Purchases",
          to: "/purchases",
        },
        {
          icon: "mdi-account-group",
          title: "Suppliers",
          to: "/suppliers",
        },
        {
          icon: "mdi-account-multiple-outline",
          title: "Users",
          to: "/users",
        },
      ];

      if (user.role !== "admin") {
        return [
          {
            icon: "mdi-cube-outline",
            title: "Dashboard",
            to: "/",
          },
          {
            icon: "mdi-cart-outline",
            title: "Products",
            to: "/products",
          },
          {
            icon: "mdi-animation-outline",
            title: "Categories",
            to: "/categories",
          },
          {
            icon: "mdi-finance",
            title: "Sale",
            to: "/sales",
          },
          {
            icon: "mdi-cash-multiple",
            title: "Purchases",
            to: "/purchases",
          },
          {
            icon: "mdi-account-group",
            title: "Suppliers",
            to: "/suppliers",
          },
        ];
      } else {
        return allLinks;
      }
    },
  },
};
</script>

<style scoped>
.v-list .v-list-item--active .v-icon {
  color: rgb(119, 117, 117);
}
</style>