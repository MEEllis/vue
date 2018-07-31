import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'antd';
import '../../CardType/less/cardType.less';
import '../../StockList/less/stockList.less';

const createForm = Form.create;

class EditableCell extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  };
  static defaultProps = {
    getWithDrawAmountResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: false,
    };
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    const { props } = this;
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    const postData = {
      Priority: this.state.value,
      RelationStockId: props.currentData.relationStockId,
      Id: props.currentData.packageId,
    };
    this.props.update(postData);
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          }
      </div>
    );
  }
}

export default createForm()(EditableCell);
