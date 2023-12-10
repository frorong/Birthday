/**@jsxImportSource @emotion/react */
'use client';

import { BirthdayCarousel } from '.';
import { formatDate, useWindowResizeEffect } from '@/utils';
import { BirthdayText } from '@/assets';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

const TWO_LINE_SIZE = 930;

const MainPage = () => {
  const today = formatDate(new Date());

  const [index, setIndex] = useState(parseInt(today.slice(4, 6)));
  const [intro, setIntro] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(1);

  const [width, setWidth] = useState(1920);

  const { push } = useRouter();

  useWindowResizeEffect(setWidth);

  useEffect(() => {
    setTimeout(() => setIntro(false), 2000);
    setInterval(() => {
      setOpacity((prev) => prev - 0.004);
    }, 10);
  }, []);

  return (
    <>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      {intro && (
        <Intro
          css={css`
            opacity: ${opacity};
          `}
        >
          <BirthdayText />
        </Intro>
      )}
      <Header>
        <Any />
        <Today>{today}</Today>
        <PlusButton onClick={() => push('/create')}>생일 생성</PlusButton>
      </Header>
      <Months>
        {width > TWO_LINE_SIZE ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, i) => (
            <MonthWrapper
              key={month}
              isSameIndex={i == index}
              onClick={() => setIndex(i)}
            >
              <Month>{month}</Month>
            </MonthWrapper>
          ))
        ) : (
          <MonthsWrapper>
            <Months>
              {[1, 2, 3, 4, 5, 6].map((month, i) => (
                <MonthWrapper
                  key={month}
                  isSameIndex={i == index}
                  onClick={() => setIndex(i)}
                >
                  <Month>{month}</Month>
                </MonthWrapper>
              ))}
            </Months>
            <Months>
              {[7, 8, 9, 10, 11, 12].map((month, i) => (
                <MonthWrapper
                  key={month}
                  isSameIndex={i + 6 == index}
                  onClick={() => setIndex(i + 6)}
                >
                  <Month>{month}</Month>
                </MonthWrapper>
              ))}
            </Months>
          </MonthsWrapper>
        )}
      </Months>
      <BirthdayCarousel month={index + 1} />
    </>
  );
};

export default MainPage;

const Intro = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f2815f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
`;

const MonthsWrapper = styled.div`
  display: flex;
  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  width: 86.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.875rem;

  @media (max-width: 1630px) {
    width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1280px) {
    width: calc(100vw - 3rem);
  }
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

  @media (max-width: 1630px) {
    height: 4rem;
    width: 8rem;
    font-size: 1.8rem;
    border-radius: 2rem;
  }

  @media (max-width: 930px) {
    height: 3rem;
    width: 6rem;
    font-size: 1.2rem;
    border-radius: 1rem;
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

  @media (max-width: 1630px) {
    gap: 1.75rem;
  }
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

  @media (max-width: 1630px) {
    width: 3.825rem;
    height: 3.825rem;
  }

  @media (max-width: 1280px) {
    width: 2.825rem;
    height: 2.825rem;
  }
`;

const Month = styled.span`
  color: #fff;
  font-size: 1.875rem;
  font-weight: 600;
`;
