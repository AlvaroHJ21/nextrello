'use server';

import { Card } from '@/interfaces/Card';
import { db } from '@/lib/mysql';

export async function getAllCards(): Promise<Card[]> {
  const results = await db.query<Card[]>('SELECT * FROM cards');

  return results.map((result) => ({
    id: result.id,
    title: result.title,
    description: result.description,
    list_id: result.list_id,
  }));
}

export async function createCard(title: string, list_id: number): Promise<Card> {
  const resp = (await db.query(
    `
    INSERT INTO cards (title, list_id)
    VALUES (?, ?)
  `,
    [title, list_id]
  )) as { insertId: number };

  return {
    id: resp.insertId,
    title: title,
    description: '',
    list_id: list_id,
  };
}
