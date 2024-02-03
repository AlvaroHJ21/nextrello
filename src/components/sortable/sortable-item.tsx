import { CSS } from '@dnd-kit/utilities';
import { IItem } from './interfaces';
import { useSortable } from '@dnd-kit/sortable';

export default function SortableItem(props: { item: IItem }) {
  const { item } = props;

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //*Item debe tener margin para evitar bug
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 m-2 rounded-md shadow-sm"
    >
      {item.name}
    </div>
  );
}
