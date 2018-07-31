
import React from 'react';

import '../less/alinkComponent.less';

const AlinkComponent = React.createClass({
    clickEvent(){
        let newState = this.props.showClass;
        let listChildren = this.props.listChildren||[]
        this.props.callbackAlink(newState,listChildren);
    },
    render(){
        let showClass = this.props.showClass;
        let selectState = this.props.selectState;
        return (
            <a href="javascript:;" className = {showClass == selectState?'active':''} onClick={this.clickEvent}>
                {this.props.text}
            </a>
        )
    }
})
export default AlinkComponent;
