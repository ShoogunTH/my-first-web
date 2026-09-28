export interface ExternalItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface HackerNewsHit {
  objectID: string;
  title: string;
  points?: number;
  author: string;
}

export async function fetchExternal(
  source: 'products' | 'news'
): Promise<ExternalItem[]> {
  if (source === 'products') {
    const items: FakeStoreProduct[] = await fetch(
      'https://fakestoreapi.com/products?limit=8',
      { cache: 'no-store' }
    ).then((r) => r.json());
    return items.map((p) => ({
      id: String(p.id),
      title: p.title,
      subtitle: `$${p.price} • ${p.category}`,
      image: p.image,
    }));
  }
  // source === 'news' — ดึงจาก Hacker News (Algolia)
  const data: { hits?: HackerNewsHit[] } = await fetch(
    'https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=8'
  ).then((r) => r.json());
  return (data.hits || []).map((h) => ({
    id: String(h.objectID),
    title: h.title,
    subtitle: `${h.points ?? 0} points • by ${h.author}`,
  }));
}
