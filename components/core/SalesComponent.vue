<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="sale PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Sales List</h3>
        <p>
          The sales list effectively dictates the number of sales and their
          details in a comprehesive way.
        </p>
      </div>
      <div class="add-btn align-center d-flex justify-sm-start justify-md-end">
        <AddSaleDialogue class="ml-md-auto" />
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        v-model="saleSearch"
        placeholder="Search for sale"
        outlined
        dense
        class="Yeseva One"
      />
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="saleTableHeader"
        :items="$store.state.modules.sales.sales"
        :search="saleSearch"
        :items-per-page="5"
        class="poppins"
      >
        <template #[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>

        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditSaleDialogue :sale="item" />

          <!-- delete dialog -->
          <DeleteSaleDialogue :sale="item" />
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import AddSaleDialogue from "../base/dialogs/sales/AddSaleDialogue.vue";
import EditSaleDialogue from "../base/dialogs/sales/EditSaleDialogue.vue";
import DeleteSaleDialogue from "../base/dialogs/sales/DeleteSaleDialogue.vue";
import Notify from "../../utils/Notifilix";

export default {
  name: "SaleComponent",
  data: () => ({
    saleSearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/sales/getAllSales");
    if (this.$store.state.modules.sales.error) {
      Notify.failure(this.$store.state.modules.sales.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.sales.error_message);
      }
    },
  },
  methods: {
    getStatusColor(item) {
      if (item === "pending") return "orange";
      else return "green";
    },
  },
  components: {
    AddSaleDialogue,
    EditSaleDialogue,
    DeleteSaleDialogue,
  },
  computed: {
    saleTableHeader() {
      return [
        {
          text: "Sale Id",
          value: "id",
          class: "primary white--text",
        },
        {
          text: "Customer Name",
          value: "customerName",
          class: "primary white--text",
        },
        {
          text: "Product Code",
          value: "productCode",
          class: "primary white--text",
        },
        { text: "Quantity", value: "quantity", class: "primary white--text" },
        {
          text: "Total(with tax)",
          value: "total",
          class: "primary white--text",
        },
        {
          text: "Amount Paid",
          value: "paid",
          class: "primary white--text",
        },
        { text: "Balance", value: "balance", class: "primary white--text" },
        { text: "Biller Id", value: "billerId", class: "primary white--text" },
        { text: "Tax", value: "tax", class: "primary white--text" },
        { text: "Sales Status", value: "status", class: "primary white--text" },
        {
          text: "Sales Date",
          value: "salesDate",
          class: "primary white--text",
        },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.sales.error;
    },
  },
  head: {
    title: "IMS - Sales",
  },
};
</script>

<style scoped>
.sale p {
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