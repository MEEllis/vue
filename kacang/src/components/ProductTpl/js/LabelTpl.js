import React, { PropTypes } from 'react';

const LabelTpl = props => {
    return (
        <div className='label'>
            {props.name}
        </div>
    );
};

LabelTpl.propTypes = {
    name: PropTypes.string.isRequired
};

export default LabelTpl;