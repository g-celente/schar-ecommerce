import type { Metadata } from "next";
import { AccountView } from "@/features/auth/components/AccountView";

export const metadata: Metadata = {
  title: "Minha Conta",
  description: "Gerencie sua conta Schar — sacola, pedidos e perfil.",
};

export default function AccountPage() {
  return <AccountView />;
}