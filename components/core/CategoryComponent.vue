<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="category PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Category List</h3>
        <p>
          The category list helps you manage your list of saved product
          categories
        </p>
      </div>
      <div class="search align-self-center d-xs-flex">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="categorySearch"
          placeholder="Search for category"
          outlined
          dense
          class="Yeseva One ml-md-auto"
        />
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <v-btn color="blue lighten-2" elevation="0" dark>
        <v-icon left> mdi-plus </v-icon> Add Category
      </v-btn>
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="categoryTableHeader"
        :items="$store.state.modules.categories.categories"
        :search="categorySearch"
        :items-per-page="5"
        class="poppins"
      >
        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditCategoryDialogue :category="item" />

          <!-- delete dialog -->
          <DeleteCategoryDialogue :category="item" />
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import EditCategoryDialogue from "../base/dialogs/categories/EditCategoryDialogue.vue";
import DeleteCategoryDialogue from "../base/dialogs/categories/DeleteCategoryDialogue.vue";

export default {
  name: "CategoryComponent",
  data: () => ({
    categorySearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/categories/getAllCategories");
    if (this.$store.state.modules.categories.error) {
      Notify.failure(this.$store.state.modules.categories.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.categories.error_message);
      }
    },
  },
  components: { EditCategoryDialogue, DeleteCategoryDialogue },
  computed: {
    categoryTableHeader() {
      return [
        {
          text: "Category Id",
          value: "id",
          class: "primary white--text",
        },
        {
          text: "Category Name",
          value: "categoryName",
          class: "primary white--text",
        },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.categories.error;
    },
  },
  head: {
    title: "IMS - Categories",
  },
};
</script>

<style scoped>
.category p {
  font-weight: 250;
}
.title {
  width: 50%;
}
.search {
  width: 50%;
}
.v-text-field {
  border-radius: 5px;
  max-width: 250px;
}
</style>