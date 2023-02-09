import React from 'react';
import { Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';

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
          <OverlayTrigger placement="bottom" overlay={<Tooltip>candidation.length of electionRounds</Tooltip>}>
            <div className="input_box">{isDefined(election) ? election.candidates.length : '-'} </div>
          </OverlayTrigger>
          <h6>candidates</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>castVotes.length of electionRounds</Tooltip>}>
            <div className="input_box">{isDefined(election) ? election.castVotes.length : '-'}</div>
          </OverlayTrigger>
          <h6>votes</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>sum candidates.stake of electionRounds</Tooltip>}>
            <div className="input_box">{isDefined(election) ? sumStakes(election.candidates).toString().slice(0, length - 10) : '-'}</div>
          </OverlayTrigger>
          <h6>stake</h6>
        </Col>
      </Row>
    </div>
  );
}
