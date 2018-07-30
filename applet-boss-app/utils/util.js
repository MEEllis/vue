import api from '../config/api.js';

function formatTime(date, fmt = 'yyyy-MM-dd') {
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function(resolve, reject) {

    return login().then((res) => {
      code = res.code;
      return getUserInfo();
    }).then((userInfo) => {
      resolve({
        code,
        userInfo
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg || '服务君繁忙~',
    icon: 'none',
  })
}

//获取滚动高度
function getScrollHeight(subHeight) {
  return new Promise(function(resolve, reject) {
    wx.getSystemInfo({
      success: function(res) {
        let scrollHeight;
        
        if (Array.isArray(subHeight)) {
          scrollHeight = []
          for (let i = 0; i < subHeight.length; i++) {
            scrollHeight.push(res.windowHeight - subHeight[i])
          }
        } else {
          scrollHeight = res.windowHeight - subHeight - 1
        }
        resolve(scrollHeight);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}


//获取滚动高度通过元素获取高度
function getScrollHeightByEle(subEle) {
  return new Promise(function(resolve, reject) {
    wx.getSystemInfo({
      success: function(res) {
        var query = wx.createSelectorQuery();
        let scrollHeight = res.windowHeight;
        if (Array.isArray(subEle)) {
          for (let i = 0; i < subEle.length; i++) {
            const subEleItem = subEle[i];
            query.select('.' + subEleItem).boundingClientRect(function(rect) {})
          }
          console.log(scrollHeight)
          query.exec(res => {
            res.forEach((value, index, array)=>{
              if (value){
                console.log(value.height)
                scrollHeight = scrollHeight - value.height
              }
            })
            resolve(scrollHeight);
          });
        } else {
          query.select('.' + subEle).boundingClientRect(function(rect) {
            scrollHeight = scrollHeight - rect.height
            resolve(scrollHeight);
          }).exec();
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

function stringNull(arg) {
  if (arg === null || arg === undefined) {
    return '';
  }
  return arg
}

//获取 主页面的 层次，
function getMainPage({
  route
}) {
  const pageList = getCurrentPages();
  let delta = 1;
  let addPage = null;
  for (let i = 0; i < pageList.length; i++) {
    const pageItem = pageList[i]
    if (pageItem.route === route) {
      delta = (pageList.length - i - 1);
      addPage = pageItem;
      break;
    }
  }
  return {
    delta,
    addPage
  };
}



function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


function accDiv(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {}
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), accMul(c / d, Math.pow(10, f - e));
}


//本月
function getCurBMonth() {
  const curDate = new Date();
  const startDate = formatTime(new Date(new Date().setDate(1)))
  const endDate = formatTime(curDate);
  return {
    startDate,
    endDate,
  }
}
// 本周
function getCurBWeekend() {
  const curDate = new Date();
  const nowDayOfWeek = curDate.getDay(); //今天本周的第几天 
  const nowDay = curDate.getDate(); //当前日 
  const nowMonth = curDate.getMonth(); //当前月 
  const nowYear = curDate.getFullYear(); //当前年 

  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);

  const startDate = formatTime(weekStartDate);
  const endDate = formatTime(curDate);
  return {
    startDate,
    endDate,
  }
}

module.exports = {
  formatTime,
  showErrorToast,
  checkSession,
  loginByWeixin,
  login,
  getUserInfo,
  getScrollHeight,
  getScrollHeightByEle,
  stringNull,
  getMainPage,
  accAdd,
  accSub,
  accMul,
  accDiv,
  getCurBMonth,
  getCurBWeekend,
}