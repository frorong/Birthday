'use client';

import axios from 'axios';

export default function Home() {
  const postBirthday = async () => {
    const res = await axios.post('/api/birthday/create', {
      name: '이동욱',
      birthday: '2006/12/07',
    });
  };

  const getList = async () => {
    const res = await axios.get('/api/birthday/list');
  };

  return (
    <div>
      <button onClick={postBirthday}>postBirthday</button>
      <button onClick={getList}>getList</button>
    </div>
  );
}
