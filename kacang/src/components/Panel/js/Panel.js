import React from 'react';
import '../less/panel';

const Panel = (props) => (
    <div className={ props.className ? 'panel ' + props.className : 'panel panel-default' }>
        <div className="panel-hd">
            <h3 className="panel-title">{ props.title }</h3>
            { props.extra }
        </div>
        <div className="panel-bd">
            { props.children }
        </div>
    </div>
);

export default Panel;
