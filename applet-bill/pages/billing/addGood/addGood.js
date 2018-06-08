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
    goodsVo: [],
    vipVo: null,
    delBtnWidth: 80,
    curSelIndex:'',
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 上一步
  tapPrevious: function (e) {
    wx.navigateBack({

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
    this.showSheet({ isGift:0})
  },
  //删除商品
  delGood: function (e) {
    const { index } = e.currentTarget.dataset;
    const { goodsVo } = this.data;
    if (Array.isArray(goodsVo)) {
      goodsVo.splice(goodsVo.findIndex((value, indexs, arr) => {
        return indexs == index;
      }), 1)
      this.setData({
        goodsVo,
      });
    }
  },
  //添加赠品
  tapAddGift: function (e) {
    const { index } = e.currentTarget.dataset;
    this.showSheet({ isGift: 1 })
    this.setData({
      curSelIndex: index,
    })
  },
  showSheet: function ({ isGift}) {
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
        vipVo,
      });
    })
  },
  //获取该商品的折扣率
  getDiscountRateByGoodsClassId: function ({ goodsClassId }) {
    const { vipVo } = this.data;
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