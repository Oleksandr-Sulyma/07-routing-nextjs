'use client';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

export default function PreviewNote() {
  return (
    <Modal>
      <NotePreview />
    </Modal>
  );
}
