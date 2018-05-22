import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    goodsName: '',
    storageId: '',
    storageName: '',
    sectionName: '',
    total:'',
    pageNumber:1,
    pageSize:20,
    scrollHeight:0,
    dataList:[],
    curListData:[],
    loadingMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    const goodsId = options.goodsId;
    const goodsName = options.goodsName;
    const storageId = options.storageId;
    const storageName = options.storageName;
    const sectionName = options.sectionName;
    this.setData({
      goodsId,
      storageId,
      goodsName,
      storageName,
      sectionName
    });
    wx.setNavigationBarTitle({
      title: '串号明细'
    });
    this.getImeiDetail()
    wx.getSystemInfo({
      success: function (res) {
        //误差调控10
        const scrollHeight = res.windowHeight - res.windowWidth / 750 * ((77 + 50 + 50 + 15) * 2 + 10) 
      
        // 计算主体部分高度,单位为px
        that.setData({
          scrollHeight,
        })
      }
    });
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
  // 获取明细信息
  getImeiDetail: function () {
    const _this = this;
    const { goodsId, storageId, pageNumber, pageSize } = this.data;
    util.request(api.getImeiStockVoPageList, {
      goodsId,
      storageId,
      pageNumber,
      pageSize,
    },
      'GET'
    ).then(res => {

      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        total: res.data.total,
        loadingMore:false,
      });
    });
  },
  scrolltolower:function(){
    const { curListData, pageNumber } = this.data;
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: Number(pageNumber) + 1,
    });
    this.getImeiDetail();
  }
})