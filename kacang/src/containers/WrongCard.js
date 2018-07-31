import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import WrongCard from '../components/WrongCard/js/WrongCard'
import { getWrongCard } from '../actions/wrongCard'

const stateItemSelector = (state) => state.wrongCard.data || [];
const stateSelector = createSelector(
  [stateItemSelector],
  (stateItem) => {
    console.log('stateItem',stateItem);
    if(!stateItem.Data){
      return false
    }
    // 结构不太对 从新修改下
    let itemContext = {
      Data : stateItem.Data,
      PageNumber : stateItem.PageNumber,
      PageSize : stateItem.PageSize,
      TotalPages : stateItem.TotalPages,
      TotalRecords : stateItem.TotalRecords
    };
    let itemUsedTime = '';
    for(let k in itemContext.Data){
      itemUsedTime = itemContext.Data[k].Status;
      if(itemUsedTime){
        itemContext.Data[k].status = '已处理';
      }else{
        itemContext.Data[k].status = '未处理';
      }
    }
    let itemState = itemContext;
    return itemState
  }
);

const fetchingSelector = (state)=>{
  let fetchingItem = state.wrongCard.isfetching;
  if(fetchingItem == undefined){
    fetchingItem = true
  }
  return fetchingItem;
};

const mapStateToProps = (state, ownProps) => {
  return {
    WrongCard: stateSelector(state),
    isfetching:fetchingSelector(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getWrongCard: bindActionCreators(getWrongCard, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrongCard);
