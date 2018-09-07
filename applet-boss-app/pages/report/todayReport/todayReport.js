import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_SSKC',
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
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,

    })
    this.getFirstGoodsClassVoList()
    this.getGoodsBrandVoList()
    this.getGoodsList()
    this.getTotalVo();
    this.getBossAuthValidate();

    this.getCompanySectionList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sum-wrap']).then((scrollHeight) => {

      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function (e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  //关键字搜索
  searchSubmit: function () {
    this.search()
  },
  tapAdvanced: function () {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/default/default?route=${currentPage.route}&barTitle=实时库存-查询条件`,
    })
  },
  //选择一级类别
  cateTap: function (e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
    });
    this.search()
  },
  scrolltolower: function () {
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
  search: function () {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.getGoodsList();
    this.getTotalVo();
  },
  // 展示明细
  tapShowDetail: function (e) {
    const {
      index,
      isshow
    } = e.currentTarget.dataset;
    const {
      dataList
    } = this.data;
    if (Array.isArray(dataList)) {
      dataList[index].isShow = !isshow;
      this.setData({
        dataList,
      });
    }

  },
  setCompanySectionParam() {
    const {
      companySectionParamNodeType,
      companySectionParamId,
    } = this.data;
    let companySectionParam = '';
    companySectionParam = serviceCom.setCompanySectionParam(companySectionParamNodeType, companySectionParamId);
    this.setData({
      companySectionParam,
    });
  },
  //获取一级类别
  getFirstGoodsClassVoList: function () {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },
  //获取品牌
  getGoodsBrandVoList: function () {
    var that = this;
    serviceCom.getGoodsBrandList().then(BrandData => {
      that.setData({
        BrandData,
      });
    })

  },
  //获取公司
  getCompanySectionList: function () {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getCompanySectionList({
      menuCode,
    }).then(companySectionParamData => {
      that.setData({
        companySectionParamData,
      });
    })
  },
  // 获取商品列表
  getGoodsList: function () {
    const that = this;
    this.setCompanySectionParam();
    const {
      companySectionParam,
      keyWord,
      goodsClassId,
      page,
      pageSize,
      goodsBrandId,
    } = this.data;

    request(api.getCurrentStockData, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
      page,
      pageSize,
    }).then(res => {
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          var item = res.data.dataList[i];
          item.url = `/pages/report/stockRealtimeDetail/stockRealtimeDetail?goodsId=${item.goodsId}&goodsName=${item.goodsName}&goodsQuantity=${item.goodsQuantity}&goodsPrice=${item.goodsPrice}&goodsAmount=${item.goodsAmount}&companySectionParam=${companySectionParam}`;
        }
      }

      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取总计行对象
  getTotalVo: function () {
    var that = this;
    this.setCompanySectionParam();
    const {
      companySectionParam,
      keyWord,
      goodsClassId,
      goodsBrandId,
    } = this.data;

    request(api.getCurrentStockTotalVo, {
      companySectionParam,
      goodsClassId,
      goodsBrandId,
      keyWord,
    }).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
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