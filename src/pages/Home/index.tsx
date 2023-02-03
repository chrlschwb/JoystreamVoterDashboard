import React from 'react';

import { useElectedCouncils } from '@/hooks';

import { Col, Row, Table } from 'react-bootstrap';
import "./home.css";


export default function Home() {
  const { data } = useElectedCouncils({});
  console.log(data);
  return <div className='main'>
    <div className='justify-content-center'>
      <span style={{ fontSize: "30px" }}>
        COUNCIL PERIOD : &nbsp;
      </span>
      <select name="cars" className="select_input">
        {(data === undefined) ? "" : data.electedCouncils.map((data, i) =>
          <option value={data.id} key={i}>{data.id}</option>)
        }
      </select>
      <hr />
    </div>

  </div>;
}
