import React from 'react';
import PropTypes from 'prop-types';
import { Form, Spin, Pagination, Tabs, Tooltip, Alert } from 'antd';
import Icon, * as icon from '../../../components/Icon/js/Icon';
import find from 'lodash/find';
import omit from 'object.omit';
import { dateFormat } from '../../../utils';
import { A } from '../../Auth/js/Auth';
import ShowDetailComponent from '../../../containers/ShowDetailComponent';
import SearchFrom from '../../SearchForm';
import '../../CardType/less/cardType.less';
import '../less/orderDetail.less';
import Search from '../../../config/search';

const createForm = Form.create;
const TabPane = Tabs.TabPane;

const OrderListSearch = Search.OrderList;

class OrdersDetail extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    getOrderList: PropTypes.func.isRequired,
    getOrderListResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getOrderListResult: undefined,
    isfetching: true
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      statusCount: {
        SuspiciousCount: 0,
        UntreatedCount: 0,
        ProcessingCount: 0,
        SuccessCount: 0,
        FailedCount: 0
      },
      status: '7',
      // status: '6',
      orders: [],
      isShowDetail: false,
      manageOrder: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getOrderListResult } = nextProps;
    if (getOrderListResult !== this.props.getOrderListResult) {
      if (getOrderListResult.Status === 200) {
        const statistics = getOrderListResult.Data.Statistics;
        this.setState({
          statusCount: getOrderListResult.Data.StatusCount,
          orders: getOrderListResult.Data.Items,
          total: getOrderListResult.Total,
          resultDescription: `订单数量${getOrderListResult.Data.Count || 0}个，销售商品总数量${statistics.TopupCount || 0}个，总销售额为${statistics.SaleTotal || 0}元`
        });
      }
    }
  }

  onPageChange = (current) => {
    this.setState({ pageNumber: current }, () => {
      this.getData();
    });
  }
  onShowSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageNumber: current }, () => {
      this.getData();
    });
  }

  getData = () => {
    const { TradeTime } = this.state.condition;
    const { pageNumber, pageSize, status } = this.state;
    this.props.getOrderList({
      pageNumber,
      pageSize,
      status,
      ...omit(this.state.condition, 'TradeTime'),
      BeginTime: TradeTime && TradeTime.length ? dateFormat(TradeTime[0]) : '',
      EndTime: TradeTime && TradeTime.length > 1 ? dateFormat(TradeTime[1]) : ''
    });
  }

  getProductType = (type) => {
    const productType = find(find(OrderListSearch, { id: 'ProductType' }).items, { value: type });
    if (productType) return productType.name;
  }

  getStatus = (status) => {
    switch (status) {
      case '3':
        return '未处理';
      case '4':
        return '充值中';
      case '5':
        return '成功';
      case '6':
        return '交易失败';
      case '7':
        return '可疑';
      default:
        return '未知';
    }
  }
  onChange = (value) => {
    const condition = this.state.condition;
    for (const key in value) {
      condition[key] = value[key].value;
    }
    this.setState({ condition });
  }
  handleStatusChange = (status) => {
    this.setState({ status, pageNumber: 1 }, () => {
      this.getData();
    });
  }

  search = (err, values) => {
    if (err) return false;
    this.setState({ condition: values, pageNumber: 1 }, () => { this.getData(); });
  }
  init = (values) => {
    this.setState({ condition: values }, () => { this.getData(); });
  }

  handleDetailClick = (item) => {
    this.setState({ isShowDetail: true, currentOrder: item });
  }
  handleDetailManageClick = (item) => {
    this.setState({ isShowDetail: true, currentOrder: item, manageOrder: true });
  }
  handleHideDetailClick = () => {
    this.setState({ isShowDetail: false, manageOrder: false });
  }

  render() {
    const { isfetching } = this.props;

    const { orders, currentOrder, statusCount, status, total, isShowDetail, manageOrder } = this.state;
    const tableList = orders.map(item => (
      <div className="table" key={item.OrderId}>
        <ul className="tabelHeader clearfix">
          <li className="top">
            <div>
              <A
                auth="orderDetail"
                authOpts={{
                  hint: ''
                }}
                onClick={() => { this.handleDetailClick(item); }}
              >
                {item.OrderId}
              </A>
            </div>
            <div>
              {dateFormat(item.CompletionTime)}
            </div>
          </li>
          <li className="top"><div>
            进货商
            </div>
            <div>
              {`${item.DealerSiteName}(${item.DealerSiteId})`}
            </div>
          </li>
        </ul>
        <ul className="tableFooter">
          <li className="first-li">
            <div>
              <span className="columns">商品:</span>
              <span>{item.SupplierProductName}</span>
              <span>{item.SupplierProductId}</span>
              <em className="span">{this.getProductType(item.ProductType)}</em>
            </div>
            <div>
              <span className="columns">单价:</span>
              <span>{item.SupplierProductPrice}元</span>
            </div>
          </li>
          <li className="second-li">
            <div>
              <span className="columns">数量:</span>
              <span>{item.TopupCount}个</span>
            </div>
            <div>
              <span className="columns">金额:</span>
              <span>{item.SupplierSaleTotal}元</span>
            </div>
          </li>
          <li>
            <div>
              <span className="columns">充值账号:</span>
              <span>{item.TopupAccount}</span>
            </div>
            <div>
              <span className="columns">交易状态:</span>
              <span> {this.getStatus(item.TopupStatus)}</span>
            </div>
          </li>
          <li>
            <div>
              <span className="columns">充值描述:</span>
              <span>{item.TopupStatus === '5' ? item.ChargeDescription || '充值成功' : item.ChargeDescription || '订单未处理'}</span>
            </div>
            <div>
              <span className="columns">操作:</span>
              <span>
                {(item.TopupStatus !== '5' && item.TopupStatus !== '6') &&
                  <span style={{ marginRight: 10 }}>
                    <A
                      auth="manageImmediately"
                      authOpts={{
                        hint: '立即处理'
                      }}
                      onClick={() => { this.handleDetailManageClick(item); }}
                    >
                      <Icon glyph={icon.chuli}></Icon>
                    </A>
                  </span>
                }
                <span>
                  <A
                    auth="orderDetail"
                    authOpts={{
                      hint: '查看详情'
                    }}
                    onClick={() => { this.handleDetailClick(item); }}
                  >
                    <Icon glyph={icon.chakan}></Icon>
                  </A>
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    ));
    return (
      <div key="form">
        <Spin spinning={isfetching}>
          <SearchFrom name="OrderList" init={this.init} search={this.search} onChange={this.onChange} isShowMore showCount={6} />

          <Tabs onChange={this.handleStatusChange} activeKey={status}>
            <TabPane tab={`可疑订单(${statusCount.SuspiciousCount})`} key="7" />
            <TabPane tab={`未处理(${statusCount.UntreatedCount})`} key="3" />
            <TabPane tab={`处理中(${statusCount.ProcessingCount})`} key="4" />
            <TabPane tab={`交易成功(${statusCount.SuccessCount})`} key="5" />
            <TabPane tab={`交易失败(${statusCount.FailedCount})`} key="6" />
          </Tabs>
          {tableList[0] ? tableList : <div className="singal">暂无数据</div>}
          {tableList[0] &&
            <Pagination
              onChange={this.onPageChange}
              current={this.state.pageNumber}
              onShowSizeChange={this.onShowSizeChange}
              showSizeChanger
              total={total}
            />
          }
          <Alert
            message="查询结果:"
            description={this.state.resultDescription}
            type="info"
            style={{ marginTop: '10px', clear: 'both', float: 'left', width: '100%' }}
          />
        </Spin>
        {isShowDetail &&
          <ShowDetailComponent
            orderId={currentOrder.OrderId}
            manageOrder={manageOrder}
            getData={this.getData}
            close={this.handleHideDetailClick}
          />
        }
      </div>

    );
  }
}


export default createForm()(OrdersDetail);
