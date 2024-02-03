import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { updateCardsPosition } from '@/actions/card.actions';
import { Card } from '@/interfaces/Card';
import { List } from '@/interfaces/List';

interface Props {
  lists: List[];
  setLists(lists: List[]): void;
}

export default function useSortableLists(props: Props) {
  const { lists, setLists } = props;

  function findContainerId(id: string | number) {
    // si el id es de un contenedor, retornar el id
    const listById = lists.find((list) => `container-${list.id}` === String(id));

    if (listById) return listById.id;

    // si el id es de un item, retornar el id del contenedor
    return lists.find((list) => list.cards.some((item) => item.id === id))?.id;
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

    const activeIndex = activeContainer.cards.findIndex((item) => item.id === activeId);
    let overIndex = overContainer.cards.findIndex((item) => item.id === overId);

    overIndex = overIndex === -1 ? 0 : overIndex;

    const activeItem = activeContainer.cards[activeIndex];

    // Update the lists

    let fromCards: Card[] = [];
    let toCards: Card[] = [];

    const temp: List[] = lists.map((list) => {
      if (list.id === activeContainerId) {
        fromCards = list.cards
          .filter((item) => item.id !== activeId)
          .map((item, index) => ({ ...item, position: index }));
        return {
          ...list,
          cards: fromCards,
        };
      }
      if (list.id === overContainerId) {
        toCards = [
          ...list.cards.slice(0, overIndex),
          { ...activeItem, list_id: list.id },
          ...list.cards.slice(overIndex, list.cards.length),
        ];
        toCards = toCards.map((item, index) => ({ ...item, position: index }));
        return {
          ...list,
          cards: toCards,
        };
      }
      return list;
    });

    // if (toCards.length === 1) {
    updateCardsPosition(fromCards);
    updateCardsPosition(toCards);
    // }

    setLists(temp);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const activeContainerId = findContainerId(active.id);

    if (!activeContainerId) return;

    const activeContainer = lists.find((list) => list.id === activeContainerId);

    if (!over || active.id === over.id) return;

    const oldIndex = activeContainer?.cards.findIndex((t) => t.id === active.id) ?? 0;
    const newIndex = activeContainer?.cards.findIndex((t) => t.id === over.id) ?? 0;

    if (oldIndex === undefined || newIndex === undefined) return;
    if (oldIndex === -1 || newIndex === -1) return;

    let updatedCards: Card[] = [];

    const temp: List[] = lists.map((list) => {
      if (list.id === activeContainerId) {
        updatedCards = arrayMove(list.cards, oldIndex, newIndex).map((card, index) => ({
          ...card,
          position: index,
          list_id: list.id,
        }));
        return {
          ...list,
          cards: updatedCards,
        };
      }
      return list;
    });

    updateCardsPosition(updatedCards);

    setLists(temp);
  }
  return {
    handleDragOver,
    handleDragEnd,
  };
}
