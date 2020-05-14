import {connect} from "react-redux";
import WorkbenchPane from "./subcomponents/WorbenchPane";
import {State} from "../app/reducer";
import {gatesSelector, newGate} from "./interface";

const mapStateToProps = (state: State) => ({
    gates: gatesSelector(state)
});

const mapDispatchToProps = {
    newGate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(WorkbenchPane);