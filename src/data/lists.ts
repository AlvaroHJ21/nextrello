import { List } from '@/interfaces/List';

export const lists: List[] = [
  {
    id: 1,
    title: 'To Do',
    cards: [
      {
        id: 1,
        title: 'Create a new project',
        description:
          'Proident cupidatat ea amet minim deserunt est nulla non labore aliquip amet dolore magna do.',
        list_id: 1,
        position: 0,
      },
    ],
  },
  {
    id: 2,
    title: 'Doing',
    cards: [],
  },
  {
    id: 3,
    title: 'Done',
    cards: [],
  },
];
