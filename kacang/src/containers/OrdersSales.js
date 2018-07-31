import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import OrdersSales from '../components/OrdersSales/js/OrdersSales';
import { sale } from '../redux/orderSales';

const saleData = (state) => state.orderSales.saleResult || []

const saleSelector = createSelector([saleData], (stateItem) => {
  if (!stateItem.Data) {
    return { Count: 0 };
  }
  const stateItemData = stateItem.Data;
  const itemState = {
    dataSource: [],
    // 总下单数量
    TopupCount: stateItemData.Statistics.TopupCount,
    // 总销售额
    SaleTotal: stateItemData.Statistics.SaleTotal,
    // 总销售利润
    SaleProfit: stateItemData.Statistics.SaleProfit,
    // 总销售成本
    SaleCost: stateItemData.Statistics.SaleCost,
    // 当前订单笔数
    Count: stateItemData.Count
  };
  stateItem.Data.Items.map((item) => {
    let TopupStatus = '';
    switch (item.TopupStatus) {
      case '3':
        TopupStatus = '未处理';
        break;
      case '4':
        TopupStatus = '充值中';
        break;
      case '5':
        TopupStatus = '成功';
        break;
      case '6':
        TopupStatus = '交易失败';
        break;
      case '7':
        TopupStatus = '可疑';
        break;
      default:
        TopupStatus = '未知';
        break;
    }
    const term = {
      key: item.OrderId,
      // 订单编号
      OrderId: item.OrderId,
      // 进货商站点名称
      DealerSiteName: item.DealerSiteName,
      // 进货商站点Id
      DealerSiteId: item.DealerSiteId,
      // 供货商商品Id
      SupplierProductId: item.SupplierProductId,
      // 供货商商品名称
      SupplierProductName: item.SupplierProductName,
      // 供货商商品面值
      SupplierProductPrice: item.SupplierProductPrice,
      // 充值账号
      TopupAccount: item.TopupAccount,
      // 下单时间
      ReceiveTime: item.ReceiveTime,
      // 订单状态
      TopupStatus,
      // 利润
      SupplierSaleProfit: item.SupplierSaleProfit,
      // 总成本
      SupplierSaleCost: item.SupplierSaleCost,
      // 数量 金额
      TotalCost: [
        item.SupplierProductPrice, item.TopupCount, item.SupplierProductPrice * item.TopupCount
      ],
      // 成本
      SupCost: [
        item.SupPrice, item.Amount, item.OrderPrice
      ],
      LocalProfit: item.LocalProfit,
      // LocalProfit:(item.LocalProfit).toFixed(2),
      OrderStatues: item.Status,
      Options: item.Code
    };
    itemState.dataSource.push(term);
  });
  return itemState;
});

const mapStateToProps = (state) => ({
  saleResult: saleSelector(state),
  isfetching: state.orderSales.isfetching
});

export default connect(mapStateToProps, { sale })(OrdersSales);
