import type { Metadata } from "next";
import AdminLogin from "@/components/admin/admin-login";

export const metadata: Metadata = {
  title: "Admin Login | Shubham Rathour",
  description: "Protected portfolio admin login",
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
