import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'ghost';
}

export default function Button(props: Props) {
  const { className, color = 'primary', ...restProps } = props;

  // const classColor = color === 'ghost' ? 'bg-transparent rounded-md hover:bg-gray-300' : '';

  const classColor = {
    ghost: 'bg-transparent rounded-md hover:bg-gray-300',
    primary: 'bg-blue-500 hover:bg-blue-600 rounded-md text-white',
  };

  return (
    <button className={`py-2 px-4 text-sm ${classColor[color]} ${className}`} {...restProps} />
  );
}
