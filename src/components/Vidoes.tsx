import React from 'react';
import { Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useVideos } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function Videos() {
  const { council } = useSelectedCouncil();
  const { created, total, loading, error } = useVideos({ council });

  // Add some

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <div className="sub_panel">
      <h4>Videos</h4>
      <Row>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> totalCount of videosConnection between council period</Tooltip>}>
            <div className="input_box_md">{isDefined(created) ? created : '-'}</div>
          </OverlayTrigger>
          <h6>created</h6>
        </Col>
        <Col>
          <OverlayTrigger placement="bottom" overlay={<Tooltip> totalCount of videosConnection at the end of council period</Tooltip>}>
            <div className="input_box_md">{isDefined(total) ? total : '-'}</div>
          </OverlayTrigger>
          <h6>total</h6>
        </Col>
      </Row>
    </div>
  );
}
