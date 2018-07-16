import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import request from '../../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imeiId: '',
    imei: '',
    auxiliaryImei: '',
    statusCode: '',
    nowStatus: '',
    imeiVo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      imeiId,
      imei,
      auxiliaryImei,
      statusCode,
      nowStatus,
    } = options;

    imeiId = imeiId === undefined ? '' : imeiId;
    imei = imei === undefined ? '' : imei;
    auxiliaryImei = auxiliaryImei === undefined ? '' : auxiliaryImei;
    statusCode = statusCode === undefined ? '' : statusCode;
    nowStatus = nowStatus === undefined ? '' : nowStatus;


    this.setData({
      imeiId,
      imei,
      auxiliaryImei,
      statusCode,
      nowStatus,
    });
    this.getDetailImeiVo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  // 获取商品明细
  getDetailImeiVo: function() {
    const _this = this;
    const {
      imeiId
    } = this.data;
    request(api.getImeiTrackingDetailData, {
      imeiId,
    }).then(res => {
      _this.setData({
        imeiVo: res.data.dataList,
      });
    });
  },
})