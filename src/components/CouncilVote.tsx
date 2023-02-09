import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useProposals, useCouncilMembers, usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, CouncilMember, propsEquals } from '@/types';
import { compactAddLength, isNumber } from '@polkadot/util';

export interface CouncilMemberProps {
  CouncilMember: CouncilMember;
}


export function Member({ CouncilMember }: CouncilMemberProps) {

  const { council } = useSelectedCouncil();
  const { proposals } = useProposals({ council });
  const { forum } = usePostTokenData({ council });

  var buffer: number = 0;
  var textLenght: Array<number>;
  var approve: number = 0;
  var rejected: number = 0;
  var abstained: number = 0;
  var createPost: number = 0;
  var averagePostLength: number = 0;
  var maxPostLength: number = 0;

  proposals?.map(data => {
    approve += data.votes.filter(d => (d.voteKind === "APPROVE" && d.voter.handle === CouncilMember.handler)).length
    rejected += data.votes.filter(d => (d.voteKind === "REJECT" && d.voter.handle === CouncilMember.handler)).length;
    abstained += data.votes.filter(d => (d.voteKind === "ABSTAIN" && d.voter.handle === CouncilMember.handler)).length;
    createPost += data.posts?.filter(d => d.author.handle === CouncilMember.handler).length;
    buffer = data.posts?.filter(d => d.author.handle === CouncilMember.handler).reduce((a: number, b) => {
      return a + b.text.length
    }, buffer);

    textLenght = data.posts?.filter(d => d.author.handle === CouncilMember.handler).map(d => {
      maxPostLength = maxPostLength < d.text.length ? d.text.length : maxPostLength;
      return d.text.length
    })
  })

  const ignored = proposals?.length! - approve! - rejected! - abstained!;

  averagePostLength = buffer / createPost;

  var createForum = forum?.filter(d => d.author.handle === CouncilMember.handler).length;
  var val1 = forum?.filter(d => d.author.handle === CouncilMember.handler).reduce((a: number, b) => {
    return a + b.text.length
  }, 0);

  var averageForumLength: number = createForum === 0 ? 0 : val1! / createForum!;

  var maxForumLength: number = 0;

  var val3 = forum?.filter(d => d.author.handle === CouncilMember.handler);

  maxForumLength = createForum === 0 ? 0 : (isDefined(val3) ? Math.max(...val3.map(d => d.text.length)) : 0);

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
      <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.votes.votekind = "abstained" </Tooltip>}>
        <td>{abstained}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> ignored = total - approved - rejected - abstained </Tooltip>}>
        <td>{ignored}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> proposals.posts.length where author.handle=council.handle  </Tooltip>}>
        <td>{createPost}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of proposals.posts.text of CM </Tooltip>}>
        <td>{averagePostLength.toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> maximum length of proposals.posts.text of CM  </Tooltip>}>
        <td>{maxPostLength}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> forumPosts.length where author.handle=council.handle </Tooltip>}>
        <td>{createForum}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> average length of forumPosts.text of CM </Tooltip>}>
        <td>{averageForumLength.toFixed(0)}</td>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip> maximum length of forumPosts.text of CM </Tooltip>}>
        <td>{maxForumLength}</td>
      </OverlayTrigger>
    </tr>
  );
}

export default function CouncilVote() {
  const { council } = useSelectedCouncil();

  const { loading, error, member } = useCouncilMembers({ council });

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
