export const dynamic = "force-dynamic";

import { getFAQs } from "@/lib/db-queries";
import { FAQTable } from "@/components/admin/faq-table";

export default async function FAQPage() {
  const faqs = await getFAQs();
  return <FAQTable faqs={faqs} />;
}
