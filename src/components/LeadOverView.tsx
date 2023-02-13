import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useProposals, useLeader, useWorkingGroups } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, Leader } from '@/types';
import { compactAddLength, isNumber } from '@polkadot/util';

export interface LeaderProps {
  Leader: Leader;
}

export function Leaders({ Leader }: LeaderProps) {

  const { council } = useSelectedCouncil();
  const { proposals } = useProposals({ council });

  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> member.handle of councilMembers</Tooltip>}>
        <td rowSpan={Leader.leader.length}>{Leader.groupId}</td>
      </OverlayTrigger>
      {Leader.leader.map(d => {
        return (<>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.votes.votekind = "approve" </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.votes.votekind = "rejected" </Tooltip>}>
            <td>{d.membership.handle}</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.votes.votekind = "abstained" </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> ignored = total - approved - rejected - abstained </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.posts.length where author.handle=council.handle  </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of proposals.posts.text of CM </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> maximum length of proposals.posts.text of CM  </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> forumPosts.length where author.handle=council.handle </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of forumPosts.text of CM </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> maximum length of forumPosts.text of CM </Tooltip>}>
            <td>{ }</td>
          </OverlayTrigger>
        </>
        )
      })}
    </tr>
  );
}

export default function LeaderOverView() {

  const { council } = useSelectedCouncil();

  const { loading, error, leaders, postOfLeaders } = useLeader({ council });

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

  console.log(leaders, postOfLeaders)

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
