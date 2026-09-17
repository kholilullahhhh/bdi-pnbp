export const dynamic = "force-dynamic";

import { getAnnouncements } from "@/lib/db-queries";
import { AnnouncementTable } from "@/components/admin/announcement-table";

export default async function PengumumanPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let announcements: any[] = [];
  try {
    announcements = await getAnnouncements();
  } catch (error) {
    console.error("Pengumuman page DB error:", error);
  }
  return <AnnouncementTable announcements={announcements} />;
}
