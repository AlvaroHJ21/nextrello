import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { IItem } from './interfaces';
import SortableItem from './sortable-item';
import { useDroppable } from '@dnd-kit/core';

export default function SortableContainer(props: { id: string; items: IItem[] }) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div className="bg-gray-200 rounded-md p-2 w-60">
        <h2>{id}</h2>
        <div ref={setNodeRef} className="flex flex-col gap-1">
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
