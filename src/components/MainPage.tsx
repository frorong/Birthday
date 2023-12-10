/**@jsxImportSource @emotion/react */
'use client';

import { useGetBirthdayList, usePostBirthday } from '@/hooks';
import { BirthdayCarousel } from '.';
import { formatDate } from '@/utils';

import styled from '@emotion/styled';
import { useRef, useState } from 'react';

import { css } from '@emotion/react';

const MainPage = () => {
  const { mutate: birthdayMutate } = usePostBirthday();

  const [index, setIndex] = useState(0);

  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog
        ref={dialog}
        css={css`
          border-radius: 1.25rem;
          border: 0;
          padding: 0;
        `}
      >
        <Dialog>
          <FrameContainer></FrameContainer>
          <ButtonWrapper>
            <SubmitButton>생성</SubmitButton>
            <SubmitButton>취소</SubmitButton>
          </ButtonWrapper>
        </Dialog>
      </dialog>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      <Header>
        <Any />
        <Today>{formatDate(new Date())}</Today>
        <PlusButton
          onClick={() => {
            if (dialog.current) dialog.current.showModal();
          }}
        >
          생일 생성
        </PlusButton>
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

const Dialog = styled.div`
  width: 50rem;
  height: 40rem;
  border-radius: 1.25rem;
  background: #fff;
  display: flex;
  justify-content: center;

  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
`;

const FrameContainer = styled.div`
  width: 45rem;
  height: 29.375rem;
  border-radius: 0.625rem;
  border: 0.1875rem solid #000;
  background: #e2e7f2;
  margin-top: 2.25rem;
`;

const SubmitButton = styled.button`
  width: 17.5rem;
  height: 6.8125rem;
  border-radius: 2.5rem;
  border: 0.125rem solid #000;
  background: #ffeb82;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000;
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2.25rem;
`;

const ButtonWrapper = styled.form`
  display: flex;
  gap: 2.625rem;
`;

const Input = styled.input`
  width: 18.75rem;
  height: 2.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  outline: none;

  ::placeholder {
    color: #ababab;
  }
`;
