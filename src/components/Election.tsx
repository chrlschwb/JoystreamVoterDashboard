import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { sumStakes } from '@/helpers';
import { useElection } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Election() {
  const { council } = useSelectedCouncil();
  const { election, loading, error } = useElection({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Elections</h4>
      <Row>
        <Col>
          <div className="input_box">{isDefined(election) ? election.candidates.length : '-'} </div>
          <h6>candidates</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(election) ? election.castVotes.length : '-'}</div>
          <h6>votes</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(election) ? sumStakes(election.candidates).toString().slice(0, length - 10) : '-'}</div>
          <h6>stake</h6>
        </Col>
      </Row>
    </div>
  );
}
