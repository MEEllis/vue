import React, { PropTypes } from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;

const SelectListTpl = props => {
    const { item2 } = props;
    return (
        <div className='a'>
            {item2 && item2.Items.length > 0 &&
                item2.Items.map((item, i) => {
                    <div key={i}>aaa</div>
                })
            }
        </div>
    );
};

SelectListTpl.propTypes = {
    item2: PropTypes.object
};

export default SelectListTpl;