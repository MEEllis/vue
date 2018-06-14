import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: true,
    queryKey: "",
    dataList: [],
    curListData: [],
    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
    sectionId: '',
    isGift: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      sectionId,
      isGift
    } = options;
    this.setData({
      sectionId: sectionId === undefined ? '' : sectionId,
      isGift: isGift === undefined ? '' : isGift,
    });
    if (isGift == 1) {
      wx.setNavigationBarTitle({
        title: '录入串号(赠品)'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((56 + 10)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
      inputShowed: false,
      dataList: [],
      curListData: [],
    });
  },
  clearInput: function() {
    this.setData({
      queryKey: "",
      dataList: [],
      curListData: [],
    });

  },
  //关键字搜索
  searchSubmit: function() {
    const {
      queryKey
    } = this.data;
    if (queryKey.length < 5) {
      util.showErrorToast(`请输入商品串号(末5位以上)!`);
    } else {
      this.setData({
        pageNumber: 1,
        dataList: [],
        curListData: [],
      });
      this.getDataList()
    }
  },

  getDataList: function() {
    const {
      sectionId,
      queryKey,
      pageNumber,
      pageSize,
      isGift
    } = this.data;

    const that = this;
    util.request(api.getSimpleImeiGoodsVoPageList, {
      sectionId,
      queryKey,
      pageNumber,
      pageSize,
    }).then(res => {
      let dataList = that.data.dataList.concat(res.data.dataList)
      if (Array.isArray(dataList) && dataList.length === 1) {
        const item = dataList[0];
        wx.navigateTo({
          url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&goodsId=${item.goodsId}&imeiId=${item.imeiId}&ifManageImei=1&isGift=${isGift}`,
        })
        return;
      }
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });

  },
  scrolltolower: function() {
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1,
    });
    this.getDataList();
  },
})