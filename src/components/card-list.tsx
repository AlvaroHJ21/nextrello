'use client';

import React, { useState } from 'react';

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
  onDeleteList?(): void;
  onUpdateListTitle?(value: string): void;
}

export default function CardList(props: Props) {
  const { title, cards, onSaveNewCard, onDeleteList, onUpdateListTitle } = props;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
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
