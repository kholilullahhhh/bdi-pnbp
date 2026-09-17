export const dynamic = "force-dynamic";

import { getUsers } from "@/lib/db-queries";
import { UserTable } from "@/components/admin/user-table";

export default async function PenggunaPage() {
  const users = await getUsers();
  return <UserTable users={users} />;
}
