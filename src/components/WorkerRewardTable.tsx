
import { useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { BudgetSpending, ElectedCouncil, GroupIdToGroupParam, isDefined, WorkingGroup } from '@/types';
import { WorkerMemberFragment } from '@/queries';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';

export interface WorkerRewardTableBody {
  Workers: WorkerMemberFragment;
  council?: ElectedCouncil;
  budget: BudgetSpending[];
}

export interface WorkerRewardTable {
  WorkingGroups: WorkingGroup;
  budget: BudgetSpending[];
  worker: WorkerMemberFragment[];
  council?: ElectedCouncil;
}


function WorkderRewardTableBody({ Workers, council, budget }: WorkerRewardTableBody) {

  const endAt = council?.endedAt ? (council.endedAt).timestamp : Date.now();
  const endAtDate = new Date(endAt);
  const startAt = council?.electedAt ? council.electedAt.timestamp : new Date("1970-01-01T00:00:00.000Z")
  const startAtDate = new Date(startAt);

  var rewardValue: number = 0

  Workers.payouts.map((k) => {
    const enter = new Date(k.createdAt ? k.createdAt : "1970-01-01T00:00:00.000Z")

    if (enter.getTime() > startAtDate.getTime() && enter.getTime() < endAtDate.getTime()) {
      rewardValue += Number(k.amount);
    }
  })

  var budgetValue: number = 0;

  const bug = budget?.map((d) => {
    if ((d.receive === Workers.membership.controllerAccount) ||
      (d.receive === Workers.membership.rootAccount) ||
      (d.receive === Workers.roleAccount) ||
      (d.receive === Workers.rewardAccount)) {
      budgetValue += Number(d.amount);
    }
    return (
      ((d.receive === Workers.membership.controllerAccount) ||
        (d.receive === Workers.membership.rootAccount) ||
        (d.receive === Workers.roleAccount) ||
        (d.receive === Workers.rewardAccount))
    );
  });




  return (
    <tr>
      <TableBodyCol value={Workers.membership.handle} tooltip='Worker Handle' />
      <TableBodyCol value={((rewardValue) / 10000000000).toFixed(0)} tooltip='Sum of WorkingGroups.payout for given handle during term' />
      <TableBodyCol value={(Number(budgetValue) / 10000000000).toFixed(0)} tooltip='Sum of budgetSpendingEvent.amount for handle root, controller, role, reward accounts' />
      <TableBodyCol value={((rewardValue + Number(budgetValue)) / 10000000000).toFixed(0)} tooltip='Sum of former two values' />
    </tr>
  );
}

function removeDuplicates(jsonArray: WorkerMemberFragment[]): WorkerMemberFragment[] {
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
  if (!members) return <></>

  const removeDupleMemeer: WorkerMemberFragment[] = removeDuplicates(members);

  const header = [
    { hd: "Worker" },
    { hd: "Regular Reward" },
    { hd: "Discretionary Reward" },
    { hd: "Total Reward" },
  ]

  const headerHd = header.map(d => <TableHeaderCol value={d.hd} />)

  return (
    <div >
      <div className='text-2xl mt-5  '>{GroupIdToGroupParam[WorkingGroups.id]}</div>
      <table className='border-collapse border border-slate-400  table-auto
      w-full  mt-1'>
        <thead className='bg-gray-800 rounded-sm border border-gray-400 text-lg '>
          <tr>
            {headerHd}
          </tr>
        </thead>
        <tbody>
          {isDefined(removeDupleMemeer) ? removeDupleMemeer.map((data, i) => <WorkderRewardTableBody key={i} Workers={data} council={council} budget={budget} />) : null}
        </tbody>
      </table>
    </div>
  );
}

export default function WorkerRewardsData() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, budgetSpending, workers } = useWorkingGroups({ council });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <div className='bg-black mt-5 border-2 border-collapse shadow-md rounded shadow-gray-300'>
      <div className='text-4xl mt-5 mb-2 font-bold '>Workers Rewards</div>
      <hr className='border border-gray-600' />
      {isDefined(workingGroups)
        ? workingGroups.map((data, i) => (
          <WorkerRewardTable key={i} WorkingGroups={data} budget={budgetSpending!} worker={workers} council={council} />
        ))
        : null}
    </div>
  );
}
