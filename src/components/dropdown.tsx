import React, { useEffect, useState } from 'react';
import Button from './button';

interface Props {
  children: React.ReactNode;
  menu: React.ReactNode;
}

export default function Dropdown(props: Props) {
  const { children, menu } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {

      if (show) {
        // const target = e.target as HTMLElement;

        setShow(false);
        // if (!target.closest('.dropdown')) {
        // }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [show]);

  return (
    <div className="relative">
      <Button color="ghost" onClick={() => setShow(!show)}>
        {children}
      </Button>

      {show && <div className="absolute z-20">{menu}</div>}
    </div>
  );
}
