import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ShowComplaintComponent from '../components/ShowComplaintComponent/js/ShowComplaintComponent'
// import { showComplaintComponent, showOrderComplaintDetail, requestComplant } from '../actions/showComponent'

// import { createSelector } from 'reselect'
// const defaultValue = [];

// //const stateItemSelector = (state) =>state.showComplaintComponent.items || defaultValue
// const complaintDetailSelector = (state) => state.showOrderComplaintDetail.items || defaultValue
// const requstComplantStateSelector = (state) => state.requestComplant.items || defaultValue

// const detailStateStateSelector = createSelector([complaintDetailSelector], (detailItem) => {
//   if (!detailItem) {
//     return false;
//   }

//   // stateItem.Data.map(item =>{
//   let radio = { datas: [] };
//   let complaintStatus = '';
//   let productType = '';
//   switch (detailItem.ProductType) {
//     case '卡密':
//       productType = '1';
//       break;
//     case '卡密直储':
//       productType = '4';
//       break;
//     case '在线直储':
//       productType = '8';
//       break;
//     default:
//       productType = detailItem.ProductType;
//   }
//   // 用于投诉问题下拉框选择 默认值
//   let radiostatus = ''
//   if (detailItem.Status == '处理中' || detailItem.Status == '未处理') {
//     complaintStatus = '2'
//     radiostatus = '2'
//   } else if (detailItem.Status == '可疑订单') {
//     complaintStatus = '1'
//     radiostatus = '1'
//   } else if (detailItem.Status == '交易成功') {
//     if (productType == '4' || productType == '8') {
//       complaintStatus = '3'
//       radiostatus = '3'
//     } else if (productType == '1') {
//       complaintStatus = '4'
//       radiostatus = '4'
//     }
//   }
//   let radiotext = ''
//   if (radiostatus == '2' || radiostatus == '1') {
//     radio.datas.push({ id: '4', text: '请尽快处理订单' })
//   }
//   if (radiostatus == '3') {
//     radio.datas.push({ id: '1', text: '退款' }, { id: '3', text: '补充完成' })
//   }
//   if (radiostatus == '4') {
//     radio.datas.push({ id: '1', text: '退款' }, { id: '2', text: '补卡' })
//   }
//   let temp = {
//     Id: detailItem.Id,
//     Code: detailItem.Code,
//     Status: detailItem.Status,
//     DealerId: detailItem.DealerId,
//     DealPrice: detailItem.DealPrice,
//     CostPrice: detailItem.CostPrice,
//     TotalSupPrice: detailItem.TotalSupPrice,
//     OrderCount: detailItem.OrderCount,
//     ProductName: detailItem.ProductName,
//     ProductType: detailItem.ProductType,
//     SupplierId: detailItem.SupplierId,
//     TimeSpan: detailItem.TimeSpan,
//     Total: parseFloat(detailItem.DealPrice * detailItem.OrderCount).toFixed(4),
//     complaintStatus: complaintStatus,
//     radioData: radio
//   };
//   // itemState.push(temp)
//   return temp
// })
// const requstComplantSelector = createSelector([requstComplantStateSelector], (requestItem) => {

// })
// const mapStateToProps = (state, props) => {
//   return {
//     items: state.showComplaintComponent.items,
//     propsValue: props,
//     //complaintDetailItems:state.showOrderComplaintDetail.items
//     complaintDetailItems: detailStateStateSelector(state),
//     requestComplant: state.requestComplant.items,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     showComplaintComponent: bindActionCreators(showComplaintComponent, dispatch),
//     showOrderComplaintDetail: bindActionCreators(showOrderComplaintDetail, dispatch),
//     requestComplant: bindActionCreators(requestComplant, dispatch),
//   }
// }


export default connect(
  // mapStateToProps,
  // {
  //   showComplaintComponent,
  //   showOrderComplaintDetail,
  //   requestComplant,
  // }
)(ShowComplaintComponent)
