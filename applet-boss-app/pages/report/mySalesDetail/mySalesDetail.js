import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companySectionParam: "",
    goodsClassId: 0,
    goodsBrandId: 0,
    keyWord: "",
    startDate: "",
    endDate: "",
    salesType: 0,
    nodeType: "",
    page: 1,
    pageSize: 20,
    detailKeyWord: "",
    sectionId: '',
    goodsQuantity: '',
    goodsAmount: '',
    goodsAvgProfitAmount: '',
    goodsProfitAmount: '',
    CKCBJ: false,
    dataList: [],
    curListData: [],
    loadingMore: true,
    scrollHeight: 0,
    totalVo: null,
    sectionName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      sectionId,
      sectionName,
      goodsQuantity,
      goodsAmount,
      goodsAvgProfitAmount,
      goodsProfitAmount,
      CKCBJ,
    } = options;
    companySectionParam = companySectionParam === undefined ? '' : companySectionParam;
    goodsClassId = goodsClassId === undefined ? '' : goodsClassId;
    goodsBrandId = goodsBrandId === undefined ? '' : goodsBrandId;
    keyWord = keyWord === undefined ? '' : keyWord;
    startDate = startDate === undefined ? '' : startDate;
    endDate = endDate === undefined ? '' : endDate;
    salesType = salesType === undefined ? '' : salesType;
    nodeType = nodeType === undefined ? '' : nodeType;
    sectionId = sectionId === undefined ? '' : sectionId;
    sectionName = sectionName === undefined ? '' : sectionName;

    goodsQuantity = goodsQuantity === undefined ? '' : goodsQuantity;
    goodsAmount = goodsAmount === undefined ? '' : goodsAmount;
    goodsAvgProfitAmount = goodsAvgProfitAmount === undefined ? '' : goodsAvgProfitAmount;
    goodsProfitAmount = goodsProfitAmount === undefined ? '' : goodsProfitAmount;
    CKCBJ = CKCBJ === 'true' ? true : false;

    this.setData({
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      sectionId,
      sectionName,
      goodsQuantity,
      goodsAmount,
      goodsAvgProfitAmount,
      goodsProfitAmount,
      CKCBJ,

    });
    this.getDataList()
    this.getTotalVo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    const {
      nodeType,
      CKCBJ,
    } = this.data;
    let section = 0;
    if (nodeType == 'Section') {
      wx.setNavigationBarTitle({
        title: '门店销量详情'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '公司销量详情'
      })
    }
    util.getScrollHeight((section + 52 + 25 + 46)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })

    util.getScrollHeightByEle(['list-wrap', 'search-bar', 'sel-time', 'sum-wrap']).then((scrollHeight) => {
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
    });
    this.getDataList();
    this.getTotalVo()
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
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getMySalesDetailData, postData)
      .then(res => {

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
    const that = this;
    const postData = this.getSearchParam();
    request(api.getMySalesDetailTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },
  getSearchParam: function() {
    const {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      detailKeyWord,
      sectionId
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      detailKeyWord,
      sectionId
    }
  }
})