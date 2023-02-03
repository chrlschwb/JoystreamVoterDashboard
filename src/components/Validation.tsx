import React from 'react';
import { Col, Row } from 'react-bootstrap';

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
          <div className="input_box">{isDefined(validator) ? validator : '-'}</div>
          <h6>validator</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(stake) ? stake : '-'} </div>
          <h6>stake</h6>
        </Col>
        <Col>
          <div className="input_box">{isDefined(mint) ? mint : '-'}</div>
          <h6>mint</h6>
        </Col>
      </Row>
    </div>
  );
}
