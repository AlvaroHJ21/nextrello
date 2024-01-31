'use server';

import { List } from '@/interfaces/List';
import { db } from '@/lib/mysql';

export async function getAllLists(): Promise<List[]> {
  const results = await db.query<any[]>(`
    SELECT 
    lists.*, 
    
    JSON_ARRAYAGG(
      JSON_OBJECT(
          'id', cards.id,
          'title', cards.title,
          'descripcion', cards.description
      )
    ) AS cards

    FROM
      lists
    LEFT JOIN
      cards ON lists.id = cards.list_id
    GROUP BY
      lists.id;
  `);

  return results.map((result) => ({
    id: result.id,
    cards: JSON.parse(result.cards) || [],
    title: result.title,
  }));
}

export async function createList(title: string): Promise<List> {
  const resp = (await db.query(
    `
    INSERT INTO lists (title, board_id)
    VALUES (?, 1)
  `,
    [title]
  )) as { insertId: number };

  return {
    id: resp.insertId,
    title: title,
    cards: [],
  };
}

export async function updateList(id: number, title: string): Promise<void> {
  await db.query(
    `
    UPDATE lists SET title = ? WHERE id = ?
  `,
    [title, id]
  );
}

export async function deleteList(id: number): Promise<void> {
  await db.query(
    `
    DELETE FROM lists WHERE id = ?
  `,
    [id]
  );
}
