// pages/stock/stock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    activeCategoryId: '',
    categoryData: [{
      id: '',
      text: '全部'
    }, {
      id: '1',
      text: '手机'
    }, {
      id: '2',
      text: '手机配件'
    }, {
      id: '3',
      text: '赠品礼品'
    }, {
      id: '4',
      text: '零件'
    }, {
      id: '5',
      text: '器件'
    }, {
      id: '6',
      text: '元件'
    }, {
      id: '7',
      text: '华为'
    }],
    listDatas: [{
      id: '1',
      title: '商品列表1',
      myStock: '2',
      otherStock: '5000',
      price: '3000',
      oneCate: '手机'
    }, {
      id: '2',
      title: '商品列表2',
      myStock: '3',
      otherStock: '5000',
      price: '3000',
      oneCate: '手机'
    }, {
      id: '3',
      title: '商品列表3',
      myStock: '3',
      otherStock: '5000',
      price: '3000',
      oneCate: '手机'
    }, {
      id: '4',
      title: '商品列表4商品列表4商品列表4商品列表4商品列表4商品列表4商品列表4',
      myStock: '4',
      otherStock: '5000',
      price: '3000',
      oneCate: '元件元件元件元件'
    }]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})