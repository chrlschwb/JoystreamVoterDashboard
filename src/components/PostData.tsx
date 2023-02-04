import React from 'react';

import { Col, Row } from 'react-bootstrap';

import { usePostTokenData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function PostData() {
  const { council } = useSelectedCouncil();
  const { created, total, loading, error } = usePostTokenData({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>
  }

  if (error) {
    return <div className="sub_panel loading">error</div>
  }

  return (
    <div className="sub_panel">
      <h4>POSTS</h4>
      <Row>
        <Col>
          <div className="input_box_md">{isDefined(created) ? created : '-'} </div>
          <h6>created</h6>
        </Col>
        <Col>
          <div className="input_box_md">{isDefined(total) ? total : '-'}</div>
          <h6>total</h6>
        </Col>
      </Row>
    </div >
  );
}
