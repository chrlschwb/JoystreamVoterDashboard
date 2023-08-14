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

  const header = [{ hd: 'title' }, { hd: 'creation date' }, { hd: 'link' }, { hd: 'status' }];

  const headerHd = header.map((d, i) => <TableHeaderCol key={i} value={d.hd} />);

  return (
    <div className="mt-5 border-collapse rounded border-2 bg-black shadow-md shadow-gray-300">
      <div className="mb-2 mt-5 text-3xl font-bold ">List of Proposal created</div>
      <table
        className="mt-3 w-full table-auto border-collapse  border
      border-slate-400 "
      >
        <thead className="rounded-sm border border-gray-400 bg-gray-800 text-lg ">
          <tr>{headerHd}</tr>
        </thead>
        <tbody>
          {isDefined(proposals)
            ? proposals.map((proposal) => (
                <tr key={proposal.id}>
                  <TableBodyCol value={proposal.title} tooltip="title of proposals" />
                  <TableBodyCol
                    value={moment(proposal.createdAt).format('YYYY/MM/DD hh:mm:ss')}
                    tooltip="createAt of proposals"
                  />
                  <TableBodyCol
                    value="Link to porposal"
                    tooltip={'https://pioneerapp.xyz/#/proposals/preview/${proposal.id} of proposals'}
                    link={`https://pioneerapp.xyz/#/proposals/preview/${proposal.id}`}
                  />
                  <TableBodyCol value={proposal.status} tooltip="status of proposals" />
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
