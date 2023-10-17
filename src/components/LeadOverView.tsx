import { useProposals, useLeader, useWorkingGroups, usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { ExitedWorker, GroupIdToGroupParam, isDefined, Leader, LeaderPost, SlashedWorker, TerminatedWorker } from '@/types';
import { Spinner, TableBodyCol, TableHeaderCol } from './common';

export interface LeaderProps {
  Leader: Leader;
  key: number;
  postOfLeaders: LeaderPost[] | undefined,
  terminated: TerminatedWorker[] | undefined,
  exited: ExitedWorker[] | undefined,
  slashed: SlashedWorker[] | undefined,
  hair: Leader[] | undefined
}

export function Leaders({ Leader, key, postOfLeaders, terminated, exited, slashed, hair }: LeaderProps) {
  const { council } = useSelectedCouncil();
  const { proposals } = useProposals({ council });
  const { forumPost } = usePostTokenData({ council });
  const { budgetSpending, rewardToken } = useWorkingGroups({ council });

  if (Leader.type !== 'LEADER') return <></>;

  return (
    <tr key={key}>
      <TableBodyCol value={GroupIdToGroupParam[Leader.groupId]} tooltip="groupId of openingFilledEvents" />
      {Leader.leader.map((d) => {
        const createProposals = proposals?.filter((data) => data.creator === d.membership.handle).length;

        const hairValue = hair?.find((dataV) => dataV.groupId === Leader.groupId && dataV.type === 'REGULAR')?.leader
          .length;
        const fireValue1 = exited?.filter((data) => data.leader === d.membership.handle).length;
        const fireValue2 = terminated?.filter((data) => data.leader === d.membership.handle).length;
        const fireValue = fireValue1! + fireValue2!;

        const spending1 = budgetSpending
          ?.filter((data) => data.leader === d.membership.handle)
          .reduce((a: number, b) => {
            return a + Number(b.amount);
          }, 0);
        const spending2 = rewardToken
          ?.filter((data) => data.leader === d.membership.handle)
          .reduce((a: number, b) => {
            return a + Number(b.amount);
          }, 0);

        const spending = (spending1! + spending2!) / 10000000000;

        const slashValue = slashed?.filter((data) => data.worker === d.membership.handle).length;

        const forumText = forumPost?.filter((data) => data.auth === d.membership.handle);
        var buffer = forumText?.reduce((a: number, b) => {
          return a + b.text.length;
        }, 0);
        const forumAverageValue: number = forumText?.length !== 0 ? buffer! / forumText?.length! : 0;
        const forumMaxvalue: number =
          forumText?.length === 0 ? 0 : isDefined(forumText) ? Math.max(...forumText.map((d) => d.text.length)) : 0;

        const postText = postOfLeaders?.filter((data) => data.author === d.membership.handle);
        var buffer1 = postText?.reduce((a: number, b) => {
          return a + b.text.length;
        }, 0);
        const postAverageValue: number = postText?.length !== 0 ? buffer1! / postText?.length! : 0;
        const postMaxValue: number =
          postText?.length === 0 ? 0 : isDefined(postText) ? Math.max(...postText.map((d) => d.text.length)) : 0;

        return (
          <>
            <TableBodyCol value={d.membership.handle} tooltip="WorkersHired.membership.handle of openingFilledEvents" />
            <TableBodyCol
              value={createProposals?.toString() ?? '-'}
              tooltip="lenghth of WorkersHired.membership.handle of openingFilledEvents === creator.handle of proposals"
            />
            <TableBodyCol
              value={spending.toFixed(0)}
              tooltip="sum of amount of rewardPaidEvent and amount of budgetSpendingEvent"
            />
            <TableBodyCol
              value={hairValue?.toString() ?? '-'}
              tooltip="length of noLead state of openingFilledEvent of openingFilledEvents"
            />
            <TableBodyCol
              value={fireValue.toString()}
              tooltip="length of terminatedWorkerEvents add lenth of workerExitedEvents"
            />
            <TableBodyCol value={slashValue?.toString() ?? '-'} tooltip="length of workEntrySlashedEvents" />
            <TableBodyCol value={forumText?.length.toString() ?? '-'} tooltip="length of forumPostsConnection" />
            <TableBodyCol
              value={forumAverageValue.toFixed(0)}
              tooltip="average length of text of forumPostsConnection "
            />
            <TableBodyCol value={forumMaxvalue.toString()} tooltip="maximum length of text of forumPostsConnection " />
            <TableBodyCol value={postText?.length.toString() ?? '-'} tooltip="length of proposalDiscussionPosts" />
            <TableBodyCol
              value={postAverageValue.toFixed(0)}
              tooltip="average length of text of proposalDiscussionPosts"
            />
            <TableBodyCol value={postMaxValue.toFixed(0)} tooltip="Max value of text of proposalDiscussionPosts " />
          </>
        );
      })}
    </tr>
  );
}

export default function LeaderOverView() {
  const { council } = useSelectedCouncil();

  const { loading, error, leaders, postOfLeaders, terminated, exited, slashed, hair } = useLeader({ council });

  const header = [
    { hd: 'WorkingGroup' },
    { hd: 'Leader' },
    { hd: 'Created Proposal' },
    { hd: 'WorkingGroup Spending' },
    { hd: 'Hire' },
    { hd: 'Fire' },
    { hd: 'Slash' },
    { hd: 'Forum Posts' },
    { hd: 'Average Post Length' },
    { hd: 'Max Post Length' },
    { hd: 'Proposal Posts' },
    { hd: 'Average Post Length' },
    { hd: 'Max Post Length' },
  ];

  const headerHd = header.map((d, i) => <TableHeaderCol key={i} value={d.hd} />);
  return (
    <div className="mt-5 border-collapse rounded border-2 bg-black shadow-md shadow-gray-300">
      <div className="mb-2 mt-5 text-3xl font-bold ">Lead OverView</div>
      <table
        className="mt-3 w-full table-auto border-collapse  border
      border-slate-400 "
      >
        <thead className="rounded-sm border border-gray-400 bg-gray-800 text-lg ">
          <tr>{headerHd}</tr>
        </thead>
        {loading || error ? <Spinner /> : <tbody className="text-center">
          {isDefined(leaders) ? leaders.map((data, i) => <Leaders key={i} Leader={data} postOfLeaders={postOfLeaders} terminated={terminated} exited={exited} slashed={slashed} hair={hair} />) : null}
        </tbody>}
      </table>
    </div>
  );
}
