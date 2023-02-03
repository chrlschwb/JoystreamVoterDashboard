import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useElection } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Election() {
  const { council } = useSelectedCouncil();
  const { candidates, votes, stake, loading, error } = useElection({ council });

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
          <div className="input_box">{isDefined(candidates) ? candidates : '-'} </div>
          <h6>candidates</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(votes) ? votes : '-'}</div>
          <h6>votes</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(stake) ? stake : '-'}</div>
          <h6>stake</h6>
        </Col>
      </Row>
    </div>
  );
}
