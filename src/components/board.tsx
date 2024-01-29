'use client';

import { List } from '@/interfaces/List';
import React, { useState } from 'react';
import CardList from './card-list';
import Button from './button';
import { Card } from '@/interfaces/Card';

interface Props {
  lists: List[];
}

export default function Board(props: Props) {
  const [lists, setlists] = useState(props.lists);

  function handleAddCard(title: string, listId: string) {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const newCard: Card = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          description: '',
        };

        return {
          ...list,
          card: [...list.card, newCard],
        };
      }

      return list;
    });

    setlists(newLists);
  }

  function handleAddList() {
    const newList: List = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New List',
      card: [],
    };

    setlists([...lists, newList]);
  }

  return (
    <section className="flex container gap-4 items-start">
      {lists.map((list) => (
        <CardList
          key={list.id}
          title={list.title}
          cards={list.card}
          onSaveNewCard={(value) => handleAddCard(value, list.id)}
        />
      ))}
      <Button color="primary" onClick={handleAddList}>
        Add list
      </Button>
    </section>
  );
}
