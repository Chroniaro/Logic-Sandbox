import React from "react";
import {Gate} from "../../gates/types";

interface Props {
    gates: Gate[]
}

const FileTree: React.FunctionComponent<Props> = ({gates}) => {
    return (
        <ul> {
          gates.map(gate => (
              <li key={gate.uuid}> {
                 gate.name
              } </li>
          ))
        } </ul>
    );
};

export default FileTree;