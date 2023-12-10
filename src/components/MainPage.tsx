'use client';

import { usePostBirthday } from '@/hooks';
import { BirthdayCarousel } from '.';
import { formatDate } from '@/utils';

import styled from '@emotion/styled';
import { useState } from 'react';

const MainPage = () => {
  const { mutate: birthdayMutate } = usePostBirthday();

  const [index, setIndex] = useState(0);

  return (
    <>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      <Today>{formatDate(new Date())}</Today>
      <Months>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, i) => (
          <MonthWrapper
            key={month}
            isSameIndex={i == index}
            onClick={() => setIndex(i)}
          >
            <Month>{month}</Month>
          </MonthWrapper>
        ))}
      </Months>
      <BirthdayCarousel month={index + 1} />
    </>
  );
};

export default MainPage;

const Today = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 3.875rem;
`;

const Months = styled.div`
  display: inline-flex;
  gap: 1.75rem;
  margin: 2% 0 4%;
`;

const MonthWrapper = styled.div<{ isSameIndex: boolean }>`
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  ${({ isSameIndex }) => isSameIndex && 'background: #ffcf53'};
  transition: ease-in-out background 0.2s;
`;

const Month = styled.span`
  color: #fff;
  font-size: 1.875rem;
  font-weight: 600;
`;
