import React from 'react';

import { Col, Row } from 'react-bootstrap';

import { useMemberships } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Memberships() {
  const { council } = useSelectedCouncil();
  const { created, invited, total, loading, error } = useMemberships({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading ">loading...</div>
  }

  if (error) {
    return <div className="sub_panel loading">error</div>
  }

  return (
    <div className="sub_panel">
      <h4>Memberships</h4>
      <Row>
        <Col md={4}>
          <input type="number" min={0} className="input_box" readOnly value={isDefined(created) ? created : '-'} />
          <h6>created</h6>
        </Col>
        <Col>
          <input type="number" min={0} className="input_box" readOnly value={isDefined(invited) ? invited : '-'} />
          <h6>invited</h6>
        </Col>
        <Col>
          <input type="number" min={0} className="input_box" readOnly value={isDefined(total) ? total : '-'} />
          <h6>total</h6>
        </Col>
      </Row>
    </div >
  );
}
