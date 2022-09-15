<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="purchase PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Purchase List</h3>
        <p>List of all saved purchases from product suppliers</p>
      </div>
      <div class="add-btn align-center d-flex justify-sm-start justify-md-end">
        <AddPurchaseDialogue class="ml-md-auto" />
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        v-model="purchaseSearch"
        placeholder="Search for purchase"
        outlined
        dense
        class="Yeseva One"
      />
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="purchaseTableHeader"
        :items="$store.state.modules.purchases.purchases"
        :search="purchaseSearch"
        :items-per-page="5"
        class="poppins"
      >
        <template #[`item.purchaseStatus`]="{ item }">
          <v-chip :color="getStatusColor(item.purchaseStatus)" dark>
            {{ item.purchaseStatus }}
          </v-chip>
        </template>

        <template #[`item.paymentStatus`]="{ item }">
          <v-chip :color="getStatusColor(item.paymentStatus)" dark>
            {{ item.paymentStatus }}
          </v-chip>
        </template>

        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditPurchaseDialogue :purchase="item" />

          <!-- delete dialog -->
          <DeletePurchaseDialogue :purchase="item" />
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import AddPurchaseDialogue from "../base/dialogs/purchases/AddPurchaseDialogue.vue";
import EditPurchaseDialogue from "../base/dialogs/purchases/EditPurchaseDialogue.vue";
import DeletePurchaseDialogue from "../base/dialogs/purchases/DeletePurchaseDialogue.vue";
import Notify from "../../utils/Notifilix";

export default {
  name: "PurchaseComponent",
  data: () => ({
    purchaseSearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/purchases/getAllPurchases");
    if (this.$store.state.modules.purchases.error) {
      Notify.failure(this.$store.state.modules.purchases.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.purchases.error_message);
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
    AddPurchaseDialogue,
    EditPurchaseDialogue,
    DeletePurchaseDialogue,
  },
  computed: {
    purchaseTableHeader() {
      return [
        {
          text: "Purchase Id",
          value: "id",
          class: "primary white--text",
        },
        { text: "Reference No.", value: "refNo", class: "primary white--text" },
        {
          text: "Supplier ID",
          value: "supplierId",
          class: "primary white--text",
        },
        {
          text: "Description",
          value: "description",
          class: "primary white--text",
        },
        {
          text: "Purchase Status",
          value: "purchaseStatus",
          class: "primary white--text",
        },
        {
          text: "Product amount",
          value: "total",
          class: "primary white--text",
        },
        {
          text: "Amount paid",
          value: "paid",
          class: "primary white--text",
        },
        {
          text: "Balance of payment",
          value: "balance",
          class: "primary white--text",
        },
        {
          text: "Payment Status",
          value: "paymentStatus",
          class: "primary white--text",
        },
        {
          text: "Purchase Date",
          value: "purchaseDate",
          class: "primary white--text",
        },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.purchases.error;
    },
  },
  head: {
    title: "IMS - Purchases",
  },
};
</script>

<style scoped>
.purchase p {
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