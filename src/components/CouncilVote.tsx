import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useProposals, useCouncilMembers, usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, CouncilMember, propsEquals } from '@/types';
import { isNumber } from '@polkadot/util';

export interface CouncilMemberProps {
  CouncilMember: CouncilMember;
}


export function Member({ CouncilMember }: CouncilMemberProps) {

  const { council } = useSelectedCouncil();
  const { proposals } = useProposals({ council });
  const { created, total } = usePostTokenData({ council });

  var approve = proposals?.map(data => {
    const value = data.votes.filter(d => (d.voteKind === "APPROVE" && d.vote.handle === CouncilMember.handler)).length;
    return value
  })
  var rejected = proposals?.map(data => {
    const value = data.votes.filter(d => (d.voteKind === "REJECT" && d.vote.handle === CouncilMember.handler)).length;
    return value
  }, 0)

  var abstained = proposals?.map(data => {
    const value = data.votes.filter(d => (d.voteKind === "ABSTAIN" && d.vote.handle === CouncilMember.handler)).length;
    return value
  })

  const v1: number = isNumber(approve) ? approve : 0;
  const v2: number = isNumber(rejected) ? rejected : 0;
  const v3: number = isNumber(abstained) ? abstained : 0;
  const ignored = isDefined(proposals?.length) ? proposals?.length : 0 - v1 - v2 - v3;

  var createPost = proposals?.map(data => {
    const value = data.votes.filter(d => (d.voteKind === "APPROVE" && d.vote.handle === CouncilMember.handler)).length;
    return value
  })

  return (
    <tr>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> member.handle of councilMembers</Tooltip>}>
        <td>{CouncilMember.handler}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.votes.votekind = "approve" </Tooltip>}>
        <td>{approve}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>proposals.votes.votekind = "rejected" </Tooltip>}>
        <td>{rejected}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{ignored}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>reward = (sum budgetChangeAmount of budgetUpdatedEvents) -(sum amount of RewardPaidEvent)  </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
    </tr>
  );
}

export default function CouncilVote() {
  const { council } = useSelectedCouncil();

  const { loading, error, member } = useCouncilMembers({ council });

  console.log(member)
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
      <h4>CouncilMember OverView</h4>
      <Table style={{ marginTop: '10px' }}>
        <thead style={{ backgroundColor: '#0080ff' }}>
          <tr>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Council Member</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Approved Proposals</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Rejected Proposals</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Abstained Proposals</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Ignored Proposals</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Created Proposal Posts</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Average Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Max Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Created Forum Posts</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Average Post Length</td>
            <td style={{ borderWidth: '3px', borderColor: 'black' }}>Max Post Length</td>
          </tr>
        </thead>
        <tbody>
          {
            isDefined(member) ? member.map((data, i) => <Member key={i} CouncilMember={data} />) : null
          }
        </tbody>
      </Table>
    </div>
  );
}
