<template>
  <div v-if="$fetchState.pending">
    <v-skeleton-loader type="card" />
  </div>
  <v-container v-else class="PlayFair Display" fluid>
    <v-row class="mt-2">
      <v-col cols="12" sm="6" md="3">
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-cart-outline"
          title="Products"
          :value="productsCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-animation-outline"
          title="Categories"
          :value="categoriesCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-finance"
          title="Sales"
          :value="salesCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-cash-multiple"
          title="Purchases"
          :value="purchasesCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-account-group"
          title="Suppliers"
          :value="suppliersCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        v-if="$store.state.modules.auth.user.role === 'admin'"
      >
        <MaterialStatsCard
          color="primary"
          class="my-6"
          icon="mdi-account-multiple-outline"
          title="Users"
          :value="usersCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
    </v-row>

    <div
      class="d-flex-column justify-space-between"
      v-if="$store.state.modules.auth.user.role === 'admin'"
    >
      <v-divider />
      <v-container class="d-flex align-center justify-center"
        ><h3>Reports</h3></v-container
      >
      <v-divider />
      <v-row class="mt-7">
        <v-col cols="12" sm="12" md="4">
          <v-card class="mt-4 mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                :type="type"
                color="white"
                line-width="2"
                padding="16"
                :auto-line-width="autoLineWidth"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">Sales Report</div>
              <div class="subheading font-weight-light grey--text">
                Total sales report chart
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small> mdi-clock </v-icon>
              <span class="text-caption grey--text font-weight-light"
                >Just Updated</span
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card class="mt-4 mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                :type="type"
                color="white"
                line-width="2"
                padding="16"
                :auto-line-width="autoLineWidth"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">Purchases Report</div>
              <div class="subheading font-weight-light grey--text">
                Total purchases report chart
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small> mdi-clock </v-icon>
              <span class="text-caption grey--text font-weight-light"
                >Just Updated</span
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card class="mt-4 mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
              dark
              height="105px"
            >
              <v-container class="d-flex" dark fluid>
                <v-avatar size="70">
                  <img :src="topProduct.productImg" alt="Product Image" />
                </v-avatar>
                <div class="d-flex-column ml-3 justify-center">
                  <div>
                    Product Code: <strong>{{ topProduct.code }}</strong>
                  </div>
                  <div>
                    Title:<strong>{{ topProduct.title }}</strong>
                  </div>
                  <div>
                    Description:<strong>{{ topProduct.description }}</strong>
                  </div>
                </div>
              </v-container>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">Top Product</div>
              <div class="subheading font-weight-light grey--text">
                Most Sold Product
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small> mdi-clock </v-icon>
              <span class="text-caption grey--text font-weight-light"
                >Just Updated</span
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import MaterialStatsCard from "../base/MaterialStatsCard.vue";

export default {
  name: "DashboardComponent",
  async fetch() {
    await this.$store.dispatch("modules/products/getAllProducts");
    await this.$store.dispatch("modules/categories/getAllCategories");
    await this.$store.dispatch("modules/sales/getAllSales");
    await this.$store.dispatch("modules/suppliers/getAllSuppliers");
    await this.$store.dispatch("modules/purchases/getAllPurchases");
    if (this.$store.state.modules.auth.user.role === "admin") {
      await this.$store.dispatch("modules/users/getAllUsers");
    }
  },
  computed: {
    productsCount() {
      return this.$store.state.modules.products.products.length.toString();
    },
    categoriesCount() {
      return this.$store.state.modules.categories.categories.length.toString();
    },
    salesCount() {
      return this.$store.state.modules.sales.sales.length.toString();
    },
    purchasesCount() {
      return this.$store.state.modules.purchases.purchases.length.toString();
    },
    suppliersCount() {
      return this.$store.state.modules.suppliers.suppliers.length.toString();
    },
    usersCount() {
      return this.$store.state.modules.users.users.length.toString();
    },
    topProduct() {
      const products = this.$store.state.modules.products.products;
      let topProduct = {
        purchased: 0,
      };
      products.forEach((product) => {
        if (product.purchased >= topProduct.purchased) topProduct = product;
      });
      return topProduct;
    },
  },
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    type: "trend",
    autoLineWidth: false,
  }),
  components: { MaterialStatsCard },
};
</script>

<style scoped>
.dashboard p {
  font-weight: 250;
  font-size: 50px;
}

p {
  font-weight: light;
}

.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>