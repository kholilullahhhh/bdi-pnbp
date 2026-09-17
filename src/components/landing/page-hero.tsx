interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({
  title,
  description,
  badge,
  imageSrc = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
}: PageHeroProps) {
  return (
    <section className="relative bg-primary-900 text-white overflow-hidden">
      {/* Background image via CSS */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/85 to-primary-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-white/90">{badge}</span>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-primary-100/80 max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
