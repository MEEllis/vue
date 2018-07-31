import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import StockAccount from '../components/ApiUser/js/ApiUser'

import { actionsStart as getData} from '../actions/getData'

const getDataSelector = (state) => state.getData.data || []
const stateGetDataSelector = createSelector(
    [getDataSelector],
    (stateItem) => {
        switch( stateItem.source ){
            case 'GetApiAccountList':
                stateItem.Data = stateItem.Data.Data;
                let items = {}
                for(let k in stateItem.Data){
                    items = stateItem.Data[k];
                    items.key = items.OpenId;
                    items.AvailableD = items.Available ? '启用' : '禁用';
                    items.NoticeD = items.Notice ? '已开通' : '未开通';
                    items.ReMarkD = items.ReMark ? items.ReMark : '未备注';
                };
                return stateItem;
                break;
            case 'GetSingleApiAccount':
                let itemContext = stateItem.Data.Context;
                let itemData = {
                    '云接口编号': itemContext.ApiCustomId,
                    '操作对象编号': itemContext.SiteId,
                    '操作对象昵称': itemContext.SiteName,
                    '密钥': itemContext.SecretKey,
                    '用户余额': itemContext.UseableBalance,
                    '账号状态': itemContext.Available ? '启用' : '禁用',
                    '注册时间': itemContext.RegisterTime,
                    '公司名称': itemContext.Company,
                    '真实姓名': itemContext.RealName,
                    '身份证号码': itemContext.Identity,
                    'QQ': itemContext.QQ,
                    '电话': itemContext.CellPhone,
                    '地址': itemContext.Address,
                    '邮编': itemContext.PostCode,
                    '座机': itemContext.LandLine,
                }
                stateItem.Data = itemData;
                return stateItem;
                break;
            case 'Lock':
                return stateItem;
                break;
            case 'UnLock':
                return stateItem;
                break;
            case 'CloseNotice':
                return stateItem;
                break;
            case 'OpenNotice':
                return stateItem;
                break;
            case 'HandBalance':
                return stateItem;
                break;
            case 'AddHandBalance':
                return stateItem;
                break;
            case 'InitSecretKey':
                return stateItem;
                break;
            default:
                return stateItem;
                break;
        };

    }
)

const mapStateToProps = (state, ownProps) => {
    return {
        data: stateGetDataSelector(state),
        isfetching: !!state.getData.isfetching
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: bindActionCreators(getData, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAccount)
