<script>
export default {
  name: "SignOutPage",
  mounted() {
    localStorage.removeItem("token");
    this.$router.replace("/auth");
  },
};
</script>