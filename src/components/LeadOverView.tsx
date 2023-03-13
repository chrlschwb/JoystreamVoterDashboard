import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useProposals, useLeader, useWorkingGroups, usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, Leader } from '@/types';

export interface LeaderProps {
  Leader: Leader;
}

export function Leaders({ Leader }: LeaderProps) {

  const { council } = useSelectedCouncil();
  const { postOfLeaders, terminated, exited, slashed, hair } = useLeader({ council })
  const { proposals } = useProposals({ council });
  const { forumPost } = usePostTokenData({ council })
  const { budgetSpending, rewardToken } = useWorkingGroups({ council });

  if (Leader.type !== "LEADER") return <></>;

  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> groupId of openingFilledEvents</Tooltip>}>
        <td rowSpan={Leader.leader.length}>{Leader.groupId}</td>
      </OverlayTrigger>
      {Leader.leader.map(d => {

        const createProposals = proposals?.filter(data => data.creator === d.membership.handle).length;

        const hairValue = hair?.find(dataV => (dataV.groupId === Leader.groupId && dataV.type === "REGULAR"))?.leader.length;
        const fireValue1 = exited?.filter(data => data.leader === d.membership.handle).length;
        const fireValue2 = terminated?.filter(data => data.leader === d.membership.handle).length;
        const fireValue = fireValue1! + fireValue2!;

        const spending1 = budgetSpending?.filter(data => data.leader === d.membership.handle)
          .reduce((a: number, b) => { return a + Number(b.amount) }, 0);
        const spending2 = rewardToken?.filter(data => data.leader === d.membership.handle)
          .reduce((a: number, b) => { return a + Number(b.amount) }, 0);

        const spending = (spending1! + spending2!) / 10000000000;

        const slashValue = slashed?.filter(data => data.worker === d.membership.handle).length

        const forumText = forumPost?.filter(data => data.auth === d.membership.handle);
        var buffer = forumText?.reduce((a: number, b) => { return a + b.text.length }, 0);
        const forumAverageValue: number = forumText?.length !== 0 ? buffer! / forumText?.length! : 0
        const forumMaxvalue: number = forumText?.length === 0 ? 0 : isDefined(forumText) ? Math.max(...forumText.map(d => d.text.length)) : 0;

        const postText = postOfLeaders?.filter(data => data.author === d.membership.handle);
        var buffer1 = postText?.reduce((a: number, b) => { return a + b.text.length }, 0);
        const postAverageValue: number = postText?.length !== 0 ? buffer1! / postText?.length! : 0;
        const postMaxValue: number = postText?.length === 0 ? 0 : isDefined(postText) ? Math.max(...postText.map(d => d.text.length)) : 0;

        return (<>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> WorkersHired.membership.handle of openingFilledEvents </Tooltip>}>
            <td>{d.membership.handle}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> lenghth of WorkersHired.membership.handle of openingFilledEvents === creator.handle of proposals </Tooltip>}>
            <td>{createProposals}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> sum of amount of rewardPaidEvent and amount of budgetSpendingEvent </Tooltip>}>
            <td>{spending.toFixed(0)}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> length of noLead state of openingFilledEvent of openingFilledEvents </Tooltip>}>
            <td>{isDefined(hairValue) ? hairValue : 0}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> length of terminatedWorkerEvents add lenth of workerExitedEvents  </Tooltip>}>
            <td>{fireValue}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> length  of workEntrySlashedEvents </Tooltip>}>
            <td>{slashValue}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> length of forumPostsConnection  </Tooltip>}>
            <td>{forumText?.length}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of text of forumPostsConnection </Tooltip>}>
            <td>{forumAverageValue.toFixed(0)}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> maximum length of text of forumPostsConnection  </Tooltip>}>
            <td>{forumMaxvalue}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> length  of proposalDiscussionPosts </Tooltip>}>
            <td>{postText?.length}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of text of proposalDiscussionPosts </Tooltip>}>
            <td>{postAverageValue.toFixed(0)}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> Max value of text of proposalDiscussionPosts </Tooltip>}>
            <td>{postMaxValue}</td>
          </OverlayTrigger>
        </>
        )
      })}
    </tr>
  );
}

export default function LeaderOverView() {

  const { council } = useSelectedCouncil();

  const { loading, error, leaders } = useLeader({ council });
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
      <h4>Lead OverView</h4>
      <Table style={{ marginTop: '10px' }}>
        <thead style={{ backgroundColor: '#0080ff' }}>
          <tr>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>WorkingGroup</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Leader</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Created Proposal</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>WorkingGroup Spending</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Hire</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Fire</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Slash</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Forum Posts</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Average Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Max Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Proposal Posts</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Average Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Max Post Length</td>
          </tr>
        </thead>
        <tbody>
          {
            isDefined(leaders) ? leaders.map((data, i) => <Leaders key={i} Leader={data} />) : null
          }
        </tbody>
      </Table>
    </div>
  );
}
