import React from 'react';

import { CouncilSelect } from '@/components';
import { useSelectedCouncil } from '@/store';

export default function Home() {
  const { council, setCouncil } = useSelectedCouncil();

  return (
    <div>
      <CouncilSelect council={council} onChange={setCouncil} />
    </div>
  );
}
