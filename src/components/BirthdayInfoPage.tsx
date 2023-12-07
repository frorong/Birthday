'use client';

import styled from '@emotion/styled';

import { Frame, VectorIcon } from '@/assets';
import { usePostComment, useGetBirthday, useGetCommentList } from '@/hooks';
import { Comment } from '.';
import { CommentType } from '@/types';
import { formatDate } from '@/utils';

import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';

interface Props {
  birthdayId: string;
}

const BirthdayInfo: React.FC<Props> = ({ birthdayId }) => {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [isSeeComment, setIsSeeComment] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const { data } = useGetBirthday(parseInt(birthdayId));
  const { data: comments } = useGetCommentList(parseInt(birthdayId));

  const { mutate } = usePostComment({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onSubmit = () => {
    if (inputValue.replaceAll('\n', '').replaceAll('\u0020', '').length !== 0) {
      const req: CommentType = {
        name: name.length > 0 ? name : '익명의 사용자',
        content: inputValue,
        key: data?.data.id ?? 0,
      };

      mutate(req);
    } else toast.error('내용을 입력해주세요.');
  };

  const onClick = () => {
    if (!isWrite) setIsWrite(true);
    else onSubmit();
  };

  useEffect(() => {
    const greeting = prompt('본인의 이름을 적어주세요.', '');
    if (greeting) setName(greeting);
  }, []);

  const goNext = () => {
    setIsSeeComment(true);
    if ((comments?.data.length ?? 0) > index + 1) setIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (index === 0) {
      setIsSeeComment(false);
      setIndex(-1);
    } else setIndex((prev) => prev - 1);
  };

  return (
    <Container>
      {data?.data ? (
        <BackBoard>
          <FrameContainer>
            <DateText>{formatDate(data.data.birthday)}</DateText>
            {!isWrite ? (
              <>
                <Frame />
                <TextContainer>
                  {isSeeComment ? (
                    <>
                      <CongUser>
                        {comments?.data[index].name ?? '이름을 알 수 없어요'}
                      </CongUser>
                      <CongText>
                        {comments?.data[index].content ?? '콘텐츠가 없어요'}
                      </CongText>
                    </>
                  ) : (
                    <>
                      <CongUser>
                        오늘은 {data.data.name}님의 생일이에요!!
                      </CongUser>
                      <AfterText>
                        페이지를 넘겨서 축하메시지를 확인해보세요!
                      </AfterText>
                    </>
                  )}
                </TextContainer>
                {(comments?.data.length ?? 0) > 0 && (
                  <NextButton onClick={goNext}>
                    <VectorIcon />
                  </NextButton>
                )}
                {index > -1 && (
                  <PrevButton onClick={goPrev}>
                    <VectorIcon />
                  </PrevButton>
                )}
              </>
            ) : (
              <Comment inputValue={inputValue} setInputValue={setInputValue} />
            )}
            <CongButton onClick={onClick}>
              {!isWrite ? '축하메세지 쓰기' : '메시지 등록하기'}
            </CongButton>
          </FrameContainer>
        </BackBoard>
      ) : (
        <h1>데이터를 기다리고있어요...</h1>
      )}
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
  flex-direction: column;
  align-items: center;
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
  left: 98px;
`;

const NextButton = styled.button`
  position: absolute;
  border-radius: 50%;
  width: 4.125rem;
  height: 4.125rem;
  top: 15.125rem;
  right: 0.625rem;
`;

const PrevButton = styled(NextButton)`
  left: 0.625rem;
  transform: rotate(180deg);
`;

const CongText = styled.p`
  color: #000;
  font-size: 1.25rem;
  font-weight: 500;
`;

const AfterText = styled(CongText)`
  margin-top: 7.625rem;
`;
