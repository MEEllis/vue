//开单相关的服务
import util from '../utils/util.js'
import api from '../config/api.js'
import reg from '../config/reg.js';

// 建立会员信息
function setStorageVipVo(customerTelephone) {
  return new Promise(function (resolve, reject) {
    if (reg.phone.test(customerTelephone)) {
      util.request(
        api.getVipVo,
        {
          customerTelephone,
        },
      ).then(res => {
        const { vipVo } = res.data
        wx.setStorage({
          key: "vipVo",
          data: vipVo,
          success: function () {
          }
        });
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    }
  })
}

//获取该商品的折扣率
function getDiscountRateByGoodsClassId({ goodsClassId }) {
  const vipVo = wx.getStorageSync('vipVo')
  if (vipVo === null) {
    return 100;
  } else {
    const { defaultDiscountRate, goodsDiscountList } = vipVo;
    if (Array.isArray(goodsDiscountList)) {
      let discountRate = -1;
      for (let i = 0; i < goodsDiscountList.length; i++) {
        if (goodsClassId == goodsDiscountList[i].goodsClassId) {
          discountRate = goodsDiscountList[i].discountRate;
          break;
        }
      }

      if (discountRate === -1) {
        return defaultDiscountRate;
      } else {
        return discountRate;
      }

    } else {
      return defaultDiscountRate;
    }
  }
}

//建立商品信息
function setStorageGoodsVoByItem(goodsVoItem) {
  return new Promise(function (resolve, reject) {
    checkGoodsVoItemIsExist(goodsVoItem).then(res => {
      const goodsVo = getStorageGoodsVo();
      goodsVo.push(res);
      wx.setStorageSync('goodsVo', goodsVo)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })

}

//检查商品是否录入
function checkGoodsVoItemIsExist(goodsVoItem) {
  return new Promise(function (resolve, reject) {
    const goodsVo = getStorageGoodsVo();
    //检查串号商品是否重复
    for (let i = 0; i < goodsVo.length; i++) {
      const { goodsId, imeiId, giftList } = goodsVo[i];
      if (goodsVoItem.goodsId == goodsId && goodsVoItem.imeiId == imeiId) {
        util.showErrorToast(`商品：${goodsVoItem.goodsName}已录入，请重新输入!`);
        reject(true)
        return;
      }
      //检查串号赠品商品是否重复
      if (Array.isArray(giftList)) {
        for (let j = 0; j < giftList.length; j++) {
          if (goodsVoItem.goodsId == giftList[j].goodsId && goodsVoItem.imeiId == giftList[j].imeiId) {
            util.showErrorToast(`商品：${goodsVoItem.goodsName}已录入为赠品，请重新输入!`);
            reject(true)
            return;
          }
        }
      }
    }

    resolve(goodsVoItem)
  })
}


//获取商品信息
function getStorageGoodsVo() {
  hasStorageGoodsVo()
  return wx.getStorageSync('goodsVo');
}
// 验证是否有 商品信息
function hasStorageGoodsVo() {
  const goodsVo = wx.getStorageSync('goodsVo');
  if (!Array.isArray(goodsVo)) {
    wx.setStorageSync('goodsVo', [])
  }

}

//根据索引删除指定元素
function delGoodVoByIndex({index}){
  const goodsVo = getStorageGoodsVo();
  goodsVo.splice(goodsVo.findIndex(item => item === index), 1)
  wx.setStorageSync('goodsVo', goodsVo)
}

//移除新开单的相关本地存储,这里最好同步移除，不然可能会存储错乱
function clearBillStorage() {
  wx.removeStorageSync('vipVo');
  wx.removeStorageSync('goodsVo');
}




module.exports = {
  setStorageVipVo,
  getDiscountRateByGoodsClassId,
  setStorageGoodsVoByItem,
  checkGoodsVoItemIsExist,
  getStorageGoodsVo,
  delGoodVoByIndex,
  clearBillStorage,
};