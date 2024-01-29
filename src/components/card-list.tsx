'use client';

import React, { useState } from 'react';

import Card from './card';
import Button from './button';

import { Card as CardI } from '@/interfaces/Card';
import CardEntry from './card-entry';

interface Props {
  title: string;
  cards: CardI[];

  onSaveNewCard?(value: string): void;
}

export default function CardList(props: Props) {
  const { title, cards, onSaveNewCard } = props;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
  }

  return (
    <section className="p-2 bg-gray-200 rounded-md shadow-md w-60">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-bold">{title}</h2>
          <button>
            <i className="fa fa-ellipsis"></i>
          </button>
        </div>

        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}

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
