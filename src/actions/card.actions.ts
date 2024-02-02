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
    position: result.position,
  }));
}

export async function createCard(title: string, list_id: number): Promise<Card> {
  const lenghtList = (await db.query(
    `
    SELECT COUNT(*) AS count FROM cards WHERE list_id = ?
  `,
    [list_id]
  )) as { count: number }[];

  const resp = (await db.query(
    `
    INSERT INTO cards (title, list_id, position)
    VALUES (?, ?, ?)
  `,
    [title, list_id, lenghtList[0].count]
  )) as { insertId: number };

  return {
    id: resp.insertId,
    title: title,
    description: '',
    list_id: list_id,
    position: lenghtList[0].count,
  };
}

export async function updateCardsPosition(cards: Card[]): Promise<void> {

  const promises = cards.map((card) =>
    db.query(
      `
      UPDATE cards
      SET position = ?
      WHERE id = ?
    `,
      [card.position, card.id]
    )
  );

  await Promise.all(promises);
}
