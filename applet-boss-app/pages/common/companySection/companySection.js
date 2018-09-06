import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    route: '',
    delta: 1,
    addPage: null,
    scrollHeight: 0,
    activeId: '',
    activeNodeType: '',
    dataList: [],
    dataSource: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      route,

    } = options;
    route = route === undefined ? '' : route;
    this.setData({
      route,
    });
    this.setDelta();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((52)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
    var query = wx.createSelectorQuery();
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
    const {
      dataSource,
      keyWord
    } = this.data;
    if (Array.isArray(dataSource)) {
      const dataList = []
      for (let i = 0; i < dataSource.length; i++) {
        const companyItem = dataSource[i];
        if (String(companyItem.code).toLowerCase().indexOf(keyWord.toLowerCase()) > -1 || String(companyItem.name).toLowerCase().indexOf(keyWord.toLowerCase()) > -1) {
          dataList.push(companyItem);
        } else {
          if (Array.isArray(companyItem.sectionList)) {
            let addCompanyItem = Object.assign({}, companyItem);
            addCompanyItem.sectionList = []
            for (let j = 0; j < companyItem.sectionList.length; j++) {
              const selectItem = companyItem.sectionList[j];
              if (String(selectItem.code).toLowerCase().indexOf(keyWord.toLowerCase()) > -1 || String(selectItem.name).toLowerCase().indexOf(keyWord.toLowerCase()) > -1) {
                addCompanyItem.sectionList.push(selectItem);
              }
            }
            if (addCompanyItem.sectionList.length !== 0) {
              dataList.push(addCompanyItem);
            }
          }
        }
      }
      this.setData({
        dataList,
      });
    }
  },
  tapSel: function(e) {
    const {
      id,
      name,
      nodetype,
      companyid,
    } = e.currentTarget.dataset;
    const {
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        companySectionParamId: id,
        companySectionParamNodeType: nodetype,
        companySectionParamName: name,
        companyId: companyid,
      })
    }
    wx.navigateBack({})
  },
  setDelta: function() {
    const {
      route,
    } = this.data;
    if (route != '') {
      const mainPage = util.getMainPage({
        route,
      })
      const {
        delta,
        addPage
      } = mainPage
      this.setData({
        delta,
        addPage,
      });
      if (addPage != null) {
        const {
          companySectionParamId,
          companySectionParamNodeType,
          companySectionParamData
        } = addPage.data;
        this.setData({
          activeId: companySectionParamId,
          activeNodeType: companySectionParamNodeType,
          dataList: companySectionParamData,
          dataSource: companySectionParamData,
        });
      }
    }

  },
})