'use client';

import { usePostBirthday } from '@/hooks';
import { BirthdayCarousel } from '.';

const MainPage = () => {
  const { mutate: birthdayMutate } = usePostBirthday();

  return <BirthdayCarousel />;
};

export default MainPage;
