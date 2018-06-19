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
    records:'',
    total: 1,
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

    this.getImeiDetail()
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((52 + 50 + 55 + 8)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
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
    }
    ).then(res => {

      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        records: res.data.records,
        total: res.data.total,
        loadingMore:false,
      });
    });
  },
  scrolltolower:function(){
    const { total, pageNumber } = this.data;
    if (pageNumber >= total) {
      return;
    }
    this.setData({
      pageNumber: Number(pageNumber) + 1,
    });
    this.getImeiDetail();
  }
})