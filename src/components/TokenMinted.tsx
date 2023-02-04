import React from 'react';

import { Col, Row } from 'react-bootstrap';

import { useTokenMinted } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function TokenMinted() {
  const { council } = useSelectedCouncil();
  const { minted, councildata, proposal, loading, error } = useTokenMinted({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>
  }

  if (error) {
    return <div className="sub_panel loading">error</div>
  }

  return (
    <div className="sub_panel" >
      <h4>Token Minted</h4>
      <Row>
        <Col>
          <div className="input_box" style={{ marginLeft: "30px" }}>{isDefined(minted) ? minted : '-'}</div>
          <h6>minted</h6>
        </Col>
        <Col>
          <div className="input_box" style={{ marginLeft: "30px" }}>{isDefined(councildata) ? councildata : '-'}</div>
          <h6>council</h6>
        </Col>
        <Col>
          <div className="input_box" style={{ marginLeft: "30px" }}>{isDefined(proposal) ? proposal : '-'}</div>
          <h6>proposal</h6>
        </Col>
      </Row>
    </div >
  );
}