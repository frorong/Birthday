'use client';

import styled from '@emotion/styled';

import { Frame, VectorIcon } from '@/assets';
import { Comment } from '.';
import { BirthdayResponseType, CommentType } from '@/types';
import { formatDate, isSameMonthAndDay } from '@/utils';

import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import fireStore from '@/firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface Props {
  birthdayId: string;
}

const BirthdayInfo: React.FC<Props> = ({ birthdayId }) => {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [isSeeComment, setIsSeeComment] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [data, setData] = useState<BirthdayResponseType>();
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchBirthdayById = async (id: string) => {
    try {
      const docRef = doc(fireStore, 'birthday', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const birthdayData = docSnap.data();
        return {
          ...birthdayData,
          id: docSnap.id,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchCommentById = async (id: string) => {
    try {
      const commentsRef = collection(fireStore, 'comment');
      const q = query(commentsRef, where('key', '==', id));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      }

      return querySnapshot.docs.map((v) => v.data());
    } catch (error) {
      throw error;
    }
  };

  const fetchAll = async () => {
    const data = (await fetchBirthdayById(birthdayId)) as BirthdayResponseType;
    if (data) setData(data);

    const comment = (await fetchCommentById(birthdayId)) as CommentType[];
    if (comment) setComments(comment);
  };
  useEffect(() => {
    fetchAll();
  }, [isWrite]);

  const onSubmit = async () => {
    if (inputValue.replaceAll('\n', '').replaceAll('\u0020', '').length !== 0) {
      try {
        const req: CommentType = {
          name: name.length > 0 ? name : '익명의 사용자',
          content: inputValue,
          key: data?.id ?? '',
        };

        await addDoc(collection(fireStore, 'comment'), req);
        toast.success('등록 완료!');
        setIsWrite(false);
      } catch (error) {
        toast.error('등록 실패');
      }
    } else toast.error('내용을 입력해주세요.');
  };

  const onClick = () => {
    if (!isWrite) {
      setIsWrite(true);
      const greeting = prompt('본인의 이름을 적어주세요.', '');
      if (greeting) setName(greeting);
    } else onSubmit();
  };

  const goNext = () => {
    setIsSeeComment(true);
    if ((comments.length ?? 0) > index + 1) setIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (index === 0) {
      setIsSeeComment(false);
      setIndex(-1);
    } else setIndex((prev) => prev - 1);
  };

  const { push } = useRouter();

  return (
    <Container>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      <HomeButton onClick={() => push('/')}>홈으로</HomeButton>
      {data ? (
        <BackBoard>
          <FrameContainer>
            <DateText>{formatDate(new Date().toISOString())}</DateText>
            {!isWrite ? (
              <>
                <Frame />
                <TextContainer>
                  {isSeeComment ? (
                    <>
                      <CongUser>
                        {comments[index].name ?? '이름을 알 수 없어요'}
                      </CongUser>
                      <CongText>
                        {comments[index].content ?? '콘텐츠가 없어요'}
                      </CongText>
                    </>
                  ) : (
                    <>
                      <CongUser>
                        {isSameMonthAndDay(data.birthday)
                          ? '오늘은'
                          : formatDate(data.birthday)}{' '}
                        {data.name}님의 생일이에요!!
                      </CongUser>
                      <AfterText>
                        페이지를 넘겨서 축하메시지를 확인해보세요!
                      </AfterText>
                    </>
                  )}
                </TextContainer>
                {(comments.length ?? 0) > 0 &&
                  comments.length - 1 !== index && (
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

  @media (max-width: 930px) {
    svg {
      width: 100%;
      height: 100%;
    }
  }
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

  @media (max-width: 930px) {
    width: calc(100vw - 5.5rem);
  }
`;

const FrameContainer = styled.div`
  width: 45rem;
  height: 29.375rem;
  border-radius: 0.625rem;
  border: 0.1875rem solid #000;
  background: #e2e7f2;
  padding-left: 0.9375rem;

  @media (max-width: 930px) {
    width: calc(100vw - 8.5rem);
  }
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

  @media (max-width: 930px) {
    left: 3.8rem;
  }
`;
const HomeButton = styled.button`
  border-radius: 12px;
  background: linear-gradient(45deg, #ffeb82, #ff9a8b);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.25rem 2rem;
  margin-bottom: 0.75rem;

  &:hover {
    background: linear-gradient(45deg, #ff9a8b, #ffeb82);
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
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
  left: 6.125rem;

  @media (max-width: 930px) {
    left: 10%;
    width: 80%;
  }
`;

const NextButton = styled.button`
  position: absolute;
  border-radius: 50%;
  width: 4.125rem;
  height: 4.125rem;
  top: 15.125rem;
  right: 0.625rem;

  @media (max-width: 930px) {
    right: 0.225rem;
  }
`;

const PrevButton = styled(NextButton)`
  left: 0.625rem;
  transform: rotate(180deg);

  @media (max-width: 930px) {
    left: 0.225rem;
  }
`;

const CongText = styled.p`
  color: #000;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 1.25rem;
`;

const AfterText = styled(CongText)`
  margin-top: 7.625rem;
`;
