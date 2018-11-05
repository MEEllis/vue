import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_ZZLFX',
    scrollHeight: 0,
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    keyWord: '',
    timeActive: 2,
    startDate: '',
    endDate: '',
    groupField: 'goodsClassName',
    groupFieldList: [{
      name: '公司',
      value: 'companyName'
    }, {
      name: '部门',
      value: 'sectionName'
    }, {
      name: '类型',
      value: 'goodsClassName'
    }, {
      name: '品牌',
      value: 'goodsBrandName'
    }, {
      name: '型号',
      value: 'goodsModelName'
    }],
    dataList: [],
    authValidate: {
      FW: true,
      CKCBJ: false,
    },


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    const {
      startDate,
      endDate,
    } = util.getCurBMonth();
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      startDate,
      endDate,
    })
    this.getCompanySectionList();
    this.getFirstGoodsClassVoList()
    this.getBossAuthValidate();
    this.getDataList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['search-bar', 'sel-time']).then((scrollHeight) => {
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
      dataList: [],

    });

    this.getDataList();
  },

  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/turnOverRate/turnOverRate?route=${currentPage.route}&barTitle=周转率分析-查询条件`,
    })
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
  //获取参数
  getSearchParam: function() {
    this.setCompanySectionParam();
    const {
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      groupField,

    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,

      groupField,

    }
  },
  //获取一级类别
  getFirstGoodsClassVoList: function() {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
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
  // 获取列表
  getDataList: function() {
    const that = this;
    const postData = this.getSearchParam();
    request(api.turnOverRateData, postData).then(res => {
      that.setData({
        dataList: res.data.dataList,
      });

    });
  },
  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode,

    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate,

      });

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})