'use client';

import { List } from '@/interfaces/List';
import React, { useState } from 'react';
import CardList from './card-list';
import Button from './button';

import { createList, deleteList, updateList } from '@/actions/list.actions';
import { createCard } from '@/actions/card.actions';

interface Props {
  lists: List[];
}

export default function Board(props: Props) {
  const [lists, setlists] = useState(props.lists);

  async function handleAddCard(title: string, listId: number) {
    const card = await createCard(title, listId);

    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, card],
        };
      } else {
        return list;
      }
    });

    setlists(newLists);
  }

  async function handleAddList() {
    const newList = await createList('New List');
    console.log(newList);
    setlists([...lists, newList]);
  }

  async function handleDeleteList(listId: number) {
    if (!confirm('Are you sure?')) return;

    await deleteList(listId);
    const newLists = lists.filter((list) => list.id !== listId);
    setlists(newLists);
  }

  async function handleUpdateListTitle(listId: number, title: string) {
    await updateList(listId, title);
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          title,
        };
      } else {
        return list;
      }
    });
    setlists(newLists);
  }

  return (
    <section className="flex container gap-4 items-start overflow-x-auto flex-1 py-4">
      {lists.map((list) => (
        <CardList
          key={list.id}
          title={list.title}
          cards={list.cards}
          onSaveNewCard={(value) => handleAddCard(value, list.id)}
          onDeleteList={() => handleDeleteList(list.id)}
          onUpdateListTitle={(value) => handleUpdateListTitle(list.id, value)}
        />
      ))}
      <Button color="primary" onClick={handleAddList} className="min-w-60">
        Add list
      </Button>
    </section>
  );
}
