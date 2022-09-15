<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="supplier PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Supplier List</h3>
        <p>
          A comprehensive list of your saved product suppliers and their details
        </p>
      </div>
      <div class="add-btn align-center d-flex justify-sm-start justify-md-end">
        <AddSupplierDialogue class="ml-md-auto" />
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        v-model="supplierSearch"
        placeholder="Search for supplier"
        outlined
        dense
        class="Yeseva One"
      />
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="supplierTableHeader"
        :items="$store.state.modules.suppliers.suppliers"
        :search="supplierSearch"
        :items-per-page="5"
        class="poppins"
      >
        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditSupplierDialogue :supplier="item" />

          <!-- delete dialog -->
          <DeleteSupplierDialogue :supplier="item" />
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import AddSupplierDialogue from "../base/dialogs/suppliers/AddSupplierDialogue.vue";
import EditSupplierDialogue from "../base/dialogs/suppliers/EditSupplierDialogue.vue";
import DeleteSupplierDialogue from "../base/dialogs/suppliers/DeleteSupplierDialogue.vue";
import Notify from "../../utils/Notifilix";

export default {
  name: "SupplierComponent",
  data: () => ({
    supplierSearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/suppliers/getAllSuppliers");
    if (this.$store.state.modules.suppliers.error) {
      Notify.failure(this.$store.state.modules.suppliers.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.suppliers.error_message);
      }
    },
  },
  components: {
    AddSupplierDialogue,
    EditSupplierDialogue,
    DeleteSupplierDialogue,
  },
  computed: {
    supplierTableHeader() {
      return [
        {
          text: "Supplier Id",
          value: "id",
          class: "primary white--text",
        },
        {
          text: "Supplier Name(s)",
          value: "name",
          class: "primary white--text",
        },
        {
          text: "Phone Number",
          value: "phoneNumber",
          class: "primary white--text",
        },
        {
          text: "Email",
          value: "email",
          class: "primary white--text",
        },
        { text: "Address", value: "address", class: "primary white--text" },
        { text: "City", value: "city", class: "primary white--text" },
        {
          text: "State",
          value: "state",
          class: "primary white--text",
        },
        { text: "Country", value: "country", class: "primary white--text" },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.suppliers.error;
    },
  },
  head: {
    title: "IMS - Suppliers Page",
  },
};
</script>

<style scoped>
.supplier p {
  font-weight: 250;
}
.title {
  width: 50%;
}
.add-btn {
  width: 50%;
}
.v-text-field {
  border-radius: 5px;
  max-width: 250px;
}
</style>