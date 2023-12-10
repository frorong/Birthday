'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

const useWindowResizeEffect = (
  width: number,
  setWidth: Dispatch<SetStateAction<number>>
) => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useWindowResizeEffect;
