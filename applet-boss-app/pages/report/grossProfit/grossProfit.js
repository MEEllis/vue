import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_MLZB',
    scrollHeight: 0,
    keyWord: '',

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

    goodsBrandId: '',
    goodsBrandName: '全部',
    BrandData: [],


    dataList: [],
    curListData: [],
    loadingMore: true,
    startDate: '',
    endDate: '',
    timeActive: 2,
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
    salesType: '',

    groupField: 'goodsClassName',
    groupFieldName: '类别',
    tabs: [{
      name: '类别',
      value: 'goodsClassName'
    }, {
      name: '品牌',
      value: 'goodsBrandName'
    }, {
      name: '商品',
      value: 'goodsName'
    }, {
      name: '部门',
      value: 'sectionName'
    }, {
      name: '营业员',
      value: 'salesManName'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
    icon: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
    wx.getSystemInfo({
      success: function(res) {

      }
    });

    this.getFirstGoodsClassVoList()
    this.getGoodsBrandVoList()

    this.getBossAuthValidate();
    this.getCompanySectionList();
    this.search()
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
    const groupFieldName = e.currentTarget.dataset.name;

    this.setData({
      groupField,
      groupFieldName,
      sliderOffset: e.currentTarget.offsetLeft,
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getGoodsList();
  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  search: function() {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.setSlider()
    this.getGoodsList();
    this.getTotalVo();
  },

  //关键字搜索
  searchSubmit: function() {
    this.search()
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
      url: `/pages/common/grossProfit/grossProfit?route=${currentPage.route}&barTitle=毛利战报-查询条件`,
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
      page: 1,
      dataList: [],
    });
    this.search()
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
    this.getGoodsList();
  },

  setCompanySectionParam() {
    const {
      companySectionParamNodeType,
      companySectionParamId,
    } = this.data;
    let companySectionParam = '';
    if (companySectionParamNodeType != '') {
      companySectionParam = companySectionParamNodeType + ',' + companySectionParamId
    }
    this.setData({
      companySectionParam,
    });
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
  // 获取商品列表
  getGoodsList: function() {
    const that = this;
    this.setCompanySectionParam();
    const {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      groupField,
      salesType,
      page,
      pageSize,
    } = this.data;
    request(api.getGrossProfitData, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      groupField,
      salesType,
      page,
      pageSize,

    }).then(res => {
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          let item = res.data.dataList[i];
          item.url = `/pages/report/grossProfitDetail/grossProfitDetail?companySectionParam=${companySectionParam}&goodsClassId=${goodsClassId}&goodsBrandId=${goodsBrandId}&keyWord=${keyWord}&startDate=${startDate}&endDate=${endDate}&salesType=${salesType}&groupField=${groupField}&nodeName=${item.name}&nodeId=${item.id}&groupField=${groupField}`
        }
      }
      let icon = '';
      if (groupField == 'goodsClassName') {
        icon = 'icon-shangpinleibie-copy'
      } else if (groupField == 'goodsBrandName') {
        icon = 'icon-pinpai'
      } else if (groupField == 'goodsName') {
        icon = 'icon-shouji'
      } else if (groupField == 'sectionName') {
        icon = 'icon-iconfontdianpu5'
      } else if (groupField == 'salesManName') {
        icon = 'icon-iconfontgerenzhongxin'
      }
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
        icon,
      });

    });
  },

  //获取总计行对象
  getTotalVo: function() {
    var that = this;
    this.setCompanySectionParam();
    const {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      groupField,
      salesType,
    } = this.data;

    request(api.getGrossProfitTotalVo, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      startDate,
      endDate,
      groupField,
      salesType,
    }).then(res => {

      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },
  //获取权限
  getBossAuthValidate: function() {
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