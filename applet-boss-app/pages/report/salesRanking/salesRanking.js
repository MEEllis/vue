import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_XSPH',
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
    rankingGist: 'goodsQuantity', //排行依据goodsQuantity数量,goodsAmount金额,goodsProfitAmount毛利
    salesType: '',
    groupField: 'salesManName',
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
      name: '数量',
      value: 'goodsQuantity'
    }, {
      name: '金额',
      value: 'goodsAmount'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
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
   * 
   */
  onShow: function() {
    const {
      groupField
    } = this.data;
    let title = '';
    if (groupField === 'goodsModelName') {
      title = '型号'
    } else if (groupField === 'sectionName') {
      title = '部门'
    } else if (groupField === 'goodsBrandName') {
      title = '品牌'
    } else {
      title = '营业员'
    }
    wx.setNavigationBarTitle({
      title: '销售排行(按' + title + ')'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sel-time', 'weui-navbar']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
      })
    })
  },
  tabClick: function(e) {
    const rankingGist = e.currentTarget.dataset.value;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      rankingGist,
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
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.setSlider()
    this.getDataList();
  },

  setSlider: function() {
    var that = this;
    const {
      rankingGist,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === rankingGist) {
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
      url: `/pages/common/salesRanking/salesRanking?route=${currentPage.route}&barTitle=销售排行-查询条件`,
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
  //选择一级类别
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
    });
    this.searchSubmit()
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
      salesType,
      groupField,
      rankingGist,
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      keyWord,
      startDate,
      endDate,
      salesType,
      groupField,
      rankingGist,
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
    const {
      page,
      pageSize,
      dataList,
      rankingGist,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getSalesRankingData, postData).then(res => {
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          var item = res.data.dataList[i];
          if (item[rankingGist] >= 0) {
            if (i === 0) {
              if (dataList[0]) {
                item.percent = item[rankingGist] / dataList[0][rankingGist] * 100;
              } else {
                item.percent = 100;
              }
            } else {
              if (dataList[0]) {
                item.percent = item[rankingGist] / dataList[0][rankingGist] * 100;
              } else {
                item.percent = item[rankingGist] / res.data.dataList[0][rankingGist] * 100;
              }
            }
          } else {
            item.percent = 0;
          }

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
  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode,
      tabs,
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      if (authValidate.CKCBJ) {
        tabs.push({
          name: '毛利',
          value: 'goodsProfitAmount'
        })
      }
      that.setData({
        authValidate,
        tabs,
      });

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})