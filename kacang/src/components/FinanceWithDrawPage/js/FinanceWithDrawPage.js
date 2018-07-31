import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Col, Row, Select, Spin } from 'antd';
import { RangePicker } from 'react-component-date';
import '../less/FinanceWithDrawPage.less';
import FL from '../../../utils/FL';
import { Button } from '../../Auth/js/Auth';
import { dateFormat } from '../../../utils';
import WithDraw from '../../../containers/WithDraw';  // 申请提现

const createForm = Form.create;
const FormItem = Form.Item;

class FinanceWithDrawPage extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    isfetching: PropTypes.bool,
    getWithDrawPage: PropTypes.func.isRequired,
    getWithDrawAmount: PropTypes.func.isRequired,
    getWithDrawAmountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };
  static defaultProps = {
    isfetching: true,
    getWithDrawAmountResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      dealStatus: '',
      listForm: FL.LINK.FINANCEREMITTANCE,
      searchList: FL.LINK.Financeremittanceterm,
      pageIndex: 1,
      pageSize: 15,
      WithDrawPagepostData: {
        PageNumber: 1,
        PageSize: 10,
        Status: '',
        BeginTime: '',
        EndTime: '',
      },
      WithDrawModal: false,
      current: 1,
      ammount: 0,
    };
  }
  componentWillMount() {
    this.props.getWithDrawPage(this.state.WithDrawPagepostData);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { getWithDrawAmountResult } = nextProps;
    if (getWithDrawAmountResult !== props.getWithDrawAmountResult &&
      getWithDrawAmountResult.Status === 200) {
      this.setState({
        ammount: getWithDrawAmountResult.Data.Amount
      });
    }
  }
  getWithDrawPage = () => {
    this.props.getWithDrawPage(this.state.WithDrawPagepostData);
  }
  handleSubmit = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      const { WithDrawPagepostData } = this.state;
      WithDrawPagepostData.PageNumber = 1;
      const postData = {
        PageNumber: 1,
        PageSize: 10,
        Status: value.Status,
        BeginTime: value.exchangeTime ? value.exchangeTime[0] : '',
        EndTime: value.exchangeTime ? value.exchangeTime[1] : '',
      };
      Object.assign(WithDrawPagepostData, postData);
      this.setState({
        WithDrawPagepostData
      }, () => {
        props.getWithDrawPage(postData);
      });
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  // 申请提现
  ApplyWithDraw = () => {
    this.props.getWithDrawAmount();
    this.setState({ WithDrawModal: true });
  }
  hideApplyWithDraw = () => { this.setState({ WithDrawModal: false }); }

  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const { WithDrawPagepostData } = this.state;
    let dataSource = '';
    let Total = '';
    if (props.getWithDrawPageResult) {
      dataSource = props.getWithDrawPageResult.Data;
      Total = props.getWithDrawPageResult.Total;
    }
    const pagination = {
      total: Total,
      showSizeChanger: true,
      current: this.state.WithDrawPagepostData.PageNumber,
      onShowSizeChange: (current, pageSize) => {
        WithDrawPagepostData.PageNumber = current;
        WithDrawPagepostData.PageSize = pageSize;
        this.setState({
          WithDrawPagepostData
        }, () => {
          props.getWithDrawPage(WithDrawPagepostData);
        });
      },
      onChange: (current, pageSize) => {
        WithDrawPagepostData.PageNumber = current;
        WithDrawPagepostData.PageSize = pageSize;
        this.setState({
          WithDrawPagepostData
        }, () => {
          props.getWithDrawPage(WithDrawPagepostData);
        });
      },
    };

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const columns = [
      {
        title: '提现金额',
        dataIndex: 'Amount'
      }, {
        title: '提现手续费',
        dataIndex: 'Fee',
        width: 200
      }, {
        title: '提现方式',
        dataIndex: 'WType'
      }, {
        title: '开户行名称',
        dataIndex: 'BankName'
      }, {
        title: '收款人姓名',
        dataIndex: 'NickName'
      }, {
        title: '收款账号',
        dataIndex: 'Account'
      }, {
        title: '申请时间',
        dataIndex: 'ApplyTime',
        render: (text) => (dateFormat(text))
      }, {
        title: '状态',
        dataIndex: 'Status',
        render: (Status) => {
          switch (Status) {
            case 0: return '未处理';
            case 1: return '成功';
            case 2: return '失败';
            default: return '...';
          }
        }
      }
    ];

    const { WithDrawData, WithDrawModal, ammount } = this.state;
    return (
      <div key="form">
        {WithDrawModal &&
          <WithDraw
            ammount={ammount}
            withDraw={WithDrawData}
            getWithDrawPage={() => this.getWithDrawPage()}
            hideApplyWithDraw={() => this.hideApplyWithDraw()}
          />
        }
        <Spin spinning={this.props.isfetching}>
          <div>
            <Form
              className="ant-advanced-search-form"
              style={{ marginBottom: 15 }}
              onSubmit={this.handleSearch}
            >
              <Row gutter={40}>
                <Col span={6} key={1}>
                  <FormItem
                    {...formItemLayout}
                    label={'库存状态'}
                  >
                    {getFieldDecorator('Status')(
                      <Select size="default" allowClear>
                        <Select.Option value="" key="0">全部</Select.Option>
                        <Select.Option value="1" key="1">处理中</Select.Option>
                        <Select.Option value="2" key="2">提现成功</Select.Option>
                        <Select.Option value="3" key="3">提现失败</Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={2} >
                  <FormItem
                    {...formItemLayout}
                    label={'申请时间'}
                  >
                    {getFieldDecorator('exchangeTime')(
                      <RangePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6} style={{ width: '25%' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: '10%', width: 80 }}
                    onClick={this.handleSubmit}
                  >
                    搜索
                  </Button>
                  <Button style={{ marginLeft: '10%', width: 80 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Col>
                <Col span={4} key={3} >
                  <div className="text-right mb10">
                    <Button
                      auth="applyForWithdrawal"
                      type="primary"
                      authOpts={{ hint: '申请提现' }}
                      style={{ width: 120 }}
                      onClick={() => { this.ApplyWithDraw(); }}
                    >
                      申请提现
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <Table rowKey="Id" columns={columns} dataSource={dataSource || []} pagination={pagination} />
        </Spin>
      </div>
    );
  }
}

export default createForm()(FinanceWithDrawPage);
