import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
  id: string | number;
  children: React.ReactNode;
}

export default function SortableItem(props: Props) {
  const { id, children } = props;

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

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
      className="mx-2 my-1"
    >
      {children}
    </div>
  );
}
