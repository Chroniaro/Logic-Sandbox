import {connect} from "react-redux";
import BrowserPane from "./subcomponents/BrowserPane";
import {newSpecification} from "./interface";
import {State} from "../app/reducer";
import {specificationsSelector} from "./interface";

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