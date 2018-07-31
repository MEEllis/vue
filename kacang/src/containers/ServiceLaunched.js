import { connect } from 'react-redux'
import ServiceLaunched from '../components/ServiceLaunched/js/ServiceLaunched'
import {createSelector } from 'reselect'

// import { actionsStart as getData} from '../actions/getData'
const getDataSelector = (state) => state.getData.data || []
const stateGetDataSelector = createSelector(
    [getDataSelector],
    (stateItem) => {
        switch( stateItem.source ){
            case 'ServiceLaunched':
                if(!stateItem.Data){
                    return false;
                };
                stateItem.PageNumber = stateItem.Data.Context.PageNumber;
                stateItem.TotalRecords = stateItem.Data.Context.TotalRecords;
                stateItem.Data = stateItem.Data.Context.Data
                let itemState ={
                    dataSource:[],
                };
                Object.assign(itemState, stateItem);
                stateItem.Data.map(item=>{
                    let Status = ''
                    let Complaints = ''
                    switch(item.Complaints){
                        case 1 : Complaints = '可疑订单没有得到处理';
                            break;
                        case 2 : Complaints = '超时未处理订单';
                            break;
                        case 3 : Complaints = '充值成功但实际未到账或者部分到账';
                            break;
                        case 4 : Complaints = '卡密错误或卡密不可用';
                            break;
                        default: Complaints = item.Complaints;
                    }
                    switch(item.Status){
                        case 0:
                            Status = '未处理';
                            item.LastHandleDate = '--';
                            break;
                        case 1: Status = '处理中'
                            break;
                        default:Status = '已处理'
                    }
                    let term ={
                        OrderNo:item.OrderNo,
                        ComplaintQuestion:Complaints,
                        ComplaintDate:item.ComplaintDate,
                        Status:Status,
                        LastHandleDate:item.LastHandleDate,
                        IsAgainComplaint:item.IsAgainComplaint,
                        Options:[item.Status,item.IsAgainComplaint],
                        key: item.Id
                    };
                    itemState.dataSource.push(term);
                })
                return itemState;
                break;
            default:
                return stateItem;
                break;
        };

    }
)

const mapStateToProps = (state) =>{
    return {
      //  data: stateGetDataSelector(state),
      //  isfetching: !!state.getData.isfetching,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
      //  getData: bindActionCreators(getData, dispatch),
    }
}

export default connect(
  //  mapStateToProps,
  //  mapDispatchToProps
)(ServiceLaunched)
