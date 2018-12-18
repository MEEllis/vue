import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_YYK',
    scrollHeight: 0,
    keyWord: '',
    startDate: '',
    endDayDate: '',
    dataList: [],
    curListData: [],
    loadingMore: true,
    page: 1,
    pageSize: 20,
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const startDate = util.formatTime(new Date);
    this.setData({
      startDate,
      endDayDate: startDate,
    });
    this.getBossAuthValidate();
    this.searchSubmit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeightByEle(['next-wrap', 'search-bar', 'sum-wrap']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function (e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  bindReceiptsDate: function (e) {
    const {
      startDate
    } = this.data;
    const {
      sign
    } = e.currentTarget.dataset;
    const curDate = new Date(startDate);
    let newDayDate;
    if (sign === 'next') {
      if (curDate >= new Date(util.formatTime(new Date()))) {
        newDayDate = startDate
      } else {
        newDayDate = util.formatTime(new Date(curDate.getTime() + 24 * 60 * 60 * 1000));
      }
    } else {
      newDayDate = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
    }
    this.setData({
      startDate: newDayDate,
    });
    this.searchSubmit()

  },
  bindCurDate: function (e) {
    this.setData({
      startDate: e.detail.value
    })
    this.searchSubmit()
  },
 
  // 展示明细
  tapShowDetail: function (e) {
    const {
      index,
      isshow
    } = e.currentTarget.dataset;
    const {
      dataList
    } = this.data;
    if (Array.isArray(dataList)) {
      dataList[index].isShow = !isshow;
      this.setData({
        dataList,
      });
    }
  },
  //关键字搜索
  searchSubmit: function () {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getDataList();
    this.getTotalVo();
  },
  scrolltolower: function () {
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

  //获取参数
  getSearchParam: function () {
    const {
      keyWord,
      startDate,
    } = this.data;
    return {
      keyWord,
      startDate,
    }
  },

  // 获取商品列表
  getDataList: function () {
    const that = this;
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getRetailPayData, postData).then(res => {
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });
    });
  },
  //获取总计行对象
  getTotalVo: function () {
    var that = this;
    const postData = this.getSearchParam();

    request(api.getRetailPayTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },

  //获取权限
  getBossAuthValidate: function () {
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