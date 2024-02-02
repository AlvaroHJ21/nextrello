'use client';
import React, { useId, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  title: string;
}

function ItemTask(props: { task: Task }) {
  const { task } = props;

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-4 m-4 shadow-md"
    >
      {task.title}
    </li>
  );
}

export default function Sortable() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1123', title: 'Task 1' },
    { id: '2123', title: 'Task 2' },
    { id: '3123', title: 'Task 3' },
    { id: '4123', title: 'Task 4' },
  ]);

  const id = useId();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    setTasks((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  return (
    <DndContext id={id} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul className="w-60">
          {tasks.map((item) => (
            <ItemTask key={item.id} task={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
