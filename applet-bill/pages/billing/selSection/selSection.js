import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    inputShowed: false,
    queryKey: "",
    dataList: [],
    dataSource:[],
    scrollHeight: 0,
    sectionId: '',
    addPage: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    const {
      sectionId
    } = options;
    this.setData({
      sectionId: sectionId === undefined ? '' : sectionId,
    })
    this.getGoodsList()
    this.setDelta()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((56 + 6)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function(e) {
    this.setData({
      queryKey: e.detail.value
    });
  },
  hideInput: function() {
    this.setData({
      queryKey: "",
      inputShowed: false
    });
    this.searchSubmit()
  },
  clearInput: function() {
    this.setData({
      queryKey: ""
    });
    this.searchSubmit()
  },
  //关键字搜索
  searchSubmit: function() {
    const {
      dataSource,
      queryKey
    } = this.data;
    if (Array.isArray(dataSource)){
      const dataList = dataSource.filter(data => {
        if (String(data.code).toLowerCase().indexOf(queryKey.toLowerCase()) > -1 || String(data.name).toLowerCase().indexOf(queryKey.toLowerCase()) > -1) {
          return true;
        }
      });
      this.setData({
        dataList,
      });
    }
  },
  //
  tapSel: function(e) {

    const {
      id,
      name
    } = e.currentTarget.dataset;
    const {
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        sectionId: id,
        sectionName: name,
      })
    }
    wx.navigateBack({})
  },
  // 获取商品列表
  getGoodsList: function() {
    const _this = this;
    const {
      queryKey,
    } = this.data;
    util.request(api.getAccessSectionVoList, {
      queryKey,
    }).then(res => {
      if (Array.isArray(res.data.dataList)) {
        res.data.dataList.unshift({
          sectionId: '',
          name: '全部',
        })
      }
      _this.setData({
        dataList: res.data.dataList,
        dataSource: res.data.dataList,
      });
    });
  },
  setDelta: function() {
    const mainPage = util.getMainPage({
      route: 'pages/billing/retailOrderVoSearch/retailOrderVoSearch'
    })
    this.setData({
      addPage: mainPage.addPage,
    });

  }
})