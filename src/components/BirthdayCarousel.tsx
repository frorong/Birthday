'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { BirthdayResponseType } from '@/types';
import { VectorIcon } from '@/assets';
import { BirthdayContent } from '@/components';
import { useGetBirthdayList } from '@/hooks';

import styled from '@emotion/styled';

const MissionCarousel = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [missionList, setMissionList] = useState<BirthdayResponseType[][]>();
  const [width, setWidth] = useState(1920);

  useWindowResizeEffect(width, setWidth);

  const { data } = useGetBirthdayList();
  const { push } = useRouter();

  const [count, setCount] = useState<number>(10);

  const onCardClick = (birthdayId: number) => {
    push(`/${birthdayId}`);
  };

  const resetCount = async () => {
    let cnt: number;
    if (width > 1480) cnt = 10;
    else if (width > 1020) cnt = 8;
    else if (width > 515) cnt = 6;
    else if (width > 380) cnt = 4;
    else cnt = 2;
    await setCount(cnt);
    return cnt;
  };

  const setArray = async () => {
    const cnt = await resetCount();

    const newMissionList: BirthdayResponseType[][] = [];
    let temp: BirthdayResponseType[] = [];
    data?.forEach((item, index) => {
      temp.push(item);
      if ((index + 1) % cnt === 0) {
        newMissionList.push(temp);
        temp = [];
      }
    });
    if (data)
      newMissionList.push(data.slice(newMissionList.length * cnt, data.length));
    setMissionList(newMissionList);
  };

  useEffect(() => {
    setArray();
  }, [data, width]);

  const moveLeft = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };

  const moveRight = () => {
    if (missionList && pageIndex < missionList.length - 1)
      if (
        pageIndex !== missionList.length - 2 ||
        missionList[missionList.length - 1][0]
      )
        setPageIndex((prev) => prev + 1);
  };

  return (
    <>
      {missionList?.length != 0 && missionList && (
        <CarouselWrapper>
          <ContentWrapper taskCard={count / 2}>
            {missionList[pageIndex]?.map((item, index) => (
              <BirthdayContent
                onClick={() => onCardClick(item.id)}
                key={item.id}
                userName={item.user.name}
                taskTitle={item.title}
                miledge={item.point}
                isShadow={true}
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.1875rem 3.125rem;
  width: fit-content;
`;

export const PointerWrapper = styled.div`
  cursor: pointer;
`;
