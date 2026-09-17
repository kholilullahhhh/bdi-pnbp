export const dynamic = "force-dynamic";

import { getAnnouncements } from "@/lib/db-queries";
import { AnnouncementTable } from "@/components/admin/announcement-table";

export default async function PengumumanPage() {
  const announcements = await getAnnouncements();
  return <AnnouncementTable announcements={announcements} />;
}
