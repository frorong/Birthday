/**@jsxImportSource @emotion/react */
'use client';

import { BirthdayCarousel } from '.';
import { formatDate } from '@/utils';

import styled from '@emotion/styled';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

const MainPage = () => {
  const [index, setIndex] = useState(0);

  const { push } = useRouter();

  return (
    <>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      <Header>
        <Any />
        <Today>{formatDate(new Date())}</Today>
        <PlusButton onClick={() => push('/create')}>생일 생성</PlusButton>
      </Header>
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

const Header = styled.div`
  width: 86.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.875rem;
`;

const Any = styled.div`
  width: 10rem;
`;

const PlusButton = styled.button`
  height: 4.5rem;
  width: 10rem;
  background-color: #ffcf53;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  font-size: 2.125rem;
  transition: ease-in-out 0.2s;
  font-weight: 600;

  :hover {
    box-shadow: 0 0 0.625rem 0.3125rem;
  }
`;

const Today = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
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
  transition: ease-in-out 0.2s;
  color: white;

  :hover {
    box-shadow: 0 0 0.625rem 0.3125rem;
  }
`;

const Month = styled.span`
  color: #fff;
  font-size: 1.875rem;
  font-weight: 600;
`;
