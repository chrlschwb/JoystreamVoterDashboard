import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import {   useWorkingGroups } from '@/hooks';
import {  useSelectedCouncil } from '@/store';
import { isDefined,  WorkingGroup } from '@/types';
import { WorkerMemberFragment } from '@/queries';

export interface WorkerRewardTableBody {
  Workers: WorkerMemberFragment;
}

export interface WorkerRewardTable{
  WorkingGroups:WorkingGroup,
}

function WorkderRewardTableBody({ Workers }: WorkerRewardTableBody) {

  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> member of workers of workingGroups</Tooltip>}>
        <td>{Workers.membership.handle}</td>
      </OverlayTrigger>
    </tr>
  );
}

export function WorkerRewardTable({WorkingGroups}:WorkerRewardTable){
  const { council } = useSelectedCouncil();
  const {rewardToken} = useWorkingGroups({council});

  var reward = rewardToken?.filter((data) => WorkingGroups.name === data.groupId).map((data)=>console.log(data));

  


  return(
    <div  style={{ marginTop: '20px' }} className="table_background">
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
        {
          isDefined(WorkingGroups) ?  WorkingGroups.workers.map((data,i) =><WorkderRewardTableBody key={i} Workers={data} />) : null
        }
      </tbody>
    </Table>
    </div>
  )
}

export default function WorkerRewardsData() {

  const { council } = useSelectedCouncil();
  const {workingGroups, loading, error} = useWorkingGroups({council});

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
      {
        isDefined(workingGroups) ? workingGroups.map((data, i) => <WorkerRewardTable key={i} WorkingGroups={data}/> ) : null
      }
    </div>
  );
}
