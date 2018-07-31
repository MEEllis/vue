import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ServiceComplaint from '../components/ServiceComplaint/js/ServiceComplaint';

import {
  complaintDetail,
  operatorComplaint,
  operatorWaitcomplaint,
} from '../redux/Receive';

import {
  getOrderDetail,
} from '../redux/order';

const getOrderDetailSelector = (state) => state.order.getOrderDetailResult || [];
const getOrderDetailState = createSelector(
  [getOrderDetailSelector],
  (stateItem) => {
    if (!stateItem.Data) {
      return false;
    }
    const dataItem = stateItem.Data;
    let productType = '';
    switch (dataItem.ProductType) {
      case '1':
        productType = '卡密';
        break;
      case '2':
        productType = '卡密直储';
        break;
      case '4':
        productType = '在线直储';
        break;
      default:
        productType = dataItem.ProductType;
    }
    dataItem.ProductType = productType;
    let topupStatus = '';
    switch (dataItem.TopupStatus) {
      case '3':
        topupStatus = '未处理';
        break;
      case '4':
        topupStatus = '处理中';
        break;
      case '5':
        topupStatus = '成功';
        break;
      case '6':
        topupStatus = '失败';
        break;
      case '7':
        topupStatus = '可疑';
        break;
      default:
        topupStatus = dataItem.TopupStatus;
    }
    dataItem.TopupStatus = topupStatus;
    return dataItem;
  }
);

const getreceiveComplaintlSelector = (state) => state.Receive.complaintDetailResult || [];
const getreceiveComplaintState = createSelector(
  [getreceiveComplaintlSelector],
  (stateItem) => {
    if (!stateItem.Data) {
      return {
        LaunchComplaintId: ''
      };
    }
    const dataItem = stateItem.Data;
    return dataItem;
  }
);

const mapStateToProps = (state) => {
  return {
    orderDetailResult: getOrderDetailState(state),
    complaintDetailResult: getreceiveComplaintState(state),
    operatorComplaintResult: state.Receive.operatorComplaintResult,
    operatorWaitcomplaintResult: state.Receive.operatorWaitcomplaintResult,
    isfetching: !!state.order.isfetching || !!state.Receive.isfetching,
  };
}
export default connect(
  mapStateToProps,
  {
    getOrderDetail,
    complaintDetail,
    operatorComplaint,
    operatorWaitcomplaint,
  }
)(ServiceComplaint);
