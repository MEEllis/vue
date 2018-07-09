import request from '../../../utils/request.js';
import api from '../../../config/api.js';
import {
  $stopWuxRefresher
} from '../../../component/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    items: [],
    page: 1,
    pageSize: 20,
    categoryData: [],
    goodsClassId: '',
    goodsBrandId: '',
    companySectionParam: '',
    dataList: [],
    curListData: [],
    loadingMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFirstGoodsClassVoList()
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    this.getGoodsList()
  },
  //选择一级类别
  cateTap: function(e) {
    const goodsClassId = e.currentTarget.dataset.id;
    this.setData({
      goodsClassId,
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

  onRefresh() {
    console.log('onRefresh')
    const that = this;
    this.setData({
      page: 1,
    });
    this.getGoodsList(() => {
      that.setData({
        dataList: [],
        curListData: [],
      });
      $stopWuxRefresher()
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
  //获取一级类别
  getFirstGoodsClassVoList: function() {
    var that = this;
    request(api.getFirstGoodsClassVoList).then(res => {
      let categoryData = [{
        id: '',
        name: '全部'
      }]
      that.setData({
        categoryData: categoryData.concat(res.data.dataList)
      });
    })
  }
})