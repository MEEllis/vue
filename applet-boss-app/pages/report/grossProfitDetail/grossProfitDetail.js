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
    nodeId: "",
    page: 1,
    pageSize: 20,
    detailKeyWord: "",
    CKCBJ: false,
    dataList: [],
    curListData: [],
    loadingMore: true,
    scrollHeight: 0,
    totalVo: null,
    nodeName: '',
    groupField: '',
    icon: '',
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
      nodeId,
      groupField,
      icon,
      nodeName,
      CKCBJ,
    } = options;
    companySectionParam = companySectionParam === undefined ? '' : companySectionParam;
    goodsClassId = goodsClassId === undefined ? '' : goodsClassId;
    goodsBrandId = goodsBrandId === undefined ? '' : goodsBrandId;
    keyWord = keyWord === undefined ? '' : keyWord;
    startDate = startDate === undefined ? '' : startDate;
    endDate = endDate === undefined ? '' : endDate;
    salesType = salesType === undefined ? '' : salesType;
    nodeId = nodeId === undefined ? '' : nodeId;
    nodeName = nodeName === undefined ? '' : nodeName;
    groupField = groupField === undefined ? '' : groupField;
    icon = icon === undefined ? '' : icon;
    CKCBJ = CKCBJ === 'true' ? true : false;

    this.setData({
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeId,
      nodeName,
      groupField,
      icon,
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
    let {
      CKCBJ
    } = this.data;
    var section = 0;
    if (CKCBJ == true) {
      section = 39
    }
    util.getScrollHeight((47 + section + 52 + 25)).then((scrollHeight) => {
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

    request(api.getGrossProfitDetailData, postData)
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
    var that = this;
    const postData = this.getSearchParam();
    request(api.getGrossProfitDetailTotalVo, postData).then(res => {
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
      groupField,
      nodeId,
      nodeName,
      detailKeyWord,
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      groupField,
      nodeId,
      nodeName,
      detailKeyWord,
    }
  },
})