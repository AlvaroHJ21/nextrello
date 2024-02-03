import React, { useEffect, useRef, useState } from 'react';
import InputArea from './inputs/input-area';

interface Props {
  onSave?(value: string): void;
  onClickOutside?(): void;
}

export default function NewEntry(props: Props) {
  const { onSave, onClickOutside } = props;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  // const [value, setValue] = useState('');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target == inputRef.current) return;

      onClickOutside?.();

      const value = inputRef.current?.value.trim();

      if (value) {
        if (value.length === 0) return;

        onSave?.(value);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <InputArea
      inputRef={inputRef}
      name=""
      placeholder="Introduzca un título para esta tarjeta..."
    ></InputArea>
  );
}
