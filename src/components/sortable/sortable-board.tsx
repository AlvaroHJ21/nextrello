'use client';

import React from 'react';

import { DndContext, closestCorners } from '@dnd-kit/core';

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

  return (
    <DndContext
      id="0"
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      {children}
    </DndContext>
  );
}
