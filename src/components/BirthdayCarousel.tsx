'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { BirthdayResponseType } from '@/types';
import { VectorIcon } from '@/assets';
import { BirthdayContent } from '@/components';
import { useGetBirthdayList } from '@/hooks';

import styled from '@emotion/styled';
import { useWindowResizeEffect } from '@/utils';

interface Props {
  month: number;
}

const MissionCarousel: React.FC<Props> = ({ month }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [birthdayList, setBirthdayList] = useState<BirthdayResponseType[][]>();
  const [width, setWidth] = useState(1920);

  useWindowResizeEffect(setWidth);

  const { data } = useGetBirthdayList(month);
  const { push } = useRouter();

  const [count, setCount] = useState<number>(10);

  const onCardClick = (birthdayId: number) => {
    push(`/${birthdayId}`);
  };

  const resetCount = async () => {
    let cnt: number;
    if (width > 1440) cnt = 8;
    else if (width > 1060) cnt = 6;
    else if (width > 700) cnt = 4;
    else if (width > 380) cnt = 2;
    else cnt = 2;
    await setCount(cnt);
    return cnt;
  };

  const setArray = async () => {
    const cnt = await resetCount();

    const newBirthdayList: BirthdayResponseType[][] = [];
    let temp: BirthdayResponseType[] = [];
    data?.data.forEach((item, index) => {
      temp.push(item);
      if ((index + 1) % cnt === 0) {
        newBirthdayList.push(temp);
        temp = [];
      }
    });
    if (data?.data)
      newBirthdayList.push(
        data.data.slice(newBirthdayList.length * cnt, data.data.length)
      );
    setBirthdayList(newBirthdayList);
  };

  useEffect(() => {
    setArray();
  }, [data?.data, width]);

  return (
    <>
      {birthdayList?.length != 0 && birthdayList && (
        <CarouselWrapper>
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
        </CarouselWrapper>
      )}
    </>
  );
};

export default MissionCarousel;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const ContentWrapper = styled.div<{ taskCard?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.taskCard}, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3.125rem 1.1875rem;
  width: fit-content;
`;

export const PointerWrapper = styled.div`
  cursor: pointer;
`;
