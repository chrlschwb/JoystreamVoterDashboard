import { CouncilSelect, Memberships, Videos, Channels, Nfts } from '@/components';
import { useSelectedCouncil } from '@/store';

import { Col, Row } from 'react-bootstrap';
import "./home.css";


export default function Home() {
  const { council, setCouncil } = useSelectedCouncil();

  return (
    <div style={{ backgroundColor: "black" }}>
      <CouncilSelect council={council} onChange={setCouncil} />
      <hr style={{ height: "3px", color: "white" }} />
      <Row>
        <Col md={4}>
          <Memberships />
        </Col>
        <Col md={2}>
          <Channels />
        </Col>
        <Col md={2}>
          <Videos />
        </Col>
        <Col md={4}>
          <Nfts />
        </Col>
      </Row>
    </div>
  );
}
