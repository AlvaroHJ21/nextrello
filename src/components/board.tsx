'use client';

import React, { useState } from 'react';

import { createCard } from '@/actions/card.actions';
import { createList, deleteList, updateList } from '@/actions/list.actions';

import Button from './button';
import CardItem from './card-item';
import CardList from './card-list';
import SortableBoard from './sortable/sortable-board';
import SortableItem from './sortable/sortable-item';
import SortableList from './sortable/sortable-list';
import { List } from '@/interfaces/List';

interface Props {
  lists: List[];
}

export default function Board(props: Props) {
  const [lists, setLists] = useState<List[]>(props.lists);

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
    <section className="flex gap-2 p-20 items-start overflow-x-auto flex-1">

      <SortableBoard lists={lists} setLists={setLists}>

        {lists.map((list) => (

          <SortableList key={list.id} id={`container-${list.id}`} items={list.cards}>

            <CardList
              list={list}
              onSaveNewCard={(value) => handleAddCard(value, list.id)}
              onDeleteList={() => handleDeleteList(list.id)}
              onUpdateListTitle={(value) => handleUpdateListTitle(list.id, value)}
            >

              {list.cards.map((card) => (
                <SortableItem key={card.id} id={card.id}>

                  <CardItem card={card} />
                  
                </SortableItem>
              ))}

            </CardList>

          </SortableList>
        ))}

      </SortableBoard>

      <Button color="primary" onClick={handleAddList} className="min-w-60">
        Add list
      </Button>
    </section>
  );
}
