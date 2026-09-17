import { prisma } from "@/lib/prisma";
import { FAQClient } from "./faq-client";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  let faqs: { id: string; question: string; answer: string; category: string | null; sortOrder: number }[] = [];

  try {
    faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        sortOrder: true,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("FAQ page DB error:", error);
  }

  return <FAQClient faqs={faqs} />;
}
