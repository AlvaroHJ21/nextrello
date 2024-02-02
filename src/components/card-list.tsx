'use client';

import React, { useId, useState } from 'react';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Card from './card';
import Button from './button';
import CardEntry from './card-entry';
import Dropdown from './dropdown';
import TextEditable from './text-editable';

import { Card as CardI } from '@/interfaces/Card';

interface Props {
  title: string;
  cards: CardI[];

  onSaveNewCard?(value: string): void;
  onReorderList?(cards: CardI[]): void;
  onDeleteList?(): void;
  onUpdateListTitle?(value: string): void;
}

export default function CardList(props: Props) {
  const { title, cards, onSaveNewCard, onDeleteList, onUpdateListTitle, onReorderList } = props;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  const id = useId();

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);

    const reorderedCards = arrayMove(cards, oldIndex, newIndex);

    onReorderList?.(reorderedCards.map((card, index) => ({ ...card, position: index })));
  }

  return (
    <section className="p-2 bg-gray-200 rounded-md shadow-md min-w-60">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <div className="flex-1">
            <TextEditable value={title} onClickOutside={onUpdateListTitle} />
          </div>

          <Dropdown
            menu={
              <ul className="bg-white shadow-md rounded-md p-1">
                <li className="hover:bg-gray-100 px-2 py-1 text-sm">
                  <button onClick={onDeleteList}>Remove</button>
                </li>
              </ul>
            }
          >
            <i className="fa fa-ellipsis"></i>
          </Dropdown>
        </div>

        <DndContext id={id} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            {cards
              .sort((a, b) => a.position - b.position)
              .map((card) => (
                <Card key={card.id} card={card} />
              ))}
          </SortableContext>
        </DndContext>

        {showNewCardEntry && (
          <CardEntry onSave={handleAddNewCard} onClickOutside={() => setShowNewCardEntry(false)} />
        )}

        <div className="flex">
          <Button onClick={handleClickAddCard} color="ghost" className="flex-1">
            <i className="fa fa-plus mr-1"></i>Add a card
          </Button>
          {showNewCardEntry && (
            <Button onClick={handleClickAddCard} color="ghost">
              <i className="fa fa-x"></i>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
