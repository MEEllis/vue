import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import reg from '../../../config/reg.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ysUserInfo: {},//云盛用户信息
    sectionIndex: 0,
    sectionName: '',
    sectionId: '',
    sectionList: [],
    customerTelephone: '',
    customerName: '',
    discountRate: 10,
    vipVo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getysUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getysUserInfo: function (cb) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          ysUserInfo: res.data,
          sectionName: res.data.sectionName,
          sectionId: res.data.sectionId,
        });
        that.getCompanyList();
      }
    })
  },

  getCompanyList: function (cb) {
    var that = this;
    const { ysUserInfo } = this.data;
    util.request(
      api.getAccessSectionVoList,
    ).then(res => {
      let sectionIndex = 0;
      let sectionName = '';
      let sectionId = '';
      for (let i = 0; i < res.data.dataList.length; i++) {
        if (ysUserInfo.sectionId == res.data.dataList[i].sectionId) {
          sectionIndex = i;
          sectionName = res.data.dataList[i].name;
          sectionId = res.data.dataList[i].sectionId;
          break;
        }
      }
      that.setData({
        sectionList: res.data.dataList,
        sectionIndex,
        sectionName,
        sectionId,
      });
    })

  },
  bindPickerChange: function (e) {
    const that = this
    const index = e.detail.value;
    const { name, sectionId } = this.data.sectionList[index]; // 这个id就是选中项的id
    this.setData({
      sectionIndex: index,
      sectionName: name,
      sectionId,
    });
  },
  inputName: function (e) {
    const that = this;
    const tel = e.detail.value;
    const { customerTelephone } = this.data;
    if (tel.length >= 11) {
      if (reg.phone.test(tel)) {
        this.setData({
          customerTelephone: tel,
        });
        this.getVipVo();
      } else {
        util.showErrorToast('请输入正确的手机号格式！');
      }
      return;
    }
    this.setData({
      vipVo: null,
      customerName: '',
      customerTelephone: tel,
    });
  },
  tapNext: function (e) {
    const { customerTelephone, customerName, sectionId } = this.data;

    if (sectionId.length === 0) {
      util.showErrorToast('请选择部门名称！');
      return;
    }
    wx.navigateTo({
      url: `/pages/billing/addGood/addGood?customerTelephone=${customerTelephone}&sectionId=${sectionId}`,
    })
  },
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
      if (vipVo !== null) {
        let discountRate = vipVo.defaultDiscountRate;
        for (let i = 0; i < vipVo.goodsDiscountList.length; i++) {
          const goodsDiscountItem = vipVo.goodsDiscountList[i];
          if (goodsDiscountItem.discountRate < discountRate) {
            discountRate = goodsDiscountItem.discountRate
          }
        }
        discountRate = discountRate / 10;
        that.setData({
          customerName: vipVo.customerName,
          discountRate,
        });
      }else{

      }
    })

  },

})