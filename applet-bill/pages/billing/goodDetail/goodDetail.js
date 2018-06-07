import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    imeiId: '',
    scanType: '',
    goodsId: '',
    storageId: '',
    delta: 1,
    addPage: {},
    goodInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sectionId, imeiId, scanType, goodsId, storageId } = options;
    this.setData({
      sectionId,
      goodsId,
      storageId,
      imeiId,
      scanType,
    });
    this.setDelta();
    if (scanType == 2) {
      this.getImeiGoodsVoByImeiId();
    } else {
      this.getNumberGoodsVoByGoodsId();
    }
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

  //匹配到串号商品(单个)
  getImeiGoodsVoByImeiId: function () {
    var that = this;
    const { sectionId, imeiId, delta } = this.data;
    util.request(
      api.getImeiGoodsVoByImeiId,
      {
        sectionId,
        imeiId,
      },
    ).then(ajaxData => {
      const { imeiGoodsVo } = ajaxData.data;
      const goodInfo = that.checkGoodsVoItemIsExist(imeiGoodsVo);
      if (goodInfo === false) {
        //列表存在录入商品
        setTimeout(() => {
          wx.navigateBack({
            delta: Number(delta),
          })
        }, 1500)
      } else {

        that.renderData(goodInfo)
      }

    })
  },
  //零售开单通过商品id,仓库id查询唯一数量商品信息
  getNumberGoodsVoByGoodsId: function () {
    var that = this;
    const { sectionId, storageId, goodsId, delta } = this.data;
    util.request(
      api.getNumberGoodsVoByGoodsId,
      {
        sectionId,
        storageId,
        goodsId,
      },
    ).then(ajaxData => {
      const { numberGoodsVo } = ajaxData.data;

      that.renderData(numberGoodsVo)

    })
  },
  renderData: function (goodInfo) {
    goodInfo.discountRate = this.getDiscountRateByGoodsClassId(goodInfo);
    goodInfo.discountedPrice = Number(goodInfo.retailPrice) * Number(goodInfo.discountRate) / 100;
    goodInfo.discountedAmount = Number(goodInfo.discountedPrice);
    goodInfo.goodsNumber = 1;
    goodInfo.remark = '';
    //列表不存在录入商品
    this.setData({
      goodInfo,
    })
  },
  inputUnitPrice: function (e) {
    const { goodInfo } = this.data;
    if (goodInfo) {
      goodInfo.unitPrice = e.detail.value;
      goodInfo.discountedAmount = Number(goodInfo.unitPrice) * Number(goodInfo.goodsNumber);
      this.setData({
        goodInfo,
      });
    }

  },
  inputRemark: function (e) {
    const { goodInfo } = this.data;
    if (goodInfo) {
      goodInfo.remark = e.detail.value;
      this.setData({
        goodInfo,
      });
    }

  },
  inputGoodsNumber: function (e) {
    const { goodInfo } = this.data;
    if (goodInfo) {
      goodInfo.goodsNumber = e.detail.value;
      this.setData({
        goodInfo,
      });
    }

  },

  //检查商品是否录入
  checkGoodsVoItemIsExist: function (goodsVoItem) {

    const { goodsVo } = this.data.addPage.data;

    if (Array.isArray(goodsVo)) {
      //检查串号商品是否重复
      for (let i = 0; i < goodsVo.length; i++) {
        const { goodsId, imeiId, giftList } = goodsVo[i];
        if (goodsVoItem.goodsId == goodsId && goodsVoItem.imeiId == imeiId) {
          util.showErrorToast(`商品：${goodsVoItem.goodsName}已录入，请重新输入!`);
          return false;
        }
        //检查串号赠品商品是否重复
        if (Array.isArray(giftList)) {
          for (let j = 0; j < giftList.length; j++) {
            if (goodsVoItem.goodsId == giftList[j].goodsId && goodsVoItem.imeiId == giftList[j].imeiId) {
              util.showErrorToast(`商品：${goodsVoItem.goodsName}已录入为赠品，请重新输入!`);
              return false;
            }
          }
        }
      }
    }

    return goodsVoItem
  },
  //获取该商品的折扣率
  getDiscountRateByGoodsClassId: function ({ goodsClassId }) {
    const addPage = this.data.addPage;
    const { vipVo } = this.data.addPage.data;
    if (vipVo === null) {
      return 100;
    } else {

      const { defaultDiscountRate, goodsDiscountList } = vipVo;
      if (Array.isArray(goodsDiscountList)) {
        let discountRate = -1;
        for (let i = 0; i < goodsDiscountList.length; i++) {
          if (goodsClassId == goodsDiscountList[i].goodsClassId) {
            discountRate = goodsDiscountList[i].discountRate;
            break;
          }
        }

        if (discountRate === -1) {
          return defaultDiscountRate;
        } else {
          return discountRate;
        }

      } else {
        return defaultDiscountRate;
      }
    }
  },
  tapOk: function () {
    const { goodInfo, delta, addPage } = this.data;
    const { goodsVo } = addPage.data;
    if (Array.isArray(goodsVo)) {
      goodsVo.push(goodInfo);
      addPage.setData({
        goodsVo,
      })
      wx.navigateBack({
        delta: Number(delta),
      })
    }

  },
  tapCancle: function () {

  },

  setDelta: function () {
    const pageList = getCurrentPages();
    let delta = 1;
    let addPage = {}
    for (let i = 0; i < pageList.length; i++) {
      const pageItem = pageList[i]
      if (pageItem.route === 'pages/billing/addGood/addGood') {
        delta = (pageList.length - i - 1);
        addPage = pageItem;
        break;
      }
    }
    this.setData({
      delta,
      addPage
    });
  }
})