export default async function (context) {
  const token = localStorage.getItem("token");
  if (!token) return context.redirect("/auth");

  try {
    const headers = { AUTH_TOKEN: token };
    const user = await context.$axios.$get("/auth/profile", { headers });
    context.store.dispatch("modules/auth/setUser", user);
  } catch (err) {
    // console.log(err);
    // console.log(err.response);
    context.redirect("/auth");
  }
}
