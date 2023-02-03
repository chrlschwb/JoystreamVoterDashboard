import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useNumberProposal } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function NFTs() {
  const { council } = useSelectedCouncil();
  const { created, executed, failed, wait, loading, error } = useNumberProposal({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Number of Proposal</h4>
      <Row>
        <Col>
          <div className="input_box" style={{ marginLeft: '40px' }}>
            {isDefined(created) ? created : '-'}{' '}
          </div>
          <h6>created</h6>
        </Col>
        <Col>
          <div className="input_box" style={{ marginLeft: '30px' }}>
            {isDefined(executed) ? executed : '-'}
          </div>
          <h6>executed</h6>
        </Col>
        <Col>
          <div className="input_box" style={{ marginLeft: '30px' }}>
            {isDefined(wait) ? wait : '-'}
          </div>
          <h6>wait</h6>
        </Col>
        <Col>
          <div className="input_box" style={{ marginLeft: '30px' }}>
            {isDefined(failed) ? failed : '-'}
          </div>
          <h6>failed</h6>
        </Col>
      </Row>
    </div>
  );
}
