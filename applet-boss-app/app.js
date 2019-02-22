import util from './utils/util.js'
import api  from './config/api.js'
import serviceUser  from './services/user.js'
App({
  //生命周期函数--监听小程序初始化 (desc:当小程序初始化完成时，会触发 onLaunch（全局只触发一次）)
  onLaunch: function () {
    serviceUser.getUpdateManager()
  },
  //生命周期函数--监听小程序显示 (desc:当小程序启动，或从后台进入前台显示，会触发 onShow)
  onShow:function(){
  
  },
  //生命周期函数--监听小程序隐藏(desc:当小程序从前台进入后台，会触发 onHide)
  onHide: function () {

  },
  //错误监听函数 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError:function(){
  
  },
  //全局变量
  globalData:{
    stockAge: 25, //滞销超期天数
  }
})