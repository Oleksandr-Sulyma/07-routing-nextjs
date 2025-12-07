'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

import type { Note } from '@/types/note';

const NotePreview = ({ onClose }: { onClose: () => void }) => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isFetching,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: !!id,
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  let content;

  if (!id) {
    content = <p>Error: Note ID is missing from the URL.</p>;
  } else if (isLoading || isFetching) {
    content = <p>Loading, please wait...</p>;
  } else if (error || !note) {
    content = <p>Something went wrong.</p>;
  } else {
    const formattedDate = note.updatedAt
      ? `Updated: ${formatDate(note.updatedAt)}`
      : `Created: ${formatDate(note.createdAt)}`;

    content = (
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      {content}
      <button type="button" className={css.backBtn} onClick={onClose}>
        Back
      </button>
    </div>
  );
};

export default NotePreview;
