import React, { useState } from 'react';

import { CouncilSelect } from '@/components';
import { ElectedCouncil } from '@/types';

export default function Home() {
  const [council, setCouncil] = useState<ElectedCouncil | undefined>(undefined);

  return (
    <div>
      <CouncilSelect council={council} onChange={setCouncil} />
    </div>
  );
}
