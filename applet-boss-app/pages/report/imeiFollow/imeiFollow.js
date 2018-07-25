import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import request from '../../../utils/request.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode:'BOSS_CHGZ',
    inputShowed: false,
    keyWord: "",
    dataList: [],
    curListData: [],
    total: 1,
    page: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
    authValidate:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBossAuthValidate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
  onShow: function() {

  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function(e) {
    this.setData({
      keyWord: e.detail.value
    });
  },

  clearInput: function() {
    this.setData({
      keyWord: "",
      dataList: [],
      curListData: [],
      inputShowed: false
    });
  },
  //关键字搜索
  searchSubmit: function() {
    this.search();
  },
  bindScanCode: function() {
    const that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: ({
        result,
        scanType,
        charSet,
        path
      }) => {
        this.setData({
          keyWord: result,
        });
        that.search();
      }
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
    this.getImeiVoList();
  },
  search:function(){
    const {
      keyWord
    } = this.data;
    if (keyWord.length < 5) {
      util.showErrorToast('请输入串号（右匹配，至少5位）~')
      return;
    }
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getImeiVoList();
  },
  // 获取列表
  getImeiVoList: function() {
    
    const that = this;
    const {
      keyWord,
      page,
      pageSize,
      authValidate
    } = this.data;
    this.setData({
      inputShowed: true
    })
    request(api.getImeiTrackingMainData, {
      keyWord,
      page,
      pageSize,
    }).then(res => {
      if (Array.isArray(res.data.dataList)){
        for (let i = 0; i < res.data.dataList.length;i++){
          var item = res.data.dataList[i];
          item.url = `/pages/report/imeiFollowDetail/imeiFollowDetail?imeiId=${item.imeiId}&CKCBJ=${authValidate.CKCBJ}`;
        }
      }

      let dataList = that.data.dataList.concat(res.data.dataList)

      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });
      if (page == 1 && dataList.length === 1) {
       wx.navigateTo({
         url: dataList[0].url,
       })
      }
    });
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
  }
})