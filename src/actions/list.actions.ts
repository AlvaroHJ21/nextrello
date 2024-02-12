'use server';

import { List } from '@/interfaces/List';
import { db } from '@/lib/mysql2';

export async function getAllLists(): Promise<List[]> {
  const [results] = await db.query<any[]>(`
  SELECT
    lists.*,

    (SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'id', cards.id,
                  'title', cards.title,
                  'description', cards.description,
                  'image_url', cards.image_url,
                  'position', cards.position,
                  'list_id', cards.list_id
              )
          ) 
          FROM cards 
          WHERE lists.id = cards.list_id
          ORDER BY cards.position 
    ) AS cards

  FROM
    lists;
  `);

  return (results as List[]).map((result) => ({
    id: result.id,
    cards: (result.cards ?? []).sort((a, b) => a.position - b.position),
    title: result.title,
  }));
}

export async function createList(title: string): Promise<List> {
  const [result] = await db.query(
    `
    INSERT INTO lists (title, board_id)
    VALUES (?, 1)
  `,
    [title]
  );

  const resp = result as { insertId: number };

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
