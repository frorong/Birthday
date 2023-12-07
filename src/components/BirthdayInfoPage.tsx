'use client';

import styled from '@emotion/styled';

import { Frame, VectorIcon } from '@/assets';

import { Comment } from '.';

const BirthdayInfo = () => {
  return (
    <Container>
      <BackBoard>
        <FrameContainer>
          <DateText>12월 7일 (목)</DateText>
          {/* <Frame />
          <TextContainer>
            <CongUser>오늘은 동욱님의 생일이에요!!</CongUser>
          </TextContainer>
          <CongButton>축하메세지 쓰기</CongButton>
          <NextButton>
            <VectorIcon />
          </NextButton> */}
          <Comment />
        </FrameContainer>
      </BackBoard>
    </Container>
  );
};

export default BirthdayInfo;

const Container = styled.div`
  padding-top: 6%;
`;

const BackBoard = styled.div`
  width: 50rem;
  height: 40rem;
  border-radius: 1.25rem;
  background: #fff;
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;

  position: relative;
`;

const FrameContainer = styled.div`
  width: 45rem;
  height: 29.375rem;
  border-radius: 0.625rem;
  border: 0.1875rem solid #000;
  background: #e2e7f2;
  padding-left: 0.9375rem;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 15.625rem;
  width: calc(100% - 7rem);
  display: flex;
  justify-content: center;
`;

const CongUser = styled.p`
  color: #000;
  font-size: 1.75rem;
  font-weight: 600;
`;

const DateText = styled.span`
  color: #000;
  font-size: 1.25rem;
  font-weight: 600;

  position: absolute;
  top: 4.375rem;
  left: 4.8rem;
`;

const CongButton = styled.button`
  width: 37.5rem;
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

  position: absolute;
  top: 35.625rem;
`;

const NextButton = styled.button`
  position: absolute;
  border-radius: 50%;
  width: 4.125rem;
  height: 4.125rem;
  top: 15.125rem;
  right: 0.625rem;
`;
