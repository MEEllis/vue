import util from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delta: 1,
    addPage: null,
    goodsVo: [],
    curSelIndex: 0,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDelta();
    this.getDataList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((56 + 30 + 10)).then((scrollHeight) => {
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

  },
  tapSelGift: function (e) {
    const { addPage, delta } = this.data;
    const { index } = e.currentTarget.dataset;
    if (addPage) {
      const mainData = addPage.data;
      if (mainData.goodsVo) {
        const { goodsVo, curSelIndex } = mainData;
        if (Array.isArray(goodsVo) && curSelIndex >= 0) {
          goodsVo[curSelIndex].isGift = 1;
          if (index >= 0) {
            goodsVo[index].giftList.push(goodsVo[curSelIndex]);
            goodsVo.splice(goodsVo.findIndex((value, indexs, arr) => {
              return indexs == curSelIndex;
            }), 1)
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

  setDelta: function () {
    const mainPage = util.getMainPage({ route: 'pages/billing/addGood/addGood' })
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
      curSelIndex: mainPage.addPage.data.curSelIndex,
    });
  },
  getDataList: function () {
    const { addPage } = this.data;
    if (addPage) {
      const mainData = addPage.data;
      if (mainData.goodsVo) {
        const { goodsVo } = mainData;
        if (Array.isArray(goodsVo)) {
          this.setData({
            goodsVo: goodsVo,
          });
        }
      }
    }
  },
})