'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { BirthdayResponseType } from '@/types';
import { VectorIcon } from '@/assets';
import { BirthdayContent } from '@/components';

import styled from '@emotion/styled';
import { useWindowResizeEffect } from '@/utils';
import fireStore from '@/firebase/firestore';
import { onSnapshot, collection } from 'firebase/firestore';

interface Props {
  month: number;
}

const MissionCarousel: React.FC<Props> = ({ month }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [birthdayList, setBirthdayList] = useState<BirthdayResponseType[][]>();
  const [width, setWidth] = useState(1920);

  useWindowResizeEffect(setWidth);

  const { push } = useRouter();

  const [count, setCount] = useState<number>(10);

  const [data, setData] = useState<BirthdayResponseType[]>([]);

  function subscribeToData() {
    const unsubscribe = onSnapshot(
      collection(fireStore, 'birthday'),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList as any[]);
        console.log('Real-time data:', dataList);
      }
    );

    return unsubscribe;
  }

  const onCardClick = (birthdayId: number) => {
    push(`/${birthdayId}`);
  };

  const resetCount = async () => {
    let cnt: number;
    if (width > 1630) cnt = 8;
    else if (width > 1280) cnt = 6;
    else if (width > 930) cnt = 4;
    else if (width > 380) cnt = 2;
    else cnt = 2;
    await setCount(cnt);
    return cnt;
  };

  const setArray = async () => {
    const cnt = await resetCount();

    const newBirthdayList: BirthdayResponseType[][] = [];
    let temp: BirthdayResponseType[] = [];
    data.forEach((item, index) => {
      temp.push(item);
      if ((index + 1) % cnt === 0) {
        newBirthdayList.push(temp);
        temp = [];
      }
    });
    if (data)
      newBirthdayList.push(
        data.slice(newBirthdayList.length * cnt, data.length)
      );

    console.log(data);
    setBirthdayList(newBirthdayList);
  };

  useEffect(() => {
    setArray();
  }, [data, width]);

  useEffect(() => {
    const unsubscribe = subscribeToData();

    return () => {
      unsubscribe();
    };
  }, []);

  const moveLeft = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };

  const moveRight = () => {
    if (birthdayList && pageIndex < birthdayList.length - 1)
      if (
        pageIndex !== birthdayList.length - 2 ||
        birthdayList[birthdayList.length - 1][0]
      )
        setPageIndex((prev) => prev + 1);
  };

  return (
    <>
      {birthdayList && birthdayList[0] && birthdayList[0].length > 0 ? (
        <CarouselWrapper>
          <LeftWrapper onClick={moveLeft}>
            {pageIndex > 0 && <VectorIcon />}
          </LeftWrapper>
          <ContentWrapper taskCard={count / 2}>
            {birthdayList[pageIndex]?.map((birthday) => (
              <BirthdayContent
                onClick={() => onCardClick(birthday.id)}
                key={birthday.id}
                birthday={birthday.birthday}
                name={birthday.name}
              />
            ))}
          </ContentWrapper>
          <PointerWrapper onClick={moveRight}>
            {birthdayList[1] && <VectorIcon />}
          </PointerWrapper>
        </CarouselWrapper>
      ) : (
        <NotFoundTextWrapper>
          <NotFoundText>아직 등록된</NotFoundText>
          <NotFoundText>{'       '}생일이 없어요...</NotFoundText>
        </NotFoundTextWrapper>
      )}
    </>
  );
};

export default MissionCarousel;

const NotFoundTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  margin-top: 3.125rem;
`;

const NotFoundText = styled.pre`
  @font-face {
    font-family: 'insungitCutelivelyjisu';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/insungitCutelivelyjisu.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'insungitCutelivelyjisu';
  color: #fff;
  font-size: 6.25rem;

  @media (max-width: 930px) {
    font-size: 4.25rem;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const ContentWrapper = styled.div<{ taskCard?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.taskCard}, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3.125rem 1.1875rem;
  width: fit-content;
`;

const PointerWrapper = styled.div`
  cursor: pointer;
  width: 4.125rem;
`;

const LeftWrapper = styled(PointerWrapper)`
  transform: rotate(180deg);
`;
