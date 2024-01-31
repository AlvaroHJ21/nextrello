import React, { useEffect, useState } from 'react';

interface Props {
  value: string;
  onClickOutside?(value: string): void;
}

export default function TextEditable(props: Props) {
  const { value, onClickOutside } = props;

  const [editValue, setEditValue] = useState(false);
  const [editableValue, setEditableValue] = useState('');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (editValue) {
        const target = e.target as HTMLElement;

        if (!target.closest('.text-editable')) {
          setEditValue(false);
          onClickOutside?.(editableValue);
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [editValue, editableValue]);

  function handleActiveEditTitle() {
    setEditableValue(value);
    setEditValue(true);
  }

  return (
    <div>
      {editValue ? (
        <input
          type="text"
          value={editableValue}
          onChange={(e) => setEditableValue(e.target.value)}
          className="text-editable px-2 py-1 w-full"
        />
      ) : (
        <h2 className="font-bold" onClick={handleActiveEditTitle}>
          {value}
        </h2>
      )}
    </div>
  );
}
