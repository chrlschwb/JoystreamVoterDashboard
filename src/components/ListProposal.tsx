import React from 'react';
import { Table } from 'react-bootstrap';

import { useProposals } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function ListProposal() {
  const { council } = useSelectedCouncil();
  const { proposals, loading, error } = useProposals({ council });

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
      <h4>List of Proposal created</h4>
      <Table style={{ marginTop: '10px' }}>
        <thead style={{ backgroundColor: '#0080ff' }}>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>title</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>creation date</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>link</td>
          <td style={{ borderWidth: '3px', borderColor: 'black' }}>status</td>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}
