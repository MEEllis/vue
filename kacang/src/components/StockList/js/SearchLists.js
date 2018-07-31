import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { RangePicker } from 'react-component-date';
import '../../StockList/less/stockList.less';

const FormItem = Form.Item;

class SearchLists extends React.PureComponent {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
    }).isRequired
  };

  static defaultProps = {
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  getDate = (date) => {
    if (date) return date.format('YYYY-MM-DD HH:mm:ss');
  }

  handleSubmit = () => {
    const { props } = this;
    this.props.form.validateFields((err, value) => {
      value.BeginTime = value.Time[0] ? this.getDate(value.Time[0]) : '';
      value.EndTime = value.Time[0] ? this.getDate(value.Time[1]) : '';
      props.change(value);
    });
  }

  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const searchLists = [
      <Col span={8} key={1}>
        <FormItem
          {...formItemLayout}
          label={'库存编号'}
        >
          {getFieldDecorator('Id')(
            <Input type="text" />
          )}
        </FormItem>
      </Col>,
      <Col span={8} key={2}>
        <FormItem
          {...formItemLayout}
          label={'库存名称'}
        >
          {getFieldDecorator('Name')(
            <Input />
          )}
        </FormItem>
      </Col>,
      <Col span={8} key={3}>
        <FormItem
          {...formItemLayout}
          label={'库存面值'}
        >
          {getFieldDecorator('FaceValue')(
            <Input />
          )}
        </FormItem>
      </Col>,
      <Col span={8} key={4}>
        <FormItem
          {...formItemLayout}
          label={'库存状态'}
        >
          {getFieldDecorator('StockStatus', {
            initialValue: ''
          })(
            <Select size="default" allowClear>
              <Select.Option value="" key="0">全部</Select.Option>
              <Select.Option value="1" key="1">断货</Select.Option>
              <Select.Option value="2" key="2">报警</Select.Option>
              <Select.Option value="3" key="3">充足</Select.Option>
            </Select>
            )}
        </FormItem>
      </Col>,
      <Col span={8} key={5}>
        <FormItem
          {...formItemLayout}
          label={'库存类型'}
        >
          {getFieldDecorator('StockType', {
            initialValue: ''
          })(
            <Select size="default" allowClear>
              <Select.Option value="" key="0">全部</Select.Option>
              <Select.Option value="1" key="2">卡密</Select.Option>
              <Select.Option value="2" key="3">在线</Select.Option>
            </Select>
            )}
        </FormItem>
      </Col>,
      <Col span={8} key={6}>
        <FormItem
          {...formItemLayout}
          label={'添加时间'}
        >
          {getFieldDecorator('Time', {
            initialValue: []
          })(
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
            />
            )}
        </FormItem>
      </Col>,
    ];
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
        <Row gutter={40}>
          {searchLists}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={() => { this.handleSubmit(); }}>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={() => { this.props.form.resetFields(); }}>
                重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchLists);
