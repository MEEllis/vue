import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    imeiId: '',
    ifManageImei: '',
    goodsId: '',
    storageId: '',
    isSee: '',
    goodIndex: '-1', //商品索引
    giftIndex: '-1', //赠品索引
    isGift: '', //是否赠品
    delta: 1,
    addPage: null,
    goodInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      sectionId,
      imeiId,
      ifManageImei,
      goodsId,
      storageId,
      isSee,
      goodIndex,
      giftIndex,
      isGift
    } = options;

    this.setData({
      sectionId: sectionId === undefined ? '' : sectionId,
      goodsId: goodsId === undefined ? '' : goodsId,
      storageId: storageId === undefined ? '' : storageId,
      imeiId: imeiId === undefined ? '' : imeiId,
      ifManageImei: ifManageImei === undefined ? '' : ifManageImei,
      isSee: isSee === undefined ? '' : isSee,
      goodIndex: goodIndex === undefined ? '-1' : goodIndex,
      giftIndex: giftIndex === undefined ? '-1' : giftIndex,
      isGift: isGift === undefined ? '' : isGift,
    });
    this.setDelta();
    //查看状态
    if (isSee == 1) {
      const {
        addPage
      } = this.data;
      if (addPage != null) {
        const {
          goodsVo
        } = addPage.data;
        if (goodIndex != undefined) {
          //赠品
          if (giftIndex != undefined) {
            this.setData({
              goodInfo: goodsVo[goodIndex].giftList[giftIndex]
            });
          } else {
            //商品赠品
            this.setData({
              goodInfo: goodsVo[goodIndex]
            });
          }

        }
      }
    }
    //添加状态
    else {
      if (ifManageImei == 1) {
        this.getImeiGoodsVoByImeiId();
      } else {
        this.getNumberGoodsVoByGoodsId();
      }
    }
    if (isGift == 1) {
      wx.setNavigationBarTitle({
        title: '商品及售价(赠品)'
      })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  //匹配到串号商品(单个)
  getImeiGoodsVoByImeiId: function() {
    var that = this;
    const {
      sectionId,
      imeiId,
      delta
    } = this.data;
    util.request(
      api.getImeiGoodsVoByImeiId, {
        sectionId,
        imeiId,
      },
    ).then(ajaxData => {
      const {
        imeiGoodsVo
      } = ajaxData.data;
      if (imeiGoodsVo) {
        imeiGoodsVo.ifManageImei = 1;
      }
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
  getNumberGoodsVoByGoodsId: function() {
    var that = this;
    const {
      sectionId,
      storageId,
      goodsId,
      delta
    } = this.data;
    util.request(
      api.getNumberGoodsVoByGoodsId, {
        sectionId,
        storageId,
        goodsId,
      },
    ).then(ajaxData => {
      const {
        numberGoodsVo
      } = ajaxData.data;
      if (numberGoodsVo) {
        numberGoodsVo.ifManageImei = 0;
      }
      that.renderData(numberGoodsVo)

    })
  },
  renderData: function(goodInfo) {
    const {
      sectionId,
      isGift
    } = this.data;
    goodInfo.discountRate = this.getDiscountRateByGoodsClassId(goodInfo);
    goodInfo.discountedPrice = Number(util.accDiv(util.accMul(goodInfo.retailPrice, goodInfo.discountRate), 100).toFixed(2));
    goodInfo.discountedAmount = Number(goodInfo.discountedPrice);
    goodInfo.goodsNumber = 1;
    goodInfo.remark = '';
    goodInfo.giftList = [];
    if (isGift == 1) {
      goodInfo.isGift = 1;
    } else {
      goodInfo.isGift = 0;
    }
    //列表不存在录入商品
    this.setData({
      goodInfo,
    })
  },
  inputUnitPrice: function(e) {
    const {
      goodInfo
    } = this.data;

    const discountedPrice = e.detail.num;
    if (goodInfo) {
      goodInfo.discountedPrice = discountedPrice;
      goodInfo.discountedAmount = Number(util.accMul(Number(goodInfo.discountedPrice), Number(goodInfo.goodsNumber)).toFixed(2));
      if (goodInfo.retailPrice != 0) {
        goodInfo.discountRate = Number(util.accMul(util.accDiv(goodInfo.discountedPrice, goodInfo.retailPrice), 100).toFixed(2));
      }
    }
    this.setData({
      goodInfo,
    });

  },
  inputRemark: function(e) {
    const {
      goodInfo
    } = this.data;
    if (goodInfo) {
      goodInfo.remark = e.detail.value;
      this.setData({
        goodInfo,
      });
    }

  },
  inputGoodsNumber: function(e) {
    const {
      num
    } = e.detail
    const {
      goodInfo
    } = this.data;
    if (goodInfo) {
      goodInfo.goodsNumber = num;
      goodInfo.discountedAmount = Number(util.accMul(Number(goodInfo.discountedPrice), Number(goodInfo.goodsNumber)).toFixed(2));
      this.setData({
        goodInfo,
      });
    }

  },

  //检查商品是否录入
  checkGoodsVoItemIsExist: function(goodsVoItem) {
    if (this.data.addPage != null) {
      const {
        goodsVo
      } = this.data.addPage.data;
      if (Array.isArray(goodsVo)) {
        //检查串号商品是否重复
        for (let i = 0; i < goodsVo.length; i++) {
          const {
            goodsId,
            imeiId,
            giftList
          } = goodsVo[i];
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
    }
    return goodsVoItem
  },
  //获取该商品的折扣率
  getDiscountRateByGoodsClassId: function({
    goodsClassId
  }) {
    const addPage = this.data.addPage;
    if (addPage != null) {
      return addPage.getDiscountRateByGoodsClassId({
        goodsClassId
      })
    } else {
      return 100;
    }
  },
  tapOk: function() {
    const {
      goodInfo,
      delta,
      addPage,
      isSee,
      goodIndex,
      giftIndex,
      isGift
    } = this.data;
    if (addPage != null) {
      if (goodInfo.discountedPrice === "" || goodInfo.discountedPrice === undefined || goodInfo.discountedPrice === null) {
        util.showErrorToast(`请输入折后单价!`);
        return;
      }

      const {
        goodsVo,
        curSelIndex
      } = addPage.data;
      if (Array.isArray(goodsVo)) {
        //修改
        if (isSee == 1 && goodIndex >=0) {
          if (giftIndex >=0) {
            goodsVo[goodIndex].giftList[giftIndex] = goodInfo;
          } else {
            goodsVo[goodIndex] = goodInfo;
          }
        }
        //添加
        else {
          //添加赠品
          if (isGift == 1) {
            //选择的索引行
            if (curSelIndex >= 0) {
              const curGoodInfo = goodsVo[curSelIndex];
              if (Array.isArray(curGoodInfo.giftList)) {
                curGoodInfo.giftList.push(goodInfo);
              }
              goodsVo[curSelIndex] = curGoodInfo;
            }

          } else {
            //添加商品
            goodsVo.push(goodInfo);
          }

        }
        addPage.setData({
          goodsVo,
        })
        wx.navigateBack({
          delta: Number(delta),
        })
      }
    }


  },
  tapCancle: function() {
    const {
      delta
    } = this.data;
    wx.navigateBack({
      delta: Number(delta),
    })
  },

  tapDel: function() {
    const {
      delta,
      addPage,
      goodIndex,
      giftIndex
    } = this.data;
    if (addPage != null) {
      addPage.delGoodCon({
        goodIndex,
        giftIndex,
      })
    }
    wx.navigateBack({
      delta: Number(delta),
    })
  },

  setDelta: function() {
    const mainPage = util.getMainPage({
      route: 'pages/billing/addGood/addGood'
    })
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
    });
  }
})