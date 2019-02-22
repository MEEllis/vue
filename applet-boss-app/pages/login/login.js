import util from '../../utils/util.js';
import request from '../../utils/request.js';
import api from '../../config/api.js';
import serviceUser from '../../services/user.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: '',
    companyList: [], //公司列表
    showOp: {
      showName: 0,
      showPwd: 0,
    },
  
    items: [
      { name: 'rememberMe', value: '记住账号密码', checked: 'true' },
    ]
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.thridModal = this.selectComponent("#thridModal");
    const name=wx.getStorageSync('name');
    const pwd =wx.getStorageSync('pwd');
    this.setData({
      name,
      pwd,
    });
  },
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },

  inputPwd: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  formSubmit: function(e) {
    const wxUserInfo = e.detail;
    const _this = this;
    const {
      name,
      pwd
    } = this.data
    if (!wxUserInfo.userInfo) {
      return;
    }

    serviceUser.getCompanyVoList(name, pwd).then(ajaxData => {
      _this.setData({
        companyList: ajaxData.data.dataList
      });
      //只有一个公司，直接登录
      if (ajaxData.data.dataList.length === 1) {
        _this.login(ajaxData.data.dataList[0].id)
      } else {
        _this.thridModal.show();
      }
    })
  },
  tapCompany: function(e) {
    // 用户已经同意小程序使用用户信息
    const companyId = e.currentTarget.dataset.id;
    this.login(companyId)
  },
  // 登录
  login: function(companyId) {
    const {
      name,
      pwd,
      items
    } = this.data;
    serviceUser.login(name, pwd, companyId).then(ajaxData => {
      if (items[0].checked){
        wx.setStorageSync('name', name);
        wx.setStorageSync('pwd', pwd);
      }else{
        wx.removeStorageSync('name');
        wx.removeStorageSync('pwd');
      }
    

      wx.switchTab({
        url: '/pages/report/index/index'
      });
    })
  },
  focusInput: function(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.isShowClear(key, 1)
  },
  blurInput: function(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.isShowClear(key, 0)
  },
  isShowClear(key, flag) {
    const {
      showOp
    } = this.data;
    showOp[key] = flag;
    this.setData({
      showOp,
    })
  },
  tapClear: function(e) {
    const {
      key
    } = e.currentTarget.dataset;
    if (key == 'name') {
      this.setData({
        name: '',
      })
    } else {
      this.setData({
        pwd: '',
      })
    }
  },
  checkboxChange(e) {
    var arr = e.detail.value
    const {
      items,
    } = this.data;
    
    items[0].checked = !!arr.length
    this.setData({
      items,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})