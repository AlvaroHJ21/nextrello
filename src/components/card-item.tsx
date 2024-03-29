import { Card } from '@/interfaces/Card';

interface Props {
  card: Card;
  onOpenModal: (card: Card) => void;
}

export default function CardItem(props: Props) {
  const { card, onOpenModal } = props;

  function handleClickCard() {
    onOpenModal(card);
  }

  return (
    <div
      onClick={handleClickCard}
      className="bg-white rounded-md overflow-hidden shadow-sm text-gray-600 flex flex-col gap-1 border-2 hover:border-blue-500"
    >
      {card.image_url && <img src={card.image_url} alt="" />}
      <div className="py-2 px-4">
        <h4 className="text-sm">{card.title}</h4>
        <div className="flex gap-2 text-xs">
          {card.description && (
            <span>
              <i className="fa fa-align-left"></i>
            </span>
          )}
          <span>
            <i className="fa-regular fa-square-check"></i> {0}/{3}
          </span>
        </div>
      </div>
    </div>
  );
}
