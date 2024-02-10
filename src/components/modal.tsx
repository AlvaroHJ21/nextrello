import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  onClose(): void;
}

export default function Modal(props: Props) {
  const { children, onClose } = props;

  const backgroundRef = useRef(null);

  useEffect(() => {
    const board = document.getElementById('board');
    if (board) board.style.overflow = 'hidden';

    return () => {
      if (board) board.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
      onClick={(e) => (e.target === backgroundRef.current ? onClose() : null)}
    >
      <div className="relative bg-white p-8 rounded-md shadow-sm w-full mx-8 max-w-screen-sm">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <i className="fa fa-x"></i>
        </button>

        {children}
      </div>
    </div>
  );
}
