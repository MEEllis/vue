import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import reg from '../../../config/reg.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    customerTelephone: '',
    totalAmount: 0,
    totalSum: 0,
    goodsVo: [],
    vipVo: null,
    delBtnWidth: 80,
    curSelIndex: '',
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { customerTelephone, sectionId } = options;
    this.setData({
      customerTelephone,
      sectionId,
    });

    this.getVipVo();//加载会员信息
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
  onShow: function () {
    const { goodsVo } = this.data
    let totalAmount = 0;
    let totalSum = 0;
    if (Array.isArray(goodsVo)) {
      for (let i = 0; i < goodsVo.length; i++) {
        const goodsItem = goodsVo[i];
        totalSum = util.accAdd(totalSum, goodsItem.goodsNumber)
        if (goodsItem.isGift!=1){
          totalAmount = util.accAdd(totalAmount, goodsItem.discountedAmount)
        }
        if (Array.isArray(goodsItem.giftList)) {
          for (let j = 0; j < goodsItem.giftList.length; j++) {
            const giftItem = goodsItem.giftList[i];
            totalSum = util.accAdd(totalSum, giftItem.goodsNumber)
          }
        }

      }
    }
    this.setData({
      totalAmount,
      totalSum,
    })
  },
  // 上一步
  tapPrevious: function (e) {
    wx.navigateBack({

    })
  },
  // 存草稿
  tapSaveDraft: function (e) {
    const { goodsVo, vipVo, sectionId, customerTelephone, totalAmount } = this.data;
    if (Array.isArray(goodsVo)) {
      if (goodsVo.length === 0) {
        util.showErrorToast('请添加商品！')
      } else {
        const goodsDetailList = [];
        const addItemFun = function (item) {
          return {
            "orderNo": item.orderNo,
            "giftFlag": item.isGift,
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
          goodsDetailList.push(addItemFun(goodsItem));
          if (Array.isArray(goodsItem.giftList)) {
            for (let j = 0; j < goodsItem.giftList.length; j++) {
              const giftItem = goodsItem.giftList[i];
              goodsDetailList.push(addItemFun(giftItem));
            }
          }

        }

        const order = {
          "sectionId": sectionId,
          "customerId": vipVo.customerId === undefined ? '' : vipVo.customerId,
          "customerName": vipVo.customerName === undefined ? '' : vipVo.customerName,
          "customerTelephone": customerTelephone,

          "ignoredAmount": 0,
          "totalAmount": totalAmount,
          "totalPayAmount": 5000,
          "shouldReceiveAmount": 5000,
          "remark": "",
          "goodsDetailList": goodsDetailList,
          "paymentReceivedOrderVo": {
            "detailList": [{
              "accountId": "944",
              "accountType": "1",
              "amount": 5000
            }]
          }
        };

        util.request(
          api.saveDraftRetailVo,
          order
        ).then(res => {
          util.showErrorToast('保存草稿单成功！')
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/billing/index/index'
            });
          }, 1500)
        })
      }
    } else {
      util.showErrorToast('请添加商品！')
    }
  },
  // 收款
  tapPay: function (e) {
    wx.navigateTo({
      url: `/pages/billing/receiptMain/receiptMain`,
    })
  },
  // 扫码
  tapScanCode: function () {
    this.addShow(3);
  },

  //录串号
  tapLuru: function () {
    this.addShow(1);
  },
  //选商品
  tapSelGood: function () {
    this.addShow(2);
  },
  //添加商品
  tapAddSheet: function () {
    this.showSheet({ isGift: 0 })
  },
  //删除商品
  delGood: function (e) {
    const { goodIndex } = e.currentTarget.dataset;
    this.delGoodCon({ goodIndex: goodIndex });
  },
  delGoodCon: function ({ goodIndex, giftIndex }) {
    const { goodsVo } = this.data;
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
  tapAddGift: function (e) {
    const { index, isgift } = e.currentTarget.dataset;
    if (isgift != 1 ) {
      this.setData({
        curSelIndex: index,
      })
      this.showSheet({ isGift: 1 })
    }
  },
  //设置赠品
  tapSetGift: function (e) {
    const { index, isgift, len} = e.currentTarget.dataset;
    if (isgift != 1 || len>0) {
      this.setData({
        curSelIndex: index,
      })
      wx.navigateTo({
        url: `/pages/billing/setGift/setGift`,
      })
    }
  },
  showSheet: function ({ isGift }) {
    var that = this;
    wx.showActionSheet({
      itemList: ['录串号', '选商品', '扫串号/条码'],
      success: function (res) {
        that.addShow(res.tapIndex + 1, isGift);
      }
    })
  },

  addShow: function (flag, isGift) {
    const { sectionId } = this.data;

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
          const { result } = res;
          util.request(
            api.getScanResultVo,
            {
              imeiId: result,
              sectionId,
            },
          ).then(ajaxData => {
            const { scanResultVo } = ajaxData.data;
            const modal = () => {
              wx.showModal({
                title: '提示',
                content: `无匹配库存串号或商品条码!扫码结果：${result}`,
                showCancel: false,
                confirmColor: '#476ec9',
                success: function (res) {

                }
              })
            }
            if (scanResultVo !== null) {

              if (scanResultVo.type == 1) {
                modal();
              }
              else if (scanResultVo.type == 2) {
                wx.navigateTo({
                  url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&goodsId=${scanResultVo.goodsId}&imeiId=${scanResultVo.imeiId}&ifManageImei=1&isGift=${isGift}`,
                })
              }
              else if (scanResultVo.type == 3) {
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
  // 获取会员信息
  getVipVo: function () {

    var that = this;
    const { customerTelephone } = this.data;
    util.request(
      api.getVipVo,
      {
        customerTelephone,
      },
    ).then(res => {
      const { vipVo } = res.data
      that.setData({
        vipVo: vipVo === null ? {} : vipVo,
      });
    })
  },

  //手指刚放到屏幕触发
  touchS: function (e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
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
  touchE: function (e) {
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