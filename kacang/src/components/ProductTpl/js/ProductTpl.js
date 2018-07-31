import React, { Component } from 'react';
import _ from 'lodash';
import SelectTpl from './SelectTpl';
import LabelTpl from './LabelTpl';
import SelectListTpl from './SelectListTpl';
import { Input, Select } from 'antd';
import '../less/productTpl.less'
const Option = Select.Option;

class ProductTpl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            ChargeRegion: 0 + '',
            ChargeServer: 0 + '',
            ChargeType: 0 + '',
            TopupAccount: '',
            TopupCount: 0,
        };
    }


    componentWillMount() {
        const { getProductTplResult, tplId } = this.props;
        if (tplId) {
            this.props.getProductTpl({Id:tplId});
        }

        if (getProductTplResult && getProductTplResult.m_Item1) {
            this.initValue(getProductTplResult);
        }
    }
    initValue = (getProductTplResult) => {
        const { Items } = getProductTplResult.m_Item1;
        let isChangeed = false;
        for (let i = 0; i < Items.length; i++) {
            const item = Items[i];
            if (item.TagName === 'TopupCount' && item.ItemValues && item.ItemValues.length > 0) {
                isChangeed = true;
                this.setState({ TopupCount: item.ItemValues[0].DisplayValue }, () => {
                    this.valueChange()
                });
            }
        }
        if (!isChangeed) {
            this.valueChange();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { getProductTplResult, tplId } = nextProps;
        if (getProductTplResult !== this.props.getProductTplResult) {

            this.initValue(getProductTplResult);
        }
        if (tplId !== this.props.tplId && tplId) {
            this.props.getProductTpl({Id:tplId});
        }
    }
    onSelectChange = (id) => {
        this.setState({ selectedIndex: id, ChargeRegion: '0', ChargeServer: '0', ChargeType: '0' }, () => {
            this.valueChange()
        });
    }

    valueChange = () => {
      if(!this.props.getProductTplResult) return;
        let res = {
            TopupAccount: this.state.TopupAccount,
            TopupCount: this.state.TopupCount,
        };
        if (this.props.getProductTplResult.m_Item2 && this.props.getProductTplResult.m_Item2.length > this.state.selectedIndex) {
            const item2 = this.props.getProductTplResult.m_Item2[this.state.selectedIndex];
            res.TopupContent = {
                ChargeGame: item2.TemplateName,
            };
            item2.Items.map(item => {
                if (item.Title === '区' && item.ItemValues.length > this.state.ChargeRegion) {
                    res.TopupContent.ChargeRegion = item.ItemValues[this.state.ChargeRegion].DisplayValue;
                }
                else if (item.Title === '服' && item.ItemValues.length > this.state.ChargeServer) {
                    res.TopupContent.ChargeServer = item.ItemValues[this.state.ChargeServer].DisplayValue;
                }
                else if (item.Title === '充值类型' && item.ItemValues.length > this.state.ChargeType) {
                    res.TopupContent.ChargeType = item.ItemValues[this.state.ChargeType].DisplayValue;
                }
            });
        }
        if (this.props.valueChange)
            this.props.valueChange(res);
    }
    setChildSelectValue = (item, val) => {
        let obj = {};
        if (item.Title === '区') {
            obj = { ChargeRegion: val };
        }
        else if (item.Title === '服') {
            obj = { ChargeServer: val };
        }
        else if (item.Title === '充值类型') {
            obj = { ChargeType: val };
        }

        return obj;
    }
    onChildSelectChange = (val, item) => {
        const item2 = this.props.getProductTplResult.m_Item2[this.state.selectedIndex];
        let index = _.findIndex(item2.Items, { Title: item.Title });
        let obj = {};
        obj = { ...this.setChildSelectValue(item, val) }

        for (let i = index + 1; i < item2.Items.length; i++) {
            obj = { ...obj, ...this.setChildSelectValue(item2.Items[i], '0') }
        }
        // if (item.Title === '区') {
        //     obj = { ChargeRegion: val, ChargeServer: '0', ChargeType: '0' };
        // }
        // else if (item.Title === '服') {
        //     obj = { ChargeServer: val, ChargeType: '0' };
        // }
        // else if (item.Title === '充值类型') {
        //     obj = { ChargeType: val };
        // }
        this.setState(obj, () => {
            this.valueChange()
        });
    }
    onCountChange = (tagName, val) => {
        let obj = {};
        if (tagName === 'TopupCount')
            obj = { [tagName]: val };
        else
            obj = { [tagName]: val.target.value };
        this.setState(obj, () => {
            this.valueChange()
        });
    }
    getChildSelectValue = (item) => {
        if (item.Title === '区')
            return this.state.ChargeRegion;
        else if (item.Title === '服')
            return this.state.ChargeServer;
        else if (item.Title === '充值类型')
            return this.state.ChargeType;
    }

    getChildItems = (childItem) => {
        if (childItem.DependencyItemId === '00000000-0000-0000-0000-000000000000')
            return _.takeWhile(childItem.ItemValues, { ParentValueId: '00000000-0000-0000-0000-000000000000' });
        const item = _.find(this.props.getProductTplResult.m_Item2[this.state.selectedIndex].Items, { 'Id': childItem.DependencyItemId });
        if (!item || !item.ItemValues || item.ItemValues <= 0) return [];
        let id;
        if (item.Title === '区') {
            id = item.ItemValues[this.state.ChargeRegion].Id;
        }
        else if (item.Title === '服') {
            id = item.ItemValues[this.state.ChargeServer].Id;
        }
        else if (item.Title === '充值类型') {
            id = item.ItemValues[this.state.ChargeType].Id;
        }
        const arr = [];
        childItem.ItemValues.map(val => {
            if (val.ParentValueId === id) {
                arr.push(val)
            }
        });
        return arr;
    }

    getSelect(item, item2) {
        if (item.Title === '游戏区服') {
            if (item2 && item2.length > 0) {
                return (<div>
                    <Select defaultValue={item2[this.state.selectedIndex].TemplateName} onSelect={this.onSelectChange}
                    >
                        {item2.map((it, i) =>
                            <Select.Option key={i}>{it.TemplateName}</Select.Option>)}
                    </Select>
                    {item2[this.state.selectedIndex] && item2[this.state.selectedIndex].Items.length > 0 &&
                        item2[this.state.selectedIndex].Items.map((childItem, i) =>
                            <div className='childItem' key={i}>
                                {(this.getChildItems(childItem) && this.getChildItems(childItem).length > 0) &&
                                    <Select key={i} defaultValue={0 + ''} value={this.getChildSelectValue(childItem)}
                                        onSelect={(val) => this.onChildSelectChange(val, childItem)}
                                    >
                                        {this.getChildItems(childItem) && this.getChildItems(childItem).map((val, j) =>
                                            <Select.Option key={j + ''} value={j + ''}>{val.DisplayValue}</Select.Option>
                                        )}
                                    </Select>
                                }
                            </div>
                        )
                    }
                </div>);
            } else {
                return <Select></Select>;
            }
        } else {
            return (<div className='count'>
                {item.ItemValues && item.ItemValues.length > 0 &&
                    <Select value={this.state[item.TagName]} onChange={val => this.onCountChange(item.TagName, val)}>
                        {item.ItemValues.map(value =>
                            <Select.Option key={value.DisplayValue}>{value.DisplayValue}</Select.Option>)}
                    </Select>
                }
                {!item.ItemValues || item.ItemValues.length === 0 &&
                    <Select></Select>
                }
                {item.Rate &&
                    <div>
                        <span>{item.Rate.FromCurrencyName}</span>
                        <span>{item.ItemValues[0].DisplayValue * item.Rate.Rate}</span>
                        <span>{item.Rate.ToCurrencyName}</span>
                    </div>
                }
            </div>);
        }
    }

    render() {
        const { getProductTplResult } = this.props;

        if (!getProductTplResult) return <div />;
        const { m_Item1, m_Item2: item2 } = getProductTplResult;
        if (!m_Item1 || !m_Item1.Items) return <div />;
        const doms = [];
        m_Item1.Items.map(((item, index) => {
            if (item.Type === 1) {
                doms.push(
                    <div key={index} className='item'>
                        <LabelTpl name={item.LabelName} /> <Input onChange={val => this.onCountChange(item.TagName, val)} />
                    </div>
                );
            } else if (item.Type === 2) {
                doms.push(
                    <div key={index} className='item'>
                        <LabelTpl name={item.LabelName} /> <Input type='password' onChange={val => this.onCountChange(item.TagName, val)} />
                    </div>
                );
            } else if (item.Type === 3) {
                doms.push(
                    <div key={index} className='item'>
                        <LabelTpl name={item.LabelName} />
                        {this.getSelect(item, item2)}
                    </div>
                );
            }
        }));
        return <div className='productTpl'>{doms}</div>;
    }
}

export default ProductTpl;
