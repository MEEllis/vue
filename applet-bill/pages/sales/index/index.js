import util from '../../../utils/util.js';
import api from '../../../config/api.js';
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我的营业款", "我的销量", "我的排行"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    toDayDate:null,
    tabContent2: ["今日", "昨日", "本月", "上月", "自定义"],
    tabContentObj2:null,
    scrollHeightTab2:0,
    activeIndex2: 0,
    startTime2: '',
    endTime2: '',
    modalConfirmStartTime2:'',
    modalConfirmEndTime2: '',
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
      toDayDate: curTime,
    });
    this.getMySalesStatistics();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    util.getScrollHeight([0, 50+54+35+10]).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeightTab1: scrollHeight[0],
        scrollHeightTab2: scrollHeight[1],
      })
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //我的销量 ： 点击今日-明日等
  tabContent2Click: function (e) {
    let startTime2, endTime2;

    const activeIndex2 = e.currentTarget.dataset.index;
    const curDate = new Date();
    if (activeIndex2 == 0) {
      startTime2 = util.formatTime(curDate);
      endTime2 = startTime2
    } else if (activeIndex2 == 1) {
      startTime2 = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
      endTime2 = startTime2
    } else if (activeIndex2 == 2) {
      startTime2 = util.formatTime(new Date(new Date().setDate(1)))
      endTime2 = util.formatTime(curDate);
    } else if (activeIndex2 == 3) {
      var day = new Date(curDate.getFullYear(), curDate.getMonth(), 0).getDate();
      var enddate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day);
      startTime2 = util.formatTime(new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1))
      endTime2 = util.formatTime(enddate);
    }
  
    this.setData({
      activeIndex2,
    });
    if (activeIndex2 < 4) {
      this.setData({
        startTime2,
        endTime2,
      });
      this.getMySalesStatistics();
    }else{
 
      this.setData({
        modalConfirmStartTime2: this.data.startTime2,
        modalConfirmEndTime2: this.data.endTime2,
      });
      
      this.thridModal.show();
    }
  },
  //我的销量 ： 点击 表格事件
  tabTable2Click: function (e) {
  
  },
  bindDateStart2: function (e) {
    this.setData({
      modalConfirmStartTime2: e.detail.value
    })
  },
  bindDateEnd2: function (e) {
    this.setData({
      modalConfirmEndTime2: e.detail.value
    })
  },
  modalConfirm2: function (e) {
    this.setData({
      startTime2: this.data.modalConfirmStartTime2,
      endTime2: this.data.modalConfirmEndTime2,
    })
    
    this.thridModal.hide();
    this.getMySalesStatistics();
  },
  // 获取明细信息
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
      const dealNullObj=(item)=>{
        if (item == null) {
           item = {
            totalCount: 0,
            totalAmount: 0,
            detailList: []
          }
        }
        return item;
      }
      for (const keyItem in tabContentObj2){
        tabContentObj2[keyItem] = dealNullObj(tabContentObj2[keyItem])
      }
      _this.setData({
        tabContentObj2,
      });
    });
  },
 
})