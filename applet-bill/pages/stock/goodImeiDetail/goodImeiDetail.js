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

    this.getImeiDetail()
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((77 + 50 + 50 + 8)).then((scrollHeight) => {
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