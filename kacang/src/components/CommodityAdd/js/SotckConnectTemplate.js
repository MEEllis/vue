import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Modal,
  Checkbox,
  Table,
  message,
  Spin
} from 'antd'

import '../less/commodityAdd';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

class SotckConnectTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockConnectTemplateVisible: this.props.stockConnectTemplateVisible,
      FaceValue: this.props.FaceValue,
      ProductType: this.props.ProductType,
      pageSize: 5,
      pageNumber: 1,
      connectStockTemplateRow: [],
      clickOk: [],
      // 库存名称
      Name: '',
      // 库存Id
      Id: ''
    }
  }
  componentWillMount = () => {
    this.props.getDockStockList({ productFaceValue: this.state.FaceValue, producttype: this.state.ProductType, pageSize: this.state.pageSize, PageNumber: this.state.pageNumber });
  }
  // 确定
  okClick = () => {

    if (this.state.connectStockTemplateRow.length > 0) {
      this.props.getStockConnectInfo(this.state.connectStockTemplateRow);
      this.hideModal();
    } else {
      message.error('请选择库存');
    }
    // 将
  }
  // 隐藏关联库存
  hideModal = () => {
    this.props.hideStockConnectTemplate();
  }
  // 搜索
  searchStockConnect = () => {
    this.props.form.validateFields((err, value) => {
      const { props } = this;
      this.setState({ Name: value.Name, Id: value.Id });

      this.props.getDockStockList({
        ProductFaceValue: this.state.FaceValue,
        ProductType: this.state.ProductType,
        pageSize: this.state.pageSize,
        PageNumber: this.state.pageNumber,
        Name: value.Name,
        Id: value.Id
      });
    })
  }
  render() {
    const { props } = this;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      }
    };
    const { getFieldDecorator } = props.form;
    const columns = [
      {
        title: '库存ID',
        dataIndex: 'Id'
      }, {
        title: '库存名称',
        dataIndex: 'Name'
      }, {
        title: '库存值',
        dataIndex: 'FaceValue',
        render: (text, record) => {
          if (record.Nature === 2) {
            return '组合面值';
          }
          return text;
        }
      }
    ];
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ connectStockTemplateRow: selectedRows });
      }
    };
    const { Data, TotalRecords } = this.props.getDockStockListResult;
    //分页
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      pageSize: this.state.pageSize,
      pageSizeOptions: [
        '3', '5'
      ],
      onShowSizeChange: (current, pageSize) => {
        this.setState({ pageNumber: current, pageSize });
        this.props.getDockStockList({
          ProductFaceValue: this.state.FaceValue,
          ProductType: this.state.ProductType,
          pageSize: pageSize,
          PageNumber: current,
          Name: this.state.Name,
          Id: this.state.Id
        });
      },
      onChange: (current, pageSize) => {
        this.setState({ pageNumber: current, pageSize })
        this.props.getDockStockList({
          ProductFaceValue: this.state.FaceValue,
          ProductType: this.state.ProductType,
          pageSize: pageSize,
          PageNumber: current,
          Name: this.state.Name,
          Id: this.state.Id
        });
      }
    };
    return (
      <Modal title="已有库存" width={900} visible={true} onOk={this.okClick} onCancel={this.hideModal}>
        <Spin spinning={this.props.isfetching}>
          <Form>
            <Row gutter={40}>
              <Col span={8}>
                <FormItem {...formItemLayout} label='库存名称'>
                  {getFieldDecorator('Name', { initialValue: '' })(<Input type='text' size='default' />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='库存ID'>
                  {getFieldDecorator('Id', { initialValue: '' })(<Input type='text' size='default' />)}
                </FormItem>
              </Col>
              <Col span={8} style={{
                textAlign: 'left'
              }}>
                <Button type="primary" htmlType="submit" onClick={this.searchStockConnect}>搜索</Button>
              </Col>
            </Row>

            <FormItem style={{
              marginTop: 10
            }}>
              <Table columns={columns} rowKey="Id" dataSource={Data} rowSelection={rowSelection} pagination={pagination} />
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    )
  }
}
export default createForm()(SotckConnectTemplate);
