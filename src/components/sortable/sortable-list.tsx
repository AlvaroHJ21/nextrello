import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Card } from '@/interfaces/Card';

interface Props {
  id: string;
  items: Card[];
  children: React.ReactNode;
}

export default function SortableList(props: Props) {
  const { id, children, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <section ref={setNodeRef}>{children}</section>
    </SortableContext>
  );
}
