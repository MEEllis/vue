import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_KCFB',
    scrollHeight: 0,
    keyWord: '',
    items: [],
    page: 1,
    pageSize: 20,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    goodsBrandId: '',
    goodsBrandName: '全部',
    BrandData: [],
    dataList: [],
    curListData: [],
    loadingMore: true,

    authValidate: {
      FW: true,
      CKCBJ: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,

    })
    this.getFirstGoodsClassVoList()
    this.getGoodsBrandList()
    this.getGoodsList()
    this.getBossAuthValidate();
    this.getCompanySectionList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((46 + 52 + 5)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  //关键字搜索
  searchSubmit: function() {
    this.setData({
      page: 1,
      dataList: [],
    });
    this.getGoodsList();

  },
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/default/default?route=${currentPage.route}&barTitle=库存分布-查询条件`,
    })
  },
  //选择一级类别
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
      page: 1,
      dataList: [],
    });
    this.getGoodsList();
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
    this.getGoodsList();
  },

  setCompanySectionParam() {
    const {
      companySectionParamNodeType,
      companySectionParamId,
    } = this.data;
    let companySectionParam = '';
    if (companySectionParamNodeType != '') {
      companySectionParam = companySectionParamNodeType + ',' + companySectionParamId
    }
    this.setData({
      companySectionParam,
    });
  },
  //获取一级类别
  getFirstGoodsClassVoList: function() {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })


  },
  //获取品牌
  getGoodsBrandList: function() {
    var that = this;
    serviceCom.getGoodsBrandList().then(BrandData => {
      that.setData({
        BrandData,
      });
    })

  },
  //获取公司
  getCompanySectionList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;

    request(api.getCompanySectionList, {
      menuCode,
      kcFalg: 1,
    }).then(res => {
      let companySectionParamData = [{
        id: '',
        code: '',
        nodeType: '',
        name: '全部'
      }]
      that.setData({
        companySectionParamData: companySectionParamData.concat(res.data.dataList)
      });
    })
  },
  // 获取商品列表
  getGoodsList: function(callback) {
    const that = this;
    this.setCompanySectionParam();
    const {
      menuCode,
      companySectionParam,
      keyWord,
      goodsClassId,
      page,
      pageSize,
      goodsBrandId,
    } = this.data;

    request(api.getStockDistrData, {
      menuCode,
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      page,
      pageSize,
    }).then(res => {
      if (callback) {
        callback(dataList)
      }
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },

  //获取权限
  getBossAuthValidate: function() {
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