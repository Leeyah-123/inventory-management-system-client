<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="500">
    <template #activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span>Edit Category</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <p class="mt-5" style="font-size: 1.8rem">
          <!-- Add Staff to {{ lab.name | upperFirst }} -->
          Edit Category
        </p>
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="this.$store.state.modules.categories.error"
          dense
          type="error"
          dismissible
        >
          {{ error_message }}
        </v-alert>
        <div class="">
          <!--                  <p class='ma-0 poppins auth-text mt-1'></p>-->
        </div>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mt-5 poppins"
          @submit.prevent="editCategory"
        >
          <v-row>
            <!-- Category ID -->
            <v-col cols="12" md="12" class="py-0">
              <span class="text-body-1">Category ID</span>
              <v-text-field outlined disabled :value="category.id" />
            </v-col>

            <!-- Category Name -->
            <v-col cols="12" md="12" class="py-0">
              <v-text-field
                v-model="formData.category_name"
                type="text"
                outlined
                :value="category.category_name"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark color="error" @click="dialog.value = false"> Cancel </v-btn>
        <v-btn color="primary" @click="editCategory"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditCategoryDialogue",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    formData: {
      id: 0,
      name: "",
    },
  }),
  methods: {
    editCategory() {
      console.log(category);
    },
  },
};
</script>

<style>
</style>