import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableItem from './sortable-item';
import TextEditable from '../text-editable';
import Dropdown from '../dropdown';
import NewEntry from '../new-entry';
import Button from '../button';
import { Card } from '@/interfaces/Card';

interface Props {
  id: string;
  title: string;
  cards: Card[];

  onSaveNewCard?(value: string): void;
  onReorderList?(cards: Card[]): void;
  onDeleteList?(): void;
  onUpdateListTitle?(value: string): void;
}

export default function SortableList(props: Props) {
  const { id, title, cards, onSaveNewCard, onDeleteList, onUpdateListTitle, onReorderList } = props;

  const [showNewCardEntry, setShowNewCardEntry] = useState(false);

  const { setNodeRef } = useDroppable({
    id,
  });

  function handleClickAddCard() {
    setShowNewCardEntry(!showNewCardEntry);
  }

  function handleAddNewCard(value: string) {
    onSaveNewCard?.(value);
  }

  return (
    <SortableContext id={id} items={cards} strategy={verticalListSortingStrategy}>
      <section ref={setNodeRef} className="p-2 bg-gray-200 rounded-md shadow-md min-w-80">
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
            <SortableItem key={card.id} item={card} />
          ))}

          {showNewCardEntry && (
            <NewEntry
              onSave={handleAddNewCard}
              onClickOutside={() => setShowNewCardEntry(false)}
            />
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
    </SortableContext>
  );
}
