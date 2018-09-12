import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_ZCGY',
    scrollHeight: 0,
    keyWord: '',
    dataList: [],
    companyIds: '',
    curListData: [],
    loadingMore: true,
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      companyIds: userInfo.companyId,
    })
    this.getCompanyList()
    this.getBossAuthValidate();
    this.searchSubmit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'totalVo-wrap']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
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

  //选择一级类别
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      companyIds: id,
      page: 1,
      dataList: [],
    });
    this.searchSubmit()
  },

  //公司集合
  getCompanyList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getCompanyList({
      menuCode
    }).then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },


  //获取参数
  getSearchParam: function() {
    const {
      companyIds,
    } = this.data;
    return {
      companyIds,
    }
  },
  // 获取商品列表
  getDataList: function() {
    const that = this;
    const postData = this.getSearchParam();
    request(api.getAssetProfileData, postData).then(res => {
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
    request(api.getAssetProfileTotalVo, postData).then(res => {
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
  }
})