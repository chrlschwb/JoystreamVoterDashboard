import React from 'react';
import { Table } from 'react-bootstrap';

import { useGroupWorkers, useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, WorkingGroup } from '@/types';

export interface WorkingGroupProps {
  workingGroup: WorkingGroup;
}

export function GroupWorkers({ workingGroup }: WorkingGroupProps) {
  const { workers } = useGroupWorkers({ workingGroup });
  return (
    <tr>
      <td>{workingGroup.name}</td>
      <td>{workers?.length}</td>
      <td>Tokens</td>
      <td>Budget: {workingGroup.budget?.toString()}</td>
    </tr>
  );
}

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
          <tr>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Worker Groups</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Workers</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Tokens</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Budget / Debt</td>
          </tr>
        </thead>
        <tbody>
          {isDefined(workingGroups)
            ? workingGroups.map((workingGroup) => <GroupWorkers key={workingGroup.id} workingGroup={workingGroup} />)
            : null}
        </tbody>
      </Table>
    </div>
  );
}
