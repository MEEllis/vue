import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import reg from '../../../config/reg.js';
import bill from '../../../services/bill.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    customerTelephone: '',
    customerName: '',
    totalAmount: 0,
    totalSum: 0,
    goodsVo: [],
    vipVo: {},
    delBtnWidth: 80,
    curSelIndex: '',
    scrollHeight: 0,
    billsId: '', //草稿单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      customerTelephone,
      sectionId,
      customerName,
      billsId
    } = options;
    customerTelephone = customerTelephone === undefined ? '' : customerTelephone;
    sectionId = sectionId === undefined ? '' : sectionId;
    customerName = customerName === undefined ? '' : customerName;
    billsId = billsId === undefined ? '' : billsId;
    this.setData({
      customerTelephone,
      sectionId,
      customerName,
      billsId,
    });

    this.getVipVo(); //加载会员信息

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((52 + 60 + 50 + 4)).then((scrollHeight) => {
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
    const {
      goodsVo
    } = this.data
    let totalAmount = 0;
    let totalSum = 0;
    if (Array.isArray(goodsVo)) {
      for (let i = 0; i < goodsVo.length; i++) {
        const goodsItem = goodsVo[i];
        totalSum = util.accAdd(totalSum, goodsItem.goodsNumber)
        if (goodsItem.isGift != 1) {
          totalAmount = util.accAdd(totalAmount, goodsItem.discountedAmount)
        } else {
          goodsItem.discountedPrice = 0;
          goodsItem.discountedAmount = 0;
        }
        if (Array.isArray(goodsItem.giftList)) {
          for (let j = 0; j < goodsItem.giftList.length; j++) {
            const giftItem = goodsItem.giftList[j];
            totalSum = util.accAdd(totalSum, giftItem.goodsNumber);
            giftItem.discountedPrice = 0;
            giftItem.discountedAmount = 0;
          }
        }

      }
    }
    this.setData({
      totalAmount,
      totalSum,
      goodsVo,
    })
  },
  // 上一步
  tapPrevious: function(e) {
    wx.navigateBack({

    })
  },
  // 存草稿
  tapSaveDraft: function(e) {
    this.saveDraft((res) => {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/billing/index/index'
        });
      }, 1500)
    })
  },
  saveDraft: function(callBack) {
    const {
      goodsVo,
      vipVo,
      billsId,
      sectionId,
      customerTelephone,
      totalAmount
    } = this.data;
    if (Array.isArray(goodsVo)) {
      if (goodsVo.length === 0) {
        util.showErrorToast('请添加商品！')
      } else {
        const goodsDetailList = [];
        const addItemFun = function(item, goodIndex, giftIndex) {
          let orderNo = '';
          if (goodIndex >= 0) {
            orderNo += (goodIndex + 1)
          }

          if (giftIndex >= 0) {
            orderNo += '.' + (giftIndex + 1)
          }
          return {
            "orderNo": orderNo,
            "giftFlag": item.isGift == 1 ? 1 : 0,
            "storageId": item.storageId,
            "goodsId": item.goodsId,
            "imeiId": item.imeiId,
            "goodsNumber": item.goodsNumber,
            "retailPrice": item.retailPrice,
            "discountRate": item.discountRate,
            "discountedPrice": item.discountedPrice,
            "discountedAmount": item.discountedAmount,
            "remark": item.remark
          }
        }
        for (let i = 0; i < goodsVo.length; i++) {
          const goodsItem = goodsVo[i];
          goodsDetailList.push(addItemFun(goodsItem, i));
          if (Array.isArray(goodsItem.giftList)) {
            for (let j = 0; j < goodsItem.giftList.length; j++) {
              const giftItem = goodsItem.giftList[i];
              goodsDetailList.push(addItemFun(giftItem, i, j));
            }
          }
        }

        const order = JSON.stringify({
          "billsId": billsId,
          "sectionId": sectionId,
          "customerId": vipVo.customerId,
          "customerName": vipVo.customerName,
          "customerTelephone": customerTelephone,
          "ignoredAmount": 0,
          "totalAmount": totalAmount,
          "totalPayAmount": totalAmount,
          "shouldReceiveAmount": totalAmount,
          "remark": "",
          "goodsDetailList": goodsDetailList,
          "paymentReceivedOrderVo": {
            "detailList": []
          }
        });

        util.request(
          api.saveDraftRetailVo, {
            order
          }
        ).then(res => {
          util.showErrorToast('保存草稿单成功！')
          if (callBack) {
            callBack(res)
          }
        })
      }
    } else {
      util.showErrorToast('请添加商品！')
    }
  },
  // 删除本单
  tapDelDraft: function(e) {
    const {
      billsId,
    } = this.data;
    if (billsId != '') {
      util.request(
        api.deleteDraftRetailOrderVo, {
          billsId
        }
      ).then(res => {
        util.showErrorToast('删除草稿单成功！')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/billing/index/index'
          });
        }, 1500)
      })
    } else {
      util.showErrorToast('当前单据不是草稿单！')
    }
  },
  tapNewDraft: function(e) {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '您确定新开单吗？确定后，本单将存为草稿。',
      success: function(res) {
        if (res.confirm) {
          that.saveDraft((res) => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/billing/newBilling/newBilling'
              });
            }, 1500)
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 收款
  tapPay: function(e) {
    wx.navigateTo({
      url: `/pages/billing/receiptMain/receiptMain`,
    })
  },
  // 扫码
  tapScanCode: function() {
    this.addShow(3, 0);
  },

  //录串号
  tapLuru: function() {
    this.addShow(1, 0);
  },
  //选商品
  tapSelGood: function() {
    this.addShow(2, 0);
  },
  //添加商品
  tapAddSheet: function() {
    this.showSheet({
      isGift: 0
    })
  },
  //删除商品
  delGood: function(e) {
    const {
      goodindex
    } = e.currentTarget.dataset;
    this.delGoodCon({
      goodIndex: goodindex
    });
    this.onShow()
  },
  delGoodCon: function({
    goodIndex,
    giftIndex
  }) {
    const {
      goodsVo
    } = this.data;
    if (Array.isArray(goodsVo)) {
      const curGoodinfo = goodsVo[goodIndex];
      if (curGoodinfo.isGift != 1 && giftIndex >= 0) {
        const giftList = goodsVo[goodIndex].giftList;
        if (Array.isArray(giftList)) {
          giftList.splice(giftList.findIndex((value, indexs, arr) => {
            return indexs == giftIndex;
          }), 1)
          goodsVo[goodIndex].giftList = giftList;
        }
      }
      //商品
      else {
        goodsVo.splice(goodsVo.findIndex((value, indexs, arr) => {
          return indexs == goodIndex;
        }), 1)
      }
    }
    this.setData({
      goodsVo,
    });
  },
  //添加赠品
  tapAddGift: function(e) {
    const {
      index,
      isgift
    } = e.currentTarget.dataset;
    if (isgift != 1) {
      this.setData({
        curSelIndex: index,
      })
      this.showSheet({
        isGift: 1
      })
    }
  },
  //设置赠品
  tapSetGift: function(e) {
    const {
      index,
      isgift,
      len
    } = e.currentTarget.dataset;
    if (isgift != 1 && len == 0) {
      this.setData({
        curSelIndex: index,
      })
      wx.navigateTo({
        url: `/pages/billing/setGift/setGift`,
      })
    }
  },
  showSheet: function({
    isGift
  }) {
    var that = this;
    wx.showActionSheet({
      itemList: ['录串号', '选商品', '扫串号/条码'],
      success: function(res) {
        that.addShow(res.tapIndex + 1, isGift);
      }
    })
  },

  addShow: function(flag, isGift) {
    const {
      sectionId
    } = this.data;

    if (flag == 1) {
      //录串号
      wx.navigateTo({
        url: `/pages/billing/ruluImei/ruluImei?sectionId=${sectionId}&isGift=${isGift}`,
      })
    } else if (flag == 2) {
      //选商品
      wx.navigateTo({
        url: `/pages/billing/selGood/selGood?sectionId=${sectionId}&isGift=${isGift}`,
      })
    } else {
      //扫码
      wx.scanCode({
        success: (res) => {
          const {
            result
          } = res;
          util.request(
            api.getScanResultVo, {
              queryKey: result,
              sectionId,
            },
          ).then(ajaxData => {
            const {
              scanResultVo
            } = ajaxData.data;
            const modal = () => {
              wx.showModal({
                title: '提示',
                content: `无匹配库存串号或商品条码!扫码结果：${result}`,
                showCancel: false,
                confirmColor: '#476ec9',
                success: function(res) {

                }
              })
            }
            if (scanResultVo !== null) {

              if (scanResultVo.type == 1) {
                modal();
              } else if (scanResultVo.type == 2) {
                wx.navigateTo({
                  url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&goodsId=${scanResultVo.goodsId}&imeiId=${scanResultVo.imeiId}&ifManageImei=1&isGift=${isGift}`,
                })
              } else if (scanResultVo.type == 3) {
                wx.navigateTo({
                  url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&storageId=${scanResultVo.storageId}&goodsId=${scanResultVo.goodsId}&ifManageImei=0&isGift=${isGift}`,
                })
              } else {
                wx.navigateTo({
                  url: `/pages/billing/selCount/selCount?sectionId=${sectionId}&storageId=${scanResultVo.storageId}&goodsId=${scanResultVo.goodsId}&isGift=${isGift}`,
                })
              }
            } else {
              modal();
            }
          })
        }
      })
    }

  },

  getRetailDraftOrderVo: function() {
    const {
      billsId,
      sectionId,
      goodsVo,
      customerTelephone,
    } = this.data;
    const that = this;
    bill.getRetailDraftOrderVo(billsId).then(res => {
      const {
        orderVo
      } = res.data;
      //切换部门，不载入商品
      if (sectionId == orderVo.sectionId) {
        const {
          goodsDetailList
        } = orderVo;
        if (Array.isArray(goodsDetailList)) {
          for (let i = 0; i < goodsDetailList.length; i++) {
            const goodsDetailItem = goodsDetailList[i];
            if ((goodsDetailItem.orderNo % 1) == 0) {
              goodsDetailItem.isGift = goodsDetailItem.giftFlag;
              goodsDetailItem.giftList = [];
              if (!!customerTelephone != !!orderVo.customerTelephone) {
                goodsDetailItem.discountRate = that.getDiscountRateByGoodsClassId(goodsDetailItem)
                goodInfo.discountedPrice = Number(util.accDiv(util.accMul(goodsDetailItem.retailPrice, goodsDetailItem.discountRate), 100).toFixed(2));
                goodInfo.discountedAmount = Number(util.accMul(goodInfo.discountedPrice, goodInfo.goodsNumber));
              }
              goodsVo.push(goodsDetailItem)
            }
          }
          for (let i = 0; i < goodsDetailList.length; i++) {
            const goodsDetailItem = goodsDetailList[i];
            if ((goodsDetailItem.orderNo % 1) != 0) {
              const orderNoArr = goodsDetailItem.orderNo.split(".");
              goodsDetailItem.isGift = goodsDetailItem.giftFlag;
              if (goodsVo[orderNoArr[0]]) {
                if (!!customerTelephone != !!orderVo.customerTelephone) {
                  goodsDetailItem.discountRate = that.getDiscountRateByGoodsClassId(goodsDetailItem)
                  goodInfo.discountedPrice = Number(util.accDiv(util.accMul(goodsDetailItem.retailPrice, goodsDetailItem.discountRate), 100).toFixed(2));
                  goodInfo.discountedAmount = Number(util.accMul(goodInfo.discountedPrice, goodInfo.goodsNumber));
                }
                goodsVo[orderNoArr[0]].giftList.push(goodsDetailItem)
              }
            }
          }
        }
        that.setData({
          goodsVo,
        });

        that.onShow();
      }
    })
  },
  // 获取会员信息
  getVipVo: function() {
    var that = this;
    const {
      customerTelephone,
      customerName,
      billsId,
    } = this.data;
    if (customerTelephone) {
      util.request(
        api.getVipVo, {
          customerTelephone,
        },
      ).then(res => {
        const {
          vipVo
        } = res.data
        //非会员
        if (vipVo === null) {
          that.setData({
            vipVo: {
              "customerName": customerName,
              "customerTelephone": customerTelephone,
            },
          });
        } 
        //会员
        else {
          // 禁用会员
          if (vipVo.status == 1) {
            // 清空折扣
            vipVo.defaultDiscountRate=100;
            vipVo.goodsDiscountList=[];
            that.setData({
              vipVo: vipVo,
            });
          } else {
            that.setData({
              vipVo,
            });
          }
         
        }

        if (billsId !== '') {
          this.getRetailDraftOrderVo();
        }

      })
    } else {
      that.setData({
        vipVo: {
          "customerName": customerName,
          "customerTelephone": customerTelephone,
        },
      });

      if (billsId !== '') {
        this.getRetailDraftOrderVo();
      }
    }

  },
  //获取该商品的折扣率
  getDiscountRateByGoodsClassId: function({
    goodsClassId
  }) {
    const {
      vipVo
    } = this.data;
    if (vipVo === null) {
      return 100;
    } else {
      const {
        defaultDiscountRate,
        goodsDiscountList,
        status
      } = vipVo;
      if (status == 0) {
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
          return 100;
        }
      } else {
        return 100;
      }

    }

  },
  //手指刚放到屏幕触发
  touchS: function(e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function(e) {
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.goodsVo;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        goodsVo: list
      });
    }
  },
  touchE: function(e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.goodsVo;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        goodsVo: list
      });
    }
  }
})