import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabContent: ['全部', '今日', '昨天', '自定义'],
    activeIndex: 0,
    toDayDate: "",
    curDayDate: "",
    startTime: "",
    endTime: "",
    inputShowed: false,
    queryKey: "",
    dataList: [],
    curListData: [],
    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
    modalConfirmStartTime: '',
    modalConfirmEndTime: '',
    delBtnWidth: 80,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.thridModal = this.selectComponent("#thridModal");
    const curTime = util.formatTime(new Date);
    this.setData({
      toDayDate: curTime,
      curDayDate: curTime,
      modalConfirmStartTime: curTime,
      modalConfirmEndTime: curTime,
    });
    this.getDataList()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((56 + 50 + 35)).then((scrollHeight) => {
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

  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function(e) {
    this.setData({
      queryKey: e.detail.value
    });
  },
  hideInput: function() {
    this.setData({
      queryKey: "",
      inputShowed: false
    });
    this.searchSubmit()
  },
  clearInput: function() {
    this.setData({
      queryKey: ""
    });
    this.searchSubmit()
  },
  //关键字搜索
  searchSubmit: function() {
    this.setData({
      pageNumber: 1,
      dataList: [],
    });
    this.getDataList()
  },
  tabContentClick: function(e) {
    const index = e.currentTarget.dataset.index;
    const curDate = new Date();
    let startTime = ''
    let endTime = ''
    //全部
    if (index == 0) {
      startTime = ''
      endTime = ''
    } else if (index == 1) {
      //今日
      startTime = util.formatTime(curDate);
      endTime = startTime

    } else if (index == 2) {
      //昨日
      startTime = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
      endTime = startTime
    } else {
      this.setData({
        modalConfirmStartTime: util.formatTime(curDate),
        modalConfirmEndTime: util.formatTime(curDate),
      });
      this.thridModal.show();
    }
    if (index < 3) {
      this.setData({
        startTime,
        endTime,
        activeIndex: index,
        pageNumber: 1,
        dataList: [],
      });
      this.getDataList();
    }
  },
  // 获取商品列表
  getDataList: function() {
    const _this = this;
    const {
      queryKey,
      pageNumber,
      pageSize,
      startTime,
      endTime
    } = this.data;
    util.request(api.getDraftRetailOrderVoPageList, {
      startTime,
      endTime,
      queryKey,
      pageNumber,
      pageSize,
    }).then(res => {
      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });
    });
  },
  scrolltolower: function() {
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1,
    });
    this.getDataList();
  },

  bindDateStart: function(e) {
    this.setData({
      modalConfirmStartTime: e.detail.value
    })
  },
  bindDateEnd: function(e) {
    this.setData({
      modalConfirmEndTime: e.detail.value
    })
  },
  // 删除本单
  tapDelDraft: function(e) {

    const {
      goodindex,
      billsid,

    } = e.currentTarget.dataset;
    const {
      dataList
    } = this.data;
    if (billsid != '') {
      util.request(
        api.deleteDraftRetailOrderVo, {
          billsId: billsid,
        }
      ).then(res => {
        util.showErrorToast('删除草稿单成功！')
        dataList.splice(dataList.findIndex((value, indexs, arr) => {
          return indexs == goodindex;
        }), 1)
        this.setData({
          dataList,
        })
      })
    } else {
      util.showErrorToast('当前单据不是草稿单！')
    }
  },
  modalConfirm: function(e) {

    const {
      modalConfirmStartTime,
      modalConfirmEndTime
    } = this.data;

    this.setData({
      startTime: modalConfirmStartTime,
      endTime: modalConfirmEndTime,
      activeIndex: 3,
      pageNumber: 1,
      dataList: [],
    })
    this.getDataList();

    this.thridModal.hide();
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
      var list = that.data.dataList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        dataList: list
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
      var list = that.data.dataList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        dataList: list
      });
    }
  }
})