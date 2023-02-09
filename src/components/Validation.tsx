import React from 'react';
import { Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useValidation } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Validation() {
  const { council } = useSelectedCouncil();
  const { validator, stake, mint, loading, error } = useValidation({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Validations</h4>
      <Row>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> value of blockchain</Tooltip>}>
            <div className="input_box">{isDefined(validator) ? validator : '-'}</div>
          </OverlayTrigger>
          <h6>validator</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> value of blockchain</Tooltip>}>
            <div className="input_box">{isDefined(stake) ? stake : '-'} </div>
          </OverlayTrigger>
          <h6>stake</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> value of blockchain</Tooltip>}>
            <div className="input_box">{isDefined(mint) ? mint : '-'}</div>
          </OverlayTrigger>
          <h6>mint</h6>
        </Col>
      </Row>
    </div>
  );
}
