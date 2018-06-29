import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import reg from '../../../config/reg.js';
import bill from '../../../services/bill.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    sectionIndex: 0,
    sectionName: '',
    sectionId: '',
    sectionList: [],
    customerTelephone: '',
    customerName: '',
    discountRate: 10,
    vipVo: null,
    billsId: '', //草稿单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      billsId
    } = options;
    billsId = billsId === undefined ? '' : billsId,
      this.setData({
        billsId,
      });
    if (billsId != '') {
      this.getRetailDraftOrderVo()
    } else {
      this.getysUserInfo();
    }
  },
  getysUserInfo: function() {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          sectionName: res.data.sectionName,
          sectionId: res.data.sectionId,
        });
        that.getCompanyList();
      }
    })
  },

  getCompanyList: function() {
    var that = this;
    const {
      sectionId
    } = this.data;
    util.request(
      api.getAccessSectionVoList,
    ).then(res => {
      let sectionIndex = 0;
      for (let i = 0; i < res.data.dataList.length; i++) {
        const dataItem=res.data.dataList[i];
        if (sectionId == dataItem.sectionId) {
          sectionIndex = i;
          break;
        }
        if (i == res.data.dataList.length-1){
          sectionIndex = i;
          that.setData({
            sectionName: dataItem.name,
            sectionId: dataItem.sectionId,
          });
        }
      }
      that.setData({
        sectionList: res.data.dataList,
        sectionIndex,
      });
    })

  },
  bindPickerChange: function(e) {
    const that = this
    const index = e.detail.value;
    const {
      name,
      sectionId,
    } = this.data.sectionList[index]; // 这个id就是选中项的id
    const {
      billsId,
    } = this.data;
    this.setData({
      sectionIndex: index,
      sectionName: name,
      sectionId,
    });

    if (billsId!=''){
      util.showErrorToast('切换部门，会清空单据的明细信息！');
    }
    
  },
  inputTel: function(e) {
    const that = this;
    const tel = e.detail.value;
    const {
      customerTelephone
    } = this.data;
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


  inputName: function (e) {
    const that = this;
    const customerName = e.detail.value;
  
    this.setData({
      customerName,
    });
  },
  tapNext: function(e) {
    const {
      customerTelephone,
      customerName,
      sectionId,
      billsId,
    } = this.data;

    if (sectionId.length === 0) {
      util.showErrorToast('请选择部门名称！');
      return;
    }

    if (customerTelephone!=''){
      if (!reg.phone.test(customerTelephone)) {
        util.showErrorToast('请输入正确的手机号格式！');
        return;
      }
      if (customerName=='') {
        util.showErrorToast('请输入客户姓名！');
        return;
      }
    }
    wx.navigateTo({
      url: `/pages/billing/addGood/addGood?customerTelephone=${customerTelephone}&sectionId=${sectionId}&customerName=${customerName}&billsId=${billsId}`,
    })
  },
  getVipVo: function() {
    var that = this;
    const {
      customerTelephone
    } = this.data;
    util.request(
      api.getVipVo, {
        customerTelephone,
      },
    ).then(res => {
      const {
        vipVo
      } = res.data
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
      }
    })

  },
  getRetailDraftOrderVo: function() {
    const {
      billsId
    } = this.data;
    const that =this;
    bill.getRetailDraftOrderVo(billsId).then(res => {
      const {
        orderVo
      } = res.data;
 
      that.setData({
        sectionName: orderVo.sectionName,
        sectionId: orderVo.sectionId,
        customerTelephone: util.stringNull(orderVo.customerTelephone),
        customerName: util.stringNull(orderVo.customerName),
      });
      if (util.stringNull(orderVo.customerTelephone).length == 11) {
        that.getVipVo();
      }
      that.getCompanyList();
    })
  }
})