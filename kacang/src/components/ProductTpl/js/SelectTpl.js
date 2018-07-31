import React, { PropTypes } from 'react';
import LabelTpl from './LabelTpl';
import { Input, Select } from 'antd';
const Option = Select.Option;

const SelectTpl = props => {
    const { item, item2 } = props;
    if (!item) return <div />;
    if (item.Type === 1) {
        return (
            <div>
                <LabelTpl name={item.LabelName} /> <Input />
            </div>
        );
    } else if (item.Type === 2) {
        return (
            <div>
                <LabelTpl name={item.LabelName} /> <Input type='password' />
            </div>
        );
    } else if (item.Type === 3) {
        return (
            <div>
                <LabelTpl name={item.LabelName} />
                {item.Title === '游戏区服' &&
                    <div>
                        <Select defaultValue={item2[0].TemplateName}>
                            {item2.map((it, i) =>
                                <Option key={i}>{it.TemplateName}</Option>)}
                        </Select>
                        <div id="selectThee">
                        </div>
                    </div>
                }
                {item.Title !== '游戏区服' &&
                    <div>
                        <Select defaultValue={item.ItemValues[0].DisplayValue}>
                            {item.ItemValues.map(value =>
                                <Option key={value.DisplayValue}>{value.DisplayValue}</Option>)}
                        </Select>
                        {item.Rate &&
                            <div>
                                <span>{item.Rate.FromCurrencyName}</span>
                                <span>{item.ItemValues[0].DisplayValue * item.Rate.Rate}</span>
                                <span>{item.Rate.ToCurrencyName}</span>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
    return (<div></div>);
};

SelectTpl.propTypes = {
    item: PropTypes.object.isRequired,
    item2: PropTypes.array,
};

export default SelectTpl;
