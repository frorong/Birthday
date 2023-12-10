'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

export const useWindowResizeEffect = (
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

useWindowResizeEffect;
