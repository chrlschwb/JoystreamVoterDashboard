import React from 'react';

import { useWorkingGroups, useWorker } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { GroupIdToGroupParam, isDefined, WorkingGroup } from '@/types';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';
export interface WorkingGroupProps {
  workingGroup: WorkingGroup;
}

export function GroupWorkers({ workingGroup }: WorkingGroupProps) {
  const { council } = useSelectedCouncil();
  const { workingTokens, rewardToken, workingTokensRewardNow, budgetSpending, workingGroups } = useWorkingGroups({
    council,
  });
  const { exitedWorker, filledWorker, terminatedWorker } = useWorker({ council });

  var token = workingTokens
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return a + b.budgetChangeAmount / 10000000000;
    }, 0);

  var reward = rewardToken
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return a + b.amount / 10000000000;
    }, 0);

  var updateReward = workingTokensRewardNow
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return a + b.budgetChangeAmount / 10000000000;
    }, 0);

  var spendingEvent = budgetSpending
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return a + b.amount / 10000000000;
    }, 0);

  var debt = workingGroups
    ?.filter((data) => workingGroup.name === data.id)
    .reduce((a: number, b) => {
      return a + b.debt / 10000000000;
    }, 0);

  var budget: number = updateReward! - reward! - spendingEvent!;
  console.log(updateReward, reward, spendingEvent);

  var filled = filledWorker
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return isNaN(a + b.workersHired.length) ? 0 : a + b.workersHired.length;
    }, 0);

  var exited = exitedWorker?.filter((data) => workingGroup.name === data.groupId);

  var terminated = terminatedWorker?.filter((data) => workingGroup.name === data.groupId);

  var worker = 0;

  if (exited && terminated) {
    worker = filled! - exited.length - terminated.length;
  }

  return (
    <tr>
      <TableBodyCol value={GroupIdToGroupParam[workingGroup.id]} tooltip="WorkingGroup.name of workingGroups" />
      <TableBodyCol
        value={worker.toString() ?? '-'}
        tooltip="worker = (workersHired.length of openingFilledEvents) -(worker.length of workerExitedEvents) -
            (worker.length of terminatedWorkerEvents);"
      />
      <TableBodyCol value={token?.toFixed(0) ?? '-'} tooltip="budgetChangeAmount of budgetUpdatedEvents" />
      <TableBodyCol
        value={budget.toFixed(0) ?? '-'}
        tooltip="reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent) -(sum amount of spendingEvent)"
      />
      <TableBodyCol value={debt?.toFixed(0) ?? ''} tooltip="sum debt amount of workers in workinggroup" />

      {/* <td>{isDefined(workingGroup) ? workingGroup.budget?.div(new BN(10000000000)).toString() : ""}</td> */}
    </tr>
  );
}

export default function WorkingGroups() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error } = useWorkingGroups({ council });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  const header = [
    { hd: 'Working Groups' },
    { hd: 'Workers' },
    { hd: 'Minted Tokens during Term' },
    { hd: 'Budget at end of Term ' },
    { hd: 'Current debt' },
  ];

  const headerHd = header.map((d, i) => <TableHeaderCol key={i} value={d.hd} />);
  return (
    <div className="mt-5 border-collapse rounded border-2 bg-black shadow-md shadow-gray-300">
      <div className="mb-2 mt-5 text-3xl font-bold ">Working Groups</div>
      <table
        className="mt-3 w-full table-auto border-collapse  border
      border-slate-400  "
      >
        <thead className="rounded-sm border border-gray-400 bg-gray-800 text-lg ">
          <tr>{headerHd}</tr>
        </thead>
        <tbody>
          {isDefined(workingGroups)
            ? workingGroups.map((workingGroup) => <GroupWorkers key={workingGroup.id} workingGroup={workingGroup} />)
            : null}
        </tbody>
      </table>
    </div>
  );
}
