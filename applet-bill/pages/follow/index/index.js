import util from '../../../utils/util.js';
import api from '../../../config/api.js';
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    queryKey: "",
    dataList: [],
    curListData: [],
    total: 1,
    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((56)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const pages = getCurrentPages()
    if (appInstance.globalData.isChangeCompany === true) {
      appInstance.globalData.isChangeCompany = false;
      wx.reLaunch({
        url: '/' +  pages[pages.length - 1].route
      })
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function (e) {
    this.setData({
      queryKey: e.detail.value
    });
  },

  clearInput: function () {
    this.setData({
      queryKey: "",
      dataList: [],
      curListData: [],
      inputShowed: false
    });

  },
  //关键字搜索
  searchSubmit: function () {
    this.setData({
      pageNumber: 1,
    });
    const { queryKey} = this.data;
    if (queryKey.length<5){
      util.showErrorToast('请输入串号（右匹配，至少5位）~')
      return;
    }
    this.getImeiVoList();
  },
  bindScanCode: function () {
    const that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: ({ result, scanType, charSet, path }) => {
        wx.navigateTo({
          url: `/pages/follow/imeiDetailVo/imeiDetailVo?queryKey=${result}`
        })

      }
    })
  },
  // 获取列表
  getImeiVoList: function () {
    const _this = this;
    const { queryKey, pageNumber, pageSize, } = this.data;
    util.request(api.getSimpleImeiVoPageList, {
      queryKey,
      pageNumber,
      pageSize,
    }).then(res => {
      _this.setData({
        dataList: res.data.dataList,
        loadingMore:false,
      });
    });
  },
})