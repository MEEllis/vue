import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_ZZFWZB',
    scrollHeight: 0,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],

    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],

    goodsBrandId: '',
    goodsBrandName: '全部',
    BrandData: [],


    keyWord: '',
    timeActive: 2,
    startDate: '',
    endDate: '',
    groupField: 'salesManName',
    groupFieldName: '业务员编码/业务员名称',
    page: 1,
    pageSize: 20,
    dataList: [],
    curListData: [],
    loadingMore: true,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
    tabs: [{
      name: '业务员',
      searchLab: '业务员编码/业务员名称',
      value: 'salesManName'
    }, {
      name: '商品',
      searchLab: '商品类别/品牌/型号/商品名称/条码',
      value: 'goodsName'
    }, {
      name: '客户',
      searchLab: '客户编码/客户名称',
      value: 'customerName'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
    icon: 'icon-iconfontgerenzhongxin',
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
    this.getFirstGoodsClassVoList()
    this.getGoodsBrandVoList()
    this.getCompanySectionList();
    this.getBossAuthValidate();
    this.searchSubmit();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sel-time', 'weui-navbar', 'sum-wrap']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
      })
    })
  },
  tabClick: function(e) {
    const groupField = e.currentTarget.dataset.value;
    const groupFieldName = e.currentTarget.dataset.lab;
    this.setData({
      groupField,
      groupFieldName,
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.searchSubmit();
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
    const {
      groupField
    } = this.data;
    let icon = '';
    if (groupField === 'salesManName') {
      icon = 'icon-iconfontgerenzhongxin'
    } else if (groupField === 'goodsName') {
      icon = 'icon-shouji'
    } else {
      icon = 'icon-kehu'
    }
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
      icon,
    });
    this.setSlider()
    this.getDataList();
    this.getTotalVo();
  },

  setSlider: function() {
    var that = this;
    const {
      groupField,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === groupField) {
            activeIndex = i;
            break;
          }
        }
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * activeIndex
        });
      }
    });
  },
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/wholesaleReport/wholesaleReport?route=${currentPage.route}&barTitle=批发战报-查询条件`,
    })
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
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      groupField,

    } = this.data;
    return {
      companySectionParam, 
      goodsClassId,
      goodsBrandId,
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

  //获取品牌
  getGoodsBrandVoList: function() {
    var that = this;
    serviceCom.getGoodsBrandList().then(BrandData => {
      that.setData({
        BrandData,
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
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getWholesaleReportData, postData).then(res => {
    
      let dataLists = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList: dataLists,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取总计行对象
  getTotalVo: function() {
    var that = this;
    const postData = this.getSearchParam();
    request(api.getWholesaleReportTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },
  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode,
      tabs,
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate,
        tabs,
      });

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})