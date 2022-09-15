export default async function (context) {
  const user = context.store.state.modules.auth.user;

  if (user.role !== "admin") context.redirect("/");
}
