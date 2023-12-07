'use client';

import styled from '@emotion/styled';

import { Frame, VectorIcon } from '@/assets';

const BirthdayInfo = () => {
  return (
    <Container>
      <BackBoard>
        <FrameContainer>
          <Frame />
        </FrameContainer>
        <CongButton>축하메세지 쓰기</CongButton>
        <NextButton>
          <VectorIcon />
        </NextButton>
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
