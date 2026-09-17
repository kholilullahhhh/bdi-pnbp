import { getFAQs } from "@/lib/db-queries";
import { FAQTable } from "@/components/admin/faq-table";

export default async function FAQAdminPage() {
  const faqs = await getFAQs();
  return <FAQTable faqs={faqs} />;
}
