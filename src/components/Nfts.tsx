import React from 'react';

import { Col, Row } from 'react-bootstrap';

import { useNFTs } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Videos() {
  const { council } = useSelectedCouncil();
  const { issued, sale, loading, error } = useNFTs({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>
  }

  if (error) {
    return <div className="sub_panel loading">error</div>
  }

  return (
    <div className="sub_panel">
      <h4>NFTs</h4>
      <Row>
        <Col>
          <input type="number" min={0} className="input_box" readOnly value={isDefined(issued) ? issued : '-'} />
          <h6>issued</h6>
        </Col>
        <Col>
          <input type="number" min={0} className="input_box" readOnly value={isDefined(sale) ? sale : '-'} />
          <h6>sale</h6>
        </Col>
        <Col>
          <input type="number" min={0} className="input_box" readOnly value={'-'} />
          <h6>fee</h6>
        </Col>
      </Row>
    </div >
  );
}
