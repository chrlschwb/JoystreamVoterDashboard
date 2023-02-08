import React from 'react';
import { Table } from 'react-bootstrap';

import { useGroupWorkers, useWorkingGroups, useWorker } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, WorkingGroup } from '@/types';

export interface WorkingGroupProps {
  workingGroup: WorkingGroup;
}


export function GroupWorkers({ workingGroup }: WorkingGroupProps) {

  const { council } = useSelectedCouncil();
  const { workingTokens, rewardToken, workingTokensReward } = useWorkingGroups({ council });
  const { exitedWorker, filledWorker, terminatedWorker } = useWorker({ council });
  const { workers } = useGroupWorkers({ workingGroup });


  var token = workingTokens?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var reward = rewardToken?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0)

  var updateReward = workingTokensReward?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var budget = updateReward! - reward!;

  console.log(updateReward, reward, "----");



  var exited = exitedWorker?.filter(data => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return isNaN(a + b.worker.length) ? 0 : a + b.worker.length;
  }, 0)

  var filled = filledWorker?.filter(data => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return isNaN(a + b.workersHired.length) ? 0 : a + b.workersHired.length;
  }, 0)

  var terminated = terminatedWorker?.filter(data => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return isNaN(a + b.worker.length) ? 0 : a + b.worker.length;
  }, 0)

  var worker = filled! - exited! - terminated!;

  console.log(filled, exited, terminated);

  return (
    <tr>
      <td>{workingGroup.name}</td>
      <td>{worker}</td>
      <td>{token?.toFixed(0)}</td>
      {/* <td>{isDefined(workingGroup) ? workingGroup.budget?.div(new BN(10000000000)).toString() : ""}</td> */}
      <td>{budget.toFixed(0)}</td>
    </tr>
  );
}

export default function WorkingGroups() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error } = useWorkingGroups({ council });


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
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Working Groups</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Workers</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Minted Tokens during Term</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Budget / Debt at  end of Term</td>
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
