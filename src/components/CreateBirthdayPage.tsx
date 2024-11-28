'use client';

import styled from '@emotion/styled';

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import fireStore from '@/firebase/firestore';

const CreateBirthdayPage = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [name, setName] = useState<string>('');
  const storage = getStorage();

  const { push } = useRouter();

  useEffect(() => {
    const newDate = birthday?.format();
    if (newDate) console.log(new Date(newDate));
  }, [birthday]);

  const onSubmit = async () => {
    const newDate = birthday?.format();
    if (name && newDate)
      try {
        const dataToSave = {
          name: name,
          birthday: new Date(newDate).toISOString(),
        };

        await addDoc(collection(fireStore, 'birthday'), dataToSave);
        toast.success('등록 완료!');
        push('/');
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('등록 실패');
      }
    else toast.error('입력되지 않은 빈칸이 있습니다.');
  };

  // if (isSuccess) push('/');

  return (
    <>
      <Header>
        <Title>생일 추가하기!</Title>
      </Header>
      <Container>
        <FrameContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <MobileDatePicker
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={5}
            placeholder='생일자 이름'
          />
        </FrameContainer>
        <ButtonWrapper>
          <SubmitButton onClick={onSubmit}>생성</SubmitButton>
          <SubmitButton onClick={() => push('/')}>취소</SubmitButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default CreateBirthdayPage;

const Header = styled.div`
  width: 86.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3.875rem 0 3.875rem;

  @media (max-width: 1630px) {
    width: calc(100vw - 10rem);
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
`;

const Container = styled.div`
  width: 30rem;
  border-radius: 1.25rem;
  background: #fff;
  display: flex;
  justify-content: center;

  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
`;

const FrameContainer = styled.div`
  width: 25rem;
  border-radius: 0.625rem;
  border: 0.0875rem solid #000;
  background: #e2e7f2;
  margin-top: 2.25rem;
  padding: 0.625rem 1.875rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 10.5rem;
  height: 3.8125rem;
  border-radius: 0.5rem;
  border: 0.125rem solid #000;
  background: #ffeb82;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2.625rem;
`;

const Input = styled.input`
  width: 200px;
  height: 56px;
  font-size: 18px;

  padding-left: 10px;
  outline: none;
  background-color: #e2e7f2;
  border-radius: 3px;
  border: 1px solid gray;
  margin-bottom: 10px;

  :hover {
    border: 1px solid black;
  }

  ::placeholder {
    color: #ababab;
  }
`;
