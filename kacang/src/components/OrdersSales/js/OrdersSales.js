import React from 'react';
import { Table, Spin, Alert } from 'antd';
import omit from 'object.omit';
import PropTypes from 'prop-types';
import { dateFormat } from '../../../utils';
import '../less/ordersSales.less';
import tableColumns from '../../../config/tableColumns';
import ShowDetailComponent from '../../../containers/ShowDetailComponent';
import SearchForm from '../../SearchForm';

class OrdersSales extends React.Component {
  static contextTypes = {
    pageSize: PropTypes.number.isRequired
  }

  static propTypes = {
    isfetching: PropTypes.bool,
    sale: PropTypes.func.isRequired,
    saleResult: PropTypes.shape({ Count: PropTypes.number.isRequired })
  };

  static defaultProps = {
    saleResult: undefined,
    isfetching: true,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      expand: false,
      filterDropdownVisibleOrdersNum: false,
      filterDropdownVisibleCommodityName: false,
      searchTextOrderNum: '', // 快速搜索-订单编号-用于标记
      searchTextCommodityName: '', // 快速搜索-商品名称-用于标记
      orderStatus: '-1', // 用于显示订单状态
      commodityStatus: '0', // 用于显示商品类型
      stockStatus: '0', // 用于显示商品类型
      status: 0, // 传递给后端  订单状态
      Stock: '0', // 库存来源
      Category: '0', // 商品类型
      OrderCode: '', // 订单编号
      ProductFrom: '', // 进货商户
      OrderFrom: '', // 订单客户
      ProductCode: '', // 商品编号
      ProductName: '', // 商品名称
      RechargeTo: '', // 充值账号
      RechargeFrom: '', // 调用账号
      pageNumber: 1,
      pageSize: context.pageSize,
      // 展示显示详情
      isShowDetail: false
    };
  }
  onInputChange(e) {
    this.setState({ searchTextOrderNum: e.target.value, searchTextCommodityName: e.target.value });
  }
  getData = (obj) => {
    const { TradeTime } = this.state.condition;
    const { pageNumber, pageSize } = this.state;
    this.props.sale({
      pageNumber,
      pageSize,
      ...omit(this.state.condition, 'TradeTime'),
      BeginTime: TradeTime && TradeTime.length
        ? dateFormat(TradeTime[0])
        : '',
      EndTime: TradeTime && TradeTime.length > 1
        ? dateFormat(TradeTime[1])
        : '',
      ...obj
    });
  }
  init = (values) => {
    this.setState({
      condition: values
    }, () => {
      this.getData();
    });
  }
  search = (err, values) => {
    if (err) return false;
    this.setState({ condition: values, pageNumber: 1 }, () => { this.getData(); });
  }

  toggle() {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  }
  // 显示详情
  handleDetailClick = (item) => {
    this.setState({ isShowDetail: true, currentOrder: item });
  }
  // 隐藏显示详情
  handleHideDetailClick = () => {
    this.setState({ isShowDetail: false });
  }
  render() {
    const { isfetching, saleResult } = this.props;

    const columns = tableColumns.saleDetailsColumns(this);
    const {
      Count,
      SaleCost,
      SaleProfit,
      SaleTotal,
      TopupCount,
      dataSource
    } = saleResult;
    const result = `订单数量${Count || 0}个，销售商品总数量${TopupCount || 0}个，总成本为${SaleCost || 0}元，总销售额为${SaleTotal || 0}元，总利润为${SaleProfit || 0}元`;

    const pagination = {
      total: Count,
      showSizeChanger: true,
      current: this.state.pageNumber,
      pageSize: this.state.pageSize,
      onShowSizeChange: (current, pageSize) => {
        this.state.pageSize = pageSize;
        this.getData({ pageSize, pageNumber: current });
      },
      onChange: (current) => {
        this.state.pageNumber = current;
        this.getData({ pageNumber: current });
      }
    };
    return (
      <div key="form">
        <Spin spinning={isfetching}>
          <SearchForm handleReset={this.handleReset} name="OrderSaleList" init={this.init} search={this.search} isShowMore showCount={6} />
          <Table columns={columns} dataSource={dataSource || []} pagination={pagination} />

          <Alert
            message="查询结果:"
            description={result}
            type="info"
            style={{ marginTop: '10px' }}
          />
          {this.state.isShowDetail &&
            <ShowDetailComponent
              orderId={this.state.currentOrder.OrderId}
              close={this.handleHideDetailClick}
            />
          }
        </Spin>
      </div>
    );
  }
}

export default OrdersSales;
