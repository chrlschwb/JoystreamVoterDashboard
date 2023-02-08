import React from 'react';
import { Table } from 'react-bootstrap';

import { useGroupWorkers, useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, WorkingGroup } from '@/types';
import { GetWorkingGroupTokenQuery } from '@/queries'
import { _1Bn } from '@polkadot/util';
import { BN } from 'bn.js';

export interface WorkingGroupProps {
  workingGroup: WorkingGroup;
}


export function GroupWorkers({ workingGroup }: WorkingGroupProps) {

  const { council } = useSelectedCouncil();
  const { workingTokens } = useWorkingGroups({ council });
  const { workers } = useGroupWorkers({ workingGroup });


  var token = workingTokens?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)


  return (
    <tr>
      <td>{workingGroup.name}</td>
      <td>{workers?.length}</td>
      <td>{token?.toFixed(0)}</td>
      <td>{isDefined(workingGroup) ? workingGroup.budget?.div(new BN(10000000000)).toString() : ""}</td>
    </tr>
  );
}

export default function WorkingGroups() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, workingTokens } = useWorkingGroups({ council });


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
