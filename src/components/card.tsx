import { Card } from '@/interfaces/Card';
import React from 'react';

interface Props {
  card: Card;
}

export default function Card(props: Props) {
  const { card } = props;
  return <div className='bg-white p-4 rounded-md shadow-sm text-sm cursor-pointer'>{card.title}</div>;
}
