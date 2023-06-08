import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useWorker, useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { BudgetSpending, ElectedCouncil, isDefined, RewardPaid, WorkingGroup } from '@/types';
import { WorkerMemberFragment, WorkerPaymentType } from '@/queries';

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

  var budgetValue: string = "0";

  const bug = budget?.find((d) => {
    return (
      (d.receive === Workers.membership.controllerAccount ||
        d.receive === Workers.membership.rootAccount ||
        d.receive === Workers.roleAccount ||
        d.receive === Workers.rewardAccount)
    );
  });

  if (bug) {
    budgetValue = bug.amount.toString();
  } else {
    budgetValue = '0';
  }

  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Worker Handle</Tooltip>}>
        <td>{Workers.membership.handle}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Regular Reward</Tooltip>}>
        <td>{((rewardValue) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Discretionary Reward</Tooltip>}>
        <td>{(Number(budgetValue) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Total Reward</Tooltip>}>
        <td>{((rewardValue + Number(budgetValue)) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
    </tr>
  );
}

export function WorkerRewardTable({ WorkingGroups, budget, worker, council }: WorkerRewardTable) {
  const members = worker.filter((data) => WorkingGroups.name === data.groupId);
  if (!members) return <></>
  return (
    <div style={{ marginTop: '20px' }} className="table_background">
      <h4>{WorkingGroups.name}</h4>
      <Table style={{ marginTop: '10px' }}>
        <thead style={{ backgroundColor: '#0080ff' }}>
          <tr>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Worker</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Reward Amount</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Discretionary Amount</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Sum Amount</td>
          </tr>
        </thead>
        <tbody>
          {isDefined(members) ? members.map((data, i) => <WorkderRewardTableBody key={i} Workers={data} council={council} budget={budget} />) : null}
        </tbody>
      </Table>
    </div>
  );
}

export default function WorkerRewardsData() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, budgetSpending, workers } = useWorkingGroups({ council });

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
    <div>
      {isDefined(workingGroups)
        ? workingGroups.map((data, i) => (
          <WorkerRewardTable key={i} WorkingGroups={data} budget={budgetSpending!} worker={workers} council={council} />
        ))
        : null}
    </div>
  );
}
