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
    return <div className="sub_panel loading ">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Memberships</h4>
      <Row>
        <Col md={4}>
          <div className="input_box">{isDefined(created) ? created : '-'}</div>
          <h6>created</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(invited) ? invited : '-'}</div>
          <h6>invited</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(total) ? total : '-'} </div>
          <h6>total</h6>
        </Col>
      </Row>
    </div>
  );
}
