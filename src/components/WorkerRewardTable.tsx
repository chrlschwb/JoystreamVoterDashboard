import { useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { BudgetSpending, ElectedCouncil, GroupIdToGroupParam, isDefined, WorkingGroupName } from '@/types';
import { WorkersFragment } from '@/queries';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';

export interface WorkerRewardTableBody {
  Workers: WorkersFragment;
  council?: ElectedCouncil;
  budget: BudgetSpending[];
  workingGroups: string;
}

export interface WorkerRewardTable {
  WorkingGroups: WorkingGroupName;
  budget: BudgetSpending[];
  worker: WorkersFragment[];
  council?: ElectedCouncil;
}

function WorkderRewardTableBody({ Workers, council, budget, workingGroups }: WorkerRewardTableBody) {
  const endAt = council?.endedAt ? council.endedAt.timestamp : Date.now();
  const endAtDate = new Date(endAt);
  const startAt = council?.electedAt ? council.electedAt.timestamp : new Date('1970-01-01T00:00:00.000Z');
  const startAtDate = new Date(startAt);

  var rewardValue: number = 0;

  Workers.payouts.map((k) => {
    const enter = new Date(k.createdAt ? k.createdAt : '1970-01-01T00:00:00.000Z');

    if (enter.getTime() > startAtDate.getTime() && enter.getTime() < endAtDate.getTime()) {
      rewardValue += Number(k.amount);
    }
  });

  var budgetValue: number = 0;

  budget
    ?.filter((data) => data.groupId === workingGroups)
    .map((d) => {
      if (
        d.receive === Workers.membership.controllerAccount ||
        d.receive === Workers.membership.rootAccount ||
        d.receive === Workers.roleAccount ||
        d.receive === Workers.rewardAccount
      ) {
        budgetValue += Number(d.amount);
      }
      return (
        d.receive === Workers.membership.controllerAccount ||
        d.receive === Workers.membership.rootAccount ||
        d.receive === Workers.roleAccount ||
        d.receive === Workers.rewardAccount
      );
    });

  return (
    <tr>
      <TableBodyCol value={Workers.membership.handle} tooltip="Worker Handle" />
      <TableBodyCol
        value={(rewardValue / 10000000000).toFixed(0)}
        tooltip="Sum of WorkingGroups.payout for given handle during term"
      />
      <TableBodyCol
        value={(Number(budgetValue) / 10000000000).toFixed(0)}
        tooltip="Sum of budgetSpendingEvent.amount for handle root, controller, role, reward accounts"
      />
      <TableBodyCol
        value={((rewardValue + Number(budgetValue)) / 10000000000).toFixed(0)}
        tooltip="Sum of former two values"
      />
    </tr>
  );
}

function removeDuplicates(jsonArray: WorkersFragment[]): WorkersFragment[] {
  const uniqueNames = new Set<string>();
  return jsonArray.filter((item) => {
    if (!uniqueNames.has(item.membership.handle)) {
      uniqueNames.add(item.membership.handle);
      return true;
    }
    return false;
  });
}

export function WorkerRewardTable({ WorkingGroups, budget, worker, council }: WorkerRewardTable) {
  const members = worker.filter((data) => WorkingGroups.name === data.groupId);

  if (!members) return <></>;

  const removeDupleMemeer: WorkersFragment[] = removeDuplicates(members);

  const header = [{ hd: 'Worker' }, { hd: 'Regular Reward' }, { hd: 'Discretionary Reward' }, { hd: 'Total Reward' }];

  const headerHd = header.map((d, i) => <TableHeaderCol key={i} value={d.hd} />);

  return (
    <div>
      <div className="mt-5 text-2xl  ">{GroupIdToGroupParam[WorkingGroups.id]}</div>
      <table
        className="mt-1 w-full table-auto  border-collapse
      border  border-slate-400"
      >
        <thead className="rounded-sm border border-gray-400 bg-gray-800 text-lg ">
          <tr>{headerHd}</tr>
        </thead>
        <tbody>
          {isDefined(removeDupleMemeer)
            ? removeDupleMemeer.map((data, i) => (
              <WorkderRewardTableBody
                key={i}
                Workers={data}
                council={council}
                budget={budget}
                workingGroups={WorkingGroups.name}
              />
            ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default function WorkerRewardsData() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, budgetSpending, workers } = useWorkingGroups({ council });
  return (
    <div className="mt-5 border-collapse rounded border-2 bg-black shadow-md shadow-gray-300">
      <div className="mb-2 mt-5 text-4xl font-bold ">Workers Rewards</div>
      <hr className="border border-gray-600" />
      {(loading || error) ? <Spinner /> : isDefined(workingGroups)
        ? workingGroups.map((data, i) => (
          <WorkerRewardTable
            key={i}
            WorkingGroups={data}
            budget={budgetSpending!}
            worker={workers}
            council={council}
          />
        ))
        : null}
    </div>
  );
}
