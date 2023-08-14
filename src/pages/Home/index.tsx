import './home.css';
import { CouncilSelect, CouncilVotes, ProposalGroups, WorkerReward, WorkingGroups } from '@/components';
import ListProposal from '@/components/ListProposal';
import SubPannel, { PanelProps } from '@/components/common/SubPannel';
import { sumStakes } from '@/helpers';
import {
  useChannels,
  useElection,
  useMemberships,
  useNFTs,
  useNumberProposal,
  usePostTokenData,
  useThreadData,
  useTokenMinted,
  useValidation,
  useVideos,
} from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Home() {
  const { council, setCouncil } = useSelectedCouncil();

  const {
    created: memberCreated,
    invited: memberInvited,
    total: memberTotal,
    loading: memberLoading,
    error: memberError,
  } = useMemberships({ council });
  const memberData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of membershipsConnection between council period',
      value: memberCreated,
    },
    {
      subtitle: 'invited',
      tooltip: 'totalCount of memberInvitedEventsConnection',
      value: memberInvited,
    },
    {
      subtitle: 'total',
      tooltip: 'totalCount of membershipsConnection  at the end of council period',
      value: memberTotal,
    },
  ];

  const {
    created: channelsCreated,
    total: channelsTotal,
    loading: channelsLoading,
    error: channelsError,
  } = useChannels({ council });
  const channelsData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of channelsConnection  between council period',
      value: channelsCreated,
    },
    {
      subtitle: 'total',
      tooltip: 'totalCount of channelsCounnection at the end of council period',
      value: channelsTotal,
    },
  ];

  const {
    created: vidoesCreated,
    total: videosTotal,
    loading: videosLoading,
    error: videosError,
  } = useVideos({ council });
  const videosData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of videosConnection between council period',
      value: vidoesCreated,
    },
    {
      subtitle: 'total',
      tooltip: 'totalCount of videosConnection at the end of council period',
      value: videosTotal,
    },
  ];

  const { issued, sale, fee, loading: nftLoading, error: nftError } = useNFTs({ council });
  const nftData: PanelProps[] = [
    {
      subtitle: 'issued',
      tooltip: 'totalCount of nftIssuedEventsConnection',
      value: issued,
    },
    {
      subtitle: 'sold',
      tooltip: 'totalCount of nftBoughtEventsConnection',
      value: sale,
    },
    {
      subtitle: 'fee',
      tooltip: 'value of blockchain',
      value: fee,
    },
  ];

  const {
    created: threadCreated,
    total: threadTotal,
    loading: threadLoading,
    error: threadError,
  } = useThreadData({ council });
  const threadData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of forumThreadsConnection between council period',
      value: threadCreated,
    },
    {
      subtitle: 'total',
      tooltip: ' totalCount of forumThreadsConnection at the end of council period',
      value: threadTotal,
    },
  ];

  const {
    created: postCreated,
    total: postTotal,
    loading: postLoading,
    error: postError,
  } = usePostTokenData({ council });
  const postData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of forumPostsConnection between council period',
      value: postCreated,
    },
    {
      subtitle: 'total',
      tooltip: ' totalCount of forumPostsConnection at the end of council period',
      value: postTotal,
    },
  ];

  const { election, loading: electionLoading, error: electionError } = useElection({ council });
  const electionData: PanelProps[] = [
    {
      subtitle: 'candidates',
      tooltip: 'candidation.length of electionRounds',
      value: election?.candidates.length,
    },
    {
      subtitle: 'votes',
      tooltip: ' castVotes.length of electionRounds',
      value: election?.castVotes.length,
    },
    {
      subtitle: 'stake',
      tooltip: ' sum candidates.stake, cast.stake of electionRounds',
      value: isDefined(election)
        ? Number(
            sumStakes(election.candidates)
              .toString()
              .slice(0, length - 10)
          ) +
          Number(
            sumStakes(election.castVotes)
              .toString()
              .slice(0, length - 10)
          )
        : 0,
    },
  ];

  const { validator, stake, mint, loading: validationLoading, error: validationError } = useValidation({ council });
  const validationData: PanelProps[] = [
    {
      subtitle: 'validator',
      tooltip: 'value of blockchain',
      value: Number(validator),
    },
    {
      subtitle: 'stake',
      tooltip: 'value of blockchain',
      value: Number(stake),
    },
    {
      subtitle: 'mint',
      tooltip: 'value of blockchain',
      value: Number(mint),
    },
  ];

  const {
    minted,
    councildata,
    proposal,
    councilBudget,
    loading: tokenLoading,
    error: tokenError,
  } = useTokenMinted({ council });
  const tokenData: PanelProps[] = [
    {
      subtitle: 'council total',
      tooltip: 'minted - councilReward - WGBudget - amount of requestFundedEvents',
      value: Number(councilBudget.toFixed(0)),
    },
    {
      subtitle: 'minted',
      tooltip: ' sum balance of budgetRefillEvents',
      value: Number(minted?.toFixed(0)),
    },
    {
      subtitle: 'council reward',
      tooltip: 'sum paidBalance of rewardPaymentEvents  ',
      value: Number(councildata?.toFixed(0)),
    },
    {
      subtitle: 'WG spending',
      tooltip: ' sum budgetChangeAmount of budgetUpdatedEvents ',
      value: Number(proposal?.toFixed(0)),
    },
  ];

  const {
    created: numberCreated,
    executed,
    failed,
    wait,
    loading: numberLoading,
    error: numberError,
  } = useNumberProposal({ council });
  const numberData: PanelProps[] = [
    {
      subtitle: 'created',
      tooltip: 'totalCount of proposalCreatedEventsConnection',
      value: numberCreated,
    },
    {
      subtitle: 'executed',
      tooltip: 'totalCount of proposalExecutedEventsConnection',
      value: executed,
    },
    {
      subtitle: 'wait',
      tooltip: 'number of proposals where state = ProposalStatusDormant',
      value: Number(wait),
    },
    {
      subtitle: 'failed',
      tooltip: '  failed = created - executed - waiting - deciding',
      value: Number(failed),
    },
  ];

  return (
    <div className="bg-black text-center">
      <div className="font-serif text-5xl font-bold text-white">Joystream Council Voter Dashboard</div>
      <hr className="mb-3 mt-4 text-gray-300" />
      <CouncilSelect council={council} onChange={setCouncil} />
      <hr className="mt-2 border border-gray-600" />
      <div className="mt-3  grid gap-4 text-gray-400 md:grid-cols-4">
        <SubPannel data={memberData} title="Memberships" error={memberError} loading={memberLoading} />
        <SubPannel data={channelsData} title="Channels" error={channelsError} loading={channelsLoading} />
        <SubPannel data={videosData} title="Videos" error={videosError} loading={videosLoading} />
        <SubPannel data={nftData} title="NFTs" error={nftError} loading={nftLoading} />
        <SubPannel data={threadData} title="Thread" error={threadError} loading={threadLoading} />
        <SubPannel data={postData} title="Post" error={postError} loading={postLoading} />
        <SubPannel data={electionData} title="Elections" error={electionError} loading={electionLoading} />
        <SubPannel data={validationData} title="Validations" error={validationError} loading={validationLoading} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SubPannel data={tokenData} title="Token Minted" error={tokenError} loading={tokenLoading} />
        <SubPannel data={numberData} title="Number of Proposal" error={numberError} loading={numberLoading} />
      </div>
      <ProposalGroups />
      <CouncilVotes />
      <WorkingGroups />
      <ListProposal />
      <WorkerReward />
    </div>
  );
}
