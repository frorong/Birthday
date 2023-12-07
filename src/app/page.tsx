'use client';

import axios from 'axios';

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
    const res = await axios.post(`/api/birthday/comment/${1}`, {
      name: '이동욱',
      content: '생일축하해',
    });
  };

  return (
    <div>
      <button onClick={getHealthcheck}>healthcheck</button>
      <button onClick={postBirthday}>postBirthday</button>
      <button onClick={getBirthdayList}>getBirthdayList</button>
      <button onClick={getBirthday}>getBirthday</button>
      <button onClick={postComment}>postComment</button>
    </div>
  );
}
