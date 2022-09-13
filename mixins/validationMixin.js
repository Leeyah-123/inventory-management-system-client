export default {
  name: "validationMixin",
  data() {
    return {
      firstnameRules: [
        (v) => !!v || "First Name is required",
        (v) =>
          (v && v.length >= 3) || "First Name must be more than 3 characters",
        (v) => /^[a-zA-Z ]+$/.test(v) || "Invalid First Name",
      ],
      lastnameRules: [
        (v) => !!v || "Last Name is required",
        (v) =>
          (v && v.length >= 3) || "Last Name must be more than 3 characters",
        (v) => /^[a-zA-Z ]+$/.test(v) || "Invalid Last Name",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v) || "Invalid E-mail",
      ],
      phoneNumRules: [
        (v) => !!v || "Phone Number is required",
        (v) =>
          /[0-1]{1}[7-9]{1}[0-1]{1}[0-9]{8}/.test(v) || "Invalid Phone Number",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))/.test(
            v
          ) || "Invalid Password format",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm password is required",
        (v) => v === this.user.password || "Passwords do not match",
      ],
      numberRules: [
        (v) => !!v || "Field is required",
        (v) => !isNaN(v) || "Integer only field",
      ],
      productCodeRules: [],
    };
  },
};
