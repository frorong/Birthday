'use client';

import { useEffect } from 'react';

import axios from 'axios';

export default function Home() {
  const test = async () => {
    const res = await axios.post('/api/birthday/create', {
      name: '이동욱',
      birthday: '2006/12/07',
    });
    console.log(res);
  };

  useEffect(() => {
    test();
  }, []);
  return <div>test</div>;
}
