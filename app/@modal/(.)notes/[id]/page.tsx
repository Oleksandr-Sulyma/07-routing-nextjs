import Modal from '@/components/Modal/Modal';
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
    <HydrationBoundary state={dehydratedState}>
      <Modal>
        <NotePreview onClose={() => {}} />
      </Modal>
    </HydrationBoundary>
  );
};

export default PreviewNote;
