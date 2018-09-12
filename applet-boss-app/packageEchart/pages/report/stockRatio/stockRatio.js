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
    menuCode: 'BOSS_KCZB',
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
    orderField: 'goodsQuantity', //
    groupField: 'goodsClassName',
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
    util.getScrollHeightByEle(['pie-wrap', 'search-bar', 'weui-navbar']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
      })
    })
  },
  tabClick: function(e) {
    const orderField = e.currentTarget.dataset.value;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      orderField,
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
      orderField,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === orderField) {
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
      url: `/pages/common/stockRatio/stockRatio?route=${currentPage.route}&barTitle=库存占比-查询条件`,
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
      groupField,
      orderField,
    } = this.data;
    return {
      companySectionParam,
      goodsClassId,
      keyWord,
      groupField,
      orderField,
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
    request(api.getStockRatioData, postData).then(res => {
      const {
        orderField,
      } = that.data;
      const echartData = []
      let total = 0;
      let desc = '';
      if (Array.isArray(res.data.dataList)) {
        let lastItem = {
          name: '其他',
          value: 0,
        }
        const len = res.data.dataList.length

        for (let i = 0; i < len; i++) {
          var item = res.data.dataList[i];
          total = util.accAdd(total, item[orderField])
          if (i < 4) {
            echartData.push({
              value: item[orderField],
              name: item.name
            })
          } else {
            if (len == 4) {
              echartData.push({
                value: item[orderField],
                name: item.name
              })
            } else {
              lastItem.value = util.accAdd(lastItem.value, item[orderField])
            }
          }
        }
        if (len > 5) {
          echartData.push(lastItem)
        }
      }

      if (orderField === 'goodsQuantity') {
        desc = '数量'
      } else {
        desc = '金额'
      }
      var option = {
        backgroundColor: "#ffffff",
        color: ["#CC9BFF", "#FF9493", "#8C99F7", "#60CBF8", "#7EB3FA"],
        series: [{
          label: {
            normal: {
              fontSize: 14
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['40%', '80%'],
          data: echartData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)'
            }
          },
          label: {
            normal: {
              formatter: "{b} \n {d}%",
            }
          },
        }],
        graphic: {
          type: 'text',
          top: 'center',
          left: 'center',
          z: 200,
          style: {
            text: `${util.toThousands(total, 2)}\n库存总${desc}`,
            textAlign: 'center',
          }
        }
      };
      // chart 可能没有载入完成
      if (chart) {
        chart.setOption(option);
      } else {
        const interval = setInterval(() => {
          if (chart) {
            chart.setOption(option);
            clearInterval(interval);
          }
        },200)
      }
      let dataLists = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList: dataLists,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode,
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate,
      });

    })
  },
  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  }
})