'use client';

import { useEffect } from 'react';

import axios from 'axios';

export default function Home() {
  const test = async () => {
    const res = await axios.get('/test');
    console.log(res);
  };

  useEffect(() => {
    test();
  }, []);
  return <div>test</div>;
}
