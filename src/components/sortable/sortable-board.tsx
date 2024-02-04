'use client';

import React from 'react';

import { DndContext, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';

import useSortableLists from './useSortableLists';
import { List } from '@/interfaces/List';

interface Props {
  lists: List[];
  setLists(lists: List[]): void;
  children: React.ReactNode;
}

export default function SortableBoard(props: Props) {
  const { children, lists, setLists } = props;

  const { handleDragEnd, handleDragOver } = useSortableLists({
    lists,
    setLists,
  });

  // sensors es usado para detectar el movimiento del mouse
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  return (
    <DndContext
      id="0"
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
}
