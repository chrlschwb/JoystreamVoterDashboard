import './home.css';

import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import {
  Channels,
  CouncilSelect,
  Election,
  ListProposal,
  Memberships,
  Nfts,
  NumberProposal,
  PostData,
  Thread,
  TokenMinted,
  Validation,
  Videos,
  WorkingGroups,
  CouncilVotes,
  ProposalGroups,
} from '@/components';
import { useSelectedCouncil } from '@/store';
import WorkerRewards from '@/components/WorkerRewardTable';


export default function Home() {
  const { council, setCouncil } = useSelectedCouncil();

  return (
    <div style={{ backgroundColor: 'black' }}>
      <h1 className="text-white">Joystream Council Voter Dashboard</h1>
      <hr className="text-white" />
      <CouncilSelect council={council} onChange={setCouncil} />
      <hr style={{ height: '3px', color: 'white' }} />
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
      <Row style={{ marginTop: '20px' }}>
        <Col md={2}>
          <Thread />
        </Col>
        <Col md={2}>
          <PostData />
        </Col>
        <Col md={4}>
          <Election />
        </Col>
        <Col md={4}>
          <Validation />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col md={6}>
          <TokenMinted />
        </Col>
        <Col md={6}>
          <NumberProposal />
        </Col>
      </Row>
      <ProposalGroups />
      <CouncilVotes />
      <WorkingGroups />
      <ListProposal />
      <h1 className='text-center text-white mt-3'>Workers Rewards</h1>
      <WorkerRewards />
    </div>
  );
}
