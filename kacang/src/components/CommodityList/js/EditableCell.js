
import React from 'react'
import PropTypes from 'prop-types';
import {
  Input,
  Icon,
  Tooltip,
  message
} from 'antd';
import { A } from '../../Auth/js/Auth';
import Icons, * as icons from '../../Icon/js/Icon';

class EditableCell extends React.Component {
  static propTypes = {
    isProductPrice: PropTypes.bool,
    isProductName: PropTypes.bool,
    updateProductName: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  state = {
    value: this.props.value,
    editable: false
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    // 如果是修改商品名称
    if (this.props.isProductName) {
      if (this.state.value === '') {
        message.error('请输入商品名称');
        return;
      }
      this.props.updateProductName({ Id: this.props.Id, Name: this.state.value });
    }
    // 如果是修改商品价格
    if (this.props.isProductPrice) {
      if (this.state.value === '') {
        message.error('请输入销售价');
        return;
      }
      const reg = /^\d+(?=\.{0,1}\d+$|$)/;
      if (!reg.test(this.state.value)) {
        message.error('销售价只能输入数字，请输入正确的销售价');
        return;
      }
      this.props.updateProductPrice({ Id: this.props.Id, Price: this.state.value });
    }
    this.setState({ editable: false });
  }
  cancel = () => {
    this.setState({ editable: false });
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable
          ? <div className="editable-cell-input-wrapper">
            <Input value={value} onChange={this.handleChange} onPressEnter={this.check} />
            <Tooltip title="取消" >
              <Icon type="close" className="editable-cell-icon-check editable-cell-icon-cancel" onClick={this.cancel} />
            </Tooltip >
            <Tooltip title="确定" >
              <Icon type="check" className="editable-cell-icon-check" onClick={this.check} />
            </Tooltip >
          </div>
          : <div className="editable-cell-text-wrapper">
            {value || ' '}
            <A
              className="editable-cell-icon"
              auth="commodityAddOrEdit"
              onClick={this.edit}
              authOpts={{
                hint: this.props.isProductPrice ? '编辑商品售价' : '编辑商品名称'
              }}
            >
              <Icons glyph={icons.iEdit} />
            </A>
          </div>
        }
      </div>
    );
  }
}

export default EditableCell;
