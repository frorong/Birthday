'use client';

import styled from '@emotion/styled';

import { usePostBirthday } from '@/hooks';

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useState } from 'react';

const CreateBirthdayPage = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);

  const { mutate: birthdayMutate } = usePostBirthday();

  return (
    <Dialog>
      <FrameContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              value={birthday}
              onChange={(newValue) => setBirthday(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FrameContainer>
      <ButtonWrapper>
        <SubmitButton>생성</SubmitButton>
        <SubmitButton>취소</SubmitButton>
      </ButtonWrapper>
    </Dialog>
  );
};

export default CreateBirthdayPage;

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
