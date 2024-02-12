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

export async function updateCard(card: Card): Promise<Card> {
  await db.query(
    `
    UPDATE cards
    SET title = ?, description = ?, image_url = ?, list_id = ?, position = ?
    WHERE id = ?
  `,
    [card.title, card.description, card.image_url, card.list_id, card.position, card.id]
  );

  return card;
}

export async function updateCardsPosition(cards: Card[]): Promise<void> {
  const promises = cards.map((card, index) =>
    db.query(
      `
      UPDATE cards
      SET position = ?, list_id = ?
      WHERE id = ?
    `,
      [index, card.list_id, card.id]
    )
  );

  await Promise.all(promises);
}

export async function deleteCard(id: number): Promise<void> {
  await db.query(
    `
    DELETE FROM cards
    WHERE id = ?
  `,
    [id]
  );
}
