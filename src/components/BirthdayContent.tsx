'use client';

import styled from '@emotion/styled';

import { BirthdayFrame } from '@/assets';
import { formatDate, isSameMonthAndDay } from '@/utils';

interface Props {
  onClick: () => void;
  name: string;
  birthday: Date;
}

const BirthdayContent: React.FC<Props> = ({ birthday, name, onClick }) => (
  <Container onClick={onClick}>
    <FrameContainer>
      <BirthdayText>{formatDate(birthday)}</BirthdayText>
      <BirthdayFrame />
    </FrameContainer>
    <CongText>
      {isSameMonthAndDay(birthday) ? '오늘은' : formatDate(birthday)} {name}님의
      생일이에요!!
    </CongText>
  </Container>
);

export default BirthdayContent;

const Container = styled.div`
  cursor: pointer;
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

const Text = styled.p`
  color: #000;
  font-weight: 600;
`;

const BirthdayText = styled(Text)`
  font-size: 1.125rem;
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
`;

const CongText = styled(Text)`
  font-size: 1rem;
  margin-top: 8.1875rem;
  z-index: 3;
`;
