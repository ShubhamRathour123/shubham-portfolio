import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Panel | Shubham Rathour",
  description: "Portfolio admin dashboard",
};

const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET ?? "portfolio-admin";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== SESSION_VALUE) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
