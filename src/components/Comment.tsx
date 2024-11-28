'use client';

import styled from '@emotion/styled';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const Comment: React.FC<Props> = ({ inputValue, setInputValue }) => {
  return (
    <Container>
      <MessageInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={450}
        placeholder='축하메시지를 남겨주세요.'
      />
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  width: 45rem;
  height: 29.375rem;
  padding-top: 5.875rem;
  padding-left: 1rem;
  flex-direction: column;
  gap: 2.5rem;
`;

const MessageInput = styled.textarea`
  font-size: 1.25rem;
  font-weight: 600;
  width: 90%;
  background: none;
  border: none;
  outline: none;
  height: 20rem;
  resize: none;

  ::placeholder {
    color: #ababab;
  }
`;
