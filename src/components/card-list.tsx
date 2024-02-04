import React, { useState } from 'react';

import Button from './button';
import Dropdown from './dropdown';
import NewEntry from './new-entry';
import TextEditable from './text-editable';

import { List } from '@/interfaces/List';

interface Props {
  list: List;
  children: React.ReactNode;

  onSaveNewCard?(value: string): void;
  onDeleteList?(): void;
  onUpdateListTitle?(value: string): void;
}

export default function CardList(props: Props) {
  const { list, onSaveNewCard, onDeleteList, onUpdateListTitle, children } = props;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
  }

  return (
    <div className="bg-gray-200 rounded-md shadow-md min-w-64">
      {/* Header */}
      <div className="pt-2 px-3 flex items-center">
        <div className="flex-1">
          <TextEditable value={list.title} onClickOutside={onUpdateListTitle} />
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

      <div className="flex flex-col">
        {/* Cards */}
        {children}

        <div className="pb-2 pt-1 px-2">
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
    </div>
  );
}
