import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { FetchNotesParams } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const apiParams: FetchNotesParams = {
    search: '',
    page: 1,
    sortBy: 'created' as const,
    tag: slug[0] === 'all' ? undefined : slug[0],
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', apiParams.search, apiParams.sortBy, apiParams.page, apiParams.tag],
    queryFn: () => fetchNotes(apiParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialParams={apiParams} />
    </HydrationBoundary>
  );
}
