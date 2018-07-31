
import React from 'react'
import PropTypes from 'prop-types';
import {
  Input,
  Icon,
  Tooltip,
  message
} from 'antd';
import Icons, * as icons from '../../Icon/js/Icon';

class EditableCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    cancelEditGroupName: PropTypes.func.isRequired,
    setSecretGroup: PropTypes.func.isRequired,
    editGroupName: PropTypes.func.isRequired,
    item: PropTypes.shape({
      GroupName: PropTypes.string.isRequired
    }),
    value: PropTypes.string.isRequired
  }
  state = {
    item: this.props.item,
    editable: false,
    value: this.props.value
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.item !== nextProps.item) {
      this.setState({
        item: nextProps.item
      });
    }
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = (e) => {
    e.stopPropagation();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    // 如果是修改商品名称
    if (this.state.value === '') {
      message.error('请输入密价组名称');
      return;
    }
    const { value, item } = this.state;
    item.GroupName = value;
    this.setState({ editable: false, item });
    this.props.setSecretGroup(item);
  }
  cancel = (e) => {
    e.stopPropagation();
    this.setState({ editable: false });
    this.props.cancelEditGroupName();
  }
  edit = (e) => {
    e.stopPropagation();
    this.setState({ editable: true });
    this.props.editGroupName();
  }
  stopPropagation = (e) => {
    e.stopPropagation();
  }
  render() {
    const { item, editable, value } = this.state;
    return (
      <div className="editable-cell">
        {editable
          ? <div className="editable-cell-input-wrapper">
            <Input maxLength="20" value={value} onClick={this.stopPropagation} onChange={this.handleChange} onPressEnter={(event) => { this.check(event); }} />
            <Tooltip title="确定" >
              <a
                className="editable-cell-icon-check"
                onClick={(event) => { this.check(event, item); }}
              >
                <Icons glyph={icons.gou} /></a>
            </Tooltip >
            <Tooltip title="取消" >
              <a
                className="editable-cell-icon-check editable-cell-icon-cancel"
                onClick={this.cancel}
              >
                <Icons glyph={icons.sanchu} /></a>
            </Tooltip >
          </div>
          : <div className="editable-cell-text-wrapper">
            <Tooltip title="修改" >
              <span onClick={this.edit}>
                <Icons glyph={icons.iEdit}></Icons>
              </span>
            </Tooltip >
          </div>
        }
      </div>
    );
  }
}

export default EditableCell;
