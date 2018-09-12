import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_DSFDKZB',
    scrollHeight: 0,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    deductionUnitsId: '',
    deductionUnitsName: '全部',
    deductionUnitsData: [],
    activityNamesId: '',
    activityNamesName: '全部',
    activityNamesData: [],

    keyWord: '',
    timeActive: 2,
    startDate: '',
    endDate: '',
    groupField: 'sectionName',
    groupFieldName: '部门编码/部门名称',
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
      name: '门店',
      searchLab: '部门编码/部门名称',
      value: 'sectionName'
    }, {
      name: '营业员',
      searchLab: '营业员编码/营业员名称',
      value: 'salesManName'
    }, {
      name: '活动',
      searchLab: '第三方抵扣单位编码/第三方抵扣单位名称',
      value: 'installmentBusinessName'
    }, {
      name: '单位',
      searchLab: '第三方抵扣单位编码/第三方抵扣单位名称',
      value: 'installmentFeesName'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
    icon: 'icon-iconfontdianpu5',
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
    this.getBossAuthValidate();
    this.getDeductionUnitsList();
    this.getActivityNamesList();
    this.searchSubmit();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['search-bar', 'sel-time', 'weui-navbar', 'sum-wrap']).then((scrollHeight) => {
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
    if (groupField === 'sectionName') {
      icon = 'icon-iconfontdianpu5'
    } else if (groupField === 'salesManName') {
      icon = 'icon-iconfontgerenzhongxin'
    } else if (groupField === 'businessName') {
      icon = 'icon-gedanweidijiaoxizhixueqieyanxiaoshou'
    } else {
      icon = 'icon-gedanweidijiaoxizhixueqieyanxiaoshou'
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
      url: `/pages/common/thirdPartyDeductionReport/thirdPartyDeductionReport?route=${currentPage.route}&barTitle=第三方抵扣战报-查询条件`,
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
      keyWord,
      startDate,
      endDate,
      groupField,
      deductionUnitsId,
      activityNamesId,
    } = this.data;
    return {
      companySectionParam,
      keyWord,
      startDate,
      endDate,
      groupField,
      deductionUnitsId,
      activityNamesId,
    }
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

  //抵扣单位集合
  getDeductionUnitsList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getDeductionUnitsList({
      menuCode,
    }).then(deductionUnitsData => {
      that.setData({
        deductionUnitsData,
      });
    })
  },
  //抵扣活动集合
  getActivityNamesList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getActivityNamesList({
      menuCode,
    }).then(activityNamesData => {
      that.setData({
        activityNamesData,
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
      dataList,
      groupField,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getThirdPartyDeductionReportData, postData).then(res => {
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          var item = res.data.dataList[i];
        }
      }
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
    request(api.getThirdPartyDeductionReportTotalVo, postData).then(res => {
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
  }
})