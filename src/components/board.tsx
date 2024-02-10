'use client';

import React, { useState } from 'react';

import { createCard, deleteCard, updateCard } from '@/actions/card.actions';
import { createList, deleteList, updateList } from '@/actions/list.actions';

import Button from './button';
import CardForm from './card-form';
import CardItem from './card-item';
import CardList from './card-list';
import Modal from './modal';
import SortableBoard from './sortable/sortable-board';
import SortableItem from './sortable/sortable-item';
import SortableList from './sortable/sortable-list';
import { List } from '@/interfaces/List';
import { Card } from '@/interfaces/Card';

interface Props {
  lists: List[];
}

export default function Board(props: Props) {
  const [lists, setLists] = useState<List[]>(props.lists);

  const [openModalCard, setOpenModalCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>();

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

  async function handleUpdateCard(card: Card) {

    const updatedCard = await updateCard(card);

    const newLists = lists.map((list) => {
      if (list.id === updatedCard.list_id) {
        return {
          ...list,
          cards: list.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        };
      } else {
        return list;
      }
    });

    setLists(newLists);

    setOpenModalCard(false);
  }

  async function handleDeleteCard(card: Card) {
    if (!confirm('Are you sure?')) return;
    deleteCard(card.id);
    const newLists = lists.map((list) => {
      if (list.id === card.list_id) {
        return {
          ...list,
          cards: list.cards.filter((c) => c.id !== card.id),
        };
      } else {
        return list;
      }
    });

    setLists(newLists);

    setOpenModalCard(false);
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
    <section id="board" className="flex gap-2 p-8 items-start overflow-x-auto flex-1">
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
                  <CardItem
                    card={card}
                    onOpenModal={(card) => {
                      setSelectedCard(card);
                      setOpenModalCard(true);
                    }}
                  />
                </SortableItem>
              ))}
            </CardList>
          </SortableList>
        ))}
      </SortableBoard>

      <Button color="primary" onClick={handleAddList} className="min-w-60">
        Add list
      </Button>

      {openModalCard && selectedCard && (
        <Modal onClose={() => setOpenModalCard(false)}>
          <CardForm card={selectedCard} onSave={handleUpdateCard} onDelete={handleDeleteCard} />
        </Modal>
      )}
    </section>
  );
}
