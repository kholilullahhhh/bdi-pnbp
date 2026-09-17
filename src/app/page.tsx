import { prisma } from "@/lib/prisma";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { AboutSection } from "@/components/landing/about-section";
import { FlowSection } from "@/components/landing/flow-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ContactSection } from "@/components/landing/contact-section";

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      where: { isActive: true, status: "ACTIVE" },
      include: {
        category: true,
      },
      orderBy: { sortOrder: "asc" },
      take: 4,
    });
  } catch {
    // Use fallback services in ServicesSection
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      <main className="flex-1">
        <HeroSection />
        <ServicesSection services={dbServices} />
        <AboutSection />
        <FlowSection />
        {/* <FaqSection /> */}
        <CtaSection />
        <ContactSection />
      </main>

      <PublicFooter />
    </div>
  );
}
