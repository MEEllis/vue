import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_WDZJ',
    scrollHeight: 0,
    keyWord: '',
    items: [],
    page: 1,
    pageSize: 20,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    accountTypeId: '',
    accountTypeName: '全部',
    categoryData: [],
    dataList: [],
    curListData: [],
    loadingMore: true,
    totalVo: null,
    startDate: '',
    authValidate: {
      FW: true,
      CKCBJ: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    let curDate = new Date();
    curDate = util.formatTime(curDate);
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      startDate: curDate,
    })
    this.getAccountTypeList()
    this.getBossAuthValidate();
    this.getCompanySectionList();
    this.searchSubmit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sel-time', 'sum-wrap']).then((scrollHeight) => {

      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  //关键字搜索
  searchSubmit: function() {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getDataList();
    this.getTotalVo();
  },
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/myMoney/myMoney?route=${currentPage.route}&barTitle=我的资金-查询条件`,
    })
  },
  //资金账户类型
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      accountTypeId: id,
      accountTypeName: name,
    });
    this.searchSubmit()
  },
  scrolltolower: function() {
    const {
      page,
      curListData,
      pageSize
    } = this.data;
    if (curListData.length !== pageSize) {
      return;
    }
    this.setData({
      page: page + 1,
    });
    this.getDataList();
  },


  setCompanySectionParam() {
    const {
      companySectionParamNodeType,
      companySectionParamId,
    } = this.data;
    let companySectionParam = '';
    companySectionParam = serviceCom.setCompanySectionParam(companySectionParamNodeType, companySectionParamId);
    this.setData({
      companySectionParam,
    });
  },
  //
  getAccountTypeList: function() {
    var that = this;
    serviceCom.getAccountTypeList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },
  //获取参数
  getSearchParam: function() {
    this.setCompanySectionParam();
    const {
      companySectionParam,
      keyWord,
      accountTypeId,
      startDate,
    } = this.data;
    return {
      companySectionParam,
      keyWord,
      accountTypeId,
      startDate,
    }
  },

  //获取公司
  getCompanySectionList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getCompanySectionList({
      menuCode,
    }).then(companySectionParamData => {
      that.setData({
        companySectionParamData,
      });
    })
  },
  // 获取商品列表
  getDataList: function() {
    const that = this;

    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getMyMoneyData, postData).then(res => {
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取总计行对象
  getTotalVo: function() {
    var that = this;
    const postData = this.getSearchParam();
    request(api.getMyMoneyTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },

  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate
      });
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})