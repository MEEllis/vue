import util from '../../utils/util.js';
import api from '../../config/api.js';

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
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.thridModal = this.selectComponent("#thridModal");
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
    util.login().then(({
      code
    }) => {
      if (code) {
        util.request(
          api.authGetAccessCompanyList, {
            userName: name,
            password: pwd
          }
        ).then(ajaxData => {
          _this.setData({
            companyList: ajaxData.data.companyList
          });
          wx.setStorageSync('companyList', ajaxData.data.companyList)
          //只有一个公司，直接登录
          if (ajaxData.data.companyList.length === 1) {
            _this.login(ajaxData.data.companyList[0].id)
          } else {
            _this.thridModal.show();
          }

        })
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
      pwd
    } = this.data;
    util.loginByWeixin().then(({
      code,
      userInfo
    }) => {
      return util.request(
        api.authLogin, {
          userName: name,
          password: pwd,
          companyId,
          code: code,
          userInfo: JSON.stringify(userInfo),
        }
      )
    }).then(ajaxData => {
      wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
      wx.setStorage({
        key: "token",
        data: ajaxData.data['ERP-WX-TOKEN'],
        success: function() {
          wx.switchTab({
            url: '/pages/billing/index/index'
          });
        }
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
})