import { connect } from 'react-redux'
import ServiceReceive from '../components/ServiceReceive/js/ServiceReceive'
import {createSelector } from 'reselect'
import {
  receiveComplaint
} from '../redux/Receive'

const defaultValue = [];
const receiveComplaintData = (state) => state.Receive.receiveComplaintResult || defaultValue;
const receiveComplaintSelector = createSelector([receiveComplaintData], (stateItem) => {
  if (!stateItem.Data) {
    return false
  }
  let itemState = {
    PageNumber: stateItem.Current, //当前页
    PageSize: stateItem.PageSize, //每页多少条
    TotalPages: stateItem.Total, //总页数
    dataSource: []
  };
  stateItem.Data.map(item => {
    let comStatus = '';
    switch (item.Status) {
      case 1:
        comStatus = '未处理';
        break;
      case 2:
        comStatus = '处理中';
        break;
      case 3:
        comStatus = '已处理';
        break;
      default:
        ProductType = ''
    }
    let temp = {
      OrderNo:item.OrderNo,
      Question:item.Question,
      Status:comStatus,
      CreateDate:item.CreateDate,
      AnswerDate:item.AnswerDate,
      ComplaintId:item.ComplaintId,
    }
    itemState.dataSource.push(temp);
  })
  return itemState
})
const mapStateToProps = (state) =>{
    return {
        receiveComplaintResult: receiveComplaintSelector(state),
        isfetching: !!state.Receive.isfetching
    }
}
export default connect(
   mapStateToProps,
  {
    receiveComplaint
  }
)(ServiceReceive)
