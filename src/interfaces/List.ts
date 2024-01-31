import { Card } from './Card';

export interface List {
  id: number;
  title: string;
  cards: Card[];
}
