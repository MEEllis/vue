import util from '../../../utils/util.js';
import api from '../../../config/api.js';
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我的营业款", "我的销量", "我的排行"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    toDayDate: '',
    curDayDate: '',
    receiptsVo: null,
    isShrink: true,
    scrollHeightTab1: 0,
    tabContent2: ["今日", "昨日", "本月", "上月", "自定义"],
    tabContentObj2: null,
    scrollHeightTab2: 0,
    activeIndex2: 0,
    startTime2: '',
    endTime2: '',
    tabContent3: ["今日", "昨日", "本月", "上月", "自定义"],
    tabContentObj3: null,
    scrollHeightTab3: 0,
    activeIndex3: 0,
    startTime3: '',
    endTime3: '',
    thirdPartySort: 1,
    addedServices: 1,
    installmentSort: 1,
    goodsSort: 1,
    operatorSort: 1,
    modalConfirmStartTime: '',
    modalConfirmEndTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.thridModal = this.selectComponent("#thridModal");
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    const curTime = util.formatTime(new Date);
    this.setData({
      startTime2: curTime,
      endTime2: curTime,
      startTime3: curTime,
      endTime3: curTime,
      toDayDate: curTime,
      curDayDate: curTime,
    });
    this.getMySalesStatistics();
    this.getMyReceiptsStatistics();
    this.getMyRankingStatistics();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    util.getScrollHeight([50 + 54 , 50 + 54 + 35 + 10]).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeightTab1: scrollHeight[0],
        scrollHeightTab2: scrollHeight[1],
        scrollHeightTab3: scrollHeight[1],
      })
    })
  },
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    var pages = getCurrentPages()
    if (appInstance.globalData.isChangeCompany === true) {
      appInstance.globalData.isChangeCompany = false;
      wx.reLaunch({
        url: '/' + pages[pages.length - 1].route
      })
    }
  },
  tabClick: function (e) {
    this.thridModal.hide();
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindShrink: function (e) {
    this.setData({
      isShrink: !this.data.isShrink
    })
  },
  // 我的排行  排序
  bindSort: function (e) {
    const { sign, sort } = e.currentTarget.dataset;
    const ranking = {}
    ranking[sign] = Number(sort);
    this.setData(ranking)
  },
  bindReceiptsDate: function (e) {
    const { curDayDate } = this.data;
    const { sign } = e.currentTarget.dataset;
    const curDate = new Date(curDayDate);
    let newDayDate;
    if (sign === 'next') {
      if (curDate >= new Date(util.formatTime(new Date()))) {
        newDayDate = curDayDate
      } else {
        newDayDate = util.formatTime(new Date(curDate.getTime() + 24 * 60 * 60 * 1000));
      }
    } else {
      newDayDate = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
    }
    this.setData({
      curDayDate: newDayDate,
    });

    this.getMyReceiptsStatistics();
  },
  //我的销量 ： 点击今日-明日等
  tabContent2Click: function (e) {
    let startTime, endTime;
    const index = e.currentTarget.dataset.index;
    const tab = e.currentTarget.dataset.tab;
    const curDate = new Date();
    //今日
    if (index == 0) {
      startTime = util.formatTime(curDate);
      endTime = startTime
    } else if (index == 1) {
      //昨日
      startTime = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
      endTime = startTime
    } else if (index == 2) {
      //本月
      startTime = util.formatTime(new Date(new Date().setDate(1)))
      endTime = util.formatTime(curDate);
    } else if (index == 3) {
      //上月
      var day = new Date(curDate.getFullYear(), curDate.getMonth(), 0).getDate();
      var enddate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day);
      startTime = util.formatTime(new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1))
      endTime = util.formatTime(enddate);
    }

    if (tab == 2) {
      this.setData({
        activeIndex3: index,
      });
      if (index < 4) {
        this.setData({
          startTime3: startTime,
          endTime3: endTime,
        });
        this.getMyRankingStatistics();
      } else {
        this.setData({
          modalConfirmStartTime: this.data.startTime3,
          modalConfirmEndTime: this.data.endTime3,
        });
        this.thridModal.show();
      }
    } else if (tab == 1) {
      this.setData({
        activeIndex2: index,
      });
      if (index < 4) {
        this.setData({
          startTime2: startTime,
          endTime2: endTime,
        });
        this.getMySalesStatistics();
      } else {
        this.setData({
          modalConfirmStartTime: this.data.startTime2,
          modalConfirmEndTime: this.data.endTime2,
        });
        this.thridModal.show();
      }
    }


  },
  bindCurDate: function (e) {
    this.setData({
      curDayDate: e.detail.value
    })
    this.getMyReceiptsStatistics();
  },
  bindDateStart: function (e) {
    this.setData({
      modalConfirmStartTime: e.detail.value
    })
  },
  bindDateEnd: function (e) {
    this.setData({
      modalConfirmEndTime: e.detail.value
    })
  },
  modalConfirm: function (e) {

    const { activeIndex, modalConfirmStartTime, modalConfirmEndTime } = this.data;

    if (activeIndex == 1) {
      this.setData({
        startTime2: modalConfirmStartTime,
        endTime2: modalConfirmEndTime,
      })
      this.getMySalesStatistics();
    } else if (activeIndex == 2) {
      this.setData({
        startTime3: modalConfirmStartTime,
        endTime3: modalConfirmEndTime,
      })
      this.getMyRankingStatistics();
    }
    this.thridModal.hide();
  },
  // 获取销量明细信息
  getMySalesStatistics: function () {
    const _this = this;
    const { startTime2, endTime2 } = this.data;

    util.request(api.getMySalesStatistics, {
      startTime: startTime2,
      endTime: endTime2,
    },
      'GET'
    ).then(res => {
      let tabContentObj2 = res.data;
      const dealNullObj = (item) => {
        if (item == null) {
          item = {
            totalCount: 0,
            totalAmount: 0,
            detailList: []
          }
        }
        return item;
      }
      for (const keyItem in tabContentObj2) {
        tabContentObj2[keyItem] = dealNullObj(tabContentObj2[keyItem])
      }
      _this.setData({
        tabContentObj2,
      });
    });
  },
  // 获取营业款明细信息
  getMyReceiptsStatistics: function () {
    const _this = this;
    const { curDayDate } = this.data;

    util.request(api.getMyReceiptsStatistics, {
      startTime: curDayDate,
      endTime: curDayDate,
    },
      'GET'
    ).then(res => {
      let receiptsVo = res.data.receiptsVo;
      _this.setData({
        receiptsVo,
      });
    });
  },
  // 获取营业款明细信息
  getMyRankingStatistics: function () {
    const _this = this;
    const { startTime3, endTime3 } = this.data;

    util.request(api.getMyRankingStatistics, {
      startTime: startTime3,
      endTime: endTime3,
    },
      'GET'
    ).then(res => {
      const tabContentObj3 = res.data;
      _this.setData({
        tabContentObj3,
      });
    });
  },
})