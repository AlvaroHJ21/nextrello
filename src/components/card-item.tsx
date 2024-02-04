import React from 'react';
import { Card } from '@/interfaces/Card';

interface Props {
  card: Card;
}

export default function CardItem(props: Props) {
  const { card } = props;
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div>{card.title}</div>
    </div>
  );
}
