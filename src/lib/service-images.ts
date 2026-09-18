const serviceImages: Record<string, string> = {
  "diklat-pelatihan":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  "jasa-narasumber":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  "penyewaan-fasilitas":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  "wisata-edukasi":
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
  "pelatihan-penyelia-halal":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  "pandu-kakao":
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
  "jasa-narasumber-teknis":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  "sewa-aula":
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
  "wisata-edukasi-cokelat":
    "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1600&q=80",
};

export function getServiceImage(service?: {
  imageUrl?: string | null;
  slug?: string;
}): string | null {
  if (!service) return null;
  const fallback = service.slug ? serviceImages[service.slug] : null;
  return service.imageUrl || fallback || null;
}