import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_ZXKC',
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
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    stockAge:25,
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
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,

    })
    this.getFirstGoodsClassVoList()
    this.getDataList()
    this.getTotalVo();
    this.getBossAuthValidate();

    this.getCompanySectionList();
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
  onShow: function () {
    const { stockAge} = this.data;
    wx.setNavigationBarTitle({
      title: `滞销库存(超${stockAge}天)`,
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
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getDataList();
    this.getTotalVo();
  },
  tapAdvanced: function () {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/unsalableStock/unsalableStock?route=${currentPage.route}&barTitle=滞销库存-查询条件`,
    })
  },
  //选择一级类别
  cateTap: function (e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
    });
    this.searchSubmit()
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
  //获取一级类别
  getFirstGoodsClassVoList: function () {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },

  //获取公司
  getCompanySectionList: function () {
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
  //获取参数
  getSearchParam: function () {
    var that = this;
    this.setCompanySectionParam();
    const {
      companySectionParam,
      keyWord,
      goodsClassId,
      stockAge,
    } = this.data;
    return {
      companySectionParam,
      keyWord,
      goodsClassId,
      stockAge,
    }
  },
  // 获取商品列表
  getDataList: function () {
    const that = this;
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
      companySectionParam,
      stockAge,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getUnsalableStockData, postData).then(res => {
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          var item = res.data.dataList[i];
          item.url = `/pages/report/unsalableStockDetail/unsalableStockDetail?goodsId=${item.id}&goodsName=${item.name}&goodsQuantity=${item.goodsQuantity}&stockAge=${stockAge}&goodsAmount=${item.goodsAmount}&companySectionParam=${companySectionParam}`;
        }
      }
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

    request(api.getUnsalableStockTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
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
  }
})