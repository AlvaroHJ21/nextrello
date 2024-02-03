'use client';

import React, { useState } from 'react';

import { DndContext, closestCorners } from '@dnd-kit/core';
import SortableList from './sortable-list';
import useSortableLists from './useSortableLists';
import Button from '../button';
import { createCard } from '@/actions/card.actions';
import { createList, deleteList, updateList } from '@/actions/list.actions';
import { List } from '@/interfaces/List';

interface Props {
  lists: List[];
}

export default function Board(props: Props) {
  const [lists, setLists] = useState<List[]>(props.lists);

  const { handleDragEnd, handleDragOver } = useSortableLists({
    lists,
    setLists,
  });

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

    setLists(newLists);
  }

  async function handleAddList() {
    const newList = await createList('New List');
    setLists([...lists, newList]);
  }

  async function handleDeleteList(listId: number) {
    if (!confirm('Are you sure?')) return;

    deleteList(listId);
    const newLists = lists.filter((list) => list.id !== listId);
    setLists(newLists);
  }

  async function handleUpdateListTitle(listId: number, title: string) {
    updateList(listId, title);
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
    setLists(newLists);
  }

  return (
    <section className="flex gap-8 p-20 items-start overflow-x-auto flex-1">
      <DndContext
        id="0"
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {lists.map((list) => (
          <SortableList
            key={list.id}
            id={`container-${list.id}`}
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
      </DndContext>
    </section>
  );
}
