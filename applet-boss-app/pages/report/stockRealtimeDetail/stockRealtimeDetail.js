import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    detailKeyWord: "",
    companySectionParam: "",
    goodsId: "",
    goodsName: "",
    goodsPrice: 0,
    goodsAmount: 0,
    CKCBJ: false,
    page: 1,
    pageSize: 20,
    dataList: [],
    curListData: [],
    loadingMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      goodsId,
      companySectionParam,
      goodsName,
      goodsQuantity,
      goodsPrice,
      goodsAmount,
      CKCBJ,
    } = options;
    companySectionParam = companySectionParam === undefined ? '' : companySectionParam;
    goodsId = goodsId === undefined ? '' : goodsId;
    goodsName = goodsName === undefined ? '' : goodsName;
    goodsQuantity = goodsQuantity === undefined ? '' : goodsQuantity;
    goodsPrice = goodsPrice === undefined ? '' : goodsPrice;
    goodsAmount = goodsAmount === undefined ? '' : goodsAmount;
    CKCBJ = CKCBJ === 'true' ? true : false;

    this.setData({
      companySectionParam,
      goodsId,
      goodsName,
      goodsQuantity,
      goodsPrice,
      goodsAmount,
      CKCBJ,
    });
    this.getDataList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['list-item','search-bar']).then((scrollHeight) => {
      
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
      detailKeyWord: keyWord,
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

  },
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
  //获取 详情
  getDataList: function() {
    const that = this;
    const {
      detailKeyWord,
      companySectionParam,
      goodsId,
      page,
      pageSize,
    } = this.data;
    if (goodsId != '') {
      request(api.getCurrentStockDetailData, {
          detailKeyWord,
          companySectionParam,
          goodsId,
          page,
          pageSize,
        })
        .then(res => {

          let dataList = that.data.dataList.concat(res.data.dataList)
          that.setData({
            dataList,
            curListData: res.data.dataList,
            loadingMore: false,
          });

        });
    }

  },
})