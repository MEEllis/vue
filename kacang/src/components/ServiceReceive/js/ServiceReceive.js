import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Table, Col, Row, Tabs, Spin, Button, Tooltip } from 'antd';
import { A, Link } from '../../Auth/js/Auth';
import FL from '../../../utils/FL';
import Icon, { iView, chuli } from '../../Icon/js/Icon';
import ShowDetailComponent from '../../../containers/ShowDetailComponent';
import '../less/ServiceReceive.less';

const TabPane = Tabs.TabPane;

const createForm = Form.create;
const FormItem = Form.Item;


class ServiceReceive extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    receiveComplaint: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    data: PropTypes.object
  };

  static defaultProps = {
    isfetching: false,
    data: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      PostData: {
        PageNumber: 1,
        PageSize: FL.PAGESIZE,
        Status: '1',
        OrderNo: ''
      },
    };
  }
  componentWillMount() {
    const { props } = this;
    props.receiveComplaint(this.state.PostData);
  }
  handleSubmit() {
    const { props } = this;
    this.props.form.validateFields((err, value) => {
      const { PostData } = this.state;
      PostData.PageNumber = 1;
      Object.assign(PostData, value);
      this.setState({
        PostData
      }, () => {
        props.receiveComplaint(PostData);
      });
    });
  }
  handleDetailClick = (item) => {
    this.setState({ isShowDetail: true, currentOrder: item });
  }
  handleHideDetailClick = () => {
    this.setState({ isShowDetail: false });
  }
  render() {
    const { props } = this;
    const ReceiveData = props.receiveComplaintResult.dataSource;
    if (!ReceiveData) {
      return false;
    }
    const dataSource = props.receiveComplaintResult.dataSource || [];
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const TotalRecords = props.receiveComplaintResult.TotalPages;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      current: this.state.PostData.PageNumber,
      PageSize: this.state.PostData.PageSize,
      onShowSizeChange: (current, pageSize) => {
        const postData = this.state.PostData;
        postData.PageNumber = current;
        postData.PageSize = pageSize;
        this.setState({ PostData: postData });
        props.receiveComplaint(postData);
      },
      onChange: (current) => {
        const postData = this.state.PostData;
        postData.PageNumber = current;
        this.setState({ PostData: postData });
        props.receiveComplaint(postData);
      },
    };
    const searchLists = [
      <Col span={8} key={1}>
        <FormItem
          {...formItemLayout}
          label={'订单编号'}
        >
          {getFieldDecorator('OrderNo', {
            initialValue: ''
          })(
            <Input type="text" />
            )}
        </FormItem>
      </Col>
    ];
    const columns = [
      {
        title: '订单编号',
        width: '230px',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              placeholder="请输入订单编号"
              value={this.state.PostData.OrderNo}
              onChange={(e) => {
                this.setState({
                  PostData: {
                    ...this.state.PostData,
                    OrderNo: e.target.value
                  }
                });
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                this.props.receiveComplaint(this.state.PostData);
                this.setState({ reload: true });
              }}
            >搜索</Button>
          </div>
        ),
        render: item =>
          (
            <div>
              <A
                authOpts={{
                  hint: '查看订单详情'
                }}
                auth="serviceReceiveViewDetail"
                onClick={() => this.handleDetailClick(item)}
              >
                {item.OrderNo}
              </A>
            </div>
          )
      }, {
        title: '投诉问题',
        dataIndex: 'Question'
      }, {
        title: '投诉状态',
        dataIndex: 'Status'
      }, {
        title: '投诉时间',
        dataIndex: 'CreateDate'
      }, {
        title: '最新处理时间',
        render: data =>
          (
            <span>
              {
                data.AnswerDate != null ? data.AnswerDate : '--'
              }
            </span>
          )
      }, {
        title: '操作',
        width: '120px',
        render: data =>
          (
            <div>
              {
                data.Status === '已处理' ?
                  <Link
                    authOpts={{
                      hint: '查看'
                    }}
                    auth="serviceReceiveView"
                    to={`/service/${data.OrderNo}/0/${data.ComplaintId}`}
                    className="ServerIcon"
                  ><Icon glyph={iView} /></Link>
                  :
                  <Link
                    authOpts={{
                      hint: '处理'
                    }}
                    auth="serviceReceiveProcess"
                    to={`/service/${data.OrderNo}/2/${data.ComplaintId}`}
                    className="ServerIcon"
                  ><Icon glyph={chuli} /></Link>
              }
            </div>
          )
      }
    ];
    return (
      <div className="serverList">
        <Spin spinning={this.props.isfetching}>
          <Tabs
            defaultActiveKey="1"
            onChange={(Status) => {
              const { PostData } = this.state;
              PostData.Status = Status;
              PostData.PageIndex = 1;
              this.props.receiveComplaint(PostData);
              this.setState({
                PostData,
                reload: true
              });
            }}
          >
            <TabPane tab="未处理" key="1"></TabPane>
            <TabPane tab="处理中" key="2"></TabPane>
            <TabPane tab="已处理" key="3"></TabPane>
          </Tabs>
          <Row gutter={40}>
            {searchLists}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                this.handleSubmit();
              }}
            >搜索</Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => { this.props.form.resetFields(); }}
            >重置</Button>
          </Row>
          <Table columns={columns} dataSource={dataSource || []} rowKey="OrderNo" pagination={pagination} />
        </Spin>
        {this.state.isShowDetail &&
          <ShowDetailComponent
            orderId={this.state.currentOrder.OrderNo}
            close={this.handleHideDetailClick}
          />
        }
      </div>
    );
  }
}
export default createForm()(ServiceReceive);
