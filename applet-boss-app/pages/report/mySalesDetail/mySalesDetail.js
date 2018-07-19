import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'WDXL',
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
    sectionWord: "",
    menuCode: "",
    sectionId: '',
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
    CKCBJ = CKCBJ === undefined ? false : CKCBJ;

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
      nodeType
    } = this.data;
    var section = 0;
    if (nodeType == 'Section') {
      section = 46
    }
    util.getScrollHeight((section + 52 + 25 + 46 + 5)).then((scrollHeight) => {
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
      sectionWord: keyWord,
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
    const {
      menuCode,
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      sectionWord,
      sectionId,
      page,
      pageSize,
    } = this.data;

    request(api.getMySalesDetailData, {
        menuCode,
        companySectionParam,
        goodsClassId,
        goodsBrandId,
        keyWord,
        startDate,
        endDate,
        salesType,
        nodeType,
        sectionWord,
        sectionId,
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
  },
  //获取总计行对象
  getTotalVo: function() {
    var that = this;

    const {
      menuCode,
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      sectionWord,
      sectionId
    } = this.data;

    request(api.getMySalesDetailTotalVo, {
      menuCode,
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      salesType,
      nodeType,
      sectionWord,
      sectionId
    }).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },
})