import React from 'react';

import { Table } from 'react-bootstrap';

import { useListProposal } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';

export default function ListProposal() {
  const { council } = useSelectedCouncil();
  const { listProposal, loading, error } = useListProposal({ council });


  if (loading) {
    return <div className="sub_panel loading" style={{ marginTop: "20px" }}>loading...</div>
  }

  if (error) {
    return <div className="sub_panel loading" style={{ marginTop: "20px" }}>error</div>
  }

  return (

    <div style={{ marginTop: "20px" }} className="table_background">
      <h4>List of Proposal created</h4>
      <Table style={{ marginTop: "10px" }}>
        <thead style={{ backgroundColor: "#0080ff" }}>
          <td style={{ borderWidth: "3px", borderColor: "black" }}>
            title
          </td>
          <td style={{ borderWidth: "3px", borderColor: "black" }}>
            creation date
          </td>
          <td style={{ borderWidth: "3px", borderColor: "black" }}>
            link
          </td>
          <td style={{ borderWidth: "3px", borderColor: "black" }}>
            status
          </td >
        </thead>
        <tbody>
        </tbody>
      </Table>
      {
        (listProposal !== undefined && [listProposal].length > 0) ? [listProposal].map(data => {
          // const links: string = `https://pioneerapp.xyz/#/proposals/preview/${data.node.proposal.id}`;

          var test: string = "";

          // if (data.node.proposal.status.__typename === "ProposalStatusDeciding") {
          //   test = "deciding"
          // } else if (data.node.proposal.status.__typename === "ProposalStatusGracing") {
          //   test = "gracing"
          // } else if (data.node.proposal.status.__typename === "ProposalStatusDormant") {
          //   test = "dormant"
          // } else if (data.node.proposal.status.__typename === "ProposalStatusExecuted") {
          //   test = "executed"
          // } else {
          //   test = "failed";

          console.log(data)
          // }

          return (
            <tr>
              {/* <td style={{ borderWidth: "3px", borderColor: "black" }}>
                {data.node.proposal.title}
              </td>
              <td style={{ borderWidth: "3px", borderColor: "black" }}>
                {data.node.proposal.createAt}
              </td>
              <td style={{ borderWidth: "3px", borderColor: "black" }}>
                {links}
              </td>
              <td style={{ borderWidth: "3px", borderColor: "black" }}>
                {test}
              </td> */}
            </tr>
          )
        }) : ""
      }
    </div>


  );
}
