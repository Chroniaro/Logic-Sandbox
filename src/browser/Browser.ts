import {connect} from "react-redux";
import BrowserPane from "./subcomponents/BrowserPane";
import {newGate} from "./interface";
import {State} from "../app/reducer";
import {gatesSelector} from "./interface";

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
(BrowserPane);