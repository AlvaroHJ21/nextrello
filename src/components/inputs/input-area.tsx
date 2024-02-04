import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function InputArea(props: Props) {
  const { inputRef, ...restProps } = props;
  return (
    <textarea ref={inputRef} className="py-2 px-3 w-full text-sm resize-none outline-none" {...restProps}></textarea>
  );
}
