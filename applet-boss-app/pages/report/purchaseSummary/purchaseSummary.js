import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_CGHZ',
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

    groupField: 'goodsName',
    groupFieldName: '商品',
    supplierId: '',
    supplierName: '全部',
    ContactUnitsData: [],
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

    tabs: [{
      name: '商品',
      value: 'goodsName'
    }, {
      name: '部门',
      value: 'sectionName'
    }, {
      name: '供应商',
      value: 'supplierName'
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


    this.getFirstGoodsClassVoList()
    this.getContactUnits()

    this.getBossAuthValidate();
    this.getCompanySectionList();
    this.search()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((46 + 52 + 25 + 44 + 46)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },
  tabClick: function(e) {
    const groupField = e.currentTarget.dataset.value;
    const groupFieldName = e.currentTarget.dataset.name;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      groupField,
      groupFieldName,
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
      url: `/pages/common/purchase/purchase?route=${currentPage.route}&barTitle=采购汇总-查询条件`,
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
  //获取供应商
  getContactUnits: function() {
    var that = this;
    const {
      menuCode,
      companySectionParamId,
    } = this.data;
    serviceCom.getContactUnitList({
      menuCode,
      companyId: companySectionParamId,
    }).then(ContactUnitsData => {
      that.setData({
        ContactUnitsData,
      });
    })
  },
  //获取公司
  getCompanySectionList: function() {
    var that = this;
    const {
      menuCode,
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
      menuCode,
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      groupField,
      supplierId,
      page,
      pageSize,
    } = this.data;
    request(api.getPurchaseCollectData, {
      menuCode,
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      groupField,
      supplierId,
      page,
      pageSize,

    }).then(res => {
      let icon = '';
      if (groupField == 'goodsName') {
        icon = 'icon-shouji'
      } else if (groupField == 'sectionName') {
        icon = 'icon-iconfontdianpu5'
      } else if (groupField == 'supplierName') {
        icon = 'icon-caigou'
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
      menuCode,
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      groupField,
      supplierId,
    } = this.data;

    request(api.getPurchaseCollectTotalVo, {
      menuCode,
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      groupField,
      supplierId,
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
  }
})