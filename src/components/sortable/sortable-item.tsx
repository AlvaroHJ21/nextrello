import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
  id: string | number;
  children: React.ReactNode;
}

export default function SortableItem(props: Props) {
  const { id, children } = props;

  const { active, attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
    zIndex: active?.id === id ? 100 : 0,
    rotate: active?.id === id ? '4deg' : '0deg',
  };

  //*Item debe tener margin para evitar bug
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mx-2 my-1 transition-[rotate]">
      {children}
    </div>
  );
}
