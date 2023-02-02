import React from 'react';

import { useMemberships } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Memberships() {
  const { council } = useSelectedCouncil();
  const { created, invited, total, loading, error } = useMemberships({ council });

  // Add some

  return (
    <div className="rounded-sm bg-purple-600 p-2">
      <p className="text-xl">Memberships</p>
      <p>Created: {isDefined(created) ? created : '-'}</p>
      <p>Invited: {isDefined(invited) ? invited : '-'}</p>
      <p>Total: {isDefined(total) ? total : '-'}</p>
    </div>
  );
}
