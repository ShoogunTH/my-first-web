import { getMessages } from '@/lib/messages';
import DashboardClient from '@/components/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const rawMessages = await getMessages();

  // Convert Date objects to ISO strings for Client Component serialization
  const messages = rawMessages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return <DashboardClient initialMessages={messages} />;
}
