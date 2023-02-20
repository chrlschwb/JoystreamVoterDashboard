import React from 'react';
import { Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useTokenMinted } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function TokenMinted() {
  const { council } = useSelectedCouncil();
  const { minted, councildata, proposal, loading, error } = useTokenMinted({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Token Minted</h4>
      <Row>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> sum balance of budgetRefillEvents</Tooltip>}>
            <div className="input_box" style={{ marginLeft: '30px' }}>
              {isDefined(minted) ? minted.toFixed(0) : '-'}
            </div>
          </OverlayTrigger>
          <h6>council budget</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> sum balance of budgetRefillEvents</Tooltip>}>
            <div className="input_box" style={{ marginLeft: '30px' }}>
              {isDefined(minted) ? minted.toFixed(0) : '-'}
            </div>
          </OverlayTrigger>
          <h6>minted</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> sum paidBalance of rewardPaymentEvents</Tooltip>}>
            <div className="input_box" style={{ marginLeft: '30px' }}>
              {isDefined(councildata) ? councildata.toFixed(0) : '-'}
            </div>
          </OverlayTrigger>
          <h6>council reward</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> sum budgetChangeAmount of budgetUpdatedEvents</Tooltip>}>

            <div className="input_box" style={{ marginLeft: '30px' }}>
              {isDefined(proposal) ? proposal.toFixed(0) : '-'}
            </div>
          </OverlayTrigger>
          <h6>WG budget</h6>
        </Col>
      </Row>
    </div>
  );
}
