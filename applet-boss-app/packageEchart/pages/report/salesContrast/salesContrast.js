import request from '../../../../utils/request.js';
import util from '../../../../utils/util.js';
import api from '../../../../config/api.js';
import serviceCom from '../../../../services/common.js';
import * as echarts from '../../../component/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_XSDB',
    scrollHeight: 0,
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    keyWord: '',
    salesType:'',
    salesTypeList: [{
      name: '全部',
      value: ''
    }, {
        name: '零售',
        value: '1'
      }, {
        name: '批发',
        value: '2'
      }], 
    groupField: 'goodsQuantity', //
    dataList: [],
    curListData: [],
    loadingMore: true,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
    tabs: [{
      name: '数量',
      value: 'goodsQuantity'
    }, {
        name: '金额',
        value: 'goodsAmount'
    }],
    sliderOffset: 0,
    sliderLeft: 0,
    ec: {
      onInit: initChart
    },
    startDate: '',
    endDate: '',
    startDate1: '',
    endDate1: '',
    toDayDate: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    const curTime = util.formatTime(new Date);

    //获取上个月第一天
    var startDate1 = util.formatTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
    //获取上个月最后一天
    var date = new Date();
    var day = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    var endDate1 = util.formatTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, day));

    const {
      startDate,
      endDate,
    } = util.getCurBMonth();
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      toDayDate: curTime,
      startDate: startDate,
      endDate: endDate,
      startDate1: startDate1,
      endDate1: endDate1,
    })
    this.getCompanySectionList();
    this.getFirstGoodsClassVoList()
    this.getBossAuthValidate();
    this.getDataList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeightByEle(['pie-wrap', 'search-bar', 'weui-navbar']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
      })
    })
  },

  bindDateStart: function (e) {
    const date = e.detail.value;
    const { start, end, target }= e.target.dataset

    const startDate = this.data[start]
    const endDate = this.data[end]
    
    if (new Date(date) > new Date(endDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')
    } else {
      const setObj = {}
      setObj[target] = date
      this.setData(setObj)
      this.searchSubmit();
    }

  },

  bindDateEnd: function (e) {
    const date = e.detail.value;
    const { start, end, target } = e.target.dataset

    const startDate = this.data[start]
    const endDate = this.data[end]

    if (new Date(date) < new Date(startDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')

    } else {
      const setObj = {}
      setObj[target] = date
      this.setData(setObj)
      this.searchSubmit();
    }

  },
 

  tabClick: function (e) {
    const groupField = e.currentTarget.dataset.value;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      groupField,
    });
    this.searchSubmit();
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
    this.setData({
      dataList: [],
      loadingMore: true,
    });
    this.setSlider()
    this.getDataList();
  },

  setSlider: function () {
    var that = this;
    const {
      groupField,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function (res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === groupField) {
            activeIndex = i;
            break;
          }
        }
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * activeIndex
        });
      }
    });
  },
  tapAdvanced: function () {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/salesContrast/salesContrast?route=${currentPage.route}&barTitle=销售对比-查询条件`,
    })
  },

  //
  cateTap: function (e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
    });
    this.searchSubmit()
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
  //获取参数
  getSearchParam: function () {
    this.setCompanySectionParam();
    const {
      companySectionParam,
      goodsClassId,
      keyWord,
      salesType,
      groupField,
      startDate,
      endDate,
      startDate1,
      endDate1,
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      keyWord,
      salesType,
      groupField,
      startDate,
      endDate,
      startDate2: startDate1,
      endDate2: endDate1,
    }
  },
  //
  getFirstGoodsClassVoList: function () {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
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
  // 获取列表
  getDataList: function () {
    const that = this;
    const postData = this.getSearchParam();
    request(api.getSalesContrastData, postData).then(res => {
      const {
        groupField,
        startDate,
        endDate,
        startDate1,
        endDate1,
      } = that.data;
      const xAxisData = [startDate + '至' + '\r\n' + endDate, startDate1 + '至' + '\r\n' + endDate1];
      const echartData=[];
      if (Array.isArray(res.data.dataList)) {
        const len = res.data.dataList.length
        for (let i = 0; i < len; i++) {
          var item = res.data.dataList[i];
    
          echartData.push(item[groupField])
        }
      }
      
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              fontSize: 8,
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              fontSize: 8,
            }
          },
          
        ],
        series: [
          {
            label: {
              normal: {
                show: true,
                position: 'inside',
              }
            },
            type: 'bar',
            barWidth: '60%',
            data: echartData,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#62befe' },
                    { offset: 1, color: '#637aef' }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#637aef' },
                    { offset: 1, color: '#62befe' }
                  ]
                )
              }
            },
          }
        ]
      };
      // chart 可能没有载入完成
      const interval = setInterval(() => {
        if (chart) {
          chart.setOption(option);
          clearInterval(interval);
        }
      }, 200)
      let dataLists = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList: dataLists,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取权限
  getBossAuthValidate: function () {
    const that = this;
    const {
      menuCode,
      tabs,
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      if (authValidate.CKCBJ) {
        tabs.push({
          name: '毛利',
          value: 'goodsProfitAmount'
        })
      }
      that.setData({
        authValidate,
        tabs,
      });

    })
  },
})