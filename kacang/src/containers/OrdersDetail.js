import { connect } from 'react-redux';
import OrdersDetail from '../components/OrdersDetail/js/OrdersDetail';
import { getOrderList } from '../redux/order';

// const stateItemSelector = (state) => state.ordersDetail.items || []
// const fetchingItemSelector = (state) => state.ordersDetail.isfetching

// const stateSelector = createSelector(
//   [stateItemSelector],
//   (stateItem) => {
//     if (!stateItem.Data) {
//       return false
//     }
//     const stateItemData = stateItem.Data;
//     let activeLi = '';//判断订单状态默认显示哪个
//     if (stateItemData.SuspiciousCount > 0) {
//       activeLi = 6;
//     } else if (stateItemData.UntreatedCount > 0) {
//       activeLi = 2;
//     } else if (stateItemData.ProcessingCount > 0) {
//       activeLi = 3;
//     } else if (stateItemData.SuccessCount > 0) {
//       activeLi = 4;
//     } else if (stateItemData.FailedCount > 0) {
//       activeLi = 5;
//     }
//     let itemState = {
//       dataSource: [],
//       TotalAmount: stateItemData.TotalAmount,
//       TotalProducts: stateItemData.TotalProducts,
//       TotalSales: stateItemData.TotalSales,
//       orderStatusNum: [stateItemData.SuspiciousCount, stateItemData.UntreatedCount, stateItemData.ProcessingCount, stateItemData.SuccessCount, stateItemData.FailedCount],
//       activeLi: activeLi,
//     }

//     stateItem.Data.Items.map(item => {
//       let itemStatus = '' //订单状态
//       let category = ''  //商品类型
//       let productSource = ''  //库存来源
//       let OrderTime = [item.OrderTime] //时间，默认显示交易时间，如果订单状态为完成或失败，则显示完成时间
//       switch (item.Status) {
//         case '可疑': itemStatus = '可疑'
//           break;
//         case '交易失败': itemStatus = '交易失败'
//           OrderTime.push(item.TradeTime)
//           break;
//         case '交易成功': itemStatus = '交易成功';
//           OrderTime.push(item.TradeTime)
//           break;
//         default: itemStatus = item.Status;
//       }
//       let term = {
//         key: item.Id,
//         Code: item.Code,
//         ExternalOrderNumber: item.ExternalOrderNumber,
//         Name: item.Name,
//         NameCode: item.NameCode,
//         Category: item.Category,
//         RechargeTo: item.RechargeTo,
//         FromName: item.FromName,
//         FromCode: item.FromCode,
//         OrderFrom: item.OrderFrom,
//         OrderFromCode: item.OrderFromCode,
//         OrderTime: OrderTime,
//         Price: item.Price,
//         Amount: item.Amount,
//         OrderPrice: item.OrderPrice,
//         ProductSource: item.ProductSource,
//         ChargeDescription: item.ChargeDescription || '订单未处理',
//         RefundType: item.RefundType,  //投诉状态
//         OrderStatus: itemStatus,
//         Status: [item.RefundType, item.Code, item.Status],
//       }
//       itemState.dataSource.push(term)
//     })
//     return itemState
//   }
// )

// const fetchingSelector = (state) => {
//   let fetchingItem = state.ordersDetail.isfetching;
//   if (fetchingItem == undefined) {
//     fetchingItem = true
//   }
// }

const mapStateToProps = (state) => ({
  getOrderListResult: state.order.getOrderListResult,
  isfetching: state.order.isfetching
});

export default connect(
  mapStateToProps,
  {
    getOrderList
  }
)(OrdersDetail);
