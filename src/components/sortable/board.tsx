'use client';

import React, { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, DragOverEvent, closestCorners } from '@dnd-kit/core';
import { ILists } from './interfaces';
import SortableContainer from './sortable-container';

export default function Board() {
  const [lists, setLists] = useState<ILists[]>([
    {
      id: '1',
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
      ],
    },
    {
      id: '2',
      items: [
        { id: '5', name: 'Item 5' },
        { id: '6', name: 'Item 6' },
      ],
    },
    {
      id: '3',
      items: [{ id: '7', name: 'Item 7' }],
    },
    {
      id: '4',
      items: [],
    },
  ]);

  return (
    <section className="flex gap-8 p-20">
      <DndContext
        id="0"
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {lists.map((list) => (
          <SortableContainer key={list.id} id={`container-${list.id}`} items={list.items} />
        ))}
      </DndContext>
    </section>
  );

  function findContainerId(id: string | number) {
    // si el id es de un contenedor, retornar el id
    const listById = lists.find((list) => `container-${list.id}` === String(id));

    if (listById) return listById.id;

    // si el id es de un item, retornar el id del contenedor
    return lists.find((list) => list.items.some((item) => item.id === id))?.id;
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);

    if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) return;

    // pass item to the over container
    const activeContainer = lists.find((list) => list.id === activeContainerId);
    const overContainer = lists.find((list) => list.id === overContainerId);

    if (!activeContainer || !overContainer) return;

    const activeIndex = activeContainer.items.findIndex((item) => item.id === activeId);
    let overIndex = overContainer.items.findIndex((item) => item.id === overId);

    // overIndex = overIndex === -1 ? overContainer.items.length : overIndex;

    const activeItem = activeContainer.items[activeIndex];

    // Update the lists
    setLists((prev) => {
      const temp = prev.map((list) => {
        if (list.id === activeContainerId) {
          return {
            ...list,
            items: list.items.filter((item) => item.id !== activeId),
          };
        }
        if (list.id === overContainerId) {
          return {
            ...list,
            items: [
              ...list.items.slice(0, overIndex),
              activeItem,
              ...list.items.slice(overIndex, list.items.length),
            ],
          };
        }
        return list;
      });

      return temp;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeContainerId = findContainerId(active.id);

    if (!activeContainerId) return;

    const activeContainer = lists.find((list) => list.id === activeContainerId);

    const oldIndex = activeContainer?.items.findIndex((t) => t.id === active.id) ?? 0;
    const newIndex = activeContainer?.items.findIndex((t) => t.id === over.id) ?? 0;

    if (oldIndex === undefined || newIndex === undefined) return;
    if (oldIndex === -1 || newIndex === -1) return;

    setLists((prev) => {
      const newActiveItems = prev.map((list) => {
        if (list.id === activeContainerId) {
          return {
            ...list,
            items: arrayMove(list.items, oldIndex, newIndex),
          };
        }
        return list;
      });

      return newActiveItems;
    });
  }
}
