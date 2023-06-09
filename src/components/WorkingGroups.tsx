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
  const { workingTokens, rewardToken, workingTokensRewardNow, budgetSpending, workingGroups } = useWorkingGroups({ council });
  const { exitedWorker, filledWorker, terminatedWorker } = useWorker({ council });


  var token = workingTokens?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var reward = rewardToken?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0)

  var updateReward = workingTokensRewardNow?.filter((data) => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0)

  var spendingEvent = budgetSpending?.filter(data => workingGroup.name === data.groupId).reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0)

  var debt = workingGroups?.filter((data) => workingGroup.name === data.id).reduce((a: number, b) => {
    return a + (b.debt / 10000000000);
  }, 0)

  var budget: number = updateReward! - reward! - spendingEvent!;

  var exited = exitedWorker
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return isNaN(a + b.worker.length) ? 0 : a + b.worker.length;
    }, 0);

  var filled = filledWorker
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return isNaN(a + b.workersHired.length) ? 0 : a + b.workersHired.length;
    }, 0);

  var terminated = terminatedWorker
    ?.filter((data) => workingGroup.name === data.groupId)
    .reduce((a: number, b) => {
      return isNaN(a + b.worker.length) ? 0 : a + b.worker.length;
    }, 0);

  var worker = filled! - exited! - terminated!;

  return (
    <tr>
      <TableBodyCol value={GroupIdToGroupParam[workingGroup.id]} tooltip='WorkingGroup.name of workingGroups' />
      <TableBodyCol value={worker.toString() ?? "-"} tooltip='worker = (workersHired.length of openingFilledEvents) -(worker.length of workerExitedEvents) -
            (worker.length of terminatedWorkerEvents);' />
      <TableBodyCol value={token?.toFixed(0) ?? "-"} tooltip='budgetChangeAmount of budgetUpdatedEvents' />
      <TableBodyCol value={budget.toFixed(0) ?? "-"} tooltip='reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent) -(sum amount of spendingEvent)' />
      <TableBodyCol value={debt?.toFixed(0) ?? ""} tooltip='sum debt amount of workers in workinggroup' />

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
    { hd: "Working Groups" },
    { hd: "Workers" },
    { hd: "Minted Tokens during Term" },
    { hd: "Budget at end of Term " },
    { hd: "Current debt" },
  ]

  const headerHd = header.map(d => <TableHeaderCol value={d.hd} />)
  return (
    <div className='bg-black mt-5 border-2 border-collapse shadow-md rounded shadow-gray-300'>
      <div className='text-3xl mt-5 mb-2 font-bold '>Working Groups</div>
      <table className='mt-3 border-collapse border border-slate-400  table-auto
      w-full  '>
        <thead className='bg-gray-800 rounded-sm border border-gray-400 text-lg '>
          <tr>
            {headerHd}
          </tr>
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
