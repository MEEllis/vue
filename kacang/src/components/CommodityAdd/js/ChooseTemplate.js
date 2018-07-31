import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Radio,
  DatePicker,
  Modal,
  Cascader,
  Checkbox,
  Table,
  Steps,
  message,
  InputNumber,
  Spin
} from 'antd';
import Filter, { FilterItem } from '../../Filter/js/Filter';
import Icon from '../../Icon/js/Icon';
import * as icons from '../../Icon/js/Icon';
import ProductTpl from '../../../containers/ProductTpl'
import '../less/commodityAdd'
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

class ChooseTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ChooseTemplateVisible: this.props.ChooseTemplate,
      // FaceValue: this.props.FaceValue,
      // ProductType: this.props.ProductType,
      pageSize: 5,
      pageNumber: 1,
      ChooseTemplateRow: [],
      // clickOk: []
      // 模板预览框
      lookTemplateDetail: false,
      TemplateName: '',
      BusinessName: ''
    }
  }
  componentWillMount = () => {
    // 分页查询模板
    this.props.getTemplateList({ PageNumber: this.state.pageNumber, PageSize: this.state.pageSize, TemplateName: '', BusinessName: '' });
  }
  // 确定
  okClick = () => {

    if (this.state.ChooseTemplateRow.length > 0) {
      this.props.getChooseTemplateInfo(this.state.ChooseTemplateRow);
      this.hideModal();
    } else {
      message.error('请选择模板');
    }
  }
  // 隐藏关联库存
  hideModal = () => {
    this.props.hideChooseTemplate();
  }
  // 预览模板
  lookTemplateDetail = (record) => {
    this.setState({ lookTemplateDetail: true });
    this.setState({ lookTemplateId: record.Id });
  }
  // 隐藏预览模板
  hideTemplateDetail = () => {
    this.setState({ lookTemplateDetail: false });
  }
  // 搜索模板
  searchTemplate = () => {
    this.props.form.validateFields((err, value) => {
      const { props } = this;
      this.setState({ TemplateName: value.TemplateName, BusinessName: value.BusinessName });

      // 分页查询模板
      this.props.getTemplateList({ PageNumber: this.state.pageNumber, PageSize: this.state.pageSize, TemplateName: value.TemplateName, BusinessName: value.BusinessName });
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
        title: '模板名称',
        dataIndex: 'Name'
      }, {
        title: '运营商',
        dataIndex: 'BusinessName'
      }, {
        title: '模板描述',
        dataIndex: 'Remark'
      }, {
        title: '模板预览',
        dataIndex: 'templateLook',
        render: (text, record) => <div>
          <span onClick={() => this.lookTemplateDetail(record)} style={{
            marginRight: 5
          }}>
            <a>
              <Icon glyph={icons.chakan} />
            </a>
          </span>
        </div>
      }
    ];
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ ChooseTemplateRow: selectedRows });
      }
    };
    const { dataSource, TotalRecords } = this.props.getTemplateListResult;
    //分页
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      pageSize: this.state.pageSize,
      pageSizeOptions: [
        '3', '5'
      ],
      onShowSizeChange: (current, pageSize) => {
        this.setState({ pageSize: pageSize, pageNumber: current })
        props.getTemplateList({
          pageNumber: current, // 传递给后端
          pageSize: pageSize, // 传递给后端
          templateName: this.state.TemplateName, // 模板名
          businessName: this.state.BusinessName, // 运营商
        })
      },
      onChange: (current, pageSize) => {
        this.setState({ pageSize: pageSize, pageNumber: current })
        props.getTemplateList({
          pageNumber: current, // 传递给后端
          pageSize: this.state.pageSize, // 传递给后端
          templateName: this.state.TemplateName, // 模板名
          businessName: this.state.BusinessName, // 运营商
        })
      }
    };

    return (
      <div>
        <Modal title="选择模板" width={900} visible={true} onOk={this.okClick} onCancel={this.hideModal}>
          <Spin spinning={this.props.isfetching}>
            <Form>
              <Row gutter={40}>
                <Col span={8}>
                  <FormItem {...formItemLayout} label='运营商'>
                    {getFieldDecorator('BusinessName', { initialValue: '' })(<Input type='text' size='default' />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label='模板名称'>
                    {getFieldDecorator('TemplateName', { initialValue: '' })(<Input type='text' size='default' />)}
                  </FormItem>
                </Col>
                <Col span={8} style={{
                  textAlign: 'left'
                }}>
                  <Button type="primary" htmlType="submit" onClick={this.searchTemplate}>搜索</Button>
                </Col>
              </Row>

              <FormItem style={{
                marginTop: 10
              }}>
                <Table columns={columns} rowKey="Id" dataSource={dataSource} rowSelection={rowSelection} pagination={pagination} />
              </FormItem>
            </Form>
          </Spin>

        </Modal>
        <Modal title="模板预览" width={600} footer={null} visible={this.state.lookTemplateDetail} onOk={this.btnOk} onCancel={this.hideTemplateDetail}>
          <ProductTpl tplId={this.state.lookTemplateId} />
          <div className='btnTemplateDetail'>
            <Button type="primary" onClick={this.hideTemplateDetail}>关闭预览</Button>
          </div>

        </Modal>
      </div>

    )
  }
}
export default createForm()(ChooseTemplate);
