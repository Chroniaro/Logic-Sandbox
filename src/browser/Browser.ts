import {connect} from "react-redux";
import BrowserPane from "./subcomponents/BrowserPane";
import {newSpecification, specificationsSelector} from "./interface";
import {State} from "../app/reducer";

const mapStateToProps = (state: State) => ({
    specifications: specificationsSelector(state)
});

const mapDispatchToProps = {
    newSpecification
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(BrowserPane);