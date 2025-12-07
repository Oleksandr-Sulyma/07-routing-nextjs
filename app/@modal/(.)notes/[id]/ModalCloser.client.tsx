'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import React from 'react';

export default function ModalCloser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
