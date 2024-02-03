import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Card } from '@/interfaces/Card';

export default function SortableItem(props: { item: Card }) {
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
      className="bg-white p-4 m-1 rounded-md shadow-sm"
    >
      <div className="">
        {item.position}: <span className="font-bold">{item.title}</span>
      </div>
    </div>
  );
}
