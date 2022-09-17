<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="user PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Users List</h3>
        <p>A comprehensive list of saved employee details</p>
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        v-model="userSearch"
        placeholder="Search for user"
        outlined
        dense
        class="Yeseva One"
      />
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="userTableHeader"
        :items="$store.state.modules.users.users"
        :search="userSearch"
        :items-per-page="5"
        class="poppins"
      >
        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditUserDialogue :user="item" />

          <!-- delete dialog -->
          <!-- <DeleteUserDialogue :user="item" /> -->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import EditUserDialogue from "../base/dialogs/users/EditUserDialogue.vue";
import DeleteUserDialogue from "../base/dialogs/users/DeleteUserDialogue.vue";
import Notify from "../../utils/Notifilix";

export default {
  name: "UserComponent",
  data: () => ({
    userSearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/users/getAllUsers");
    if (this.$store.state.modules.users.error) {
      Notify.failure(this.$store.state.modules.users.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.users.error_message);
      }
    },
  },
  components: {
    EditUserDialogue,
    DeleteUserDialogue,
  },
  computed: {
    userTableHeader() {
      return [
        {
          text: "User Id",
          value: "id",
          class: "primary white--text",
        },
        {
          text: "First Name",
          value: "firstName",
          class: "primary white--text",
        },
        {
          text: "Last Name",
          value: "lastName",
          class: "primary white--text",
        },
        {
          text: "Email",
          value: "email",
          class: "primary white--text",
        },
        {
          text: "Phone Number",
          value: "phoneNumber",
          class: "primary white--text",
        },
        { text: "Role", value: "role", class: "primary white--text" },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.users.error;
    },
  },
  head: {
    title: "IMS - Users Page",
  },
};
</script>

<style scoped>
.user p {
  font-weight: 250;
}
.title {
  width: 50%;
}
.v-text-field {
  border-radius: 5px;
  max-width: 250px;
}
</style>