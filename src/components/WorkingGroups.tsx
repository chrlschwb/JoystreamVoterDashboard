import { useWorkingGroups, useWorker } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { BudgetSpending, GroupIdToGroupParam, isDefined, RewardPaid, WorkingGroupName } from '@/types';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';
import { BudgetUpdatedEventsFragment, WorkersFragment } from '@/queries';
import { BN } from 'bn.js';
export interface WorkingGroupProps {
  workingGroup: WorkingGroupName;
  workingTokens: BudgetUpdatedEventsFragment[] | undefined,
  rewardToken: RewardPaid[] | undefined,
  budgetSpending: BudgetSpending[] | undefined,
  workers: WorkersFragment[]
  workingGroups: WorkingGroupName[] | undefined
}

export function GroupWorkers({ workingGroup, workingTokens, rewardToken, budgetSpending, workingGroups, workers }: WorkingGroupProps) {
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

  var updateReward = workingTokens
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

  var worker = workers.filter(d => d.groupId === workingGroup.name).length;

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

      <TableBodyCol value={isDefined(workingGroup) ? String(workingGroup.budget?.div(new BN(10000000000)).toString()) : ""} tooltip="sum budget of workinggroup" />
    </tr>
  );
}

export default function WorkingGroups() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, workingTokens, rewardToken, budgetSpending, workers } = useWorkingGroups({ council });
  const header = [
    { hd: 'Working Groups' },
    { hd: 'Workers' },
    { hd: 'Minted Tokens during Term' },
    { hd: 'Budget at end of Term ' },
    { hd: 'Current debt' },
    { hd: 'Workgin Groups budgets' },
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
          {(loading || error) ? <Spinner /> : isDefined(workingGroups)
            ? workingGroups.map((workingGroup) => <GroupWorkers key={workingGroup.id} workingGroup={workingGroup} workingTokens={workingTokens} rewardToken={rewardToken} budgetSpending={budgetSpending} workers={workers} workingGroups={workingGroups} />)
            : null}
        </tbody>
      </table>
    </div>
  );
}
