import { connect } from 'react-redux'

import UserSafety from '../components/UserSafety/js/UserSafety'
import {ChangepwdAction,SendPhoneCodeAction,IsBindPhoneAction,BindPhoneAction,GetPhoneAction,UnbindPhoneAction,IsBindweichatAction,SaveRegionAction,GetRegionsAction,GetWeichatVerifyAction} from '../actions/userSafy'
import {getLastLoginTime} from '../actions/getLastLoginTime'
import { bindActionCreators } from 'redux'

import {createSelector} from 'reselect'

const getphoneSelector = (state) =>state.getPhone.items || []
// const isBindphoneSelector  = (state) =>state.isbindPhone.items || []
const getBindPhoneItemsSelector = (state) => state.isbindPhone.items || ''
const isbindWeichatSelector = (state) => state.isbindWeichat.items || ''
const saveRegionSelector=(state) => state.saveRegion.items || ''
const getRegionsSelector = (state) => state.getRegions.items || ''
const actionSelector = createSelector(
    [getphoneSelector],
    (actionItem) =>{
        if(!actionItem.Data){
            return false
        }
        let itemState ={
            dataSource:[],
        };
        stateItem.Data.Context.map(item =>{

            let temp ={
                ParentOpenId:item.ParentOpenId,
                OpenId:item.OpenId,
                RoleId:item.RoleId,
                UserName:item.UserName,
                Sort:item.Sort,
                IpList:item.IpList,
                Status:item.Enable,
                Enable:item.Enable?'启用':'禁用',
                Mark:item.Mark,
                Options:{UserName:item.UserName,OpenId:item.OpenId,Mark:item.Mark,Enable:item.Enable?'启用':'禁用',Status:item.Enable,}
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)
const bindPhoneItemSelector = createSelector(
    [getBindPhoneItemsSelector],
    (bindPhoneItem)=>{
        let itemState ={
        };
        if (bindPhoneItem) {
            return {
                itemState:{
                    text:'解绑',
                    sm:'已绑定',
                    flag:true,
                }
            }
        }
        else {
            return {
                itemState:{
                  text:'绑定',
                  sm:'未绑定',
                  flag:false,
              }
            }
        }
        return itemState
    }
)
const bindweichatItemSelector = createSelector(
    [isbindWeichatSelector],
    (bindweichatItem)=>{
        let itemState ={
        };
        if(bindweichatItem.Data)
        {
          if (bindweichatItem.Data.Context) {
              return {
                  itemState:{
                      text:'解绑',
                      sm:'已绑定',
                      flag:true,
                  }
              }
          }
          else {
              return {
                  itemState:{
                    text:'绑定',
                    sm:'未绑定',
                    flag:false,
                }
              }
          }
        }
        else {
            return {
                itemState:{
                  text:'绑定',
                  sm:'未绑定',
                  flag:false,
              }
            }
        }
        return itemState
    }
)

const getRegionsItemSelector = createSelector(
    [getRegionsSelector],
    (getRegionsItem)=>{
        let itemState ={
        };
        if (getRegionsItem.Data) {
          //如果绑定城市
          if(getRegionsItem.Data.Context[0])
          {
            return {
                itemState:{
                    text:'解绑',
                    sm:'已绑定',
                    flag:true,
                }
            }
            }
            else
            {
              return {
                  itemState:{
                    text:'绑定',
                    sm:'未绑定',
                    flag:false,
                }
              }
            }
        }
        else {
            return {
                itemState:{
                  text:'绑定',
                  sm:'未绑定',
                  flag:false,
              }
            }
        }
        return itemState
    }
)


const saveRegionItemSelector=createSelector([saveRegionSelector],(regionItem)=>{
    if (regionItem.Result) {
        return{
            msg:'添加成功'
        }
    }
    return{
        msg:'添加失败'
    }
})

const mapStateToProps = (state) =>{
    return {
        //changepwditems:actionSelector(state),
        changepwditems:state.changePwd.items,
        sendphonecodeItems:state.sendPhoneCode.items,
        bindphoneItems:state.bindPhone.items,
        isbindphoneItems:bindPhoneItemSelector(state),
        getphoneItems:state.getPhone.items,
        unbindphoneItems:state.unbindPhone.items,
        time:state.getLastLoginTime.time,
        //isbindWeichat:state.isbindWeichat.items,
        isbindWeichat:bindweichatItemSelector(state),
        saveregion:saveRegionItemSelector(state),
        getRegions:getRegionsItemSelector(state),
        getWeichatVerify:state.getWeiChatVerify.items
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        ChangepwdAction:bindActionCreators(ChangepwdAction,dispatch),
        SendPhoneCodeAction:bindActionCreators(SendPhoneCodeAction,dispatch),
        BindPhoneAction:bindActionCreators(BindPhoneAction,dispatch),
        IsBindPhoneAction:bindActionCreators(IsBindPhoneAction,dispatch),
        GetPhoneAction:bindActionCreators(GetPhoneAction,dispatch),
        UnbindPhoneAction:bindActionCreators(UnbindPhoneAction,dispatch),
        IsBindweichatAction:bindActionCreators(IsBindweichatAction,dispatch),
        SaveRegionAction:bindActionCreators(SaveRegionAction,dispatch),
        GetRegionsAction:bindActionCreators(GetRegionsAction,dispatch),
        GetWeichatVerifyAction:bindActionCreators(GetWeichatVerifyAction,dispatch),
    }
}
export default connect(
    mapStateToProps,
    {
        ChangepwdAction,
        SendPhoneCodeAction,
        BindPhoneAction,
        IsBindPhoneAction,
        GetPhoneAction,
        UnbindPhoneAction,
        IsBindweichatAction,
        SaveRegionAction,
        getLastLoginTime,
        GetRegionsAction,
        GetWeichatVerifyAction
    }
)(UserSafety)
