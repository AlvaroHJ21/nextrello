import React, { useEffect, useState } from 'react';

interface Props {
  value: string;
  className?: string;
  onClickOutside?(value: string): void;
  textArea?: boolean;
  placeholder?: string;
}

export default function TextEditable(props: Props) {
  const { value, onClickOutside, className, textArea = false, placeholder } = props;

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

  const Input = textArea ? 'textarea' : 'input';

  return (
    <div className="text-sm">
      {editValue ? (
        <Input
          type="text"
          value={editableValue}
          onChange={(e) => setEditableValue(e.target.value)}
          className={'text-editable px-2 py-1 w-full bg-transparent ' + className}
          autoFocus
          placeholder={placeholder}
        />
      ) : (
        <h2 className={'min-h-4 ' + className} onClick={handleActiveEditTitle}>
          {value.length === 0 ? <span className="text-gray-500">{placeholder}</span> : value}
        </h2>
      )}
    </div>
  );
}
