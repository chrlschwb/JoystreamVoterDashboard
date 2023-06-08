
import { useProposals } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';
import { Error, Spinner, TableBodyCol, TableHeaderCol } from './common';
import moment from 'moment';

export default function ListProposal() {
  const { council } = useSelectedCouncil();
  const { proposals, loading, error } = useProposals({ council });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  const header = [
    { hd: "title" },
    { hd: "creation date" },
    { hd: "link" },
    { hd: "status" },
  ]

  const headerHd = header.map(d => <TableHeaderCol value={d.hd} />)

  return (
    <div className='bg-black mt-5 border-2 border-collapse shadow-md rounded shadow-gray-300'>
      <div className='text-3xl mt-5 mb-2 font-bold '>List of Proposal created</div>
      <table className='mt-3 border-collapse border border-slate-400  table-auto
      w-full '>
        <thead className='bg-gray-800 rounded-sm border border-gray-400 text-lg '>
          <tr>
            {headerHd}
          </tr>
        </thead>
        <tbody>
          {isDefined(proposals)
            ? proposals.map((proposal) => (
              <tr key={proposal.id}>
                <TableBodyCol value={proposal.title} tooltip='title of proposals' />
                <TableBodyCol value={moment(proposal.createdAt).format("YYYY/MM/DD hh:mm:ss")} tooltip='createAt of proposals' />
                <TableBodyCol value="Link to porposal" tooltip={"https://pioneerapp.xyz/#/proposals/preview/${proposal.id} of proposals"} link={`https://pioneerapp.xyz/#/proposals/preview/${proposal.id}`} />
                <TableBodyCol value={proposal.status} tooltip="status of proposals" />
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
