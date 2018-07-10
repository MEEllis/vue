import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    keyWord: '',
    items: [],
    page: 1,
    pageSize: 20,


    companySectionParamId: '',
    companySectionParamName: '全部',
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    goodsBrandId: '',
    goodsBrandName: '全部',
    BrandData: [],


    dataList: [],
    curListData: [],
    loadingMore: true,
    totalVo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFirstGoodsClassVoList()
    this.getGoodsBrandVoList()
    this.getGoodsList()
    this.getCurrentStockTotalVo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((46 + 52 + 46 + 5)).then((scrollHeight) => {
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
      pageNumber: 1,
      dataList: [],
    });
    this.getGoodsList();
    this.getCurrentStockTotalVo();
  },
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/default/default?route=${currentPage.route}&barTitle=实时库存-查询条件`,
    })
  },
  //选择一级类别
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
      pageNumber: 1,
      dataList: [],
    });
    this.getGoodsList();
  },
  scrolltolower: function() {
    const {
      page
    } = this.data;

    this.setData({
      page: page + 1,
    });
    this.getGoodsList();
  },
  // 展示明细
  tapShowDetail: function(e) {
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
  getFirstGoodsClassVoList: function() {
    var that = this;
    request(api.getFirstGoodsClassVoList).then(res => {
      let categoryData = [{
        id: '',
        code: '',
        name: '全部'
      }]
      that.setData({
        categoryData: categoryData.concat(res.data.dataList)
      });
    })
  },
  //获取品牌
  getGoodsBrandVoList: function() {
    var that = this;
    request(api.getGoodsBrandVoList).then(res => {
      let BrandData = [{
        id: '',
        code: '',
        name: '全部'
      }]
      that.setData({
        BrandData: BrandData.concat(res.data.dataList)
      });
    })
  },
  //获取公司
  getGoodsBrandVoListd: function() {
    var that = this;
    request(api.getFirstGoodsClassVoList).then(res => {
      let categoryData = [{
        id: '',
        code: '',
        name: '全部'
      }]
      that.setData({
        categoryData: categoryData.concat(res.data.dataList)
      });
    })
  },
  // 获取商品列表
  getGoodsList: function(callback) {
    const that = this;
    const {
      keyWord,
      goodsClassId,
      page,
      pageSize,
      goodsBrandId,
      companySectionParam
    } = this.data;
    request(api.getCurrentStockData, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      page,
      pageSize,
    }).then(res => {
      if (callback) {
        callback(dataList)
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
  getCurrentStockTotalVo: function() {
    var that = this;
    const {
      keyWord,
      goodsClassId,
      goodsBrandId,
      companySectionParam
    } = this.data;
    request(api.getCurrentStockTotalVo, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
    }).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  }
})