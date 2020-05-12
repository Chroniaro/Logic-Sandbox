import React from "react";
import {Specification} from "../../logic/types";

interface Props {
    specifications: Specification[]
}

const FileTree: React.FunctionComponent<Props> = ({specifications}) => {
    return (
        <ul> {
          specifications.map(specification => (
              <li key={specification.uuid}> {
                 specification.name
              } </li>
          ))
        } </ul>
    );
};

export default FileTree;