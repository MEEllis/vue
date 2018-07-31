import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Col, Row, Button, Icon } from 'antd';
import { RangePicker } from 'react-component-date';
import Search from '../../config/search';
import './less/searchForm.less';

const FormItem = Form.Item;

class SearchForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    init: PropTypes.func,
    isShowMore: PropTypes.bool,
    showCount: PropTypes.number
  }

  static defaultProps = {
    init: () => { },
    isShowMore: false,
    showCount: 6
  }
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  componentDidMount() {
    this.props.init(this.props.form.getFieldsValue());
  }


  getSearchComponent = (item) => {
    if (item.type === 0) {
      return <Input />;
    } else if (item.type === 1) {
      return (<Select allowClear>
        {item.items && item.items.map((opt) =>
          (<Select.Option value={opt.value} key={opt.value}>{opt.name}</Select.Option>))}
      </Select>);
    } else if (item.type === 2) {
      return (<RangePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
      />);
    }
  }

  getSearchArea = () => {
    const children = [];

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    Search[this.props.name].forEach(item => {
      children.push(
        <Col span={8} key={item.id}>
          <FormItem
            {...formItemLayout}
            label={item.name}
          >
            {getFieldDecorator(item.id, {
              initialValue: item.defaultValue
            })(this.getSearchComponent(item))}
          </FormItem>
        </Col>);
    });
    return children;
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  search = () => {
    this.props.form.validateFields((err, values) => {
      this.props.search(err, values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { isShowMore, showCount } = this.props;
    const children = this.getSearchArea();
    const expand = this.state.expand;
    const shownCount = isShowMore ? (expand ? children.length : showCount) : children.length; // eslint-disable-line no-nested-ternary, max-len
    return (
      <div className="searchdiv">
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={40}>
            {children.slice(0, shownCount)}
            {shownCount % 3 !== 0 && <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
              {isShowMore &&
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  {expand ? '收起' : ''}更多条件 <Icon type={expand ? 'up' : 'down'} />
                </a>
              }
            </Col>
            }
          </Row>
          {shownCount % 3 === 0 && <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
              {isShowMore &&
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  {expand ? '收起' : ''}更多条件 <Icon type={expand ? 'up' : 'down'} />
                </a>
              }
            </Col>
          </Row>}
        </Form>
      </div>
    );
  }
}


export default Form.create({
  onFieldsChange(props, changedFields) {
    if (props.onChange) props.onChange(changedFields);
  }
})(SearchForm);
