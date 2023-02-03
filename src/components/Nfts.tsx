import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useNFTs } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function NFTs() {
  const { council } = useSelectedCouncil();
  const { issued, sale, fee, loading, error } = useNFTs({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>NFTs</h4>
      <Row>
        <Col>
          <div className="input_box">{isDefined(issued) ? issued : '-'}</div>
          <h6>issued</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(sale) ? sale : '-'}</div>
          <h6>sale</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(fee) ? fee : '-'} </div>
          <h6>fee</h6>
        </Col>
      </Row>
    </div>
  );
}
