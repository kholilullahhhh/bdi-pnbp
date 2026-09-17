export const dynamic = "force-dynamic";

import { getUsers } from "@/lib/db-queries";
import { UserTable } from "@/components/admin/user-table";

export default async function PenggunaPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let users: any[] = [];
  try {
    users = await getUsers();
  } catch (error) {
    console.error("Pengguna page DB error:", error);
  }
  return <UserTable users={users} />;
}
