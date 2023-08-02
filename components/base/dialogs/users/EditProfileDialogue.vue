<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="800px">
    <template #activator="{ on: card, attrs }">
      <v-btn v-bind="attrs" v-on="{ ...card }" color="primary">Edit Personal Details</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edit Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="submit" :loading="loading"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form" v-model="valid" @submit.prevent="submit" lazy-validation>
            <v-alert v-if="error" dense type="error">
              {{ error_message }}
            </v-alert>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="d-flex flex-column align-center avatar pb-2">
                  <v-avatar size="170">
                    <v-img :src="data.profileImage" />
                  </v-avatar>
                </div>
                <v-file-input v-model="profileImage" label="Change Profile Image" prepend-icon="mdi-camera" outlined dense
                  show-size :rules="imageRules" accept="image/png, image/jpeg"></v-file-input>
                <v-text-field v-model="data.id" label="Id" type="text" disabled dense required outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="data.firstName" label="First name" type="text" dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.lastName" label="Last Name" type="text" dense required
                  outlined></v-text-field>
                <v-text-field v-model.number="data.phoneNumber" label="Phone Number" type="text" dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.role" label="Role" type="text" disabled dense required
                  outlined></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-progress-linear v-show="uploadProgress !== 0" v-model="uploadProgress" :value="uploadProgress" height="25">
          <strong class="white--text">{{ Math.ceil(uploadProgress) }}%</strong>
        </v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import validationMixin from "../../../../mixins/validationMixin";

export default {
  name: "EditProfileDialogue",
  props: {
    personalData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
    loading: false,
    profileImage: null,
    uploadProgress: 0,
    imageRules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Image size should be less than 1 MB!",
    ],
  }),
  mixins: [validationMixin],
  methods: {
    async submit() {
      this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        if (this.profileImage !== null) {
          const formData = new FormData();
          formData.append("image", this.profileImage);
          const headers = {
            "Content-Type": "multipart/form-data",
          };
          Loading.dots("Uploading image...");
          await this.$axios.delete("/user/profile/image");

          const response = await this.$axios.$patch(
            `/user/profile/image`,
            formData,
            {
              headers,
              onUploadProgress: function (progressEvent) {
                this.uploadProgress = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this),
            }
          );

          this.data.profileImage = response.url;
          this.data.profileImageId = response.id;
          Loading.remove();
        }

        this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
        Loading.dots("Updating info...");
        const user = await this.$axios.$patch("/user/profile", this.data);
        await this.$store.dispatch("modules/auth/setUser", user);

        this.uploadProgress = 0;
        Loading.remove();
        this.profileImage = null;
        this.loading = false;
        this.dialog = false;
      } catch (err) {
        // console.log("error", err.message);
        // console.log("error", err.response.data);
        Loading.remove();
        this.uploadProgress = 0;
        Report.failure("Error", err.response.data.message || "An error occurred", "Ok");
        this.loading = false;
      }
    },
  },
  computed: {
    data() {
      return {
        id: this.personalData.id,
        firstName: this.personalData.firstName,
        lastName: this.personalData.lastName,
        phoneNumber: this.personalData.phoneNumber,
        role: this.personalData.role,
        profileImage: this.personalData.profileImage,
        profileImageId: this.personalData.profileImageId,
      };
    },
  },
};
</script>

<style scoped>
.avatar {
  margin: 1px solid black;
}

.v-text-field {
  margin: 5px;
  border-radius: 10px;
  max-width: 300px;
}
</style>