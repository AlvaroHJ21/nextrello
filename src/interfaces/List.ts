import { Card } from './Card';

export interface List {
  id: string;
  title: string;
  card: Card[];
}
