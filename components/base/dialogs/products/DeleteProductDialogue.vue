<template>
  <v-dialog transition="dialog-top-transition" max-width="300">
    <template v-slot:activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>
        <span class="poppins">Delete Product</span>
      </v-tooltip>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dense dark>Confirm</v-toolbar>
        <v-card-text>
          <div class="pa-5">
            <strong>Are you sure you want to delete this product?</strong>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="deleteProduct(product)" color="primary">Yes</v-btn>
          <v-btn text @click="dialog.value = false" color="red lighten-1">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { Loading } from "notiflix";
import Notify from "../../../../utils/Notifilix";

export default {
  name: "DeleteProductDialogue",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    async deleteProduct(product) {
      Loading.dots();
      await this.$store.dispatch("modules/products/deleteProduct", product);
      Loading.remove();
      if (!this.$store.state.modules.products.error) {
        Notify.success("Delete successful");
      }
    },
  },
};
</script>
