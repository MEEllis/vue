import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_WDWL',
    scrollHeight: 0,
    keyWord: '',
    items: [],
    page: 1,
    pageSize: 20,
    companyId: '',
    companyIdName: '全部',
    categoryData: [],
    dataList: [],
    curListData: [],
    loadingMore: true,
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      companyId: userInfo.companyId,
      companyIdName: userInfo.companyName,

    })
    this.getFirstGoodsClassVoList()
    this.getDataList()
    this.getTotalVo();
    this.getBossAuthValidate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sum-wrap']).then((scrollHeight) => {

      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function (e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  //关键字搜索
  searchSubmit: function () {
    this.search()
  },

  //选择一级类别
  cateTap: function (e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      companyId: id,
      companyIdName: name,
    });
    this.search()
  },
  scrolltolower: function () {
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
  search: function () {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getDataList();
    this.getTotalVo();
  },
  // 展示明细
  tapShowDetail: function (e) {
    const {
      index,
      isshow
    } = e.currentTarget.dataset;
    const {
      dataList
    } = this.data;
    if (Array.isArray(dataList)) {
      dataList[index].isShow = !isshow;
      this.setData({
        dataList,
      });
    }

  },

  //获取一级类别
  getFirstGoodsClassVoList: function () {
    var that = this;
    serviceCom.getCompanyList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },

  // 获取商品列表
  getDataList: function () {
    const that = this;
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;
    request(api.getMyContactUnitData, postData).then(res => {
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取总计行对象
  getTotalVo: function () {
    var that = this;
    const postData = this.getSearchParam();
    request(api.getMyContactUnitTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },

  //获取参数
  getSearchParam: function () {
    const {
      keyWord,
      companyId,
    } = this.data;
    return {
      keyWord,
      companyId,
    }
  },
  //获取权限
  getBossAuthValidate: function () {
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