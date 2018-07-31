import React from 'react';
import '../less/placeholder';

const Placeholder = (props) => (
    <div className={ props.className ? 'placeholder ' + props.className : 'placeholder placeholder-default' }>
        <div className="placeholder-inner">
            <icon className="icon" />
            <h3>{props.title}</h3>
            { props.description }
            { props.more }
        </div>
    </div>
);

export default Placeholder;
