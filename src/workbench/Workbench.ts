import {connect} from "react-redux";
import WorkbenchPane from "./subcomponents/WorbenchPane";
import {State} from "../app/reducer";
import {gatesSelector, newGate} from "./interface";
import {specificationsSelector} from "../browser/interface";

const mapStateToProps = (state: State) => ({
    gates: gatesSelector(state),
    newGateSpec: specificationsSelector(state)[0]
});

const mapDispatchToProps = {
    newGate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(WorkbenchPane);