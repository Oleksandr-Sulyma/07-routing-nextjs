'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import React from 'react';
import NotePreview from './NotePreview.client';

export default function ModalCloser() {
  const router = useRouter();

  // Функція onClose створюється тут, на клієнті, і передає router.back()
  const handleClose = () => router.back();

  return (
    // Modal отримує клієнтську функцію handleClose
    <Modal onClose={handleClose}>
      {/* NotePreview повинен викликати onClose з пропсів, які ми передаємо з ModalCloser */}
      <NotePreview onClose={handleClose} />
    </Modal>
  );
}
