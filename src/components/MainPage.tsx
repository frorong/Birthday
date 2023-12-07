'use client';

import { usePostBirthday } from '@/hooks';

const MainPage = () => {
  const { mutate: birthdayMutate } = usePostBirthday();
};

export default MainPage;
