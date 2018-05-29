import util from './utils/util.js'
import api  from './config/api.js'
import user  from './services/user.js'
App({
  //生命周期函数--监听小程序初始化 (desc:当小程序初始化完成时，会触发 onLaunch（全局只触发一次）)
  onLaunch: function () {
    const _this=this;
    //获取用户的登录信息
    user.checkLogin().then(res => {
      user.loginByWeixin().then(({ code, userInfo }) => {
        util.showErrorToast('aaaaaaaaa')
        return util.request(
          api.authAutoLogin,
          {
            code: code,
            userInfo: JSON.stringify(userInfo),
          },
        )
      }).then(ajaxData => {
        wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
        wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
        wx.setStorageSync('companyList', ajaxData.data.companyList);
      })
    },res => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      setTimeout(()=>{
        //如果没有登录，就去登录页面
        console.log('=====================================')
        wx.reLaunch({
          url: '/pages/login/login',
          success: (res) => {
            console.log(res)
          }
        })
      },50)
    }
    ).catch(() => {

    });

 
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
  globalData: {
   
  }
})