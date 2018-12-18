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
    menuCode: 'BOSS_XSZS',
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
    salesType: '',
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
    groupField: 'day',
    groupFieldDesc: '',
    groupFieldList: [{
      name: '日',
      value: 'day'
    }, {
      name: '周',
      value: 'week'
    }, {
      name: '月',
      value: 'month'
    }, {
      name: '季',
      value: 'season'
    }, {
      name: '年',
      value: 'year'
    }],
    rankingGist: 'goodsQuantity', //
    rankingGistDesc: '',
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');

    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
    })
    this.getCompanySectionList();
    this.getFirstGoodsClassVoList()
    this.getBossAuthValidate();
    this.getDataList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['groupField-wrap', 'cate-wrap', 'pie-wrap', 'search-bar', 'weui-navbar']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 4,
      })
    })
  },



  tabClick: function(e) {
    const rankingGist = e.currentTarget.dataset.value;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      rankingGist,
    });
    this.searchSubmit();
  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },
  //关键字搜索
  searchSubmit: function() {
    this.setData({
      dataList: [],
      loadingMore: true,
    });
    this.setSlider()
    this.getDataList();
  },

  setSlider: function() {
    var that = this;
    const {
      rankingGist,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === rankingGist) {
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
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/salesTrend/salesTrend?route=${currentPage.route}&barTitle=销售走势-查询条件`,
    })
  },

  //
  cateTap: function(e) {
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
  groupFieldTap: function(e) {
    const {
      id,
    } = e.currentTarget.dataset;
    this.setData({
      groupField: id,
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
  getSearchParam: function() {
    this.setCompanySectionParam();
    const {
      companySectionParam,
      goodsClassId,
      keyWord,
      salesType,
      rankingGist,
      groupField
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      keyWord,
      salesType,
      rankingGist,
      groupField
    }
  },
  //
  getFirstGoodsClassVoList: function() {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },

  //获取公司
  getCompanySectionList: function() {
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
  getDataList: function() {
    const that = this;
    const postData = this.getSearchParam();
    request(api.getSalesTrendData, postData).then(res => {
      const {
        rankingGist,
        tabs,
        groupField,
        groupFieldList,
      } = that.data;
      const xAxisData = [];
      const echartData = [];
      let rankingGistDesc = ''
      let groupFieldDesc = ''
      let subtextDesc = ''
      for (let i = 0; i < tabs.length; i++) {
        let tabsItem = tabs[i]
        if (tabsItem.value == rankingGist) {
          if (tabsItem.value === 'goodsQuantity') {
            rankingGistDesc = tabsItem.name + '(台)';
          } else {
            rankingGistDesc = tabsItem.name + '(元)';
          }
          break;
        }
      }

      if (groupField === 'day') {
        subtextDesc = '最近31天走势'
      } else if (groupField === 'week') {
        subtextDesc = '最近5周走势'
      } else if (groupField === 'month') {
        subtextDesc = '最近12月走势'
      } else if (groupField === 'season') {
        subtextDesc = '最近8季走势'
      } else {
        subtextDesc = '最近4年走势'
      }

      for (let i = 0; i < groupFieldList.length; i++) {
        let groupFieldItem = groupFieldList[i]
        if (groupFieldItem.value == groupField) {
          groupFieldDesc = groupFieldItem.name;
          break;
        }
      }


      if (Array.isArray(res.data.dataList)) {
        const len = res.data.dataList.length
        for (let i = 0; i < len; i++) {
          let item = res.data.dataList[i];
          let rankingGistValue = Number(item[rankingGist])
          echartData.push(rankingGistValue)
          xAxisData.push(item.billsDate)
          
          if (i>0){
            let preRankingGist = Number(res.data.dataList[i - 1][rankingGist])
            if (rankingGistValue == preRankingGist){
              item.stateIcon = 'icon-chiping';
            } else if (rankingGistValue > preRankingGist){
              item.stateIcon = 'icon-shangsheng';
            }else{
              item.stateIcon = 'icon-xiajiang';
            }
          }else{
            item.stateIcon = 'icon-chiping';
          }
          console.log(item.stateIcon)
        }
      }
      
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#21a4ff',
          formatter: "{b}\n" + rankingGistDesc + " : {c}  "
        },
        backgroundColor: "#ffffff",
        title: {
          subtext: subtextDesc,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            fontSize: 9,
          }
        },
        yAxis: {
          type: 'value',
          name: rankingGistDesc,
          axisLabel:{
            fontSize:9,
          }
        },
        dataZoom: [{ show: true, realtime: true, start: 0, end: 100 }],
        series: [{
          data: echartData,
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#21a4ff',
            }
          },
          itemStyle: {
            normal: {
              color: '#21a4ff'
            }
          }
        }]
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
        rankingGistDesc,
        groupFieldDesc,
      });

    });
  },
  //获取权限
  getBossAuthValidate: function() {
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