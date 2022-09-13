export default async function ({ redirect }) {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/auth");
}
