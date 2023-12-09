'use client';

import styled from '@emotion/styled';

import { BirthdayFrame } from '@/assets';

const BirthdayContent = () => (
  <Container>
    <FrameContainer>
      <BirthdayFrame />
    </FrameContainer>
  </Container>
);

export default BirthdayContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20.8125rem;
  height: 16.625rem;
  border-radius: 1.25rem;
  background: #fff;
  position: relative;
`;

const FrameContainer = styled.div`
  position: absolute;
  top: 1.1875rem;
`;
