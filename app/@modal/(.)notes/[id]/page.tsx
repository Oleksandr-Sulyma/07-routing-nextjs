import ModalCloser from './ModalCloser.client';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

type PreviewNoteProps = {
  params: Promise<{ id: string }>;
};

const PreviewNote = async ({ params }: PreviewNoteProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalCloser>
        <NotePreview />
      </ModalCloser>
    </HydrationBoundary>
  );
};

export default PreviewNote;
