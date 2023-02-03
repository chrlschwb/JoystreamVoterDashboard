import React, { useState, useEffect } from 'react';

import { useElectedCouncils } from '@/hooks';

import { Col, Row, Table } from 'react-bootstrap';
import "./home.css";


export default function Home() {
  const { data } = useElectedCouncils({});

  const [period, setPeriod] = useState<number>(0);

  return <div className='main'>
    <div className='justify-content-center'>
      <span style={{ fontSize: "30px" }}>
        COUNCIL PERIOD : &nbsp;
      </span>
      <select name="cars" className="select_input" onChange={(e) => setPeriod(Number(e.target.value))}>
        {(data === undefined) ? "" : data.electedCouncils.map((data, i) =>
          <option key={i}>{data.id}</option>)
        }
      </select>
      <hr />
    </div>
  </div>;
}
