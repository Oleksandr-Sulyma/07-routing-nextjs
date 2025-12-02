import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const params = {
    search: '',
    page: 1,
    sortBy: 'created' as const,
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', params.search, params.sortBy, params.page],
    queryFn: () => fetchNotes(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialParams={params} />
    </HydrationBoundary>
  );
}
