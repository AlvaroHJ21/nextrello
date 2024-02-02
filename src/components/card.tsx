import { Card } from '@/interfaces/Card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface Props {
  card: Card;
}

export default function Card(props: Props) {
  const { card } = props;

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-md shadow-sm text-sm cursor-pointer"
    >
      {card.title}
    </div>
  );
}
