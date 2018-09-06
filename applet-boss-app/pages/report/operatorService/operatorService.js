import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_YYSYWZB',
    scrollHeight: 0,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    operatorId:'',
    operatorName:'全部',
    operatorData: [],
    operatorUnitId: '',
    operatorUnitName: '全部',
    operatorUnitData: [],
    operatorNameId: '',
    operatorNameName: '全部',
    operatorNameData: [],
    keyWord: '',
    timeActive: 2,
    startDate: '',
    endDate: '',
    groupFeild: 'sectionName',
    groupFieldName: '门店',
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
      value: 'sectionName'
    }, {
      name: '营业员',
        value: 'salesManName'
    }, {
        name: '业务',
        value: 'businessName'
    }, {
        name: '运营商',
        value: 'operatorName'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
    icon:'icon-iconfontdianpu5',
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
    this.getOperatorsList();
    this.getOperatorUnitsList();
    this.getOperatorNameList();
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
    const groupFeild = e.currentTarget.dataset.value;
    const groupFieldName = e.currentTarget.dataset.name;
    this.setData({
      groupFeild,
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
    const { groupFeild} = this.data;
    let icon='';
    if (groupFeild ==='sectionName'){
      icon = 'icon-iconfontdianpu5'
    } else if (groupFeild === 'salesManName'){
      icon = 'icon-iconfontgerenzhongxin'
    } else if (groupFeild === 'businessName') {
      icon = 'icon-zuzhichangsuo-shiyoudanwei'
    } else{
      icon = 'icon-TX_ICO'
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
      groupFeild,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === groupFeild) {
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
      url: `/pages/common/operatorService/operatorService?route=${currentPage.route}&barTitle=运营商业务-查询条件`,
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
      groupFeild,
      operatorId,
      operatorUnitId,
      operatorNameId,
    } = this.data;
    return {
      companySectionParam,
      keyWord,
      startDate,
      endDate,
      groupFeild,
      operatorId,
      operatorUnitId,
      operatorNameId,
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

  //获取运营商名称集合
  getOperatorsList: function () {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getOperatorsList({
      menuCode,
    }).then(operatorData => {
      that.setData({
        operatorData,
      });
    })
  },
  //获取运营商单位
  getOperatorUnitsList: function () {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getOperatorUnitsList({
      menuCode,
    }).then(operatorUnitData => {
      that.setData({
        operatorUnitData,
      });
    })
  },
  //获取运营商业务名称
  getOperatorNameList: function () {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getOperatorNameList({
      menuCode,
    }).then(operatorNameData => {
      that.setData({
        operatorNameData,
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
      groupFeild,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getOperatorServiceData, postData).then(res => {
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
  getTotalVo: function () {
    var that = this;
    const postData = this.getSearchParam();
    request(api.getOperatorServiceTotalVo, postData).then(res => {
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