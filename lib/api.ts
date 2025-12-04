import axios from 'axios';
import { Note, NoteFormValues } from '@/types/note';

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${NOTEHUB_TOKEN}`;
axios.defaults.timeout = 2000;
export interface FetchNotesParams {
  search: string;
  page: number;
  sortBy: 'created' | 'updated';
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchNotes = async ({
  search,
  page,
  sortBy,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  // await delay(2000);

const params: any = {
  search,

    page,

    perPage: 12,

    sortBy,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params, 
    },);

  return data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  // await delay(2000);
  const { data } = await axios.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  // await delay(2000);
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  // await delay(5000);
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};
