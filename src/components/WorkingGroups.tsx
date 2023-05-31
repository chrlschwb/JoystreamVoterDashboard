import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useWorkingGroups, useWorker } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, WorkingGroup } from '@/types';
import { Link } from 'react-router-dom';

export interface WorkingGroupProps {
  workingGroup: WorkingGroup;
}


export function GroupWorkers({ workingGroup }: WorkingGroupProps) {

  const { council } = useSelectedCouncil();
  const { workingTokens, rewardToken, workingTokensReward, budgetSpending, workingGroups } = useWorkingGroups({ council });
  const { exitedWorker, filledWorker, terminatedWorker } = useWorker({ council });


  var token = workingTokens?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var reward = rewardToken?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0)

  var updateReward = workingTokensReward?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var spendingEvent = budgetSpending?.filter(data => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0)

  var debt = workingGroups?.filter((data) => workingGroup.name === data.id).reduce((a: number, b) => {
    return a + (b.debt / 10000000000);
  }, 0)

  var budget: number = updateReward! - reward! - spendingEvent!;

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



  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> workingGroup.name of workingGroups</Tooltip>}>
      <Link to="/workers">
       <td>{workingGroup.name}</td>
      </Link>       
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>worker = (workersHired.length of openingFilledEvents) -(worker.length of workerExitedEvents) - (worker.length of terminatedWorkerEvents); </Tooltip>}>
        <td>{worker}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>sum budgetChangeAmount of budgetUpdatedEvents </Tooltip>}>
        <td>{token?.toFixed(0)}</td>
      </OverlayTrigger>
      {/* <td>{isDefined(workingGroup) ? workingGroup.budget?.div(new BN(10000000000)).toString() : ""}</td> */}
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent) -(sum amount of spendingEvent) </Tooltip>}>
        <td>{budget.toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = sum debt amount of workers in workinggroup  </Tooltip>}>
        <td>{debt?.toFixed(0)}</td>
      </OverlayTrigger>
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
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Budget at  end of Term</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Current debt</td>
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
