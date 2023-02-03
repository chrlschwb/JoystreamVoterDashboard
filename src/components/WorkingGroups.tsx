import React from 'react';
import { Table } from 'react-bootstrap';

import { useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function WorkingGroups() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error } = useWorkingGroups({ council });

  console.log('workingGroups', workingGroups);

  if (loading) {
    return (
      <div className="sub_panel loading" style={{ marginTop: '20px' }}>
        loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="sub_panel loading" style={{ marginTop: '20px' }}>
        error
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }} className="table_background">
      <h4>Working Groups</h4>
      <Table style={{ marginTop: '10px' }}>
        <thead style={{ backgroundColor: '#0080ff' }}>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>Worker Groups</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>Workers</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>Tokens</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>Budget / Debt</td>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}
