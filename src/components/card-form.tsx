import { useState } from 'react';
import TextEditable from './text-editable';
import Button from './button';
import { Card } from '@/interfaces/Card';

interface Props {
  card: Card;
  onSave?(card: Card): void;
  onDelete?(card: Card): void;
}
export default function CardForm(props: Props) {
  const { onSave, onDelete } = props;

  const [card, setCard] = useState(props.card);

  return (
    <div className="grid grid-cols-[1fr_120px] gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <i className="fa-solid fa-font"></i>
          <div className="flex-1">
            <TextEditable
              value={card.title}
              onClickOutside={(value) => setCard({ ...card, title: value })}
              className="font-semibold text-gray-600 text-xl"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <i className="fa fa-align-left"></i>
          <div className="flex-1">
            <TextEditable
              value={card.description ?? ''}
              onClickOutside={(value) => setCard({ ...card, description: value })}
              textArea
              placeholder="Enter a description"
            />
          </div>
        </div>
        <div>
          <Button onClick={() => onSave?.(card)}>Save</Button>
        </div>
      </div>
      <div className="text-gray-600">
        <h3 className="text-sm">Acciones</h3>
        <Button color="ghost" className="w-full text-start">
          <i className="fa fa-arrow-right mr-2"></i>
          Mover
        </Button>
        <Button onClick={() => onDelete?.(card)} color="ghost" className="w-full text-start">
          <i className="fa fa-trash mr-2"></i>
          Eliminar
        </Button>
        <Button color="ghost" className="w-full text-start">
          <i className="fa fa-archive mr-2"></i>
          Archivar
        </Button>
      </div>
    </div>
  );
}
