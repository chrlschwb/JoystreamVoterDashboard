import React from 'react';

import { useElectedCouncils } from '@/hooks';

export default function Home() {
  const { data } = useElectedCouncils({});
  console.log(data);
  return <div>Home</div>;
}
