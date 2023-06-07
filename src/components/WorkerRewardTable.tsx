import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useWorker, useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { BudgetSpending, isDefined, RewardPaid, WorkingGroup } from '@/types';
import { WorkerMemberFragment } from '@/queries';

export interface WorkerRewardTableBody {
  Workers: RewardPaid;
}

export interface WorkerRewardTable {
  WorkingGroups: WorkingGroup;
  RewardPaid: RewardPaid[];
  budget: BudgetSpending[];
}

function WorkderRewardTableBody({ Workers }: WorkerRewardTableBody) {
  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Worker Handle</Tooltip>}>
        <td>{Workers.worker}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Regular Reward</Tooltip>}>
        <td>{((Workers.amount * 15!) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Discretionary Reward</Tooltip>}>
        <td>{(Number(Workers.create) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Total Reward</Tooltip>}>
        <td>{((Number(Workers.amount * 15) + Number(Workers.create)) / 10000000000).toFixed(0)}</td>
      </OverlayTrigger>
    </tr>
  );
}

export function WorkerRewardTable({ WorkingGroups, RewardPaid, budget }: WorkerRewardTable) {

  var test = RewardPaid?.filter((data) => WorkingGroups.name === data.groupId);
  if (!test) return <></>;

  // console.log(reward);
  var reward = test.reduce((acc: RewardPaid[], item) => {
    const found = acc.find((d) => {
      return d.worker === item.worker;
    });

    if (found) {
      var buf: number = Number(found.amount);

      buf = Number(item.amount);

      found.amount = buf;

      const bug = budget?.find((d) => {
        return (
          (d.receive === found.controlAccount ||
            d.receive === found.rootAccount ||
            d.receive === found.roleAccount ||
            d.receive === found.rewardAccount) &&
          d.groupId === WorkingGroups.name
        );
      });

      if (bug) {
        found.create = bug.amount.toString();
      } else {
        found.create = '0';
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, []);

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
          {isDefined(reward) ? reward.map((data, i) => <WorkderRewardTableBody key={i} Workers={data} />) : null}
        </tbody>
      </Table>
    </div>
  );
}

export default function WorkerRewardsData() {
  const { council } = useSelectedCouncil();
  const { workingGroups, loading, error, budgetSpending, rewardToken } = useWorkingGroups({ council });

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
          <WorkerRewardTable key={i} WorkingGroups={data} RewardPaid={rewardToken!} budget={budgetSpending!} />
        ))
        : null}
    </div>
  );
}
