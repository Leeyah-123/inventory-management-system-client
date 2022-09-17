<template>
  <v-container
    class="profile-container d-md-flex justify-center align-center pa-10"
    fluid
  >
    <v-card
      color="white"
      elevation="3"
      height="fit-content"
      width="100%"
      class="ma-5"
      rounded="true"
    >
      <v-card-title class="justify-center">Personal Information</v-card-title>
      <v-divider />
      <v-sheet elevation="0" width="100%" class="d-flex justify-center my-5">
        <v-avatar size="200">
          <img :src="personalData.profileImage" alt="Profile Image" />
        </v-avatar>
      </v-sheet>
      <v-row width="100%" class="d-flex-column justify-space-between">
        <v-col>
          <v-subheader>First Name:</v-subheader>
          <v-card-text
            ><strong>{{ personalData.firstName }}</strong></v-card-text
          >
          <v-subheader>Last Name:</v-subheader>
          <v-card-text
            ><strong>{{ personalData.lastName }}</strong></v-card-text
          >
        </v-col>
        <v-col>
          <v-subheader>Phone Number:</v-subheader>
          <v-card-text
            ><strong>{{ personalData.phoneNumber }}</strong></v-card-text
          >
          <v-subheader>Role:</v-subheader>
          <v-card-text
            ><strong>{{ personalData.role }}</strong></v-card-text
          >
        </v-col>
      </v-row>
      <v-divider />
      <v-card-actions class="justify-center">
        <EditProfileDialogue :personalData="personalData" />
      </v-card-actions>
    </v-card>
    <v-card
      color="white"
      elevation="3"
      height="fit-content"
      width="100%"
      class="ma-5"
      rounded="true"
    >
      <v-card-title class="justify-center">Login Information</v-card-title>
      <v-divider />
      <v-subheader>Email:</v-subheader>
      <v-card-text
        ><strong>{{ loginData.email }}</strong></v-card-text
      >
      <v-subheader class="pa-5"
        ><small
          >Note: Changing Email or Password will require you to log in
          again</small
        ></v-subheader
      >
      <v-divider />
      <v-card-actions class="d-flex justify-space-around">
        <confirm-password-dialogue target="email" />
        <confirm-password-dialogue target="password" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import EditProfileDialogue from "../base/dialogs/users/EditProfileDialogue.vue";
import ConfirmPasswordDialogue from "../base/dialogs/auth/ConfirmPasswordDialogue.vue";
import validationMixin from "../../mixins/validationMixin";
import { Loading } from "notiflix/build/notiflix-loading-aio";

export default {
  name: "ProfileComponent",
  components: { EditProfileDialogue, ConfirmPasswordDialogue },
  mixins: [validationMixin],
  computed: {
    user() {
      return this.$store.state.modules.auth.user;
    },
    personalData() {
      return {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        role: this.user.role,
        profileImage: this.user.profileImage,
        profileImageId: this.user.profileImageId,
      };
    },
    loginData() {
      return {
        email: this.user.email,
      };
    },
  },
};
</script>

<style scoped>
.profile-container {
  height: 100%;
}
</style>