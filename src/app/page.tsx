'use client';

import axios from 'axios';

import { BirthdayContent } from '@/components';

export default function Home() {
  const getHealthcheck = async () => {
    const res = await axios.get('/api/healthcheck');
    console.log(res);
  };

  const postBirthday = async () => {
    const res = await axios.post('/api/birthday/create', {
      name: '이동욱',
      birthday: '2006/12/07',
    });
  };

  const getBirthdayList = async () => {
    const res = await axios.get('/api/birthday/list');
  };

  const getBirthday = async () => {
    const res = await axios.delete(`/api/birthday/${40}`);
  };

  const postComment = async () => {
    const res = await axios.post(`/api/birthday/comment/create`, {
      name: '윤태빈',
      content: '생일축하해',
      key: 2,
    });
  };

  const getCommentList = async () => {
    const res = await axios.get(`/api/birthday/comment/list/${2}`);
  };

  return (
    <div>
      <button onClick={getHealthcheck}>healthcheck</button>
      <button onClick={postBirthday}>postBirthday</button>
      <button onClick={getBirthdayList}>getBirthdayList</button>
      <button onClick={getBirthday}>getBirthday</button>
      <button onClick={postComment}>postComment</button>
      <button onClick={getCommentList}>getCommentList</button>
      <BirthdayContent />
    </div>
  );
}
