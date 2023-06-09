import React from 'react';

import { useProposals, useCouncilMembers, usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined, CouncilMember, propsEquals } from '@/types';
import { compactAddLength, isNumber } from '@polkadot/util';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';

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

  proposals?.map((data) => {
    approve += data.votes.filter((d) => d.voteKind === 'APPROVE' && d.voter.handle === CouncilMember.handler).length;
    rejected += data.votes.filter((d) => d.voteKind === 'REJECT' && d.voter.handle === CouncilMember.handler).length;
    abstained += data.votes.filter((d) => d.voteKind === 'ABSTAIN' && d.voter.handle === CouncilMember.handler).length;
    createPost += data.posts?.filter((d) => d.author.handle === CouncilMember.handler).length;

    buffer = data.posts
      ?.filter((d) => d.author.handle === CouncilMember.handler)
      .reduce((a: number, b) => {
        return a + b.text.length;
      }, buffer);

    textLenght = data.posts
      ?.filter((d) => d.author.handle === CouncilMember.handler)
      .map((d) => {
        maxPostLength = maxPostLength < d.text.length ? d.text.length : maxPostLength;
        return d.text.length;
      });
  });

  const ignored = proposals?.length! - approve! - rejected! - abstained!;

  averagePostLength = buffer / createPost;

  var createForum = forum?.filter((d) => d.author.handle === CouncilMember.handler).length;

  var val1 = forum
    ?.filter((d) => d.author.handle === CouncilMember.handler)
    .reduce((a: number, b) => {
      return a + b.text.length;
    }, 0);

  var averageForumLength: number = createForum === 0 ? 0 : val1! / createForum!;

  var maxForumLength: number = 0;

  var val3 = forum?.filter((d) => d.author.handle === CouncilMember.handler);

  maxForumLength = createForum === 0 ? 0 : isDefined(val3) ? Math.max(...val3.map((d) => d.text.length)) : 0;

  return (
    <tr>
      <TableBodyCol value={CouncilMember.handler} tooltip=' member.handle of councilMembers' />
      <TableBodyCol value={approve.toString()} tooltip='proposals.votes.votekind = "approve" ' />
      <TableBodyCol value={rejected.toString()} tooltip='proposals.votes.votekind = "rejected"' />
      <TableBodyCol value={abstained.toString()} tooltip='proposals.votes.votekind = "abstained"' />
      <TableBodyCol value={ignored.toString()} tooltip='ignored = total - approved - rejected - abstained' />
      <TableBodyCol value={createPost.toString()} tooltip='proposals.posts.length where author.handle=council.handle ' />
      <TableBodyCol value={averagePostLength.toFixed(0)} tooltip=' average length of proposals.posts.text of CM ' />
      <TableBodyCol value={maxPostLength.toString()} tooltip='  maximum length of proposals.posts.text of CM' />
      <TableBodyCol value={createForum?.toString() ?? "-"} tooltip='orumPosts.length where author.handle=council.handle ' />
      <TableBodyCol value={averageForumLength.toFixed(0)} tooltip='average length of forumPosts.text of CM ' />
      <TableBodyCol value={maxForumLength.toString()} tooltip='maximum length of forumPosts.text of CM ' />
    </tr>
  );
}

export default function CouncilVote() {
  const { council } = useSelectedCouncil();

  const { loading, error, member } = useCouncilMembers({ council });
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }
  const header = [
    { hd: "Council Member" },
    { hd: "Approved Proposals" },
    { hd: "Rejected Proposals" },
    { hd: "Abstained Proposals" },
    { hd: "Ignored Proposals" },
    { hd: "Created Proposal Posts" },
    { hd: "Average Post Length" },
    { hd: "Max Post Length" },
    { hd: "Created Forum Posts" },
    { hd: "Average Post Length" },
    { hd: "Max Post Length" },
  ]

  const headerHd = header.map(d => <TableHeaderCol value={d.hd} />)

  return (
    <div className='bg-black mt-5 border-2 border-collapse shadow-md rounded shadow-gray-300'>
      <div className='text-3xl mt-5 mb-2 font-bold'>CouncilMember OverView</div>
      <table className='mt-3 border-collapse border border-slate-400 '>
        <thead className='bg-gray-800 rounded-sm border border-gray-400 text-lg '>
          <tr>
            {headerHd}
          </tr>
        </thead>
        <tbody>
          {
            isDefined(member) ? member.map((data, i) => <Member key={i} CouncilMember={data} />) : null
          }
        </tbody>
      </table>
    </div>
  );
}
