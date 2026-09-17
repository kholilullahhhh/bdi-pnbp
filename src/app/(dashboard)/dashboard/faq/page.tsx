export const dynamic = "force-dynamic";

import { getFAQs } from "@/lib/db-queries";
import { FAQTable } from "@/components/admin/faq-table";

export default async function FAQPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let faqs: any[] = [];
  try {
    faqs = await getFAQs();
  } catch (error) {
    console.error("FAQ page DB error:", error);
  }
  return <FAQTable faqs={faqs} />;
}
