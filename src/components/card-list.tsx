import { Card } from '@/interfaces/Card';
import React, { useState } from 'react';
import TextEditable from './text-editable';
import Dropdown from './dropdown';
import NewEntry from './new-entry';
import Button from './button';
import { List } from '@/interfaces/List';

interface Props {
  list: List;
  children: React.ReactNode;

  onSaveNewCard?(value: string): void;
  onReorderList?(cards: Card[]): void;
  onDeleteList?(): void;
  onUpdateListTitle?(value: string): void;
}

export default function CardList(props: Props) {
  const { list, onSaveNewCard, onDeleteList, onUpdateListTitle, onReorderList, children } = props;
  const { title, cards } = list;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
  }

  return (
    <div className="p-2 bg-gray-200 rounded-md shadow-md min-w-80">
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

        {/* {cards.map((card) => (
        <SortableItem key={card.id} id={card.id}>
          <CardItem card={card} />
        </SortableItem>
      ))} */}
        {children}

        {showNewCardEntry && (
          <NewEntry onSave={handleAddNewCard} onClickOutside={() => setShowNewCardEntry(false)} />
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
    </div>
  );
}
