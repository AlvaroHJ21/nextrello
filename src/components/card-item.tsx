import React, { useEffect, useState } from 'react';
import { Card } from '@/interfaces/Card';

interface Props {
  card: Card;
}

export default function CardItem(props: Props) {
  const { card } = props;

  function handleClickCard() {
    console.log(card.title);
  }

  return (
    <div className="bg-white py-2 px-4 rounded-md shadow-sm text-gray-600 flex flex-col gap-1">
      <h4 onClick={handleClickCard} className="text-sm">
        {card.title}
      </h4>
      <div className="flex gap-2 text-xs">
        {card.description && (
          <span>
            <i className="fa fa-align-left"></i>
          </span>
        )}
        <span>
          <i className="fa-regular fa-square-check"></i> {0}/{3}
        </span>
      </div>
    </div>
  );
}
