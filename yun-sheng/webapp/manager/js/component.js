"use strict";

// js原生态扩展

/**
 日期格式化
 **/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
'use strict';

;!function () {
    // 函数扩展
    var functionObjExtent = {
        /**
         * 生成一个用不重复的ID (时间戳 随机数前置 36进制 加入随机数长度控制);
         */
        GenNonDuplicateID: function GenNonDuplicateID(randomLength) {
            return Number(Math.random().toString().substr(3, randomLength || 3) + Date.now()).toString(36);
        },
        //数组去重
        unique: function unique(data) {
            var res = [];
            var json = {};
            for (var i = 0; i < data.length; i++) {
                if (!json[data[i]]) {
                    res.push(data[i]);
                    json[data[i]] = 1;
                }
            }
            return res;
        },
        //导出公共方法
        construtForm: function construtForm(actionUrl, parms) {
            var form = document.createElement("form");
            form.style.display = 'none';
            form.setAttribute('class', 'exportForm');
            form.action = actionUrl;
            form.method = "post";
            document.body.appendChild(form);
            for (var key in parms) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = parms[key];
                form.appendChild(input);
            }
            form.submit();
            $('.exportForm').remove();
        },
        // 判断substr字符串在str中出现的次数 isIgnore是否忽略大小写!
        countSubstr: function countSubstr(str, substr, isIgnore) {
            var count;
            var reg = "";
            if (isIgnore == true) {
                reg = "/" + substr + "/gi";
            } else {
                reg = "/" + substr + "/g";
            }
            reg = eval(reg);
            if (str.match(reg) == null) {
                count = 0;
            } else {
                count = str.match(reg).length;
            }
            return count;
        },
        //只能输入数字
        getnum: function getnum(obj) {
            obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
            obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        },
        //去除千分位
        delcommafy: function delcommafy(num) {
            if ($.trim(num + "") == "") {
                return "";
            }
            num = num.replace(/,/gi, '');
            return num;
        },
        getQueryString: function getQueryString(name) {
            //
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);return '';
        },

        getGoInfo: function getGoInfo(info) {
            var gotoUrl = '',
                gotoName = '';

            switch (info.billsType.split('-')[0]) {
                case "零售退货单":
                    gotoName = "零售退货单";
                    gotoUrl = '/manager/inventory/retail/returnGoods/toPrint';
                    break;
                case '零售开单':
                    gotoName = '零售开单';
                    gotoUrl = '/manager/inventory/retail/delivery/toPrint';
                    break;
                case '零售退定单':
                    gotoName = '零售退定单';
                    gotoUrl = '/manager/retail/reDeposit/retailReDepositMain';
                    break;
                case '零售定金单':
                    gotoName = '零售定金单';
                    gotoUrl = '/manager/retail/deposit/retailDepositMain';
                    break;
                case '零售出库单':
                    gotoName = '零售开单';
                    gotoUrl = '/manager/inventory/retail/delivery/toPrint';
                    break;
                case '采购订单':
                    gotoName = '采购订单';
                    gotoUrl = '/manager/purchase/order';
                    break;
                case '采购入库单':
                    gotoName = '采购入库单';
                    gotoUrl = '/manager/inventory/purchase/delivery/main';
                    break;
                case '采购退货单':
                    gotoName = '采购退货单';
                    gotoUrl = '/manager/inventory/purchase/refund/main';
                    break;
                case '采购换货单':
                    gotoName = '采购换货单';
                    gotoUrl = '/manager/inventory/purchase/exchange/main';
                    break;
                case '同价调拨发货单':
                    gotoName = '同价调拨发货单';
                    gotoUrl = '/manager/inventory/storage/samePrice/transfer/main';
                    break;
                case '变价调拨发货单':
                    gotoName = '变价调拨发货单';
                    gotoUrl = '/manager/inventory/storage/changePrice/transfer/main';
                    break;
                case '资金调整单':
                    gotoName = '资金调整单';
                    gotoUrl = '/manager/inventory/fund/adjust/main';
                    break;
                case '成本调整单':
                    gotoName = '成本调整单';
                    gotoUrl = '/manager/inventory/storage/cost/adjustment/main';
                    break;
                case '销售订单':
                    gotoName = '销售订单';
                    gotoUrl = '/manager/salesOrder/show';
                    break;
                case '其它入库单':
                    gotoName = '其它入库单';
                    gotoUrl = '/manager/inventory/storage/stock/other/incoming/main';
                    break;
                case '其它出库单':
                    gotoName = '其它出库单';
                    gotoUrl = '/manager/inventory/storage/stock/other/removal/main';
                    break;
                case '供应商保价单':
                    gotoName = '供应商保价单';
                    gotoUrl = '/manager/inventory/fund/supplier/reprice/main';
                    break;
                case '供应商返利单':
                    gotoName = '供应商返利单';
                    gotoUrl = '/manager/funds/supplierRebate';
                    break;
                case '其它收入单':
                    gotoName = '供应商返利单';
                    gotoUrl = '/manager/funds/supplierRebate';
                    break;
                case '其它支出单':
                    gotoName = '其它支出单';
                    gotoUrl = '/manager/funds/payment/otherExpend';
                    break;
                case '收款单':
                    gotoName = '收款单';
                    gotoUrl = '/manager/funds/payment/initPayee';
                    break;
                case '付款单':
                    gotoName = '付款单';
                    gotoUrl = '/manager/funds/payment/initPayment';
                    break;
                case '费用单':
                    gotoName = '费用单';
                    gotoUrl = '/manager/inventory/expend/expendBill';
                    break;
                case '收入单':
                    gotoName = '收入单';
                    gotoUrl = '/manager/inventory/income/incomeBill';
                    break;
                case '预付款单':
                    gotoName = '预付款单';
                    gotoUrl = '/manager/funds/payment/planPayment';
                    break;
                case '预收款单':
                    gotoName = '预收款单';
                    gotoUrl = '/manager/funds/payment/planPayee';
                    break;
                case '往来调整单':
                    gotoName = '往来调整单';
                    gotoUrl = '/manager/funds/adjust/initAdjust';
                    break;
                case '往来结算单':
                    gotoName = '往来结算单';
                    gotoUrl = '/manager/funds/settlement/initSettlement';
                    break;
                case '批发出库单':
                    gotoName = '批发单';
                    gotoUrl = '/manager/salesOut/show';
                    break;
                case '批发退货单':
                    gotoName = '批发退货单';
                    gotoUrl = '/manager/salesRefund/show';
                    break;
                case '批发换货单':
                    gotoName = '批发换货单';
                    gotoUrl = '/manager/salesExchange/show';
                    break;
                case '客户返利单':
                    gotoName = '客户返利单';
                    gotoUrl = '/manager/funds/clientRebate';
                    break;
                case '客户保价单':
                    gotoName = '客户价保单';
                    gotoUrl = '/manager/funds/clientReprice';
                    break;
                case '受托结算单':
                    gotoName = '受托结算单';
                    gotoUrl = '/manager/funds/beEntrustSettlement';
                    break;
                case '受托撤结单':
                    gotoName = '受托撤结单';
                    gotoUrl = '/manager/funds/beEntrustUndoSettlement';
                    break;
                case '委托结算单':
                    gotoName = '委托结算单';
                    gotoUrl = '/manager/funds/entrustSettlement';
                    break;
                case '委托撤结单':
                    gotoName = '委托撤结单';
                    gotoUrl = '/manager/funds/entrustUndoSettlement';
                    break;
                case '受托调价单':
                    gotoName = '受托调价单';
                    gotoUrl = '/manager/funds/beEntrustChangePrice';
                    break;
                case '委托调价单':
                    gotoName = '委托调价单';
                    gotoUrl = '/manager/funds/entrustChangePrice';
                    break;
                case '预付退款单':
                    gotoName = '预付退款单';
                    gotoUrl = '/manager/inventory/fund/inPayment/refund/payRefund/main';
                    break;
                case '预收退款单':
                    gotoName = '预收退款单';
                    gotoUrl = '/manager/inventory/fund/inPayment/refund/recRefund/main';
                    break;
                case '商品移库单':
                    gotoName = '商品移库单';
                    gotoUrl = '/manager/inventory/storage/products/move/main';
                    break;
                case '内部转账单':
                    gotoName = '内部转账单';
                    gotoUrl = '/manager/funds/innerTransfer/initInnerTransfer';
                    break;
            }
            var goInfo = {
                gotoName: gotoName,
                gotoUrl: gotoUrl
            };
            return goInfo;
        },
        //检查输入验证
        checkInput: {
            //只能输入大于0的正整数
            checkPositiveInteger: function checkPositiveInteger(t) {
                var strNumber = t.value;
                var reg = /^\+?[1-9]\d*$/;
                if (!reg.test(strNumber)) {
                    $(t).val('');
                }
            },
            //检查数字  n位长度 2位小数
            checkNum: function checkNum(t, n) {
                var str = t.value;
                var rex = new RegExp('^[0-9]{1,' + (n - 2) + '}\.{0,1}[0-9]{0,2}$');
                //var rex = /^[1-9]\d{12}\.?\d{2}$/;
                if (!rex.test(str)) {
                    $(t).val('');
                }
                if (isNaN($(t).val())) {
                    $(t).val('');
                }
            },
            //检查数字  n位长度 3位小数
            checkNum3: function checkNum3(t, n) {
                var str = t.value;
                var rex = new RegExp('^[0-9]{1,' + (n - 3) + '}\.{0,1}[0-9]{0,3}$');
                if (!rex.test(str)) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '只能包含数字,且至多' + n + '位,3位小数');
                }
                //(t.value.length > n) && (t.value = t.value.substring(0,n))
            },
            //长度
            checkStr: function checkStr(t, n) {
                if (t.value.length > n) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '至多' + n + '位');
                }
            },
            //字母、数字
            checkStrNum: function checkStrNum(t, n) {
                var reg = new RegExp('^[a-zA-Z0-9]{0,' + n + '}$');
                if (!reg.test(t.value)) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '只能包含字母、数字,且至多' + n + '位');
                }
            },
            //字母、数字
            checkStrNumPlus: function checkStrNumPlus(t, s, e) {
                var reg = new RegExp('^[a-zA-Z0-9]{' + s + ',' + e + '}$');
                if (!reg.test(t.value)) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '只能包含字母、数字,且在' + s + '-' + e + '位');
                }
            },
            //验证备注
            clearNoText: function clearNoText(t, n) {
                if (t.value.length > n) {
                    t.value = t.value.substring(0, n);
                    //				$(t).val('');
                }
            },
            //禁止输入非数字
            clearNoNum: function clearNoNum(t, n) {
                t.value = t.value.replace(/[^\d]/g, "");
                if (t.value.length > n) {
                    t.value = t.value.substring(0, n);
                }
            },
            //禁止中文输入
            checkChinese: function checkChinese(t, n) {
                var reg = new RegExp('^[^\u4E00-\u9FA5]{0,' + n + '}$');
                if (!reg.test(t.value)) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '不能包含中文,且至多' + n + '位');
                }
            },
            //禁止特殊字符
            checkNotChars: function checkNotChars(t, n) {
                var reg = new RegExp('^([\u4E00-\u9FA5]+|[a-zA-Z0-9-_+/]+){0,' + n + '}$');
                if (!reg.test(t.value) || t.value.length > n) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '不能包含特殊字符,且至多' + n + '位');
                }
                //			if(t.value.length > n){
                //				t.value = t.value.substring(0,n);
                //			}
            },
            //卡号
            checkIdCard: function checkIdCard(t, str) {
                var bankCard = /^\d{16}|\d{19}$/,
                    qq = /^[1-9][0-9]{4,10}$/,
                    weex = /^[a-zA-Z\d_]{5,20}$/,
                    idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    phone = /^1(3|4|5|7|8)\d{9}$/,
                    telPhone = /(^(\d{3}-)?\d{8})$|(^(\d{4}-)?\d{7})$|(^1(3|4|5|7|8)\d{9}$)/;
                var msg = '',
                    reg = '';

                switch (str) {
                    case 'bank':
                        reg = bankCard;
                        msg = '银行卡号格式不正确';
                        break;
                    case 'qq':
                        reg = qq;
                        msg = 'QQ格式不正确';
                        break;
                    case 'weex':
                        reg = weex;
                        msg = '微信格式不正确';
                        break;
                    case 'idCard':
                        reg = idCard;
                        msg = '身份证号格式不正确';
                        break;
                    case 'phone':
                        reg = phone;
                        msg = '手机号格式不正确';
                        break;
                    case 'telPhone':
                        reg = telPhone;
                        msg = '联系方式格式不正确';
                        break;
                    default:
                        break;
                }
                if (!reg.test(t.value)) {
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示', '非法的格式 <br />' + msg);
                }
            },
            //判断一个对象是否为空
            isEmptyObject: function isEmptyObject(e) {
                var t;
                for (t in e) {
                    return !1;
                }return !0;
            },
            //时间验证
            checkTime: function checkTime(t, s, e) {
                var startTime = new Date($(s).val().replace(/\-/g, '/'));
                var endTime = new Date($(e).val().replace(/\-/g, '/'));
                var flag = endTime < startTime ? false : true;
                if (!flag) {
                    $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                    $(t).val('');
                    return;
                }
            }
        }

    };

    window.functionObjExtent = functionObjExtent;
}();
"use strict";

var CreatedOKLodop7766 = null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) != null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if (verTrident == null && verIE == null && x64 !== null) return true;else if (verFF !== null) {
            verFF = verFF[0].match(/\d+/);
            if (verFF[0] >= 42 || x64 !== null) return true;
        } else if (verOPR !== null) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32) return true;
        } else if (verTrident == null && verIE == null) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome !== null) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 42) return true;
            }
            ;
        }
        ;
        return false;
    } catch (err) {
        return true;
    }
    ;
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    oscript.src = "https://localhost:8443/CLodopfuncs.js?priority=1";

    try {
        head.insertBefore(oscript, head.firstChild);
    } catch (err) {}
    ;
}
;

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
    var erpCLodopInstall = "请先下载安装打印插件，<a href='/manager/clodop/CLodop_Setup_for_Win32NT_https_2.102.exe' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpCLodopUpdate = "请先下载最新版打印插件，<a href='/manager/clodop/CLodop_Setup_for_Win32NT_https_2.102.exe' target='_self'>点我下载升级</a>,升级后请重新进入。";
    var erpHtmChrome = "(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装";
    var erpHtmFireFox = "（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）";
    var erpHtm64_Install = "请先下载安装打印插件，<a href='/manager/clodop/install_lodop64.exe' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpHtm64_Update = "请先下载最新版打印插件，<a href='/manager/clodop/install_lodop64.exe' target='_self'>点我下载安装</a>,升级后请重新进入。";
    var erpHtmInstall = "请先下载安装打印插件，<a href='/manager/clodop/install_lodop32.exe' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpHtmUpdate = "请先下载最新版打印插件，<a href='/manager/clodop/install_lodop32.exe' target='_self'>点我下载安装</a>,升级后请重新进入。";

    var LODOP;
    try {
        var isIE = navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0;
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) {}
            ;
            if (!LODOP && document.readyState !== "complete") {
                $.zxsaas_plus.showalert("提示", 'C-Lodop没准备好，请稍后再试！');
                return;
            }
            ;
            if (!LODOP) {
                $.zxsaas_plus.showalert("提示", erpCLodopInstall);
                return;
            } else {
                if (CLODOP.CVERSION < "2.1.0.2") {
                    $.zxsaas_plus.showalert("提示", erpCLodopUpdate);
                }
                ;
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
            }
            ;
        } else {
            var is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0;
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT != undefined || oEMBED != undefined) {
                if (isIE) LODOP = oOBJECT;else LODOP = oEMBED;
            } else if (CreatedOKLodop7766 == null) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");else LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if (LODOP == null || typeof LODOP.VERSION == "undefined") {
                if (navigator.userAgent.indexOf('Chrome') >= 0) $.zxsaas_plus.showalert("提示", erpHtmChrome);
                if (navigator.userAgent.indexOf('Firefox') >= 0) $.zxsaas_plus.showalert("提示", erpHtmFireFox);
                if (is64IE) $.zxsaas_plus.showalert("提示", erpHtm64_Install);else if (isIE) $.zxsaas_plus.showalert("提示", erpHtmInstall);else $.zxsaas_plus.showalert("提示", erpHtmInstall);
                return LODOP;
            }
            ;
        }
        ;
        if (LODOP.VERSION < "6.2.1.7") {
            if (needCLodop()) $.zxsaas_plus.showalert("提示", erpCLodopUpdate);else if (is64IE) $.zxsaas_plus.showalert("提示", erpHtm64_Update);else if (isIE) $.zxsaas_plus.showalert("提示", erpHtmUpdate);else $.zxsaas_plus.showalert("提示", erpHtmUpdate);
            return LODOP;
        }
        ;
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("", "A4C7D659922B3C101E57941825536E89", "C94CEE276DB2187AE6B65D56B3FC2848", "");
        //===========================================================
        return LODOP;
    } catch (err) {
        alert("getLodop出错:" + err);
    }
    ;
};

function getLodopObj(oOBJECT, oEMBED) {
    var erpCLodopInstall = "请先下载安装打印插件，<a href='/manager/clodop/CLodop_Setup_for_Win32NT_https_2.102.exe' style='font-weight: 600;' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpCLodopUpdate = "请先下载最新版打印插件，<a href='/manager/clodop/CLodop_Setup_for_Win32NT_https_2.102.exe' style='font-weight: 600;' target='_self'>点我下载升级</a>,升级后请重新进入。";
    var erpHtmChrome = "(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装";
    var erpHtmFireFox = "（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）";
    var erpHtm64_Install = "请先下载安装打印插件，<a href='/manager/clodop/install_lodop64.exe' style='font-weight: 600;' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpHtm64_Update = "请先下载最新版打印插件，<a href='/manager/clodop/install_lodop64.exe' style='font-weight: 600;' target='_self'>点我下载安装</a>,升级后请重新进入。";
    var erpHtmInstall = "请先下载安装打印插件，<a href='/manager/clodop/install_lodop32.exe' style='font-weight: 600;' target='_self'>点我下载安装</a>,安装后请刷新页面或重新进入。";
    var erpHtmUpdate = "请先下载最新版打印插件，<a href='/manager/clodop/install_lodop32.exe' style='font-weight: 600;' target='_self'>点我下载安装</a>,升级后请重新进入。";

    var LODOP;

    var retObj = {
        retMes: '',
        LODOP: null
    };
    try {
        var isIE = navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0;
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) {}

            if (!LODOP && document.readyState !== "complete") {
                retObj.retMes = 'C-Lodop没准备好，请稍后再试！';
                retObj.LODOP = LODOP;
                return retObj;
            }
            ;
            if (!LODOP) {
                retObj.retMes = erpCLodopInstall;
                retObj.LODOP = LODOP;
                return retObj;
            } else {
                if (CLODOP.CVERSION < "2.1.0.2") {
                    retObj.retMes = erpCLodopUpdate;
                }
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            var is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0;
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT != undefined || oEMBED != undefined) {
                if (isIE) LODOP = oOBJECT;else LODOP = oEMBED;
            } else if (CreatedOKLodop7766 == null) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");else LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else {
                LODOP = CreatedOKLodop7766;
            }
            //=====Lodop插件未安装时提示下载地址:==========
            if (LODOP == null || typeof LODOP.VERSION == "undefined") {
                if (navigator.userAgent.indexOf('Chrome') >= 0) retObj.retMes = erpHtmChrome;
                if (navigator.userAgent.indexOf('Firefox') >= 0) retObj.retMes = erpHtmFireFox;
                if (is64IE) {
                    retObj.retMes = erpHtm64_Install;
                } else if (isIE) {
                    retObj.retMes = erpHtmInstall;
                } else {
                    retObj.retMes = erpHtmInstall;
                }

                retObj.LODOP = LODOP;
                return retObj;
            }
        }
        if (LODOP.VERSION < "6.2.1.7") {
            if (needCLodop()) {
                retObj.retMes = erpCLodopUpdate;
            } else if (is64IE) {
                retObj.retMes = erpHtm64_Update;
            } else if (isIE) {
                retObj.retMes = erpHtmUpdate;
            } else {
                retObj.retMes = erpHtmUpdate;
            }
            retObj.LODOP = LODOP;
            return retObj;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("", "A4C7D659922B3C101E57941825536E89", "C94CEE276DB2187AE6B65D56B3FC2848", "");
        //===========================================================
        retObj.LODOP = LODOP;
        return retObj;
    } catch (err) {
        return retObj;
    }
}
"use strict";

//打印自动生成串号
function prn1_print(data) {
        var LODOP;
        CreateOneFormPage(data);
        LODOP.PRINTA();
        function CreateOneFormPage(data) {
                var center = 2; //标准2mm 定制10mm
                var width = 40; //单张宽度
                var height = 30; //单张高度
                var leftMargin = 2; //左边距
                var topMargin = 2; //上边距

                var goodsNameWidth = 38; //商品名称宽度
                var goodsNameHeight = 12; //商品名称高度

                var goodsRetailPriceTop = 16; //零售价上边距
                var goodsRetailPriceWidth = 36; //零售价宽度
                var goodsRetailPriceHeight = 4; //零售价高度

                var barCodeTop = 20; //条形码上边距
                var barCodeWith = 40; //条形码宽度
                var barCodeHeight = 8; //条形码高度

                LODOP = getLodop();
                LODOP.PRINT_INIT("云盛串号标签"); //实际开发打印任务名称请用这

                LODOP.SET_PRINT_PAGESIZE(1, 2 * width + center + "mm", height + "mm", "CreateCustomPage"); //设置纸张大小（注意单页双排）

                LODOP.SET_PRINT_STYLE("FontName", "微软雅黑");
                data = data || [];
                for (var i = 0; i < data.length; i++) {
                        var goodItem = data[i];
                        var isEvenNumber = checkEvenNumber(i);
                        var leftWidthMargin = 0; //内容距离左边的宽度
                        //是否换页
                        if (isEvenNumber == true && i !== 0) {
                                LODOP.NEWPAGE();
                        }
                        //偶数
                        if (isEvenNumber == true) {
                                leftWidthMargin = leftMargin;
                        }
                        //偶数
                        else {
                                        leftWidthMargin = width + center + leftMargin;
                                }
                        LODOP.SET_PRINT_STYLE("Alignment", 1); //重置为左靠齐
                        //设置商品名称
                        LODOP.SET_PRINT_STYLE("FontSize", 10);
                        LODOP.SET_PRINT_STYLE("Bold", 1);
                        LODOP.ADD_PRINT_TEXT(topMargin + "mm", leftWidthMargin + "mm", goodsNameWidth + "mm", goodsNameHeight + "mm", goodItem.goodName);
                        //设置商品价格
                        LODOP.SET_PRINT_STYLE("FontSize", 11);
                        LODOP.SET_PRINT_STYLE("Alignment", 3); //零售价右靠齐
                        var price = "   ";
                        //价格为0的情况下，不打印
                        if ($.formatFloat(goodItem.retailPrice, 2) != "0.00") {
                                price = "售价 : ¥" + goodItem.retailPrice;
                        }
                        LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop + "mm", leftWidthMargin + "mm", goodsRetailPriceWidth + "mm", goodsRetailPriceHeight + "mm", price);
                        //设置 主串号
                        LODOP.SET_PRINT_STYLE("FontSize", 9);
                        LODOP.ADD_PRINT_BARCODE(barCodeTop + "mm", leftWidthMargin + "mm", barCodeWith + "mm", barCodeHeight + "mm", "128Auto", goodItem.imei); //YS1234567890123
                }

                //检查是否为偶数
                function checkEvenNumber(num) {
                        return num % 2 == 0 ? true : false; //判断是否能整除2
                }

                return;
                //第一个
                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.ADD_PRINT_TEXT(topMargin + "mm", leftMargin + "mm", goodsNameWidth + "mm", goodsNameHeight + "mm", "睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)");

                LODOP.SET_PRINT_STYLE("FontSize", 11);
                LODOP.SET_PRINT_STYLE("Alignment", 3); //零售价右靠齐
                LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop + "mm", leftMargin + "mm", goodsRetailPriceWidth + "mm", goodsRetailPriceHeight + "mm", "售价:¥1,234.00");

                LODOP.SET_PRINT_STYLE("FontSize", 9);
                LODOP.ADD_PRINT_BARCODE(barCodeTop + "mm", leftMargin + "mm", barCodeWith + "mm", barCodeHeight + "mm", "128Auto", "YS123456789012"); //YS1234567890123

                //开始右排 （第二个）
                LODOP.SET_PRINT_STYLE("Alignment", 1); //重置为左靠齐

                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.ADD_PRINT_TEXT(topMargin + "mm", center + width + leftMargin + "mm", goodsNameWidth + "mm", goodsNameHeight + "mm", "睿量(REMAX)华为Ascend P2 布丁保护套 (黑色)睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)");

                LODOP.SET_PRINT_STYLE("FontSize", 11);
                LODOP.SET_PRINT_STYLE("Alignment", 3); //零售价右靠齐
                LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop + "mm", center + width + leftMargin + "mm", goodsRetailPriceWidth + "mm", goodsRetailPriceHeight + "mm", "售价:¥1,234.00");

                LODOP.SET_PRINT_STYLE("FontSize", 9);
                LODOP.ADD_PRINT_BARCODE(barCodeTop + "mm", center + width + leftMargin + "mm", barCodeWith + "mm", barCodeHeight + "mm", "128Auto", "YS123456789012"); //YSABCDEFGHIJKLM YSABCDEFGHI0123

                //强制分页   以下代码演示分页内容*****************************************************************************
                LODOP.NEWPAGE();
                LODOP.SET_PRINT_STYLE("Alignment", 1); //左靠齐

                LODOP.SET_PRINT_STYLE("FontSize", 10);
                //LODOP.SET_PRINT_STYLE("Bold",1);

                LODOP.ADD_PRINT_TEXT("2mm", "2mm", "36mm", "12mm", "睿量(REMAX)华为Ascend P3 布丁保护套 (蓝色)");
                //LODOP.SET_PRINT_STYLEA(0,"Angle",90);

                LODOP.SET_PRINT_STYLE("FontSize", 11);
                LODOP.SET_PRINT_STYLE("Alignment", 3); //右靠齐
                LODOP.ADD_PRINT_TEXT("16mm", "0mm", "36mm", "4mm", "售价:¥1,234.00");

                LODOP.SET_PRINT_STYLE("FontSize", 8);
                LODOP.ADD_PRINT_BARCODE("20mm", "2mm", "40mm", "8mm", "128Auto", "YS000000000000");

                //开始右排
                LODOP.SET_PRINT_STYLE("Alignment", 1); //左靠齐

                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.ADD_PRINT_TEXT("2mm", "43mm", "36mm", "12mm", "睿量(REMAX)华为Ascend P4 布丁保护套 (黑色)");

                LODOP.SET_PRINT_STYLE("FontSize", 11);
                LODOP.SET_PRINT_STYLE("Alignment", 3); //右靠齐
                LODOP.ADD_PRINT_TEXT("16mm", "42mm", "36mm", "4mm", "售价:¥1,234.00");

                LODOP.SET_PRINT_STYLE("FontSize", 8);
                LODOP.ADD_PRINT_BARCODE("20mm", "44mm", "40mm", "8mm", "128Auto", "YS999999999999"); //YSABCDEFGHIJKLM
        };
};
"use strict";

;!function () {
    var RetailBillPrintHeight; //零售小票打印区域高度，从而预计零售小票打印时间，再加上5秒触发打印聚合收款（商户存根联）
    var LODOP;

    //打印小票  flag: 是否打印存根联
    function LodoXiaoPiaopPrint(flag) {
        var printResult;
        CreateOneFormPage();
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            //if (Value) alert("已发出实际打印命令！"); else alert("放弃打印！");
            console.log("显示return信息", TaskID, Value);

            if (TaskID == printResult && Value && flag == true) {
                console.log('RetailBillPrintHeight:' + RetailBillPrintHeight);
                //若开始正式打印零售小票，且此单据有聚合收款信息，则需要延时打印聚合收款商户存根联
                delayPrintUnionPayMerchantBill(RetailBillPrintHeight / 45 * 1000 + 5000); //延时打印聚合收款商户联 （大概1秒打印40px高度，拟定间隔5秒）
            } else {
                ClearDom();
            }
        };

        printResult = LODOP.PRINTA();
        console.log("printa done;");
    };

    //云打印 ：小票
    function YUNLodoXiaoPiaopPrint(flag, printerName) {
        var printResult;
        CreateOneFormPage();
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            console.log("显示return信息", TaskID, Value);
            if (TaskID == printResult && Value && flag == true) {
                console.log('RetailBillPrintHeight:' + RetailBillPrintHeight);
                //若开始正式打印零售小票，且此单据有聚合收款信息，则需要延时打印聚合收款商户存根联
                delayPrintUnionPayMerchantBill(RetailBillPrintHeight / 45 * 1000 + 5000); //延时打印聚合收款商户联 （大概1秒打印40px高度，拟定间隔5秒）
            } else {
                ClearDom();
            }
        };

        LODOP.SET_PRINTER_INDEX(printerName);
        printResult = LODOP.PRINT();
    }

    //云打印 ：A4
    function YUNLodoA4Print(printerName) {
        var printResult;
        LODOP = getLodop();
        LODOP.PRINT_INIT("云盛零售A4"); //实际开发打印任务名称请用这
        LODOP.SET_PRINT_PAGESIZE(3, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("billsDIV").innerHTML;
        RetailBillPrintHeight = document.getElementById("billsDIV").offsetHeight;

        LODOP.ADD_PRINT_HTM("0mm", "0mm", "100%", "100%", printHtml);
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            ClearDom();
        };
        LODOP.SET_PRINTER_INDEX(printerName);
        printResult = LODOP.PRINT();
        console.log("云盛零售A4");
    }

    function CreateOneFormPage() {
        LODOP = getLodop();

        LODOP.PRINT_INIT("云盛零售小票"); //实际开发打印任务名称请用这
        LODOP.SET_PRINT_PAGESIZE(3, 760, 0, "76mm roll paper"); //设置纸张大小（注意:3---纵向打印，宽度固定，高度按打印内容的高度自适应）CreateCustomPage
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("billsDIV").innerHTML;
        RetailBillPrintHeight = document.getElementById("billsDIV").offsetHeight;

        LODOP.ADD_PRINT_HTM("0mm", "0mm", "76mm", "100%", printHtml); //ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)

        console.log("开始打印云盛零售小票");
    };

    //打印 聚合收款信息
    function LodoUnionPayMerchantPrint(flag) {

        LODOP = getLodop();
        LODOP.PRINT_INIT("云盛聚合收款商户存根联"); //实际开发打印任务名称请用这

        LODOP.SET_PRINT_PAGESIZE(3, 760, 0, "76mm roll paper"); //设置纸张大小（注意:3---纵向打印，宽度固定，高度按打印内容的高度自适应）CreateCustomPage
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("unionPayPrintDIV").innerHTML;
        console.log(document.getElementById("unionPayPrintDIV").offsetHeight);
        //console.log(printHtml);

        LODOP.ADD_PRINT_HTM("0mm", "0mm", "76mm", "100%", printHtml); //ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)

        console.log("开始打印云盛聚合收款商户联");
        LODOP.On_Return = function (TaskID, Value) {
            //if (Value) alert("已发出实际打印命令！"); else alert("放弃打印！");
            console.log("显示return信息", TaskID, Value);
            ClearDom();
        };
        if (flag !== 1) {
            LODOP.PRINTA();
        }
    }

    //打印  聚合收款信息（延迟）
    function delayPrintUnionPayMerchantBill(ms) {
        setTimeout("LodoUnionPayMerchantPrint(1);LODOP.PRINT();", ms); //延时直接打印聚合收款（商户存根联）
    }

    //清除dom
    function ClearDom() {
        var billsDIVWrap = document.getElementsByClassName('billsDIVWrap');
        for (var i = 0; i < billsDIVWrap.length; i++) {
            var child = document.getElementsByClassName('billsDIVWrap')[i];
            child.parentNode.removeChild(child);
        }
    }

    //抛出方法
    window.LodoXiaoPiaopPrint = LodoXiaoPiaopPrint; //打印小票
    window.LodoUnionPayMerchantPrint = LodoUnionPayMerchantPrint; //打印 聚合收款信息
    window.YUNLodoXiaoPiaopPrint = YUNLodoXiaoPiaopPrint; //云打印小票
    window.YUNLodoA4Print = YUNLodoA4Print; //云打印A4

    function showMyComponent() {
        var lodopObj = getLodopObj();
        var LODOP = null;
        var mes = '';
        var printerNameList = [];
        LODOP = lodopObj.LODOP;
        mes = $.trim(lodopObj.retMes);
        if (LODOP) {
            var printerCount = CLODOP.GET_PRINTER_COUNT();
            for (var i = 0; i < printerCount; i++) {
                printerNameList.push(CLODOP.GET_PRINTER_NAME(i));
            }
            getComputerCode(function (Infos) {
                var componentIdDesc = '';
                var componentIdInfo = '';
                var computerCode = '';
                if (!LODOP) {
                    componentIdDesc = '（您需按照下方文字提示安装插件来绑定您的电脑）';
                    componentIdInfo = mes;
                } else {
                    componentIdDesc = mes;
                    componentIdInfo = Infos;
                    computerCode = Infos;
                }
                showModal(componentIdDesc, componentIdInfo, computerCode);
            });
        } else {
            var componentIdDesc = '（您需按照下方文字提示安装插件来绑定您的电脑）';
            var componentIdInfo = mes;
            showModal(componentIdDesc, componentIdInfo);
        }
        //获取电脑编码
        function getComputerCode(callback) {

            getSystemInfo('DiskDrive.1.SerialNumber', function (SerialNumber) {
                getSystemInfo('NetworkAdapter.1.PhysicalAddress', function (PhysicalAddress) {
                    var componentIdInfo = SerialNumber.replace(/-/g, '') + PhysicalAddress.replace(/-/g, '');
                    if (callback) {
                        callback(componentIdInfo);
                    }
                });
            });

            function getSystemInfo(strINFOType, callback) {
                if (LODOP.CVERSION) {
                    CLODOP.On_Return = function (TaskID, Value) {
                        if (callback) {
                            callback(Value);
                        }
                    };
                }
                var strResult = LODOP.GET_SYSTEM_INFO(strINFOType);
                if (!LODOP.CVERSION) return strResult;else return "";
            }
        }
        function showModal(componentIdDesc, componentIdInfo, computerCode) {
            var message = "<div>\n                            <input type=\"hidden\" name=\"id\" value=\"\" > \n                                <div style=\"height: 24px;line-height: 24px;margin-bottom:8px;\">\n                                    <div style=\"display:inline-block;background-color: #5184f0;\n                                   width: 6px;height: 24px;float: left;\"></div>\n                                    <label style=\"color: #333333;font-size: 14px;margin-left: 14px;font-weight: 600;\">\u6211\u7684\u7535\u8111ID</label>\n                                    <label style=\"\tcolor: #ff3b30;font-size: 12px;word-break: break-all;\">" + componentIdDesc + "</label>\n                                </div>\n                                <p style=\"margin-left: 20px;word-break: break-all;\">" + componentIdInfo + "</p>\n                                <div style=\"\theight: 24px;line-height: 24px;margin-top:20px;margin-bottom:8px;\">\n                                    <div style=\"display:inline-block;background-color: #fe9f45;\n                                   width: 6px;height: 24px;float: left;\"></div>\n                                    <label style=\"color: #333333;font-size: 14px; margin-left: 14px;font-weight: 600;\">\u95E8\u5E97\u4E91\u6253\u5370\u8BBE\u7F6E</label>\n                                </div>\n                               <div style=\"margin-left: 20px;\">\n                                    <div  style=\"margin-bottom: 10px;\">\n                                        <label style=\"font-size: 14px;\" for=\"ifC01002\">\n                                           <input type=\"checkbox\" name=\"status\" id=\"ifC01002\" > \n                                           \u8BA9\u3010\u4E91\u76DB\u5E97\u5458\u52A9\u624B\u3011\u4F7F\u7528\u6B64\u53F0\u7535\u8111\u6253\u5370\u96F6\u552E\u5355\n                                         </label>\n                                    </div>\n                                    <div class=\"eui-cell\" style=\"margin-bottom: 10px;\">\n                                        <label style=\"font-size: 12px;width: 97px;text-align: left;\">\n                                            \u7535\u8111\u6240\u5728\u95E8\u5E97\uFF1A\n                                         </label>\n                                        <div class=\"eui-flex__item\" style=\"max-width: 285px;\">\n                                         <select name=\"sectionId\" class=\"form-control\"></select>\n                                        </div>\n                                    </div>\n                                    <div  class=\"eui-cell\"  style=\"margin-bottom: 10px;\">\n                                        <label style=\"font-size: 12px;width: 97px;text-align: left;\">\n                                            \u96F6\u552E\u5355\u6253\u5370\u673A\uFF1A\n                                         </label>\n                                        <div class=\"eui-flex__item\" style=\"max-width:285px;\">\n                                            <select name=\"printerName\" class=\"form-control\"></select>\n                                        </div>\n                                    </div>\n                                     <div  class=\"eui-cell\"  style=\"margin-bottom: 10px;\">\n                                        <label style=\"font-size: 12px;width: 97px;text-align: left;\">\n                                           \u96F6\u552E\u5355\u6253\u5370\u7EB8\u5F20\uFF1A\n                                         </label>\n                                        <div class=\"eui-flex__item\" style=\"max-width:285px;\">\n                                            <select name=\"paperType\" class=\"form-control\">\n                                                <option value=\"\u5C0F\u796876mm\">\u5C0F\u796876mm</option>\n                                                <option value=\"A4\">A4</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                    <div  class=\"company-success-wrap\"  style=\"margin-bottom: 10px;\">\n                                                                         </div> \n                               </div>\n                            </div>";
            var dialogInstance1 = new BootstrapDialog({
                title: '我的电脑',
                message: message.replace(/\n/g, ""),
                onshow: function onshow(dialog) {
                    dialog.$modalDialog.css({ width: 435 });
                    var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                    var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                    var printerStr = '';
                    for (var i = 0; i < printerNameList.length; i++) {
                        printerStr += " <option value=\"" + printerNameList[i] + "\">" + printerNameList[i] + "</option>";
                    }
                    $printerName.append(printerStr);
                    $.ajax({
                        type: 'post',
                        url: '/manager/component/section/getAccessSectionVoList',
                        async: false,
                        success: function success(data) {
                            var dataList = data.data.dataList;
                            if ($.isArray(dataList)) {
                                var printerStr = '';
                                for (var i = 0; i < dataList.length; i++) {
                                    printerStr += " <option value=\"" + dataList[i].dataId + "\">" + dataList[i].name + "</option>";
                                }
                                $sectionId.append(printerStr);
                            }
                        }
                    });
                    if (!LODOP) {
                        dialog.$modalBody.find('select,input').attr({ 'disabled': 'disabled' });
                        dialog.getButton('saveComponentConfig').disable();
                    }
                },
                onshown: function onshown(dialog) {
                    if (!!computerCode) {
                        $.ajaxPackage({
                            url: '/manager/inventory/common/getSectionPrintParamVo',
                            data: { computerCode: computerCode },
                            success: function success(data) {
                                var paramVo = data.data.paramVo || {};
                                if (paramVo.computerCode) {
                                    var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                                    var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                                    var $paperType = dialog.$modalDialog.find('select[name="paperType"]');
                                    var $status = dialog.$modalDialog.find('input[name="status"]');
                                    var $id = dialog.$modalDialog.find('input[name="id"]');
                                    $status.prop('checked', !paramVo.status);
                                    $id.val(paramVo.id);
                                    $sectionId.val(paramVo.sectionId);
                                    $printerName.val(paramVo.printerName);
                                    $paperType.val(paramVo.paperType);
                                    var sectionName = $sectionId.find("option:selected").text();
                                    if (paramVo.status == 0) {
                                        dialog.$modalDialog.find('.company-success-wrap').append("\n                                           <p class=\"company-success-desc\">\u5DF2\u6210\u529F\u914D\u7F6E\u8BA9\u3010\u4E91\u76DB\u5E97\u5458\u52A9\u624B\u3011\u4F7F\u7528\u6B64\u53F0\u7535\u8111\u6253\u5370\u3010" + sectionName + "\u3011\u7684\u96F6\u552E\u5355\u3002</p>\n                                        <p class=\"company-success-desc\">\u4E3A\u4FDD\u8BC1\u4E91\u6253\u5370\u529F\u80FD\u6B63\u5E38\u8FD0\u884C\uFF0C\u95E8\u5E97\u65E5\u5E38\u8425\u4E1A\u671F\u95F4\uFF0C\u8BF7\u6B64\u95E8\u5E97\u4EBA\u5458\u5728\u8FD9\u53F0\u7535\u8111\u4E0A\u4FDD\u5B58\u767B\u5F55\u54E6\uFF01</p>\n                                        ");
                                    }
                                }
                            }
                        });
                    }
                },
                buttons: [{
                    id: 'saveComponentConfig',
                    label: '保存(Enter)',
                    cssClass: 'erp-btn-bg',
                    hotkey: 13,
                    action: function action(dialog) {
                        var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                        var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                        var $paperType = dialog.$modalDialog.find('select[name="paperType"]');
                        var $status = dialog.$modalDialog.find('input[name="status"]');
                        var id = dialog.$modalDialog.find('input[name="id"]').val().trim();
                        var addData = {
                            sectionId: $sectionId.val(),
                            printerName: $printerName.val(),
                            paperType: $paperType.val(),
                            computerCode: componentIdInfo,
                            status: $status.is(':checked') ? '0' : '1'
                        };
                        if (id != '') {
                            addData.id = id;
                        }

                        $.ajaxPackage({
                            url: '/manager/inventory/common/saveSectionPrintParams',
                            data: addData,
                            success: function success() {
                                $.zxsaas_plus.showalert("success", '保存成功');
                                setTimeout(function () {
                                    dialog.close();
                                }, 1500);
                            }
                        });
                    }
                }, {
                    label: '取消(Esc)',
                    cssClass: 'erp-btn-lab',
                    hotkey: 27,
                    action: function action(dialog) {
                        dialog.close();
                    }
                }]
            });

            dialogInstance1.open();
        }
    }

    window.showMyComponent = showMyComponent;
}();
"use strict";

//ajax 的 2次封装  .  对错误码进行统一的处理
!function ($) {
    $.ajaxPackage = function (option) {
        //默认值
        var parameter = {
            url: "",
            type: "POST",
            dataType: "json",
            async: true,
            data: {}
        };
        $.loading();
        $.extend(true, parameter, option);
        $.ajax({
            url: parameter.url,
            type: parameter.type,
            dataType: parameter.dataType,
            data: parameter.data,
            async: parameter.async,
            contentType: parameter.contentType,
            success: function success(data) {
                $.loading(true);
                if (data.result >= 1) {
                    if (parameter.success) {
                        parameter.success(data);
                    }
                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                    if (parameter.error) {
                        parameter.error(data);
                    }
                }
            },
            error: function error(msg) {
                $.loading(true);
                $.zxsaas_plus.showalert("提示", "服务器繁忙,请稍后重试!");
            }
        });
    };
}(jQuery);
'use strict';

;(function ($) {
    var AutoRowsNumbers = function AutoRowsNumbers(element, config) {
        this.$element = $(element);
        this.$group = $('<div/>', { 'class': "textarea-group" });
        this.$ol = $('<div/>', { 'class': 'textarea-rows' });
        this.$wrap = $('<div/>', { 'class': 'textarea-wrap' });
        this.$group.css({
            "width": this.$element.outerWidth(true) + 'px',
            "display": config.display
        });
        this.$ol.css({
            "color": config.color,
            "width": config.width,
            "height": this.$element.height(),
            "font-size": this.$element.css("font-size"),
            "line-height": this.$element.css("line-height"),
            "position": "absolute",
            "overflow": "hidden",
            "margin": 0,
            "padding": 0,
            "text-align": "center",
            "font-family": this.$element.css("font-family")
        });
        this.$wrap.css({
            "padding": (this.$element.outerHeight() - this.$element.height()) / 2 + 'px 0',
            "background-color": config.bgColor,
            "position": "absolute",
            "box-sizing": "border-box",
            "margin": 0,
            "width": config.width,
            "height": this.$element.height() + 'px'
        });
        this.$element.css({
            "white-space": "pre",
            "resize": "none",
            "margin": 0,
            "margin-left": config.width,
            "box-sizing": "border-box",
            "width": this.$element.width() - parseInt(config.width) + 'px'
        });
    };

    AutoRowsNumbers.prototype = {
        constructor: AutoRowsNumbers,

        init: function init() {
            var that = this;
            that.$element.wrap(that.$group);
            that.$ol.insertBefore(that.$element);
            this.$ol.wrap(that.$wrap);
            that.$element.on('keydown', { that: that }, that.inputText);
            that.$element.on('scroll', { that: that }, that.syncScroll);
            that.inputText({ data: { that: that } });
        },

        inputText: function inputText(event) {
            var that = event.data.that;

            setTimeout(function () {
                var value = that.$element.val();
                value.match(/\n/g) ? that.updateLine(value.match(/\n/g).length + 1) : that.updateLine(1);
                that.syncScroll({ data: { that: that } });
            }, 0);
        },

        updateLine: function updateLine(count) {
            var that = this;
            that.$element;
            that.$ol.html('');

            for (var i = 1; i <= count; i++) {
                that.$ol.append("<div>" + i + "</div>");
            }
        },

        syncScroll: function syncScroll(event) {
            var that = event.data.that;
            that.$ol.children().eq(0).css("margin-top", -that.$element.scrollTop() + "px");
        }
    };

    $.fn.setTextareaCount = function (option) {
        var config = {};
        var option = arguments[0] ? arguments[0] : {};
        config.color = option.color ? option.color : "#FFF";
        config.width = option.width ? option.width : "30px";
        config.bgColor = option.bgColor ? option.bgColor : "#999";
        config.display = option.display ? option.display : "block";

        return this.each(function () {
            var $this = $(this),
                data = $this.data('autoRowsNumbers');

            if (!data) {
                $this.data('autoRowsNumbers', data = new AutoRowsNumbers($this, config));
            }

            if (typeof option === 'string') {
                return false;
            } else {
                data.init();
            }
        });
    };
})(jQuery);
"use strict";

/*
 公共接口
*/

!function ($) {
    var common = {
        //获取用户填制单据默认参数
        getDefaultValues: function getDefaultValues(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getDefaultValues",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //验证菜单权限
        validateAccessToken: function validateAccessToken(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/validateAccessToken",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //获取往来单位的往来资金对象
        getContactUnitAmountVo: function getContactUnitAmountVo(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getContactUnitAmountVo",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //通过设置的采购价格提取策略,获取采购类单据的商品价格
        getPurchaseGoodsPrice: function getPurchaseGoodsPrice(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getPurchaseGoodsPrice",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //入库方式
        getOtherOutInStorageClassVoList: function getOtherOutInStorageClassVoList(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getOtherOutInStorageClassVoList",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },

        getGoodsBranchVoPageList: function getGoodsBranchVoPageList(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/component/goods/getGoodsBranchVoPageList",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //获取调整原因
        getCostAdjustmentReasonVoList: function getCostAdjustmentReasonVoList(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getCostAdjustmentReasonVoList",
                data: obj.data || {},
                async: obj.async = undefined ? true : obj.async,
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        },
        //获取默认仓库
        getDefaultStorgeList: function getDefaultStorgeList(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/inventory/common/getDefaultStorgeList",
                data: obj.data || {},
                success: function success(data) {
                    if (obj.success) {
                        obj.success(data);
                    }
                }
            });
        }
    };
    window.InterfaceInventory = window.InterfaceInventory || {};
    window.InterfaceInventory.common = common;
}(jQuery);
"use strict";

/*
 公共接口
*/

!function ($) {
    var account = {
        //获取资金账户类别集合(树结构返回)
        getAccountClassTreeNodeVoList: function getAccountClassTreeNodeVoList(obj) {
            obj = obj || {};
            $.ajaxPackage({
                url: "/manager/component/account/getAccountClassTreeNodeVoList",
                data: obj.data || {},
                success: function success(data) {
                    if (obj) {
                        obj.success(data);
                    }
                }
            });
        }
    };
    window.InterfaceInventory = window.InterfaceInventory || {};
    window.InterfaceInventory.account = account;
}(jQuery);
"use strict";

/*
  旧接口
*/

!function ($) {
    var old = {
        //获取资金账户类别集合(树结构返回)
        getTparam: function getTparam(obj) {
            obj = obj || {};
            $.ajaxPackage({
                type: 'get',
                url: "/manager/Tparam/find",
                data: obj.data || {},
                success: function success(data) {
                    if (obj) {
                        obj.success(data);
                    }
                }
            });
        }
    };
    window.InterfaceInventory = window.InterfaceInventory || {};
    window.InterfaceInventory.old = old;
}(jQuery);
'use strict';

// 菜单栏的按钮组 （组件）
!function ($) {
    // 默认模板
    var _menuBtnTpl = '<div class="btn-group-left">' + '</div>' + '<div class="btn-group-right">' + '</div>';

    // 构造函数
    var componentMenuBtn = function componentMenuBtn(el, option) {
        // 默认参数
        var defaults = {
            isAuth: true, //是否走权限的控制
            btnGroupLeft: {
                add: {
                    isShow: false,
                    iconfont: "icon-xinzengdingdan",
                    name: "新开单"
                },
                ColumnSettings: {
                    isShow: false,
                    iconfont: "icon-shezhi",
                    name: "列设置"
                },
                export: {
                    isShow: false,
                    iconfont: "icon-daochu",
                    name: "导出"
                },
                print: {
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印"
                },
                orderImport: {
                    isShow: false,
                    iconfont: "icon-fangan",
                    name: "订单引入"
                },
                printDropdown: {
                    type: 'dropdown',
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印",
                    list: []
                },
                printImeiDropdown: {
                    type: 'dropdown',
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印串号标签",
                    list: []
                },
                copy: {
                    isShow: false,
                    iconfont: "icon-ai-copy",
                    name: "复制"
                },
                audit: {
                    isShow: false,
                    iconfont: "icon-shenhe1",
                    name: "稽核"
                },
                auditCancle: {
                    isShow: false,
                    iconfont: "icon-qiyong1",
                    name: "取消稽核"
                },
                check: {
                    isShow: false,
                    iconfont: "icon-shenhe1",
                    name: "审核"
                },
                uncheck: {
                    isShow: false,
                    iconfont: "icon-fanshenhe",
                    name: "反审核"
                },
                mandatory: {
                    isShow: false,
                    iconfont: "icon-dingdanwancheng",
                    name: "强制完成"
                },
                loadstore: {
                    isShow: false,
                    iconfont: "icon-icon-refresh",
                    name: "刷新库存"
                },
                submit: {
                    isShow: false,
                    iconfont: "icon-tijiao",
                    name: "提交"
                },
                red: {
                    isShow: false,
                    iconfont: "icon-zuofeiquanmacopy",
                    name: "红冲"
                },
                save: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存并过账"
                },
                draftPost: {
                    isShow: false,
                    iconfont: "icon-icon-test",
                    name: "过账"
                },
                draftDel: {
                    isShow: false,
                    iconfont: "icon-shanchu",
                    name: "删除"
                },
                draftSave: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存"
                },
                update: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存修改"
                },
                revoke: {
                    isShow: false,
                    iconfont: "icon-chehuidingdan",
                    name: "撤回"
                },
                shipments: {
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "发货"
                },
                settlement: {
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "预收冲应收"
                },
                settlement1: {
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "预付冲应付"
                },
                voucher: {
                    isShow: false,
                    iconfont: "icon-chuzhi",
                    name: "生成凭证"
                }
            },

            btnGroupRight: {
                previous: {
                    isShow: false,
                    name: "上一单"
                },
                next: {
                    isShow: false,
                    name: "下一单"
                },
                end: {
                    isShow: false,
                    name: "末单"
                },
                history: {
                    isShow: false,
                    name: "历史单据"
                }
            }
        };
        var btnGroupLeft = {};
        var btnGroupRight = {};
        for (var keyLeft in option.btnGroupLeft) {
            var leftItem = option.btnGroupLeft[keyLeft];
            btnGroupLeft[keyLeft] = $.extend(false, defaults.btnGroupLeft[keyLeft], leftItem);
        }
        for (var keyRight in option.btnGroupRight) {
            var rightItem = option.btnGroupRight[keyRight];
            btnGroupRight[keyRight] = $.extend(false, defaults.btnGroupRight[keyRight], rightItem);
        }

        this.option = $.extend(true, defaults, option);
        this.option.btnGroupLeft = btnGroupLeft;
        this.option.btnGroupRight = btnGroupRight;
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    componentMenuBtn.prototype = {
        _init: function _init() {
            this.getDom();
            this.clearDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var $_menuBtnTpl = $(_menuBtnTpl);
            var groupLeft = this.option.btnGroupLeft;
            var groupRight = this.option.btnGroupRight;
            var groupLeftArr = [];
            var groupRightArr = [];
            for (var left in groupLeft) {
                var leftObj = groupLeft[left];
                var $button = $('<button type="button"  data-key="' + left + '" class="btn e-btn e-btn-left">' + '<span class="iconfont ' + leftObj.iconfont + '" ></span>' + leftObj.name + '</button>');
                if (leftObj.isShow == false) {
                    $button.hide();
                }
                $button.click(function (leftObj) {
                    return function () {
                        if (leftObj.click) {
                            leftObj.click();
                        }
                    };
                }(leftObj));
                if (leftObj.type === 'dropdown') {
                    var $UL = $('<ul class="dropdown-menu actionBox" style="text-align: center"></ul>');
                    var liArr = [];
                    for (var i = 0; i < leftObj.list.length; i++) {
                        var liItem = leftObj.list[i];
                        var $li = $('<li><input  class="e-caozuo" type="button" value="' + liItem.name + '"></li>');
                        $li.click(function (liItem) {
                            return function () {
                                if (liItem.click) {
                                    liItem.click();
                                }
                            };
                        }(liItem));
                        liArr.push($li);
                    }
                    $UL.append(liArr);
                    $button.addClass('dropdown-toggle').attr('data-toggle', 'dropdown').append('<span class="caret"></span>');
                    var dropWrap = $('<div class="btn-group" role="group"></div>');
                    dropWrap.append($button).append($UL);
                    groupLeftArr.push(dropWrap);
                } else {
                    groupLeftArr.push($button);
                }
            }
            for (var right in groupRight) {
                var rightObj = groupRight[right];
                var $link = $('<button data-key="' + right + '" type="button" class="e-btn btn-link">' + rightObj.name + '</button>');
                if (rightObj.isShow == false) {
                    $link.hide();
                }
                $link.click(function (rightObj) {
                    return function () {
                        if (rightObj.click) {
                            rightObj.click();
                        }
                    };
                }(rightObj));

                groupRightArr.push($link);
            }
            $_menuBtnTpl.siblings(".btn-group-right").append(groupRightArr);
            $_menuBtnTpl.siblings(".btn-group-left").append(groupLeftArr);
            this.dom = $_menuBtnTpl;
        },
        //加载dom
        loadDom: function loadDom() {
            var _self = this;
            // 权限开关
            if (_self.option.isAuth) {
                $.ajax({
                    url: '/manager/auth/queryAuthButtonVoList',
                    type: "post",
                    data: {
                        "menuCode": _self.element.data("code")
                    },
                    dataType: 'json',
                    success: function success(data) {
                        if (data.result == 1) {
                            _self.element.append(_self.dom);
                            if (data.data.show === "all") {
                                _self.element.find("button").show();
                            } else {
                                var buttonList = _self.element.find("button");

                                if (data.data.buttonVoList) {
                                    var authName = [];

                                    for (var i = 0; i < data.data.buttonVoList.length; i++) {
                                        authName.push(data.data.buttonVoList[i].name);
                                    }
                                    buttonList.each(function () {
                                        var buttonItem = $(this);
                                        if ($.inArray($.trim(buttonItem.text()), authName) == -1) {
                                            buttonItem.remove();
                                        }
                                    });
                                }
                            }
                        } else {
                            alert(data.desc);
                        }
                    }
                });
            } else {
                _self.element.append(_self.dom);
            }
        },
        //清空dom
        clearDom: function clearDom() {
            this.element.html("");
        },
        //设置 的按钮的 disabled
        setDisabledbtn: function setDisabledbtn(key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    disabled(key[i]);
                }
            } else {
                disabled(key);
            }
            //禁用
            function disabled(key) {
                dom.find("button[data-key=" + key + "]").attr("disabled", "disabled");
            }
        },
        //设置 的按钮的 disabled
        setUndisabledbtn: function setUndisabledbtn(key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    undisabled(key[i]);
                }
            } else {
                undisabled(key);
            }
            //禁用
            function undisabled(key) {
                dom.find("button[data-key=" + key + "]").removeAttr("disabled");
            }
        },
        //设置 按钮 的   显示
        setShow: function setShow(key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    common(key[i]);
                }
            } else {
                common(key);
            }
            function common(key) {
                dom.find("button[data-key=" + key + "]").show();
            }
        },
        //设置 按钮 的    隐藏
        setHide: function setHide(key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    common(key[i]);
                }
            } else {
                common(key);
            }
            function common(key) {
                dom.find("button[data-key=" + key + "]").hide();
            }
        }

    };
    window.componentMenuBtn = componentMenuBtn;

    //在插件中使用 组件对象
    $.fn.componentMenuBtn = function (options) {
        //创建的实体
        var obj = new componentMenuBtn(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
'use strict';

//  经手人组件
!function ($) {
    //    营业员
    $.fn.funStoreSales = function (opt) {
        var ms = Math.floor(Math.random() * 10000);
        var timer = null; //定时器
        var def = {
            sectionId: "", //部门id
            search: true,
            storeGrid: true,
            ifStore: false,
            listBox: true,
            checkMore: false,
            gridConfig: {
                colNames: ['id', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', 'dataId', '备注'],
                colModel: [{ name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true }, { name: 'code', index: 'code', width: 100, align: 'center', sorttype: "string", sortable: false }, { name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false }, {
                    name: 'sectionName',
                    index: 'sectionName',
                    width: 150,
                    align: 'center',
                    sorttype: 'string',
                    sortable: false
                }, {
                    name: 'positionName',
                    index: 'positionName',
                    width: 150,
                    align: 'center',
                    sorttype: 'string',
                    sortable: false
                }, {
                    name: 'telephone',
                    index: 'telephone',
                    width: 150,
                    align: 'center',
                    sorttype: 'string',
                    sortable: false
                }, { name: 'attrName', index: 'attrName', width: 100, align: 'center', sortable: false }, { name: 'sectionId', index: 'sectionId', width: 10, hidden: true }, { name: 'dataId', index: 'dataId', width: 10, hidden: true }, { name: 'remark', index: 'remark', width: 100, align: 'center', sortable: false }]
            },
            searchFun: function searchFun(e) {

                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
                        $('#searchSaleMan').blur();
                    } else {
                        $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": $('.searchSaleMan').val().trim(),
                                "sectionId": opt.gridConfig.sectionId
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                }, 250);
            },
            clickback: function clickback() {}
        };
        opt = $.extend({}, def, opt);
        return this.each(function () {
            var _this = $(this);
            _this.data('employeeId', '');
            if (opt.listBox) {
                if (_this.parent().find('.showSaleManBox').size() < 1) {
                    _this.parent().append('<span class="input-group-btn showSaleManBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>');
                }
                _this.parent().find('.showSaleManBox>button').click(function () {
                    $('.assistantBox').hide();
                    if ($('#saleMan-modal' + ms).size() < 1) {
                        $(document.body).append('<div id="saleMan-modal' + ms + '" class="modal fade saleMan-modal" tabindex="-1" role="dialog" aria-hidden="true">' + '<div class="modal-dialog modal-lg" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + ' <h4 class="modal-title">营业员选择</h4>' + ' </div>' + ' <div class="modal-body">' + '<div class="col-md-12">' + '<div class="row">' + '<div class="col-md-5" style="padding-left:0">' + '<input type="text" class="form-control searchSaleMan"  placeholder="请输入编码,姓名,助记码">' + '</div>' + '</div>    ' + '<div class="row gridBox" style="margin-top:8px;"></div>' + '</div>' + '</div>' + '<div class="modal-footer">' + '<button type="button" class="btn btn-default sureSaleMan" data-dismiss="modal">确认</button>' + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' + '</div>' + '</div>' + '</div>' + ' </div>');
                        $('#saleMan-modal' + ms).find('.gridBox').append('<table id="saleManModalGrid' + ms + '" class="zxsaastable"></table><div id="gridpager_saleMan' + ms + '"></div>');
                        $('#saleMan-modal' + ms).find('.searchSaleMan').on('input propertychange', function (e) {
                            opt.searchFun(e);
                        });

                        if (!opt.checkMore) {
                            $('.sureSaleMan').hide();
                        }
                        $('.sureSaleMan').click(function () {
                            var ids = $("#saleManModalGrid" + ms).jqGrid('getGridParam', 'selarrrow');
                            var employeeIds = [];
                            var employeeName = [];
                            var employeeList = [];
                            for (var i = 0; i < ids.length; i++) {
                                var employeeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', ids[i]);
                                employeeIds.push(employeeInfo.id);
                                employeeName.push(employeeInfo.name);
                                employeeList.push(employeeInfo);
                            }
                            _this.val(employeeName.join(',')).data('employeeId', employeeIds.join(','));
                            opt.clickback(employeeList);
                        });
                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';

                        $("#saleManModalGrid" + ms).jqGrid({
                            url: "/manager/tree/getManagerList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": opt.gridConfig.remCode,
                                "sectionId": opt.gridConfig.sectionId
                            },
                            jsonReader: {
                                root: "data.rows",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true, //显示行号
                            rowNum: 10,
                            rowList: [20, 25, 40],
                            pager: "#gridpager_saleMan" + ms,
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            multiselect: opt.checkMore,
                            rownumWidth: 50,
                            shrinkToFit: false,
                            ondblClickRow: function ondblClickRow(rowid, iRow, iCol, e) {
                                var storeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', rowid);
                                _this.val(storeInfo.name).data('employeeId', storeInfo.id);
                                $(opt.salesPersonName).val(storeInfo.name).data('employeeId', storeInfo.id);
                                $('#saleMan-modal' + ms).modal('hide');
                                $('.saleManerrorBox').hide();
                                opt.clickback([storeInfo]);
                            },
                            gridComplete: function gridComplete() {
                                $("#saleManModalGrid" + ms).setLabel(0, '序号');
                                $("#gridpager_saleMan" + ms + "_left").remove();
                                $("#gridpager_saleMan" + ms + "_center").attr('colspan', 2);
                            },
                            loadComplete: function loadComplete(data) {}

                        });
                        $("#saleManModalGrid" + ms).resize();
                        $('#saleMan-modal' + ms).modal('show');
                    } else {

                        $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": opt.gridConfig.remCode,
                                "sectionId": opt.gridConfig.sectionId
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                        $("#saleManModalGrid" + ms).resize();
                        $('#saleMan-modal' + ms).modal('show');
                    }
                });
            }
        });
    };
}(jQuery);
'use strict';

//单据日志 （组件）
!function ($) {
    // 默认模板
    var _log = '<div class="log_box">' + '<h4>日志详情</h4>' +
    //			<h4 style="display: none;">打印次数：<i class="logprint"></i></h4>
    '</div>';

    // 构造函数
    var logMes = function logMes(el, option) {
        // 默认参数
        var defaults = {};
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    logMes.prototype = {
        _init: function _init() {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var $_logWrap = $(_log);
            var list = this.option.list;
            for (var i = 0; i < list.length; i++) {
                var img = list[i].billsStatus == 6 ? "statusPass.png" : "statusRed.png";
                var $div = '<div class="log_div">' + '<div class="log_img">' + '<img src=/manager/images/status/' + img + ' />' + '</div>' + '<div class="log_dashed"></div>' + '<i class="log_time">' + list[i].createDateStr + '</i>' + '<p><font>操作类型：</font>' + list[i].operateType + '</p>' + '<p><font>操作员：</font>' + list[i].createByName + '</p>' + '<p><font>操作原因：</font>' + list[i].operateResaon + '</p>' + '</div>';
                $_logWrap.append($div);
            }
            this.dom = $_logWrap;
        },
        //加载dom
        loadDom: function loadDom() {
            this.element.append(this.dom);
            this.setHoverEvent();
        },
        //清空dom
        clearDom: function clearDom() {
            this.element.html("单据日志");
        },
        setHoverEvent: function setHoverEvent() {
            var _telement = this.element;
            this.element.mouseover(function (e) {

                _telement.find('.log_box').show();
            }).mouseout(function (e) {

                _telement.find('.log_box').hide();
            });
        }

    };
    window.logMes = logMes;

    //在插件中使用  组件对象
    $.fn.logMes = function (options) {
        //创建的实体
        var obj = new logMes(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
"use strict";

/*
 组件 模板
会计期间

*/

!function ($) {
    // 默认模板
    var _template = '';
    // 构造函数
    var comDateAccounting = function comDateAccounting(el, option) {
        //默认当前月
        var currentDate = new Date($.ajax({ async: false }).getResponseHeader("Date")).format("yyyy-MM");
        // 默认参数
        var defaults = {
            defaultDate: currentDate,
            endDateId: null, //默认当前月
            endDefaultDate: currentDate, //默认当前月
            changeDateBack: null, //当前
            startDate: null //最小日期
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this._init();
    };
    comDateAccounting.prototype = {
        _init: function _init() {
            this.clearDom();
            this.loadDom();
        },
        //加载时间
        loadDom: function loadDom() {
            var _self = this;
            //如果存在结束日期
            if (_self.option.endDateId) {
                var $endDate = $(_self.option.endDateId);
                //初始化:结束日期
                $endDate.prop('readonly', true).val(this.option.defaultDate).bootstrapPicker({
                    format: 'yyyy-mm',
                    weekStart: 1,
                    autoclose: true,
                    startView: 3,
                    minView: 3,
                    forceParse: false,
                    startDate: this.option.startDate,
                    endDate: this.option.defaultDate
                });
                _self.element.on("changeDate", function (ev) {
                    createBlurEvent(_self, _self.element);
                    if (_self.option.changeDateBack) {
                        _self.option.changeDateBack();
                    }
                });
                $endDate.on("changeDate", function (ev) {
                    createBlurEvent(_self, $endDate);
                    if (_self.option.changeDateBack) {
                        _self.option.changeDateBack();
                    }
                }).on("show", function () {
                    _self.updateDate();
                });
            }

            //初始化:开始日期
            _self.element.prop('readonly', true).val(this.option.defaultDate).bootstrapPicker({
                format: 'yyyy-mm',
                weekStart: 1,
                autoclose: true,
                startView: 3,
                minView: 3,
                forceParse: false,
                startDate: this.option.startDate,
                endDate: this.option.defaultDate
            }).on("show", function () {
                _self.updateDate();
            });
        },
        //清空dom
        clearDom: function clearDom() {
            this.element.html("");
        },
        //更新日期 ：使用当前输入框中的值更新日期时间选择器。
        updateDate: function updateDate() {
            var _self = this;
            _self.element.bootstrapPicker("update");
            if (_self.option.endDateId) {
                $(_self.option.endDateId).bootstrapPicker("update");
            }
        }
    };

    //创建一个失去时间焦点的事件
    function createBlurEvent(_self, bindEventObj) {

        var start = _self.element.val();
        var end = $(_self.option.endDateId).val();
        if (start == "" || end == "") {
            return false;
        }
        var startDate = new Date(start);
        var endDate = new Date(end);

        //是否在同一年  ,不在同一年就需要把月份 改成同一个年份
        if (startDate.getFullYear() != endDate.getFullYear()) {
            //选中的年月
            var currentSelectDate = new Date(bindEventObj.val());
            _self.element.val(currentSelectDate.getFullYear() + "-" + (startDate.getMonth() < 9 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1));
            $(_self.option.endDateId).val(currentSelectDate.getFullYear() + "-" + (endDate.getMonth() < 9 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1));
            startDate = new Date(_self.element.val());
            endDate = new Date($(_self.option.endDateId).val());
        }

        //开始日期必须 小于等于  结束日期
        if (endDate.getMonth() < startDate.getMonth()) {
            $.zxsaas_plus.showalert("提示", "结束日期小于开始日期!");
            $(_self.option.endDateId).val("");
            return false;
        }
    }

    window.comDateAccounting = comDateAccounting;

    //在插件中使用  组件对象
    $.fn.comDateAccounting = function (options) {
        //创建的实体
        var obj = new comDateAccounting(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
"use strict";

/*
 组件 模板
科目编码
*/

!function ($) {
    // 默认模板
    var _template = '';
    // 构造函数
    var comSubjectCode = function comSubjectCode(el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID(); // 不重复的ID
        // 默认参数
        var defaults = {
            nonDuplicateID: nonDuplicateID,
            gridId: "comSubjectGridId" + nonDuplicateID,
            gridPageId: "comSubjectGridPageId" + nonDuplicateID,
            treeId: "comSubjecTreeId" + nonDuplicateID,
            ondblClickRowCallBack: null, // 双击的回调
            ifEndSubject: null, // null：查询全部，   0只显示末级科目， 1 ，只显示父级科目  
            currentAccountingYear: ""
        };
        this.option = $.extend(true, defaults, option);

        this.element = $(el);

        this.dom = null;
        this._init();
    };
    comSubjectCode.prototype = {
        _init: function _init() {
            this.clearDom();
            this.loadDom();
        },
        //加载dom
        loadDom: function loadDom() {
            var _self = this;
            _self.element.prop('readonly', true);
            if (_self.element.parent().find(".showBox").size() > 0) {
                _self.element.parent().find(".showBox").remove();
            }
            _self.element.parent().append('<span class="input-group-btn showBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>');
            _self.element.parent().find('.showBox').off("click").on("click", function () {

                if (_self.option.currentAccountingYear == "") {
                    $.zxsaas_plus.showalert("提示", "请先选择日期!");
                    return;
                }

                //模态框id
                var modalID = "modal" + _self.option.nonDuplicateID;
                var modalClass = "modal" + _self.element.attr("id");
                if ($("#" + modalID).size() < 1) {
                    //清空初始化多次的modal
                    $("." + modalClass).remove();

                    $(document.body).append(['<div  id="' + modalID + '" class="modal fade ' + modalClass + '" tabindex="-1" role="dialog" aria-hidden="true">', '<div class="modal-dialog modal-lg" role="document">', '<div class="modal-content">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>', '<h4 class="modal-title">科目参照</h4>', '</div>', '<div class="modal-body">', '<div class="col-xs-3"><ul id="' + _self.option.treeId + '" class="ztree"></ul></div>', '<div class="col-xs-9">', '<div class="row"><input type="text" class="form-control searchStore" placeholder="请输入科目名称或科目编码"></div>', '<div class="row gridBox"><table id="' + _self.option.gridId + '" class="zxsaastable"></table><div id="' + _self.option.gridPageId + '"></div>\'</div>', '</div>', '</div>', '<div class="modal-footer none">', '<button type="button" class="btn btn-default comOk" data-dismiss="modal">确定</button>', '<button type="button" class="btn btn-default comClose" data-dismiss="modal">关闭</button>', '</div>', '</div>', '</div>', '</div>'].join('\n'));
                    $("#" + _self.option.treeId).html("");
                    //加载tree
                    $.ajax({
                        type: 'post',
                        url: "/manager/cw/company/findView",
                        data: {
                            'currentAccountingYear': _self.option.currentAccountingYear
                        },
                        dataType: "json",
                        success: function success(data) {
                            var treeSetOption = {
                                data: { simpleData: { enable: true, idKey: "id", pIdKey: "pId", rootPId: null } },
                                callback: {
                                    onClick: function onClick(event, treeId, treeNode, msg) {
                                        var param = null;
                                        if (treeNode.id < 0) {
                                            param = {
                                                id: null,
                                                subjectClssify: treeNode.id
                                            };
                                        } else {
                                            param = {
                                                id: treeNode.id,
                                                subjectClssify: null
                                            };
                                        }
                                        $("#" + _self.option.gridId).jqGrid("clearGridData").jqGrid('setGridParam', {
                                            datatype: 'json',
                                            postData: param //发送数据
                                        }).trigger("reloadGrid");
                                    }
                                },
                                view: {
                                    showLine: true
                                }
                            };
                            $.fn.zTree.init($("#" + _self.option.treeId), treeSetOption, data.data.rows);
                            var treeObj = $.fn.zTree.getZTreeObj(_self.option.treeId);
                            var nodes = treeObj.getNodes();
                            for (var i = 0; i < nodes.length; i++) {
                                //设置一级节点展开
                                treeObj.expandNode(nodes[i], true, false, false);
                            }
                        }
                    });
                    $.jgrid.gridUnload(_self.option.gridId);
                    //加载grid
                    $("#" + _self.option.gridId).jqGrid({
                        styleUI: 'Bootstrap', //设置jqgrid的全局样式为bootstrap样式 ，
                        url: "/manager/cw/company/pageChildrens",
                        mtype: "post",
                        datatype: "json",
                        postData: {
                            ifEndSubject: _self.option.ifEndSubject,
                            'currentAccountingYear': _self.option.currentAccountingYear,
                            rows: 20,
                            page: 1
                        },
                        colNames: ['ID', '科目编码', '科目名称', '科目类型'],
                        colModel: [{ name: 'id', index: 'id', align: 'center', width: 90, hidden: true }, { name: 'subjectCode', index: 'subjectCode', align: 'left', sortable: false, width: 180 }, { name: 'subjectName', index: 'subjectName', align: 'left', sortable: false, width: 180 }, { name: 'subjectClssifyName', index: 'subjectClssifyName', align: 'left', sortable: false, width: 180 }],
                        jsonReader: {
                            root: "data.rows",
                            page: "data.page",
                            total: "data.total",
                            records: "data.records",
                            repeatitems: false
                        },
                        sortable: false,
                        rownumbers: true, //显示行号
                        rowNum: 10,
                        rowList: [20, 25, 40],
                        pager: "#" + _self.option.gridPageId,
                        viewrecords: true,
                        width: '100%',
                        height: $(window).height() * 0.45,
                        autowidth: true,
                        rownumWidth: 50,
                        shrinkToFit: false,
                        gridComplete: function gridComplete() {
                            $("#" + _self.option.gridPageId + "_left").remove();
                            $("#" + _self.option.gridPageId + "_center").attr('colspan', 2);
                        },
                        ondblClickRow: function ondblClickRow(rowid, iRow, iCol, e) {
                            var accountInfo = $("#" + _self.option.gridId).jqGrid('getRowData', rowid);
                            _self.element.val(accountInfo.subjectCode).data('id', accountInfo.id);

                            if (_self.option.ondblClickRowCallBack) {
                                _self.option.ondblClickRowCallBack({
                                    accountInfo: accountInfo
                                });
                            }
                            $("#" + modalID).modal('hide');
                        }
                    });
                    $("#" + _self.option.gridId).resize();
                    $("#" + modalID).modal('show');
                    $("#" + modalID).find(".searchStore").on("input", function () {
                        $("#" + _self.option.gridId).jqGrid("clearGridData").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                keyWord: $(this).val(),
                                currentAccountingYear: _self.option.currentAccountingYear
                            } //发送数据
                        }).trigger("reloadGrid");
                    });
                } else {
                    $("#" + _self.option.gridId).resize();
                    $("#" + modalID).modal('show');
                }
            });
        },
        //清空dom
        clearDom: function clearDom() {
            this.element.val("").data("id", "");
        },
        //清除当前信息
        clearEle: function clearEle() {
            this.element.val("").data("id", "");
        },
        //设置当前年份
        setCurrentAccountingYear: function setCurrentAccountingYear(year) {
            this.option.currentAccountingYear = year;
        }
    };
    window.comSubjectCode = comSubjectCode;

    //在插件中使用  组件对象
    $.fn.comSubjectCode = function (options) {
        //创建的实体
        var obj = new comSubjectCode(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
"use strict";

/*
 组件:串号录入框
*/

!function ($) {

    // 构造函数
    var component = function component(el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID(); // 不重复的ID
        // 默认参数
        var defaults = {
            dataGrid: null, //表格对象
            nonDuplicateID: nonDuplicateID, //唯一标示
            goodsName: "", //商品名称
            goodsID: "", //商品ID
            imeiList: [], //表格数据
            currImeiLength: -1, // 默认当前的串号长度
            currAuxliaryImeiLength: -1, // 默认当前的辅助串号长度
            isImeiGood: true, //  是否： 双串号管理 （true：双串号  false: 单串号）
            isEnableAuxliaryImei: true, // true:辅助串号， false :没有辅助串号
            isAutoImei: false, // 是否展示 ：生成自动串号
            isEdit: true, // true:编辑 ，false :查看
            colModel: 0, //0：'主串号', '辅助串号, '备注'()； 1：'主串号', '辅助串号','成本', '备注'
            lastrow: 0, //选择的行
            lastcell: 0, //选择的单元格
            //追加行（回调）
            appenRowCallback: function appenRowCallback(imei1, imei2) {
                return true;
            },
            //确定按钮 （回调）
            saveImeiInputCallback: function saveImeiInputCallback(data) {},
            //导入按钮 （回调）
            exportImeiInputCallback: function exportImeiInputCallback(data) {
                return true;
            }
        };
        this.option = $.extend(true, defaults, option);

        this.element = $(el);
        this.dom = null;
        this.AutoImeiDom = null;
        this._init();
    };
    component.prototype = {
        _init: function _init() {
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var _self = this;
            //双串号商品有辅助串号
            this.option.isImeiGood = this.option.isEnableAuxliaryImei;
            _self.createEvent();
            var $_template = _self.dom;
            //是否显示 辅助串号
            if (_self.option.isEnableAuxliaryImei == true) {
                $_template.find('.EditImei').prop('checked', true);
                $_template.find(".imeiInput2").attr({
                    "placeholder": "请输入" + (_self.option.currAuxliaryImeiLength || '任意') + "位字符"
                });
                $_template.find(".auxliaryImeiGroup").show();
            } else {
                $_template.find('.EditImei').prop('checked', false);
                $_template.find(".auxliaryImeiGroup").hide();
            }

            getIsEditAuxiliaryImei(function (data) {
                var clickFlag = false;
                data.data.dataList[0] = data.data.dataList[0] || {};
                if (data.data.dataList[0].value == 1) {
                    clickFlag = false;
                } else {
                    clickFlag = true;
                }
                $_template.find('.EditImei').prop('disabled', clickFlag);
            });

            $_template.find(".goodsnameTitle").html("商品名称：" + _self.option.goodsName);
            $_template.find(".imeiInput1").attr({
                "placeholder": "请输入" + (_self.option.currImeiLength || '任意') + "位字符"
            }).val(""); //清空输入框的值
            $_template.find(".imeiInput2").val("");
            //是否编辑状态
            if (_self.option.isEdit === false) {
                $_template.find(".addImeiInput").attr("disabled", 'disabled');
                $_template.find(".exportImeiInput").attr("disabled", 'disabled');
                $_template.find(".saveImeiInput").attr("disabled", 'disabled');

                $_template.find(".imeiInput1").attr("disabled", 'disabled');
                $_template.find(".imeiInput2").attr("disabled", 'disabled');
                $_template.find(".txtExportImei").attr("disabled", 'disabled');
                $_template.find(".btnAutoImei").prop('disabled', true);
                $_template.find(".EditImei").prop('disabled', true);
            } else {
                $_template.find(".addImeiInput").removeAttr("disabled");
                $_template.find(".exportImeiInput").removeAttr("disabled");
                $_template.find(".saveImeiInput").removeAttr("disabled");
                $_template.find(".imeiInput1").removeAttr("disabled");
                $_template.find(".imeiInput2").removeAttr("disabled");
                $_template.find(".txtExportImei").removeAttr("disabled");
                $_template.find(".btnAutoImei").prop('disabled', false);
                $_template.find(".EditImei").prop('disabled', false);
            }

            $_template.find(".txtExportImei").setTextareaCount({
                width: "30px",
                bgColor: "#f2f2f2",
                color: "red",
                display: "block"
            });

            //是否显示： 生成自动串号
            isShowAutoImei(_self, $_template);
        },
        //创建事件
        createEvent: function createEvent() {
            var _self = this;
            var $_template = $(_self.getTemplate());
            _self.dom = $_template;
            _self.addEvent();
            _self.ediImeiEvent();
            _self.importEvent();
            _self.autoImeiEvent();
        },
        //启用辅助串号
        ediImeiEvent: function ediImeiEvent() {
            var _self = this;
            var $_template = _self.dom;
            //启用辅助串号
            $_template.find('.EditImei').bind('click', function () {
                var $this = $(this);
                if ($this.prop('checked') == true) {
                    _self.dom.find('.auxliaryImeiGroup').show();
                    _self.option.isEnableAuxliaryImei = true;
                    //如果是单串号管理（若此商品在商品档案中仅是单串号管理，但在“串号导入”时，选择了启用辅助串号，则辅助串号的长度限制为5位及以上即可；）
                    if (_self.option.isImeiGood == false) {
                        _self.dom.find(".imeiInput2").attr({
                            "placeholder": "请输入5位及以上字符"
                        });
                        _self.option.currAuxliaryImeiLength = -555; //这里搞一个特别的标记， 用于标识 ：5位及以上
                    }
                } else {
                    _self.dom.find('.auxliaryImeiGroup').hide();
                    _self.option.isEnableAuxliaryImei = false;
                }

                //是否显示： 生成自动串号
                isShowAutoImei(_self, $_template);
            });
        },
        //添加一行的相关事件
        addEvent: function addEvent() {
            var _self = this;
            var $_template = _self.dom;
            //绑定主串号事件
            $_template.find(".imeiInput1").bind('keyup', function (event) {
                var $this = $(this);
                var cur = $this.val().trim();
                if (_self.option.currImeiLength > 0) {
                    var label = $this.parent().next().find('label');
                    var numLen = _self.option.currImeiLength - cur.length;
                    if (numLen > 0) {
                        label.text('还应输入' + numLen + '位串号');
                    } else if (numLen == 0) {
                        label.text("");
                    } else {
                        label.text('串号超出' + Math.abs(numLen) + '位');
                    }
                    if (cur.length == 0) {
                        label.text("");
                    }
                }
                if (event.keyCode == "13") {
                    checkImeiInput1(cur);
                }
            });
            //绑定辅助串号事件
            $_template.find('.imeiInput2').bind('keyup', function (event) {
                var $this = $(this);
                if (_self.option.isEdit === false) {
                    return;
                }
                if (_self.option.currAuxliaryImeiLength > 0) {
                    var label = $this.parent().next().find('label');
                    var numLen = _self.option.currAuxliaryImeiLength - $this.val().trim().length;
                    if (numLen > 0) {
                        label.text('还应输入' + numLen + '位串号');
                    } else if (numLen == 0) {
                        label.text("");
                    } else {
                        label.text('串号超出' + Math.abs(numLen) + '位');
                    }
                    if ($this.val().trim().length == 0) {
                        label.text("");
                    }
                }
                if (event.keyCode == "13") {
                    checkImeiInput2($this.val());
                }
            });
            //添加按钮
            $_template.find('.addImeiInput').bind("click", function () {
                //是否有辅助串号
                if (_self.option.isEnableAuxliaryImei == true) {
                    checkImeiInput2($_template.find('.imeiInput2').val());
                } else {
                    checkImeiInput1($_template.find('.imeiInput1').val());
                }
            });
            //验证主串号是否合法
            function checkImeiInput1(Imei) {
                Imei = Imei.trim().toUpperCase();
                if (Imei != "") {
                    var callBack = function callBack() {
                        //判断是否有辅助串号
                        if (_self.option.isEnableAuxliaryImei) {
                            $_template.find(".imeiInput2").focus();
                        } else {
                            _self.appenRow3();
                            $_template.find(".imeiInput1").focus();
                        }
                    };

                    if ($.notEmpty(_self.option.currImeiLength) && Imei.length != _self.option.currImeiLength) {
                        $.MsgBox('验证提示', '串号长度为' + _self.option.currImeiLength + "位");
                        return false;
                    }
                    if (Imei.indexOf(',') > -1 || Imei.indexOf('，') > -1 || Imei.indexOf(';') > -1 || Imei.indexOf('；') > -1) {
                        $.MsgBox('验证提示', '串号不允许出现逗号或者分号');
                        return false;
                    }
                    //用于请求的时候，防止用户输入
                    $_template.find(".imeiInput1").blur();

                    var flag = inStorageImei(Imei, callBack);
                    if (flag == false) {
                        return flag;
                    }
                }
            }
            //验证辅助串号是否合法
            function checkImeiInput2(Imei) {
                var flag = checkImeiInput1($_template.find('.imeiInput1').val());
                if (flag == false) {
                    return flag;
                }
                var imei1 = $_template.find('.imeiInput1').val().trim().toUpperCase();
                Imei = Imei.trim().toUpperCase();
                if ($.trim(imei1) == "") {
                    $.MsgBox('串号校验提示', '主串号不能为空');
                    return;
                }

                if ($.trim(Imei) == "" && Number(_self.option.currAuxliaryImeiLength) > 0) {
                    $.MsgBox('串号校验提示', '辅助串号不能为空');
                    return;
                }
                if ($.trim(Imei) == $.trim(imei1)) {
                    $.MsgBox('串号校验提示', '主串号和辅助串号重复');
                    return;
                }
                if (_self.option.currAuxliaryImeiLength == -555 && Imei.length < 5) {
                    $.MsgBox('验证提示', ' 辅助串号长度为5位及以上位字符');
                    return;
                }
                if (_self.option.currAuxliaryImeiLength != -555 && ($.notEmpty(_self.option.currImeiLength) && imei1.length != _self.option.currImeiLength || $.notEmpty(_self.option.currAuxliaryImeiLength) && Imei.length != _self.option.currAuxliaryImeiLength)) {
                    $.MsgBox('验证提示', '串号长度为' + _self.option.currImeiLength + "位" + ' 辅助串号长度为' + _self.option.currAuxliaryImeiLength + "位");
                    return;
                }

                if (Imei.indexOf(',') > -1 || Imei.indexOf('，') > -1 || Imei.indexOf(';') > -1 || Imei.indexOf('；') > -1) {
                    $.MsgBox('验证提示', '串号不允许出现逗号或者分号');
                    return;
                }
                //用于请求的时候，防止用户输入
                $_template.find(".imeiInput2").blur();
                inStorageImei(Imei, callBackyanzheng);

                function callBackyanzheng() {
                    _self.appenRow3();
                    $_template.find(".imeiInput1").focus();
                }
            }
        },
        //导入的相关事件
        importEvent: function importEvent() {
            var _self = this;
            var $_template = _self.dom;
            //导入文本框 监听 tab事件
            $_template.find('.txtExportImei').bind('keydown', function (event) {
                if (event.keyCode == 9) {
                    $(this).val($(this).val() + "\t");
                    return false;
                }
            });
            //取消按钮
            $_template.find('.canelSaveImeiInput , .close').bind("click", function () {
                _self.hideModal();
            });
            //确定按钮
            $_template.find('.saveImeiInput').bind("click", function () {
                saveData(_self);
                _self.hideModal();
            });
            //清空按钮
            $_template.find('.clearImeiInput').bind("click", function () {
                $_template.find('.txtExportImei').val("");
                $_template.find('.failedExportImei').val("");
                $_template.find(".txtExportImei").trigger('keydown');
            });
            //导入按钮
            $_template.find('.exportImeiInput').bind("click", function () {
                //导入串号组
                var exportTxt = $_template.find('.txtExportImei').val().trim().toUpperCase().replace(/，/g, ',').replace(/\t/g, ',');
                if (exportTxt == "") {
                    $_template.find('.failedExportImei').val('批量导入串号不能为空，请检查完数据再导入！\n');
                    return;
                }
                //验证 未启用辅助串号时， 主串号不能有 逗号
                if (_self.option.isEnableAuxliaryImei == false && (exportTxt.indexOf(',') > -1 || exportTxt.indexOf('，') > -1 || exportTxt.indexOf(';') > -1 || exportTxt.indexOf('；') > -1)) {
                    $_template.find('.failedExportImei').val('批量导入，主串号不能有分号或者tab键隔，请检查完数据再导入！\n');
                    return;
                }
                //串号存为数组
                var exportArr = exportTxt.split("\n");
                //处理串号的前后空格
                for (var i in exportArr) {
                    if (exportArr[i].indexOf(',') > -1) {
                        exportArr[i] = exportArr[i].trim().replace(/(\s)*(,)(\s)*/, ',');
                    } else {
                        exportArr[i] = exportArr[i].trim();
                    }
                }
                var exportToString = ',' + exportArr.toString() + ',';
                var reLuru = "";
                // 验证 多行文本框是否输入重复
                for (var i in exportArr) {
                    //忽略空格行
                    if (exportArr[i] == '') {
                        continue;
                    }
                    var itme = exportArr[i];
                    //是否有是辅助串号
                    if (itme.indexOf(',') > -1) {
                        var cc = itme.split(",");
                        for (var m = 0; m < cc.length; m++) {
                            var oo = ',' + cc[m] + ',';
                            var firstIndex = exportToString.indexOf(oo) + 1;
                            var secondIndex = exportToString.lastIndexOf(oo) + 1;
                            if (firstIndex != secondIndex) {
                                reLuru += '序号[' + firstIndex + '与' + secondIndex + '];串号:[' + cc[m] + ']重复，请检查完数据再导入！\n';
                            }
                        }
                    } else {
                        var firstIndex = exportArr.indexOf(itme) + 1;
                        var secondIndex = exportArr.lastIndexOf(itme) + 1;
                        if (firstIndex != secondIndex) {
                            reLuru += '序号[' + firstIndex + '与' + secondIndex + '];串号:[' + itme + ']重复，请检查完数据再导入！\n';
                        }
                    }
                }
                if (reLuru != "") {
                    $_template.find('.failedExportImei').val(reLuru);
                    return;
                }
                var imeiInputData = '';
                var imeiGrid = _self.option.dataGrid;
                var ids = imeiGrid.getGridDataList();
                //合并表格 用的数据
                var objData = [];
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; i++) {
                        objData.push($.trim(ids[i].imei).toUpperCase());
                        objData.push($.trim(ids[i].auxiliaryImei).toUpperCase());
                    }
                }
                // 验证左边表格是否存在重复数据
                for (var i in exportArr) {
                    //忽略空格行
                    if (exportArr[i] == '') {
                        continue;
                    }
                    var toval = exportArr[i];
                    var tovalArr = toval.split(',');
                    var flag = 1;
                    //验证 串号 在 左侧表格是否存在
                    for (var j = 0; j < tovalArr.length; j++) {
                        var tovalItem = tovalArr[j];
                        if (objData.indexOf(tovalItem) > -1) {
                            flag = 0;
                        }
                    }
                    if (flag == 1) {
                        imeiInputData += toval + ';';
                    } else {
                        reLuru += '串号:[' + toval + ']已导入\n';
                    }
                }
                //删除空格行
                for (var i = 0; i < exportArr.length; i++) {
                    if (exportArr[i] == '') {
                        exportArr.splice(i, 1);
                        i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                        // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
                    }
                }

                //验证是否存在
                var isExport = _self.option.exportImeiInputCallback(exportArr);
                if (isExport.result == 0) {
                    //清空对应的数据
                    for (var i = 0; i < isExport.reLuruArr.length; i++) {
                        imeiInputData = imeiInputData.replace(isExport.reLuruArr[i] + ";", '');
                    }
                    reLuru += isExport.reLuru;
                }
                $_template.find('.failedExportImei').val(reLuru);
                //去掉空格
                imeiInputData = imeiInputData.substring(0, imeiInputData.length - 1);
                if (imeiInputData == '') {
                    return;
                }
                $.request({
                    url: '/manager/component/imei/validateInStockImei',
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "goodsId": _self.option.goodsID,
                        "imeiInputData": imeiInputData,
                        'showCost': _self.option.colModel,
                        //是否勾选 启用辅助串号 0:否 1:是
                        'IfCheckedAuxiliaryImei': _self.option.isEnableAuxliaryImei == true ? 1 : 0
                    },
                    success: function success(data) {
                        if (data.result == 1) {
                            var failed = data.data.failedResultList;
                            var txt = $_template.find('.failedExportImei').val();
                            $.each(failed, function (i, item) {
                                txt += item + '\n';
                            });
                            //输出失败的 数据 了
                            $_template.find('.failedExportImei').val(txt);
                            var list = data.data.successResultList;
                            batchImport(_self, list);
                        } else {
                            $.zxsaas_plus.showalert("error", data.desc);
                        }
                    },
                    error: function error() {
                        $.zxsaas_plus.showalert("error", '请求超时！');
                    }
                });
            });
        },
        //生成自动串号的相关事件
        autoImeiEvent: function autoImeiEvent() {
            var _self = this;
            var $_template = _self.dom;
            //自动生成串号按钮
            $_template.find('.btnAutoImei').bind("click", function () {
                if (_self.AutoImeiDom == null) {
                    var $autoTemp = $(getTemplate());
                    var params = {
                        goodsName: _self.option.goodsName,
                        goodsID: _self.option.goodsID
                        //取消按钮
                    };$autoTemp.find('.btnAutoCanle  , .close').bind("click", function () {
                        $autoTemp.find('form')[0].reset();
                        _self.AutoImeiDom.modal('hide');
                    });
                    //确定按钮
                    $autoTemp.find('.btnAutoSave').bind("click", function () {
                        var remark = $autoTemp.find('.txtAutoRemark').val().trim();
                        var price = $autoTemp.find('.txtAutoPrice').val().trim();
                        var count = $autoTemp.find('.txtAutoCount').val().trim();
                        var countReg = /^([1-9]([0-9]{0,3})|10000)$/;
                        if (!countReg.test(count)) {
                            $.zxsaas_plus.showalert("提示", '数量格式错误，请输入1~10000的整数！');
                            return;
                        }
                        $.MsgBox('提示', '将为您自动生成' + count + '个串号，确定吗', function () {
                            var ajaxOp = {
                                goodsId: params.goodsID,
                                //是否勾选 启用辅助串号 0:否 1:是
                                'IfCheckedAuxiliaryImei': _self.option.isEnableAuxliaryImei == true ? 1 : 0,
                                retailPrice: price,
                                createCount: count,
                                remark: remark
                            };
                            saveAutoImei(ajaxOp, function (data) {
                                var list = data.data.successResultList;
                                batchImport(_self, list, remark);
                                $autoTemp.find('.btnAutoCanle').trigger('click');
                            });
                        }, function () {});
                    });

                    $autoTemp.find('.labAutoGoodsName').text(params.goodsName);
                    _self.AutoImeiDom = $autoTemp;
                    //获取价格
                }
                //获取价格
                getGoodsPrice({
                    goodsIds: _self.option.goodsID,
                    //是否勾选 启用辅助串号 0:否 1:是
                    'IfCheckedAuxiliaryImei': _self.option.isEnableAuxliaryImei == true ? 1 : 0
                }, function (data) {
                    _self.AutoImeiDom.find('.txtAutoPrice').val(data.data.goodsVoList[0].retailPrice);
                    if (data.data.hasPermissions == true) {
                        _self.AutoImeiDom.find('.txtAutoPrice').prop('readonly', false);
                    } else {
                        _self.AutoImeiDom.find('.txtAutoPrice').prop('readonly', true);
                    }
                });
                setTimeout(function () {
                    _self.AutoImeiDom.modal('show');
                });
            });
            //打印所选串号标签
            $_template.find('.btnPrintAutoImei').bind("click", function () {
                var imeiGrid = _self.option.dataGrid;
                var selId = $.trim(imeiGrid.$grid.jqGrid('getGridParam', 'selrow'));
                if (selId == "") {
                    $.zxsaas_plus.showalert("提示", '请选择一行数据！');
                    return;
                }
                var selRowData = imeiGrid.$grid.jqGrid('getRowData', selId);
                var imei = selRowData.imei;
                var imeiReg = /^(YS)[\d]{12}$/;
                if (!imeiReg.test(imei)) {
                    $.zxsaas_plus.showalert("提示", '只能打印自动生成YS开头的14位串号！');
                    return;
                }
                getGoodsPrice({ goodsIds: _self.option.goodsID }, function (data) {
                    var goodsVo = data.data.goodsVoList[0];
                    var printData = {
                        goodName: _self.option.goodsName,
                        retailPrice: $.formatFloat(goodsVo.retailPrice, 2),
                        imei: selRowData.imei
                    };
                    try {
                        prn1_print([printData]);
                    } catch (e) {}
                });
            });

            //获取当前商品的价格
            function getGoodsPrice(ajaxOp, callback) {
                $.ajax({
                    url: "/manager/component/imei/getGoodsRetailPrice",
                    type: 'POST',
                    dataType: "json",
                    async: false,
                    data: ajaxOp,
                    success: function success(data) {
                        if (data.result == 1) {
                            callback(data);
                        } else {
                            $.MsgBox('错误提示', data.desc);
                        }
                    }
                });
            }

            //自动生成串号
            function saveAutoImei(ajaxOp, callback) {
                //后台查询数据
                $.request({
                    url: '/manager/component/imei/autoCreateImei',
                    type: "POST",
                    dataType: 'json',
                    data: ajaxOp,
                    success: function success(data) {
                        if (data.result == 1) {
                            callback(data);
                        } else {
                            $.MsgBox('错误提示', data.desc);
                        }
                    },
                    error: function error() {
                        $.MsgBox('错误提示', '服务繁忙！');
                    }
                });
            }

            //获取 自动生成串号 的模板
            function getTemplate() {
                var _template = '<!-- 自动生成串号 -->' + '<div class="modal fade "  tabindex="-1" role="dialog"  aria-hidden="false">' + '   <div class="modal-dialog" style="width:400px;">' + '      <div class="modal-content">' + '           <div class="modal-header">' + '               <button type="button" class="close"  aria-hidden="true"> &times;</button>' + '               <h4 class="modal-title">' + '                   自动生成串号' + '               </h4>' + '           </div>' + '            <!-- modal-body start  -->' + '           <div class="modal-body" style="padding-bottom: 0px;padding-top: 0px;">' + '               <div class="col-md-12" >' + '                 <!-- /S 表单控件  -->' + '                   <form class="form-horizontal" role="form"> ' + '                       <div class="form-group mt20 ">' + '                           <label class="col-sm-3 control-label">商品：</label>' + '                           <label class=" control-label col-sm-9 labAutoGoodsName" style="text-align:left;padding-left:0px;">小米1</label>' + '                       </div>' + '                       <div class="form-group mt20">' + '                           <label class="col-sm-3 control-label" >零售价：</label>' + '                           <div class="col-sm-9 pl0" >' + '                               <input type="text" class="form-control txtAutoPrice" name=""   placeholder="请输入零售价"  onkeyup="functionObjExtent.checkInput.checkNum(this,12)"  />' + '                           </div>' + '                       </div>' + '                       <div class="form-group">' + '                           <label class="col-sm-3 control-label" ><i style="color: red;">*</i>数量：</label>' + '                           <div class="col-sm-9 pl0" >' + '                               <input type="text" class="form-control txtAutoCount" name=""  onkeyup="functionObjExtent.checkInput.clearNoNum(this,12)"  placeholder="请输入1~10000的整数" />' + '                           </div>' + '                       </div>' + '                       <div class="form-group">' + '                           <label class="col-sm-3 control-label" >备注：</label>' + '                           <div class="col-sm-9 pl0" >' + '                               <input type="text" class="form-control txtAutoRemark" name=""   placeholder="请输入备注"   />' + '                           </div>' + '                       </div>' + '                       <div class="form-group">' + '                           <label class="col-sm-12 control-label" >系统将为您自动生成指定数量的14位YS前缀串号。</label>' + '                       </div>' + '                       <div class="form-group tc">' + '                       <button type="button" class="erp-btn-bg btnAutoSave" style="margin-right: 20px;">确定</button>' + '                       <button type="button" class="erp-btn-lab btnAutoCanle "  >取消</button>' + '                       </div>' + '                  </form>' + '           </div> ' + '          <!-- modal-body end  -->' + '       </div>' + '   </div>' + '</div>';
                return _template;
            }
        },
        //加载dom
        loadDom: function loadDom() {
            $("body").append(this.dom);
            var _self = this;
            var colNames = ['主串号', '辅助串号', '备注'];
            var colModel = [{
                name: 'imei',
                index: 'imei',
                align: 'left',
                width: '150',
                sortable: false,
                hidden: false,
                editable: false,
                editoptions: { onkeyup: "checkInput.checkStrNum(this,20)" }
            }, {
                name: 'auxiliaryImei',
                index: 'auxiliaryImei',
                width: '150',
                align: 'left',
                sortable: false,
                editoptions: { onkeyup: "checkInput.checkStrNum(this,20)" }
            }, { name: 'remark', width: '150', index: 'remark', align: 'left', editable: true, sortable: false }];
            if (_self.option.colModel == 1) {
                colNames.splice(2, 0, '成本');
                colModel.splice(2, 0, {
                    name: 'cost',
                    width: '150',
                    index: 'cost',
                    align: 'center',
                    sortable: false,
                    formatter: 'number',
                    editable: true,
                    editoptions: {
                        dataEvents: [{
                            type: "focus",
                            fn: function fn() {
                                this.select();
                            }
                        }]
                    }
                });
            }

            var pager = '#dataGridPager' + _self.option.nonDuplicateID;
            //配置
            var paras = {
                gridId: 'dataGrid' + _self.option.nonDuplicateID,
                noShowAdd: true,
                pager: pager,
                deleteLable: '确定要删除此行？注：将会一并删除草稿单据内此串号',
                colNames: colNames,
                colModel: colModel
            };
            //回调函数
            var callBackList = {
                onCellSelect: function onCellSelect(rowid, iCol, cellcontent, e) {
                    if (_self.option.colModel == 1) {
                        var currRow = _self.option.dataGrid.$grid.jqGrid('getRowData', rowid);
                        //成本
                        if (iCol == 4) {
                            var imeiInputData = '';
                            if (currRow.auxiliaryImei != '') {
                                imeiInputData = currRow.imei + ',' + currRow.auxiliaryImei;
                            } else {
                                imeiInputData = currRow.imei;
                            }
                            var cost = getCostPriceByImei({
                                "goodsId": _self.option.goodsID,
                                "imeiInputData": imeiInputData,
                                'showCost': _self.option.colModel,
                                //是否勾选 启用辅助串号 0:否 1:是
                                'IfCheckedAuxiliaryImei': _self.option.isEnableAuxliaryImei == true ? 1 : 0
                            });
                            if (cost == '') {
                                _self.option.dataGrid.$grid.jqGrid('setColProp', 'cost', { 'editable': true });
                            } else {
                                _self.option.dataGrid.$grid.jqGrid('setColProp', 'cost', { 'editable': false });
                            }
                        }
                    }
                },
                afterEditCell: function afterEditCell(rowid, name, val, iRow, iCol) {
                    //开始编辑
                    _self.option.lastrow = iRow;
                    _self.option.lastcell = iCol;
                },
                afterSaveCell: function afterSaveCell(rowid, name, val, iRow, iCol) {
                    //保存编辑
                    _self.option.lastrow = iRow;
                    _self.option.lastcell = iCol;
                },
                summary: function summary(rowid, name, val, iRow, iCol) {
                    //统计处理
                    if (_self.option.colModel == 1) {
                        summaryCost(_self);
                    }
                },
                getGridDataList: function getGridDataList() {
                    var rows = _self.option.dataGrid.$grid.getGridParam().data;
                    //筛出不合格行
                    return $.map(rows, function (row) {
                        delete row["op"];
                        if ($.notEmpty(row.imei)) {
                            return row;
                        }
                    });
                },
                deleteCallBack: function deleteCallBack(info) {
                    var GridDataList = dataGrid.getGridDataList();
                    _self.dom.find('.currInputNum').html(GridDataList.length);
                    var imeiList = _self.option.imeiList || [];
                    if (imeiList.length > 0) {
                        var infoImei = info.imei.toUpperCase();
                        var infoAuxiliaryImei = info.auxiliaryImei.toUpperCase();
                        for (var i = 0; i < imeiList.length; i++) {
                            var imei = $.trim(imeiList[i].imei).toUpperCase();
                            var auxiliaryImei = $.trim(imeiList[i].auxiliaryImei).toUpperCase();
                            if (imei.length > 0 && imei == infoImei || auxiliaryImei.length > 0 && auxiliaryImei == infoAuxiliaryImei) {
                                imeiList.splice(i, 1);
                                _self.option.saveImeiInputCallback(imeiList);
                            }
                        }
                    }
                    _self.option.dataGrid.$grid.setGridParam({ data: GridDataList }).trigger('reloadGrid');
                },
                gridComplete: function gridComplete() {
                    $(pager + "_left").remove();
                    $(pager + "_center").attr('colspan', 2);
                }
            };
            var dataGrid = new MyEiditGrid(paras, callBackList);
            dataGrid.$grid.jqGrid("clearGridData");
            dataGrid.$grid.setGridParam({
                rowNum: 100,
                rowTotal: 1000000
            }).trigger('reloadGrid');
            if (_self.option.imeiList.length > 0) {
                _self.dom.find(".currInputNum").html(_self.option.imeiList.length);
                //这里id 会去填充表格的id， 这里要事先删除id
                for (var i = 0; i < _self.option.imeiList.length; i++) {
                    var imei = _self.option.imeiList[i];
                    delete imei.id;
                }
                dataGrid.$grid.setGridParam({ data: _self.option.imeiList }).trigger('reloadGrid');
            } else {
                _self.dom.find(".currInputNum").html(0);
            }
            dataGrid.$grid.setGridParam({ userDataOnFooter: true, autowidth: true, width: '100%' });
            dataGrid.$grid.setGridHeight(300);
            dataGrid.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" }).next('.ui-jqgrid-sdiv').hide();
            if (_self.option.isEdit == true) {
                dataGrid.$grid.setGridParam({ cellEdit: true });
                dataGrid.$grid.setGridParam().showCol("op");
            } else {
                dataGrid.$grid.setGridParam({ cellEdit: false });
                dataGrid.$grid.setGridParam().hideCol("op");
            }
            _self.option.dataGrid = dataGrid;
            if (_self.option.colModel == 1) {
                dataGrid.$grid.closest(".ui-jqgrid-bdiv").next('.ui-jqgrid-sdiv').show();
                summaryCost(_self);
            }
        },
        reLoadDom: function reLoadDom() {
            this.clearDom();
            this._init();
        },
        //清空dom
        clearDom: function clearDom() {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
            if (this.AutoImeiDom !== null) {
                this.AutoImeiDom.remove();
                this.AutoImeiDom = null;
            }
        },
        showModal: function showModal() {
            this.dom.modal('show');
        },
        hideModal: function hideModal() {
            this.dom.modal('hide');
        },
        //设置当前的参数
        setOption: function setOption(data) {
            this.option = $.extend(false, this.option, data);
        },
        //追加一行数据
        appenRow3: function appenRow3() {
            var _self = this;
            var imei1 = _self.dom.find(".imeiInput1").val().trim().toUpperCase();
            var imei2 = _self.dom.find(".imeiInput2").val().trim().toUpperCase();
            var imeiGrid = _self.option.dataGrid;

            if ($.trim(imei1) != '') {
                var ids = imeiGrid.getGridDataList();
                if (ids.length > 0) {
                    var objData = [];
                    for (var i = 0; i < ids.length; i++) {
                        objData.push(ids[i]);
                    }
                    for (var j = 0; j < objData.length; j++) {
                        if ($.trim(imei1) == objData[j].imei || $.trim(imei1) == objData[j].auxiliaryImei) {
                            $.MsgBox('重复校验提示', '串号:' + $.trim(imei1) + ' 在本窗口表格里第' + (j + 1) + '行已经存在');
                            return false;
                        }
                    }
                }
            }

            if ($.trim(imei2) != '') {
                var ids = imeiGrid.getGridDataList();
                if (ids.length > 0) {
                    var objData = [];
                    for (var i = 0; i < ids.length; i++) {
                        objData.push(ids[i]);
                    }
                    for (var j = 0; j < objData.length; j++) {
                        if ($.trim(imei2) == objData[j].imei || $.trim(imei2) == objData[j].auxiliaryImei) {
                            $.MsgBox('重复校验提示', '辅助串号:' + $.trim(imei2) + ' 在本窗口表格里第' + (j + 1) + '行已经存在');
                            return false;
                        }
                    }
                }
            }

            if (_self.option.appenRowCallback(imei1, imei2) == true) {
                var appendData = {
                    imei: imei1,
                    auxiliaryImei: imei2
                };
                if (_self.option.colModel == 1) {
                    var imeiInputData = '';
                    if (imei2 != '') {
                        imeiInputData = imei1 + ',' + imei2;
                    } else {
                        imeiInputData = imei1;
                    }
                    appendData.cost = getCostPriceByImei({
                        "goodsId": _self.option.goodsID,
                        "imeiInputData": imeiInputData,
                        'showCost': _self.option.colModel,
                        //是否勾选 启用辅助串号 0:否 1:是
                        'IfCheckedAuxiliaryImei': _self.option.isEnableAuxliaryImei == true ? 1 : 0
                    });
                }
                imeiGrid.$grid.addRowData(MyEiditGrid.getMaxRowid($("#" + imeiGrid.gridId)) + 1, appendData);
                _self.dom.find('.currInputNum').html(imeiGrid.getGridDataList().length);
                _self.dom.find(".imeiInput1").val("");
                _self.dom.find(".imeiInput2").val("");
                //滚动条
                imeiGrid.$grid.parents(".ui-jqgrid-bdiv").scrollTop(imeiGrid.$grid.height());
            }
        },
        getTemplate: function getTemplate() {
            // 默认模板
            var _template = '<!-- 串号录入 -->' + '<div class="modal fade imeiInputModal"  tabindex="-1" role="dialog"  aria-hidden="false">' + '   <div class="modal-dialog" style="width:990px;">' + '      <div class="modal-content">' + '     <div class="modal-header">' + '            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>' + '            <h4 class="modal-title">' + '               串号导入' + '            </h4>' + '         </div>' + '         <div class="modal-body" style="padding-bottom: 0px;padding-top: 0px;">' + '        <div class="form-horizontal" role="form"> ' + '<div class="form-group" style="background-color: #f2f2f2;line-height: 30px;" >' + '  <!-- 商品名称 -->' + '  <label class=" goodsnameTitle"   style="text-align: left;float:left;padding-left:20px;">  </label>' + '  <!-- 是否串号管理 -->' + '  <label class="isEnableAuxliaryImei"  style="text-align: left;float:left;padding-left:50px;" for="EditImei_' + this.option.nonDuplicateID + '" > <input id="EditImei_' + this.option.nonDuplicateID + '" type="checkbox" name="EditImei" class="EditImei" disabled="disabled">启用辅助串号</label>' + '</div>' + '</div>' + '         <div class="col-md-7" >' + '   <div class="form-group">' + '       <label class="" style="padding-right: 25px;">手工录入</label>' + '   </div>' + '        <div class="form-horizontal" role="form"> ' + '    <!-- /S 表单控件  -->' + '<div class="form-group">' + '  <label class="col-sm-2 control-label" style="font-weight: normal;">主串：</label>' + '  <div class="col-sm-4">' + '      <input type="text" class="form-control imeiInput1" name=""   />' + '      ' + '  </div>' + '  <div class="col-sm-4">' + '      <label style="color:red;" class=" control-label" ></label>' + '      ' + '  </div>' + '</div>' + '<div class="form-group auxliaryImeiGroup">' + '  <label class="col-sm-2 control-label" style="font-weight: normal;">辅串：</label>' + '  <div class="col-sm-4">' + '      <input type="text" class="form-control imeiInput2" name="imeiInput2"   />' + '      ' + '  </div>' + '  <div class="col-sm-4">' + '      <label style="color:red;" class=" control-label" ></label>' + '      ' + '  </div>' + '</div>' + '</div> ' + '<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;margin-left: 30px;">' + '<button class="erp-btn-lab addImeiInput" style="margin-left: 50px;">添加</button>' + '</div>' + '<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;    margin: 10px 0px;">' + '<span class="">已录入串号：<span class="currInputNum"  >0</span></span>' + '      <button type="button" class="fr erp-link-lab btnAutoImei" title="自动生成串号功能仅针对单串号管理商品，且串号长度为14位或不限位数！" >自动生成串号</button>' + '</div>' + '<!-- /S 表体 -->' + '<div style=" width:550px;overflow:auto;" class="jqGrid_wrapper">' + '<table  id="dataGrid' + this.option.nonDuplicateID + '"></table> ' + '<div id="dataGridPager' + this.option.nonDuplicateID + '"></div>' + '</div>' + '<!-- /E 表体 -->' + ' </div>' + '<div class="col-md-5" style="padding-bottom: 0px;" >' + '   <div class="form-group">' + '       <label class="" style="padding-right: 25px;">Excel粘贴：</label>' + '       <label class="" style="float: right;">格式：主串，辅串</label>' + '   </div>' + '   <div class="form-group clearfix txtExportImeiWrap" style="height: 100px;" >' + ' <textarea class=" col-sm-12 txtExportImei" style="resize:none;width:360px;height:100px;margin-left:30px;" placeholder="一行一串号，若双串号则左主右辅。例：\n' + '已启用辅助串号  \n' + 'A8888888888888，868888888888888 \n' + 'A9999999999999，869999999999999 \n' + '未启用辅助串号  \n' + 'A8888888888888 \n' + 'A9999999999999 \n' + ' "></textarea>' + '   </div>' + '   <div class="form-group">' + '      <button type="button" class="erp-btn-lab exportImeiInput"  style="margin-right: 25px;">导入</button>' + '      <button type="button" class="erp-btn-lab clearImeiInput"  >清空</button>' + '   </div>' + '   <div class="form-group">' + '       <label class="" style="font-weight: normal;margin-bottom: 10px;">错误提示</label>' + ' <textarea class="col-sm-12 form-control failedExportImei" readonly style="height: 330px;resize:none;color:#ff0000;"></textarea>' + '</div>' + ' </div>' + '         </div>' + '         <!-- 模态框底部部分 -->' + '         <div class="modal-footer">' + '            <button type="button" class="fl erp-btn-lab btnPrintAutoImei"  >打印所选串号标签</button>' + '            <button type="button" class="erp-btn-bg saveImeiInput" style="margin-right: 20px;">确定</button>' + '            <button type="button" class="erp-btn-lab canelSaveImeiInput"  >取消</button>' + '         </div>' + '  </div>' + '</div>' + '</div>';
            return _template;
        }
    };

    //是否显示： 生成自动串号
    function isShowAutoImei(_self, $_template) {
        if (_self.option.isAutoImei == true) {
            $_template.find(".btnAutoImei").show();
            $_template.find(".btnPrintAutoImei").show();
            //(是辅助串号  或者  不是：任意，14位的串号  ）  , 禁用 按钮
            if (_self.option.isEnableAuxliaryImei == true || Number(_self.option.currImeiLength) != 0 && Number(_self.option.currImeiLength) != 14) {
                $_template.find(".btnAutoImei").prop('disabled', true);
                $_template.find(".btnPrintAutoImei").prop('disabled', true);
            } else {
                $_template.find(".btnAutoImei").prop('disabled', false);
                $_template.find(".btnPrintAutoImei").prop('disabled', false);
            }
        } else {
            $_template.find(".btnAutoImei").hide();
            $_template.find(".btnPrintAutoImei").hide();
        }
    }
    function batchImport(_self, list, remark) {
        _self.option.dataGrid.$grid.jqGrid("saveCell", _self.option.lastrow, _self.option.lastcell); //取消编辑状态
        var imeiGrid = _self.option.dataGrid;
        var ids = imeiGrid.getGridDataList();
        var jaData = [];
        if (ids.length > 0) {
            for (var i = 0; i < ids.length; i++) {
                jaData.push(ids[i]);
            }
        }
        $.each(list, function (i, item) {
            var imei1 = "";
            var imei2 = "";
            if (_self.option.isEnableAuxliaryImei == true) {
                imei1 = item.imei;
                imei2 = item.auxiliaryImei;
            } else {
                imei1 = item.imei;
            }
            var addJson = {
                imei: imei1,
                auxiliaryImei: imei2
            };
            if (_self.option.colModel == 1) {
                addJson.cost = item.costPrice || '';
            }
            if ($.trim(remark) != "") {
                addJson.remark = remark;
            }
            jaData.push(addJson);
        });
        if (jaData.length > 0) {
            imeiGrid.$grid.jqGrid('clearGridData');
            imeiGrid.$grid.setGridParam({ data: jaData }).trigger('reloadGrid');
            //滚动条
            imeiGrid.$grid.parents(".ui-jqgrid-bdiv").scrollTop(imeiGrid.$grid.height());
        }
        jaData = null;
        _self.dom.find('.currInputNum').html(imeiGrid.getGridDataList().length);
    }

    //合计（成本）
    function summaryCost(_self) {
        var sumCost = _self.option.dataGrid.$grid.getCol('cost', false, 'sum');
        _self.option.dataGrid.$grid.footerData("set", { imei: "合计", cost: sumCost });
    }

    //查询在库串号
    function inStorageImei(Imei, callBack) {
        var flag = true;
        //后台查询数据
        $.request({
            url: '/manager/inventory/common/validateImeiBeforeInStock',
            type: "POST",
            dataType: 'json',
            async: false,
            data: { "queryKey": Imei },
            success: function success(data) {
                if (data.result == 1) {
                    callBack();
                } else {
                    flag = false;
                    $.MsgBox('错误提示', data.desc);
                }
            }
        });
        return flag;
    }

    //获取现存成本价格
    function getCostPriceByImei(data) {
        var cost = '';
        $.ajax({
            type: 'post',
            url: "/manager/component/imei/validateInStockImei",
            dataType: "json",
            async: false,
            data: data,
            success: function success(data) {
                if (data.result == 1) {
                    cost = $.trim(data.data.successResultList[0].costPrice);
                }
            }
        });
        return cost;
    }

    //获取是否可以编辑 启用辅助串号
    function getIsEditAuxiliaryImei(callback) {
        $.ajaxPackage({
            url: "/manager/Tparam/find?code=C03010",
            type: 'GET',
            dataType: "json",
            contentType: 'application/json',
            success: function success(data) {
                if (data.result == 1) {
                    if (callback) {
                        callback(data);
                    }
                }
            }
        });
    }

    //保存数据
    function saveData(_self) {
        _self.option.dataGrid.$grid.jqGrid("saveCell", _self.option.lastrow, _self.option.lastcell); //取消编辑状态
        _self.option.saveImeiInputCallback(_self.option.dataGrid.getGridDataList());
    }

    window.comImeiInputModal = component;

    //在插件中使用  组件对象
    $.fn.comImeiInputModal = function (options) {
        //创建的实体
        var obj = new component(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
'use strict';

/*
 组件:串号录入框
*/

!function ($) {

    // 构造函数
    var comImeiOutModal = function comImeiOutModal(el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID(); // 不重复的ID
        // 默认参数
        var defaults = {
            dataGrid: null, //表格对象
            nonDuplicateID: nonDuplicateID, //唯一标示
            imeiOutModalID: 'imeiOutModalID' + nonDuplicateID,
            imeiDrTableID: 'imeiDrTableID' + nonDuplicateID,
            menuCode: '',
            sectionId: '',
            getImeiUrl: '',
            inputLab: '退货串号',
            imeiList: [],
            requestBeforeBack: function requestBeforeBack() {},
            inputEnterBack: function inputEnterBack() {},
            importEnterBack: function importEnterBack() {}
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this.imeiDom = null;
        this._init();
    };
    comImeiOutModal.prototype = {
        _init: function _init() {
            this.loadDom();
        },
        //创建事件
        createEvent: function createEvent() {
            var _self = this;
            _self.outInputEvent();
        },
        //加载dom
        loadDom: function loadDom() {
            var _self = this;
            var $_template = $(_self.getTemplate());
            _self.dom = $_template;
            _self.createEvent();
            _self.element.append(_self.dom);
        },
        reLoadDom: function reLoadDom() {
            this.clearDom();
            this._init();
        },
        //出库串号输入框事件
        outInputEvent: function outInputEvent() {
            var _self = this;
            //出库串号
            _self.dom.find('.outSearchImei').bind('keyup', function (e) {
                if (e.keyCode != 13) {
                    return;
                }
                var $outObj = $(this);
                var curVal = $outObj.val().trim();
                var keyCodyflag = false; //是否按下enter
                if (e.keyCode == 13 && curVal != '') {
                    keyCodyflag = true;
                }
                _self.dom.find('.imeiUl').html('');
                if (curVal.length > 4) {
                    $outObj.blur();
                    if (_self.option.requestBeforeBack) {
                        var flag = _self.option.requestBeforeBack();
                        if (flag === false) {
                            return;
                        }
                    }
                    ajaxGetImeiList(_self, curVal, function (data) {
                        var ulHtml = '';

                        if (data.data.successResultList.length != 0) {
                            for (var i = 0; i < data.data.successResultList.length; i++) {
                                var successResultItem = data.data.successResultList[i];
                                successResultItem.ifManageIMei = successResultItem.ifManageImei;
                                successResultItem.ifEnableAuxliaryImei = successResultItem.ifEnableAuxiliaryImei;
                                successResultItem.auxliaryImeiLength = successResultItem.auxiliaryImeiLength;
                                ulHtml += '<li class="imeiUlList" data-info = "' + JSON.stringify(successResultItem).replace(/"/g, "'") + '">' + successResultItem.imei + '</li>';
                            }
                        } else {
                            var desc = data.data.failedResultList[0];
                            ulHtml += '<li>' + desc + '</li>';
                        }
                        _self.dom.find('.imeiUl').html(ulHtml);
                        _self.dom.find('.none-cx').show();
                        //如果只有一条记录直接录入
                        if (data.data.successResultList.length == 1 && keyCodyflag == true) {
                            imeiUlLiClick(JSON.stringify(data.data.successResultList[0]));
                            $outObj.blur()[0].select(); //设置选中，方便下次扫码清空
                        }
                    });
                }
            });
            _self.dom.find('.imeiUl').delegate("li.imeiUlList", "click", function () {
                var _this = $(this);
                imeiUlLiClick(JSON.stringify(_this.data('info')));
            });
            //串号导入
            _self.dom.find('.outImeiImport').on('click', function () {
                if (_self.option.requestBeforeBack) {
                    var flag = _self.option.requestBeforeBack();
                    if (flag === false) {
                        return;
                    }
                }
                if (_self.imeiDom === null) {
                    _self.imeiDom = $(_self.getOutImeiTemplate());
                    _self.imeiDom.modal('show');
                    var colNames = ['imeiId', '商品id', '仓库id', '仓库名称', '部门名称', '商品类别', '串号', '辅助串号', '商品编码', '商品名称', '商品品牌', '型号', '颜色', '串号备注', '库存量', '是否串号管理', '税率', '是否启用辅串', '是否赠品', '辅串长度', '单价', '成本价', '主串长度', '折扣率', '计价方式'];
                    var colModel = [{ name: 'imeiId', index: 'imeiId', width: 1, hidden: true }, { name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true }, { name: 'storageId', index: 'storageId', width: 1, hidden: true }, { name: 'storageName', index: 'storageName', width: 1, hidden: true }, { name: 'sectionName', index: 'sectionName', width: 1, hidden: true }, { name: 'categoryName', index: 'categoryName', width: 1, hidden: true }, { name: 'imei', index: 'imei', width: 140, align: 'left', sorttype: "string", sortable: false }, { name: 'auxiliaryImei', index: 'auxiliaryImei', width: 140, align: 'left', sorttype: 'string', sortable: false }, { name: 'code', index: 'code', width: 100, align: 'left', sorttype: 'string', sortable: false }, { name: 'name', index: 'name', width: 200, align: 'left', sorttype: 'string', sortable: false }, { name: 'brandName', index: 'brandName', width: 1, hidden: true }, { name: 'models', index: 'models', width: 1, hidden: true }, { name: 'color', index: 'color', width: 1, hidden: true }, { name: 'imeiRemark', index: 'imeiRemark', width: 200, align: 'left', sortable: false }, { name: 'stockCount', index: 'stockCount', width: 1, hidden: true }, { name: 'ifManageImei', index: 'ifManageImei', width: 1, hidden: true }, { name: 'taxRate', index: 'taxRate', width: 1, hidden: true }, { name: 'ifEnableAuxiliaryImei', index: 'ifEnableAuxiliaryImei', sortable: false, hidden: true }, { name: 'giftFlag', index: 'giftFlag', sortable: false, hidden: true }, { name: 'auxiliaryImeiLength', hidden: true }, { name: 'costPrice', hidden: true }, { name: 'price', hidden: true }, { name: 'imeiLength', hidden: true }, { name: 'discountRate', hidden: true }, { name: 'valuationMethods', hidden: true }];
                    //配置
                    var paras = {
                        gridId: _self.option.imeiDrTableID,
                        colNames: colNames,
                        colModel: colModel
                    };
                    //回调函数
                    var callBackList = {
                        onCellSelect: function onCellSelect(rowid, iCol, cellcontent, e) {},
                        afterEditCell: function afterEditCell(rowid, name, val, iRow, iCol) {//开始编辑

                        },
                        afterSaveCell: function afterSaveCell(rowid, name, val, iRow, iCol) {//保存编辑

                        },
                        summary: function summary(rowid, name, val, iRow, iCol) {//统计处理

                        },
                        getGridDataList: function getGridDataList() {}
                    };
                    var dataGrid = new MyEiditGrid(paras, callBackList);
                    dataGrid.$grid.setGridParam({
                        rowNum: 10000
                    }).trigger('reloadGrid');
                    _self.dataGrid = dataGrid;
                    _self.imeiDom.find('.imeiDr_clear').click(function () {
                        _self.imeiDom.find('.imeiDr_vone').val('');
                        _self.imeiDom.find('.imeiDr_vtwo').val('');
                        _self.imeiDom.find(".imeiDr_vone").trigger('keydown');
                    });
                    _self.imeiDom.find(".imeiDr_vone").val('').setTextareaCount({
                        width: "30px",
                        bgColor: "#f2f2f2",
                        color: "red",
                        display: "block"
                    }).parent().css('width', '100%');
                    //导入
                    _self.imeiDom.find('.imeiDr_import').click(function () {
                        _self.imeiDom.find(".imeiDr_vtwo").val('');
                        //开始添加串号
                        var vone = _self.imeiDom.find('.imeiDr_vone').val();
                        var v1 = vone.split("\n");
                        var str = '',
                            vtr = '';
                        var a1 = _self.dataGrid.$grid.getCol('imei');
                        var a2 = _self.dataGrid.$grid.getCol('auxiliaryImei');
                        var imeiList = _self.option.imeiList || [];
                        var imeiAuList = [];
                        for (var i = 0; i < imeiList.length; i++) {
                            var imeiItem = eval(imeiList[i]) || [];
                            for (var j = 0; j < imeiItem.length; j++) {
                                var imeicc = imeiItem[j];
                                if ($.trim(imeicc.imei) != '') {
                                    imeiAuList.push($.trim(imeicc.imei) + ($.trim(imeicc.auxiliaryImei) == "" ? '' : ',' + $.trim(imeicc.auxiliaryImei)));
                                }
                            }
                        }

                        $.each(v1, function (i, item) {
                            var toval = item.trim().toUpperCase();
                            if (toval == "") {
                                return;
                            }
                            if (a1.indexOf(toval) == -1 && a2.indexOf(toval) == -1 && imeiAuList.indexOf(toval) == -1) {
                                str += toval + ';';
                                a1.push(toval);
                            } else {
                                vtr += toval + ';';
                            }
                        });
                        str = str.substring(0, str.length - 1);
                        if (str == '') {
                            if (vtr !== "") {
                                _self.imeiDom.find('.imeiDr_vtwo').val(vtr + '已导入\n');
                            }
                            return;
                        } else {
                            if (vtr !== "") {
                                _self.imeiDom.find('.imeiDr_vtwo').val(vtr + '已导入\n');
                            }
                        }
                        ajaxGetImeiList(_self, str, function (data) {
                            if (data.result == 1) {
                                var failed = data.data.failedResultList;
                                var list = data.data.successResultList;
                                var exsitJqImeiData = _self.dataGrid.$grid.getGridParam().data;
                                var ImeiData = exsitJqImeiData.concat(list);
                                _self.dataGrid.$grid.setGridParam({ data: ImeiData }).trigger('reloadGrid');
                                var num = _self.dataGrid.$grid.getDataIDs();
                                _self.imeiDom.find('.imeiDr_num').text(num.length);
                                var txt = _self.imeiDom.find(".imeiDr_vtwo").val();
                                $.each(failed, function (i, item) {
                                    txt += item + '\n';
                                });
                                $(".imeiDr_vtwo").val(txt);
                            }
                        });
                    });
                    //导入 确定
                    _self.imeiDom.find('.imeiDr_sure').click(function () {
                        _self.imeiDom.modal('hide');
                        if (_self.option.importEnterBack) {
                            _self.option.importEnterBack(_self.dataGrid.$grid.getGridParam().data);
                        }
                    });
                } else {
                    _self.imeiDom.modal('show');
                    _self.imeiDom.find('.imeiDr_vone,.imeiDr_vtwo').val('');
                    _self.imeiDom.find('.imeiDr_num').text(0);
                    _self.dataGrid.$grid.jqGrid('clearGridData').trigger('reloadGrid').resize();
                }
            });
            _self.isDisable();

            function imeiUlLiClick(info) {
                var oneData = JSON.parse(info.replace(/'/g, '"'));
                _self.dom.find(".outSearchImei").focus();
                _self.dom.find('.none-cx').hide();
                if (_self.option.inputEnterBack) {
                    _self.option.inputEnterBack(oneData);
                }
            }
        },
        isDisable: function isDisable(flag) {
            var _self = this;
            if (flag == true) {
                _self.dom.find('.outSearchImei,.outImeiImport').attr("disabled", true);
            } else {
                _self.dom.find('.outSearchImei,.outImeiImport').attr("disabled", false);
            }
        },
        //清空dom
        clearDom: function clearDom() {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
            if (this.imeiDom !== null) {
                this.imeiDom.remove();
                this.imeiDom = null;
            }
        },
        showModal: function showModal() {
            this.dom.modal('show');
        },
        hideModal: function hideModal() {
            this.dom.modal('hide');
        },
        //设置当前的参数
        setOption: function setOption(data) {
            this.option = $.extend(false, this.option, data);
        },
        getMethod: function getMethod(name) {
            return this.getAccessor(comImeiOutModal.prototype, name);
        },
        //访问器
        getAccessor: function getAccessor(obj, expr) {
            var ret,
                p,
                prm = [],
                i;
            if (typeof expr === 'function') {
                return expr(obj);
            }
            ret = obj[expr];
            if (ret === undefined) {
                try {
                    if (typeof expr === 'string') {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if (i) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return ret;
        },
        getOutImeiTemplate: function getOutImeiTemplate() {
            var _self = this;
            // 默认模板
            var _template = '\n            <div  class="modal imeiOutModal" id="' + this.option.imeiOutModalID + '" role="dialog" aria-hidden="true" data-backdrop="static"> \n                 <div class="modal-dialog modal-lg" role="document"> \n                    <div class="modal-content"> \n                         <div class="modal-header"> \n                               <button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button> \n                                <h4 class="modal-title imeiDr_title">' + _self.option.inputLab + '\u5BFC\u5165</h4> \n                        </div> \n                        <div class="modal-body"> \n                            <div class="col-md-12"> \n                                <div class="row"> \n                                    <div class="col-md-8" style="padding-left:0">\n                                     EXCEL\u7C98\u8D34\n                                    </div> \n                                    <div class="col-md-4" style="padding-left:0;padding-right: 0;">\n                                     \u9519\u8BEF\u63D0\u793A\n                                    </div> \n                                </div> \n                                <div class="row"> \n                                    <div class="col-md-8" style="padding-left:0"> \n                                        <textarea class="form-control imeiDr_vone" style="height: 80px;resize:none" placeholder="\u4E00\u884C\u4E00\u4E32\u53F7\uFF0C\u82E5\u53CC\u4E32\u53F7\u5219\u4E3B\u8F85\u4E32\u4EFB\u4E00\u5373\u53EF' + _self.option.inputLab + '\u5165\u5E93\u3002\u4F8B\uFF1A\nA88888888888888 \n869999999999999">\n                                        </textarea> \n                                        <div style="height: 40px;line-height: 40px;"> \n                                            <button type="button" class="erp-btn-bg imeiDr_import" >\u5BFC\u5165</button> \n                                            <button type="button" class="erp-btn-lab imeiDr_clear" >\u6E05\u7A7A</button> \n                                        </div> \n                                    </div> \n                                    <div class="col-md-4" style="padding-left:0;padding-right: 0;"> \n                                        <textarea class="form-control imeiDr_vtwo" style="height: 120px;resize:none"></textarea> \n                                    </div> \n                            </div> \n                                <div class="row" style="height: 40px;line-height: 55px;">\n                                    \u5DF2\u5F55\u5165\u4E32\u53F7\n                                     <font class="imeiDr_num">0</font>\u4E2A\n                                 </div> \n                                <div class="row" style="margin-top:8px;"> \n                                    <table id="' + this.option.imeiDrTableID + '" class="zxsaastable"></table> \n                                </div> \n                            </div> \n                         </div> \n                        <div class="modal-footer"> \n                            <button type="button" class="erp-btn-bg imeiDr_sure">\u786E\u8BA4</button> \n                            <button type="button" class="erp-btn-lab" data-dismiss="modal">\u53D6\u6D88</button> \n                        </div> \n                    </div> \n                </div> \n            </div>\n            ';
            return _template;
        },
        getTemplate: function getTemplate() {
            var _self = this;
            var _template = '\n            <div class="form-horizontal clearfix"> \n                <div class="form-group col-sm-4">\n                    <label class="col-sm-4 control-label" style="font-weight: normal;">' + _self.option.inputLab + '\u5F55\u5165:</label>\n                    <div class="col-sm-8">\n                        <input type="text" class="form-control outSearchImei" placeholder="\u4E32\u53F7\u5F55\u5165\uFF0C\u7CBE\u786E\u5168\u5339\u914D" value="">\n                        <div class="none-cx" style="display: none;width: 90%;">\n\t\t\t\t     \t \t<ul class="imeiUl" style="max-height: 300px;"></ul>\n\t\t\t\t     \t </div>\n                    </div>\n                </div>\n                <div class="form-group col-sm-3" style="margin-bottom: 0px;">\n                    <button type="button" class="erp-btn-lab outImeiImport">' + _self.option.inputLab + '\u5BFC\u5165</button>\n                </div>\n\t\t\t</div>\n            ';
            return _template;
        }
    };

    function ajaxGetImeiList(_self, curVal, _success) {
        //查询串号库存
        $.ajaxPackage({
            url: _self.option.getImeiUrl,
            type: "post",
            dataType: 'json',
            data: {
                menuCode: _self.option.menuCode,
                sectionId: _self.option.sectionId,
                imeiInputData: curVal
            },
            success: function success(data) {
                if (_success) {
                    _success(data);
                }
            }
        });
    }

    //在插件中使用  组件对象
    $.fn.comImeiOutModal = function (options) {
        if (typeof options === 'string') {
            var fn = comImeiOutModal.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comImeiOutModal(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 小票

*/

!function ($) {

    // 构造函数
    var comXiaoPiao = function comXiaoPiao(el, option) {
        // 默认参数
        var defaults = {
            billsId: null, //单据id
            isJuHe: true //是否聚合
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    comXiaoPiao.prototype = {
        _init: function _init() {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var _self = this;
            var $_template = $(this.getTemplate());
            this.element.unbind('click.show').bind('click.show', function () {
                $_template.modal('show');
            });
            //取消
            $_template.find('.close').bind('click', function () {
                $_template.modal('hide');
            });
            //打印
            $_template.find('.comXiaoPiao-item').bind('click', function () {
                var _this = $(this);
                var sign = _this.attr('data-sign');
                if (_self.option.billsId === null) {
                    $.zxsaas_plus.showalert("提示", "没有单据编号！");
                    return;
                }
                switch (sign) {
                    case 'a4':
                        $.printBills('/manager/inventory/retail/cashier/sytkaidan', { billsId: _self.option.billsId });
                        break;
                    case 'xp':
                        printXP(_self.option.billsId, sign, _self);
                        break;
                    case 'jh':
                        if (_self.option.isJuHe == true) {
                            printXP(_self.option.billsId, sign, _self);
                        }
                        break;
                }
            });
            this.dom = $_template;
            //是否显示聚合
            _self.resetJuHe();
        },
        //加载dom
        loadDom: function loadDom() {},
        //清空dom
        clearDom: function clearDom() {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
        },
        //设置当前的参数
        setOption: function setOption(data) {
            this.option = $.extend(false, this.option, data);
        },
        resetJuHe: function resetJuHe() {
            var _self = this;
            var $_template = _self.dom;
            //是否显示聚合
            if (_self.option.isJuHe == true) {
                $_template.find('.icon-tingyong').hide();
                $_template.find('.comXiaoPiao-item[data-sign="jh"]').addClass('active');
            } else {
                $_template.find('.icon-tingyong').show();
                $_template.find('.comXiaoPiao-item[data-sign="jh"]').removeClass('active');
            }
        },
        // 默认模板
        getTemplate: function getTemplate() {
            // 默认模板
            var _template = '<!-- 打印Modal -->\n' + '<div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n' + '  <div class="modal-dialog" role="document">\n' + '    <div class="modal-content" style="width: 900px;">\n' + '      <div class="modal-header">\n' + '        <button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' + '        <h4 class="modal-title" >打印模板</h4>\n' + '      </div>\n' + '      <div class="modal-body">\n' + '        <div class="comXiaoPiao-item active" data-sign="a4">\n' + '        \t<div class="pdbox">A4页</div><img src="/manager/images/lingshou/a4.png" />\n' + '        </div>\n' + '        <div class="comXiaoPiao-item active"  data-sign="xp">\n' + '        \t<div class="pdbox">小票</div><img src="/manager/images/lingshou/xiaopiao.png" />\n' + '        </div>\n' + '        <div class="comXiaoPiao-item"  data-sign="jh">\n' + '           <i class="iconfont icon-tingyong none" ></i>' + '        \t<div class="pdbox">聚合收款</div><img src="/manager/images/lingshou/xp.png" />\n' + '        </i>\n' + '      </div>\n' + '    </div>\n' + '  </div>\n' + '</div>';
            return _template;
        }
    };
    function printXP(id, sign, _self) {
        $.loading();
        $.ajax({
            url: '/manager/inventory/retail/delivery/smallTicketPrint',
            type: "post",
            dataType: 'html',
            data: { id: id },
            success: function success(data) {
                $.loading(true);
                $(".billsDIVWrap").remove();
                $('body').append($(data));
                if (sign == 'xp') {
                    LodoXiaoPiaopPrint(_self.option.isJuHe);
                } else {
                    LodoUnionPayMerchantPrint();
                }
            }, error: function error(msg) {
                $.loading(true);
                $.zxsaas_plus.showalert("提示", "服务器繁忙,请稍后重试!");
            }
        });
    }

    window.comXiaoPiao = comXiaoPiao;

    //在插件中使用  组件对象
    $.fn.comXiaoPiao = function (options) {
        //创建的实体
        var obj = new comXiaoPiao(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
'use strict';

/*
 组件 模板

*/

!function ($) {

    // 构造函数
    var comModalsbox = function comModalsbox(el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID(); // 不重复的ID
        // 默认参数
        var defaults = {
            gridID: 'modalGrid' + nonDuplicateID, //表格的id
            treeSetOption: {},
            clickBefore: null, // 点击之前的回调
            clickback: null //确定的回调，双击的回调
        };
        this.option = $.extend(true, defaults, option);
        if (this.option.isHasTree == true) {
            this.option.treeID = 'modalTree' + nonDuplicateID;
        }
        this.element = $(el);
        var target = this.element;
        target.data('id', '');
        target.empty();
        target.prop('readonly', true);
        this.dom = null;
        this._init();
    };
    comModalsbox.prototype = {
        _init: function _init() {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var _self = this;
            var options = this.option;
            var icon = $('<span class="input-group-btn showBox showModalBtn"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>');
            this.element.after(icon);
            var $_template = $(['<div class="modal fade comModal" tabindex="-1" role="dialog" aria-hidden="true">', '<div class="modal-dialog modal-lg" role="document">', '<div class="modal-content" >', '<div class="modal-header">', '<button type="button" class="close closer" aria-label="Close"><span aria-hidden="true">&times;</span></button>', '<h4 class="modal-title">' + options.name + '选择</h4>', '</div>', '<div class="modal-body" style="width: 900px;">', '<div>', '<div class="row form-inline filterWrap" style="margin:0 0 10px 0;"><input type="text" style="width:50%;" class="form-control searchInput" placeholder="请输入' + options.placeholder + '"></div>', '<div class="row gridBox" style="margin:0 0 10px 0;"></div>', '</div>', '</div>', '<div class="modal-footer">', '<button type="button" class="erp-btn-bg  sureModalBtn" data-dismiss="modal">确定</button>', '<button type="button" class="erp-btn-lab closer" >关闭</button>', '</div>', '</div>', '</div>', '</div>'].join('\n'));
            if (options.treeID) {
                $_template.find('.modal-body').prepend('<div class="col-xs-3 treeBox" style="overflow:auto;"><ul id="' + options.treeID + '" class="ztree" ></ul></div>');
                $_template.find('.gridBox').parent().addClass('col-xs-9');
            }
            $_template.find('.gridBox').append('<table id="' + options.gridID + '" class="zxsaastable"></table><div id="gridpager_' + options.gridID + '"></div>');
            //点击下拉图标
            icon.unbind("click").on("click", function (e) {
                //点击之前验证，
                if (_self.option.clickBefore) {
                    var flag = _self.option.clickBefore();
                    if (flag === false) {
                        return;
                    }
                }
                _self.dom.modal('show');
                var options = _self.option;
                setTimeout(function () {
                    var grid = $('#' + options.gridID);
                    var len = grid.find('tbody').children().length;
                    if (len <= 1) {
                        //加载树
                        if (options.treeID) {
                            treeFun();
                        }
                    } else if (options.isReloadTree === true) {
                        //加载树
                        if (options.treeID) {
                            treeFun();
                        }
                    }

                    //页面进来的时候，清空掉 搜索 的值
                    $_template.find('.searchInput').val('');
                    $_template.find('.modalFilter').attr('checked', false);
                    options.girdParam.queryKey = '';
                    grid.jqGrid('setGridParam', {
                        datatype: 'json',
                        url: options.girdUrl,
                        postData: options.girdParam,
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }, 150);
            });
            $_template.find('.closer').on('click', function () {
                _self.dom.modal('hide');
            });
            //确定按钮点击事件
            $_template.find('.sureModalBtn').unbind("click").on("click", function (e) {
                var ids = $("#" + options.gridID).jqGrid('getGridParam', 'selarrrow');
                var Ids = [];
                var Names = [];
                var arrList = [];
                for (var i = 0; i < ids.length; i++) {
                    var dataInfo = $("#" + options.gridID).jqGrid('getRowData', ids[i]);
                    Ids.push(dataInfo.dataId);
                    Names.push(dataInfo.name);
                    arrList.push(dataInfo);
                }
                _self.element.val(Names.join(',')).data('id', Ids.join(','));
                if (_self.option.clickback) {
                    _self.option.clickback(arrList);
                }
            });
            var times;
            //搜索事件 注销实时搜索，添加回车
            if (options.enter) {
                $_template.find('.searchInput').unbind("input propertychange");
                $_template.find('.searchInput').unbind("keypress").on('keypress', function (e) {
                    var _this = $(this);
                    if (e.keyCode == 40 || e.keyCode == 38) {
                        _this.blur();
                    } else if (e.keyCode == 13) {
                        $("#" + options.gridID).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'queryKey': _this.val().trim()
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                });
            } else {
                $_template.find('.searchInput').unbind("input propertychange").on("input propertychange", function (e) {
                    var _this = $(this);
                    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
                        _this.blur();
                    } else {
                        if (times) clearTimeout(times);
                        times = setTimeout(function () {
                            $("#" + options.gridID).jqGrid('setGridParam', {
                                datatype: 'json',
                                postData: {
                                    'queryKey': _this.val().trim()
                                },
                                page: 1
                            }).trigger("reloadGrid"); //重新载入
                        }, 300);
                    }
                });
            }
            if (!options.multiselect) {
                $_template.find('.sureModalBtn').hide();
            }
            this.dom = $_template;
            $('body').append(this.dom);
            var $gird = $("#" + options.gridID);
            gridLoad();
            function treeFun() {
                var options = _self.option;
                options.treeSetOption = {
                    callback: {
                        onClick: function onClick(event, treeId, treeNode, msg) {
                            $gird.jqGrid('setGridParam', {
                                datatype: 'json',
                                postData: {
                                    'typeId': options.treeSelCod === true ? treeNode.code : treeNode.id,
                                    'dataId': options.treeSelCod === true ? treeNode.code : treeNode.id
                                },
                                page: 1
                            }).trigger("reloadGrid"); //重新载入
                        }
                    },
                    view: {
                        showLine: true
                    },
                    data: {
                        simpleData: { enable: true }
                    }
                };
                $.ajax({
                    type: 'post',
                    url: options.treeUrl,
                    data: options.treeParams,
                    dataType: "json",
                    success: function success(data) {
                        var nodes = data.data.dataList || [];
                        for (var i = 0; i < nodes.length; i++) {
                            nodes[i].pId = nodes[i].parentId;
                        }
                        $.fn.zTree.init($("#" + options.treeID), options.treeSetOption, nodes);
                        var zTree = $.fn.zTree.getZTreeObj(options.treeID);
                        zTree.expandAll(false);
                        var nodes = zTree.getNodes();
                        for (var i = 0; i < nodes.length; i++) {
                            //设置节点展开
                            zTree.expandNode(nodes[i], true, false, true);
                        }
                    }
                });
            }
            function gridLoad() {
                var postTimes = 0;
                $gird.jqGrid({
                    shrinkToFit: false,
                    styleUI: 'Bootstrap',
                    responsive: true,
                    mtype: "post",
                    datatype: "local",
                    jsonReader: {
                        root: "data.dataList",
                        total: "data.total",
                        records: "data.records",
                        repeatitems: false
                    },
                    colNames: options.colNames,
                    colModel: options.colModel,
                    sortable: false,
                    rownumbers: true, //显示行号
                    rowNum: 100,
                    rowList: [100, 200, 500],
                    pager: "#gridpager_" + options.gridID,
                    viewrecords: true,
                    width: '100%',
                    height: $(window).height() * 0.4,
                    autowidth: true,
                    rownumWidth: 50,
                    multiselect: options.multiselect,

                    gridComplete: function gridComplete() {
                        $gird.resize();
                        $gird.setLabel(0, '序号');
                        $gird.find('table th').css('text-align', 'center');
                        $("#gridpager_" + options.gridID + "_left").remove();
                        $("#gridpager_" + options.gridID + "_center").attr('colspan', 2);
                    },
                    loadComplete: function loadComplete() {
                        postTimes++;
                        if (postTimes == 2) {
                            setTimeout(function () {
                                $gird.jqGrid('setFrozenColumns');
                            }, 100);
                        } else if (postTimes == 100) {
                            postTimes = 3;
                        }
                        //选中的ids集合
                        var selectionArrDataIds = $.trim(_self.element.data('id')).split(',');
                        if (selectionArrDataIds.length > 0) {
                            var ids = $gird.getDataIDs();
                            $.each(ids, function (i, index) {
                                var row = $gird.getRowData(index);
                                if (selectionArrDataIds.indexOf(row.dataId) > -1) {
                                    $gird.jqGrid('setSelection', index);
                                }
                            });
                        }
                        setTimeout(function () {
                            $_template.find('.searchInput').focus();
                        }, 400);
                    },
                    ondblClickRow: function ondblClickRow(rowid, iRow, iCol, e) {
                        if (!options.multiselect) {
                            var info = $gird.jqGrid('getRowData', rowid);
                            _self.element.val(info.name).data('id', info.dataId);
                            if (_self.option.clickback) {
                                _self.option.clickback([info]);
                            }
                            _self.dom.modal('hide');
                        }
                    }
                });
            }
        },
        //加载dom
        loadDom: function loadDom() {},
        //清空dom
        clearDom: function clearDom() {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
        },
        //设置当前的参数
        setOption: function setOption(data) {
            this.option = $.extend(false, this.option, data);
        },
        //设置当前的参数
        getOption: function getOption() {
            return this.option;
        },
        getMethod: function getMethod(name) {
            return this.getAccessor(comModalsbox.prototype, name);
        },
        //访问器
        getAccessor: function getAccessor(obj, expr) {
            var ret,
                p,
                prm = [],
                i;
            if (typeof expr === 'function') {
                return expr(obj);
            }
            ret = obj[expr];
            if (ret === undefined) {
                try {
                    if (typeof expr === 'string') {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if (i) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return ret;
        },
        // 默认模板
        getTemplate: function getTemplate() {
            // 默认模板
            var _template = '';
            return _template;
        }
    };
    window.comModalsbox = comModalsbox;

    //在插件中使用  组件对象
    $.fn.comModalsbox = function (options) {
        //创建的实体
        var obj = new comModalsbox(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
'use strict';

/*
品牌

*/

!function ($) {

    // 构造函数
    var comModalsBrand = function comModalsBrand(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/goods/getGoodsBranchVoPageList',
            girdParam: {},
            name: '品牌',
            placeholder: '品牌编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: false, //是否有树  （  默认：没有树）
            colNames: ['dataId', '品牌名称', '品牌编码'],
            colModel: [{ name: 'dataId', index: 'dataId', align: 'center', width: 50, hidden: true }, { name: 'name', index: 'name', align: 'left', width: 400, sortable: true }, { name: 'code', index: 'code', align: 'left', width: 200, sortable: true }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsBrand = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsBrand(this, options);
        });
    };
}(jQuery);
'use strict';

/*
颜色
*/

!function ($) {

    // 构造函数
    var comModalsColor = function comModalsColor(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/goods/getGoodsColorVoPageList',
            girdParam: {},
            name: '颜色',
            placeholder: '颜色编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: false, //是否有树  （  默认：没有树）
            colNames: ['dataId', '颜色名称', '颜色编码'],
            colModel: [{ name: 'dataId', index: 'dataId', align: 'center', width: 50, hidden: true }, { name: 'name', index: 'name', align: 'left', width: 400, sortable: true }, { name: 'code', index: 'code', align: 'left', width: 200, sortable: true }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsColor = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsColor(this, options);
        });
    };
}(jQuery);
'use strict';

/*
仓库

*/

!function ($) {

    // 构造函数
    var comModalsStorage = function comModalsStorage(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/storage/getStorageVoPageList',
            girdParam: {
                queryKey: '',
                typeId: ''
            },
            treeUrl: '/manager/component/section/getAccessSectionTreeNodeVoList',
            treeParams: {
                sectionIsStore: 1 //  1就只查门店
            },
            name: '仓库',
            placeholder: '编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', '仓库编码', '仓库名称', '部门编码', '部门名称', '仓库类型', '是否为默认仓', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', align: 'center', width: 50, hidden: true }, { name: 'code', index: 'code', align: 'left', width: 150, sortable: true }, { name: 'name', index: 'name', align: 'left', width: 150, sortable: true }, { name: 'sectionCode', index: 'sectionCode', align: 'left', width: 150, sortable: true }, { name: 'sectionName', index: 'sectionName', align: 'left', width: 150, sortable: true }, { name: 'type', index: 'type', align: 'left', width: 150, sortable: true }, { name: 'defaultStorage', index: 'defaultStorage', align: 'left', width: 150, sortable: true, formatter: "select", editoptions: { value: "0:否;1:是;" } }, { name: 'remark', index: 'remark', align: 'left', width: 150, sortable: true }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsStorage = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsStorage(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 根据仓库过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreGoodByStorageIds = function comModalsStoreGoodByStorageIds(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'store';
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj;
        if (modal) {
            var $grid = $('#' + modal.option.gridID);
            var filterWrap = modal.dom.find('.filterWrap');
            var filterTemp = $('\n            <div style="margin-top:10px;">\n                <div class="form-group col-sm-8" style="padding: 0; margin: 0 !important;">\n                     <div class="form-group col-sm-8">\n                        <label class="width-25">\u90E8\u95E8\u4ED3\u5E93:</label>\n                        <div class="input-group col-sm-8">\n                            <input type="text" class="form-control storageIds" placeholder="">\n                        </div>\n                     </div>\n                </div>\n                <div class="form-group col-sm-4" style="padding: 0; margin: 0 !important;">\n                    <button type="button" class="erp-btn-bg modalSearch">\u67E5\u8BE2</button>\n                    <button type="button" class="erp-btn-lab modalReset">\u91CD\u7F6E</button>          \n                </div>\n            </div>\n            ');
            //查询
            filterTemp.find('.modalSearch').on("click", function (e) {
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': filterWrap.find('.searchInput').val(),
                        'storageIds': filterTemp.find('.storageIds').data('id')
                    },
                    page: 1
                }).trigger("reloadGrid"); //重新载入
            });
            //解绑搜索
            filterWrap.find('.searchInput').unbind("input propertychange");
            //重置
            filterTemp.find('.modalReset').on("click", function (e) {
                filterTemp.find('.modalStartDate').val('');
                filterTemp.find('.storageIds').val('').data('id', '');

                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': '',
                        'storageIds': ''
                    }
                });
            });
            filterTemp.find('.storageIds').comModalsStorage({ multiselect: true });
            filterWrap.append(filterTemp);
        }

        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreGoodByStorageIds = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsStoreGoodByStorageIds(this, options);
            return retObj;
        });
    };
}(jQuery);
'use strict';

/*
 全部部门组件
*/

!function ($) {

    // 构造函数
    var comModalsSection = function comModalsSection(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/section/getAllSectionVoPageList',
            girdParam: {
                queryKey: '',
                typeId: ''
            },
            treeUrl: '/manager/component/section/getAllSectionTreeNodeVoList',
            treeParams: {
                sectionIsStore: 0
            },
            name: '部门',
            placeholder: '编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', '编码', '名称', '部门属性', '所属上级', '所属地区', '启用日期', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', width: 10, hidden: true }, { name: 'code', index: 'code', width: 150, align: 'center', sorttype: "string", sortable: true }, { name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: true }, {
                name: 'attrName',
                index: 'attrName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'parentName',
                index: 'parentName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'regionName',
                index: 'regionName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, { name: 'usedDateStr', index: 'usedDateStr', width: 100, sortable: true }, { name: 'remark', index: 'remark', width: 100, sortable: true }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsSection = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsSection(this, options);
        });
    };
}(jQuery);
'use strict';

/*
获取本公司下所有员工信息(分页)
*/

!function ($) {

    // 构造函数
    var comModalsEmployee = function comModalsEmployee(el, option) {
        var _self = this;
        option = option || {};
        option.girdParam = option.girdParam || {};
        var name = '经办人';
        if (option.girdParam.empIsOperator == 1) {
            name = '制单人';
        }
        if (option.name) {
            name = option.name;
        }
        // 默认参数
        var defaults = {
            sectionIds: '', //部门对象
            girdUrl: '/manager/component/employee/getCompanyEmployeeVoPageList',
            girdParam: {
                empIsOperator: 0 //是否只查操作员(0:非;1:是;2:全部)   0是经手人 1 制单人
            },
            name: name,
            placeholder: name + '编码,姓名',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: false, //是否有树  （  默认：没有树）
            colNames: ['dataId', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', width: 10, hidden: true }, { name: 'code', index: 'code', width: 100, align: 'left', sorttype: "string", sortable: true }, { name: 'name', index: 'name', width: 150, align: 'left', sorttype: 'string', sortable: true }, {
                name: 'sectionName',
                index: 'sectionName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'positionName',
                index: 'positionName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'telephone',
                index: 'telephone',
                width: 150,
                align: 'center',
                sorttype: 'string',
                sortable: true
            }, { name: 'attrName', index: 'attrName', width: 100, align: 'left', sortable: true }, { name: 'sectionId', index: 'sectionId', width: 10, hidden: true }, { name: 'remark', index: 'remark', width: 100, align: 'left', sortable: true }]
        };
        var options = $.extend(true, defaults, option);
        return new comModalsbox($(el), options);
    };

    //在插件中使用  组件对象
    $.fn.comModalsEmployee = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsEmployee(this, options);
        });
    };
}(jQuery);
'use strict';

/*
依赖部门的经办人
*/

!function ($) {

    // 构造函数
    var comModalsEmployeeBySection = function comModalsEmployeeBySection(el, option) {
        var _self = this;
        // 默认参数
        var defaults = {
            sectionIds: '', //部门对象
            girdUrl: '/manager/component/employee/getEmployeeVoPageList',
            girdParam: {
                sectionIds: null
            },
            name: '经办人',
            placeholder: '经办人编码,姓名',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: false, //是否有树  （  默认：没有树）
            colNames: ['dataId', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', width: 10, hidden: true }, { name: 'code', index: 'code', width: 100, align: 'left', sorttype: "string", sortable: true }, { name: 'name', index: 'name', width: 150, align: 'left', sorttype: 'string', sortable: true }, {
                name: 'sectionName',
                index: 'sectionName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'positionName',
                index: 'positionName',
                width: 150,
                align: 'left',
                sorttype: 'string',
                sortable: true
            }, {
                name: 'telephone',
                index: 'telephone',
                width: 150,
                align: 'center',
                sorttype: 'string',
                sortable: true
            }, { name: 'attrName', index: 'attrName', width: 100, align: 'left', sortable: true }, { name: 'sectionId', index: 'sectionId', width: 10, hidden: true }, { name: 'remark', index: 'remark', width: 100, align: 'left', sortable: true }],
            clickBefore: function clickBefore() {
                var sectionIds = $.trim($(_self.option.sectionIds).data('id')) || $.trim($(_self.option.sectionIds).val());
                //检查部门是否选择
                if (sectionIds == "") {
                    $.zxsaas_plus.showalert("提示", '请先选部门！');
                    return false;
                }
                _self.parentE.option.girdParam.sectionIds = sectionIds;
            }
        };
        _self.option = $.extend(true, defaults, option);
        _self.parentE = new comModalsbox($(el), _self.option);
        return _self.parentE;
    };

    //在插件中使用  组件对象
    $.fn.comModalsEmployeeBySection = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsEmployeeBySection(this, options);
        });
    };
}(jQuery);
'use strict';

/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsContactUnit = function comModalsContactUnit(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/contactUnit/getContactUnitVoPageList',
            girdParam: {
                queryKey: '',
                typeId: ''
            },
            treeUrl: '/manager/component/contactUnit/getContactUnitClassTreeNodeVoList',
            treeParams: {},
            name: '往来单位',
            placeholder: '编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', '往来单位编码', '往来单位名称', '往来单位类型'],
            colModel: [{ name: 'dataId', index: 'dataId', sortable: true, align: 'center', hidden: true }, { name: 'code', index: 'code', sortable: true, align: 'center', width: 150 }, { name: 'name', index: 'name', sortable: true, align: 'center', width: 186 }, {
                name: 'contactUnitClassName',
                index: 'contactUnitClassName',
                sortable: true,
                align: 'center',
                width: 180
            }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsContactUnit = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsContactUnit(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 所有的商品
*/
!function ($) {
    // 构造函数
    var comModalsGoods = function comModalsGoods(el, option) {
        var girdParam = {
            queryKey: '',
            typeId: ''
        };
        var girdUrl = '/manager/component/goods/getGoodsVoPageList';
        //inStockMethod  入库方式(1:采购;2:受托)
        if (option.inStockMethod === 1) {
            girdParam.inStockMethod = 1;
        }
        //标记，默认全部  （store： 在库），
        if (option.sign == 'store') {
            girdUrl = '/manager/component/goods/getGoodsStockVoPageList';
        } else if (option.sign == 'sold') {
            girdUrl = '/manager/component/goods/getSoldGoodsVoPageList';
        } else if (option.sign == 'out') {
            girdUrl = '/manager/component/goods/getOutStorageStockGoodsVoPageList';
        } else if (option.sign == 'need') {
            girdUrl = '/manager/component/goods/getGoodsPageListForNeedGoods';
        }

        //商品表格列
        function getColNames() {
            if (option.sign == 'need') {
                return ['商品名称', '门店库存', '调入在途', '周转天数(DOS)', '建议补货量', '发货部门库存', '客户预订', '商品编码', '品牌', '商品类别', '型号', '颜色', '串号id', '商品总额', '税率', '是否辅助串号管理', '串号列表', '辅助串号长度', '配置', 'dataId'];
            } else {
                return ['商品名称', '商品编码', '库存数', '类别', '品牌', '型号', '颜色', '配置', '是否串号管理', '计价方式', '备注', '串号id', '商品总额', '税率', '是否辅助串号管理', '串号列表', '辅助串号长度', '配置', 'dataId'];
            }
        }

        //商品表格列模型
        function getColModels() {
            if (option.sign == 'need') {
                return [{ name: 'name', index: 'name', align: 'left', sortable: true, width: 200, frozen: true }, { name: 'needSectionCount', formatter: 'integer' }, { name: 'onwayCount', index: 'onwayCount', align: 'left', sortable: true, width: 200 }, { name: 'days', index: 'days', align: 'left', sortable: true, width: 200 }, { name: 'suggestCount', index: 'suggestCount', align: 'left', sortable: true, width: 200 }, { name: 'sendSectionCount', index: 'sendSectionCount', align: 'left', sortable: true, width: 200 }, { name: 'bookingCount', index: 'bookingCount', align: 'left', sortable: true, width: 200 }, { name: 'code', index: 'code', align: 'left', width: 100 }, { name: 'brandName', index: 'brandName', align: 'left', sortable: true, width: 100 }, { name: 'categoryName', index: 'categoryName', align: 'left', sortable: true, width: 100 }, { name: 'models', index: 'models', align: 'left', sortable: true, width: 100 }, { name: 'color', index: 'color', align: 'left', sortable: true, width: 100 }, { name: 'imeiId', hidden: true }, { name: 'totalAmount', hidden: true }, { name: 'taxRate', hidden: true }, { name: 'ifEnableAuxiliaryImei', hidden: true }, { name: 'imeiLength', hidden: true }, { name: 'auxiliaryImeiLength', hidden: true }, { name: 'configure', hidden: true }, { name: 'dataId', hidden: true }];
            } else {
                return [{ name: 'name', index: 'name', align: 'left', sortable: true, width: 200, frozen: true }, { name: 'code', index: 'code', align: 'left', width: 100 }, { name: 'stockCount', formatter: 'integer', hidden: true }, { name: 'categoryName', index: 'categoryName', align: 'left', sortable: true, width: 100 }, { name: 'brandName', index: 'brandName', align: 'left', sortable: true, width: 100 }, { name: 'models', index: 'models', align: 'left', sortable: true, width: 100 }, { name: 'color', index: 'color', align: 'left', sortable: true, width: 100 }, { name: 'configure', index: 'configure', align: 'left', sortable: true, width: 100 }, { name: 'ifManageImei', index: 'ifManageImei', align: 'center', sortable: true, width: 100, formatter: 'select', editoptions: { value: "0:×;1:√" } }, { name: 'valuationMethods', index: 'valuationMethods', align: 'left', sortable: true, width: 150, formatter: 'select', editoptions: { value: "1:个别计价法;2:移动加权平均价" } }, { name: 'remark', index: 'remark', align: 'center', sortable: true, width: 200 }, { name: 'imeiId', hidden: true }, { name: 'totalAmount', hidden: true }, { name: 'taxRate', hidden: true }, { name: 'ifEnableAuxiliaryImei', hidden: true }, { name: 'imeiLength', hidden: true }, { name: 'auxiliaryImeiLength', hidden: true }, { name: 'configure', hidden: true }, { name: 'dataId', hidden: true }];
            }
        }

        // 默认参数
        var defaults = {
            girdUrl: girdUrl,
            girdParam: girdParam,
            treeUrl: '/manager/component/goods/getGoodsClassTreeNodeVoList',
            treeParams: {},
            name: '商品',
            placeholder: '商品编码,名称,助记码,型号,条码',
            multiselect: true, //是否多选  （  默认：多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            enter: false, //回车搜索
            colNames: getColNames(),
            colModel: getColModels()
        };
        var options = $.extend(true, defaults, option);
        var retObj = new comModalsbox($(el), options);
        return retObj;
    };

    //在插件中使用  组件对象
    $.fn.comModalsGoods = function (options) {
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsGoods(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 在库的商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreGoods = function comModalsStoreGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'store';
        var retObj = $(el).comModalsGoods(options);
        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return new comModalsStoreGoods(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 根据日期过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreFilterGoods = function comModalsStoreFilterGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'store';
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj;
        if (modal) {
            var $grid = $('#' + modal.option.gridID);
            var filterWrap = modal.dom.find('.filterWrap');
            var filterTemp = $('\n            <div style="margin-top:10px;">\n                <div class="form-group col-sm-8" style="padding: 0; margin: 0 !important;">\n                            <div class="input-group col-sm-2">\n                                \u91C7\u8D2D\u65E5\u671F:\n                            </div>\n                            <div class="input-group col-sm-4">\n                                <input type="text" class="form-control date-time-icon modalStartDate"  readonly="" placeholder="\u8BF7\u9009\u62E9\u5F00\u59CB\u65E5\u671F">\n                            </div>\n                            --\n                            <div class="input-group col-sm-4">\n                                <input type="text" class="form-control date-time-icon modalEndDate"  readonly="" placeholder="\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F">\n                            </div>\n                </div>\n                <div class="form-group col-sm-4" style="padding: 0; margin: 0 !important;">\n                    <button type="button" class="erp-btn-bg modalSearch">\u67E5\u8BE2</button>\n                    <button type="button" class="erp-btn-lab modalReset">\u91CD\u7F6E</button>          \n                </div>\n            </div>\n            ');
            //查询
            filterTemp.find('.modalSearch').on("click", function (e) {
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': filterWrap.find('.searchInput').val(),
                        'purchaseDateStart': filterTemp.find('.modalStartDate').val(),
                        'purchaseDateEnd': filterTemp.find('.modalEndDate').val()
                    },
                    page: 1
                }).trigger("reloadGrid"); //重新载入
            });
            //解绑搜索
            filterWrap.find('.searchInput').unbind("input propertychange");
            //重置
            filterTemp.find('.modalReset').on("click", function (e) {
                filterTemp.find('.modalStartDate').val('');
                filterTemp.find('.modalEndDate').val('');
                filterWrap.find('.searchInput').val('');
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': '',
                        'purchaseDateStart': '',
                        'purchaseDateEnd': ''
                    }
                });
            });
            filterWrap.append(filterTemp);

            filterTemp.find('.modalStartDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false
            });
            filterTemp.find('.modalEndDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false
            });
            filterTemp.find('.modalEndDate,modalStartDate').on('blur', function () {
                var startDate = filterTemp.find('.modalStartDate').val();
                var endDate = filterTemp.find('.modalEndDate').val();
                var $this = $(this);
                //两个日期都不为""
                if (startDate != "" && endDate != "") {
                    var startTime = new Date(startDate.replace(/\-/g, '/'));
                    var endTime = new Date(endDate.replace(/\-/g, '/'));
                    var flag = endTime < startTime ? false : true;
                    if (!flag) {
                        $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                        $this.val('');
                    }
                }
            });
        }

        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreFilterGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsStoreFilterGoods(this, options);
            return retObj;
        });
    };
}(jQuery);
'use strict';

/*
 所有的商品
*/

!function ($) {

    // 构造函数
    var comModalsAllGoods = function comModalsAllGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'all';
        var retObj = $(el).comModalsGoods(options);
        return retObj;
    };

    //在插件中使用  组件对象
    $.fn.comModalsAllGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsAllGoods(this, options);
            return retObj;
        });
    };
}(jQuery);
'use strict';

/*

*/

!function ($) {

    // 构造函数
    var comModalsSoldGoods = function comModalsSoldGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'sold';
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj;
        if (modal) {
            var $grid = $('#' + modal.option.gridID);
            var filterWrap = modal.dom.find('.filterWrap');
            var filterTemp = $('\n            <div style="margin-top:10px;">\n                <div class="form-group col-sm-8" style="padding: 0; margin: 0 !important;">\n                            <div class="input-group col-sm-2">\n                                \u9500\u552E\u65E5\u671F:\n                            </div>\n                            <div class="input-group col-sm-4">\n                                <input type="text" class="form-control date-time-icon modalStartDate"  readonly="" placeholder="\u8BF7\u9009\u62E9\u5F00\u59CB\u65E5\u671F">\n                            </div>\n                            --\n                            <div class="input-group col-sm-4">\n                                <input type="text" class="form-control date-time-icon modalEndDate"  readonly="" placeholder="\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F">\n                            </div>\n                </div>\n                  <div class="form-group col-sm-4" style="padding: 0; margin: 0 !important;">\n                      <div class="input-group col-sm-4">\n                                \u5355\u636E\u7F16\u53F7:\n                      </div>  \n                       <div class="input-group col-sm-7">\n                                <input type="text" class="form-control billsCodeKey"  placeholder="\u8BF7\u9009\u62E9\u5355\u636E\u7F16\u53F7">\n                        </div> \n                </div>\n                \n                <div class="form-group col-sm-6"  style="padding: 0; margin:10px 0 0 0 !important;">\n                        <label class="width-25">\u90E8\u95E8\u4ED3\u5E93:</label>\n                        <div class="input-group col-sm-8">\n                            <input type="text" class="form-control storageIds" placeholder="">\n                        </div>\n                </div>\n                <div class="form-group col-sm-6" style="padding: 0; margin: 10px 0 0 0  !important;">\n                          <div class="input-group col-sm-4">\n                                \u5355\u636E\u7C7B\u578B:\n                      </div>  \n                       <div class="input-group col-sm-7">\n                               <input type="text" class="form-control easyui-combotree billsType" placeholder="" data-options="multiple:\'true\'"  style="height: 34px;width: 180px;">  \n                        </div> \n                </div>\n                \n                <div class="form-group col-sm-4 fr" style="padding: 0; margin: 5px 0 0 0 !important;">\n                    <button type="button" class="erp-btn-bg modalSearch">\u67E5\u8BE2</button>\n                    <button type="button" class="erp-btn-lab modalReset">\u91CD\u7F6E</button>          \n                </div>\n            </div>\n            ');
            //查询
            filterTemp.find('.modalSearch').on("click", function (e) {
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': filterWrap.find('.searchInput').val(),
                        'salesDateStart': filterTemp.find('.modalStartDate').val(),
                        'salesDateEnd': filterTemp.find('.modalEndDate').val(),
                        'billsType': filterTemp.find('.billsType').combotree('getValues').toString(),
                        'storageIds': filterTemp.find('.storageIds').data('id'),
                        'billsCodeKey': filterTemp.find('.billsCodeKey').val()
                    },
                    page: 1
                }).trigger("reloadGrid"); //重新载入
            });
            //解绑搜索
            filterWrap.find('.searchInput').unbind("input propertychange");
            //重置
            filterTemp.find('.modalReset').on("click", function (e) {
                filterTemp.find('.modalStartDate').val('');
                filterTemp.find('.modalEndDate').val('');
                filterWrap.find('.searchInput').val('');
                filterWrap.find('.billsType').combotree("clear");
                filterWrap.find('.storageIds').val('').data('id', '');
                filterWrap.find('.billsCodeKey').val('');
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'queryKey': '',
                        'salesDateStart': '',
                        'salesDateEnd': '',
                        'billsType': '',
                        'storageIds': '',
                        'billsCodeKey': ''
                    }
                });
            });

            filterWrap.append(filterTemp);
            filterTemp.find('.storageIds').comModalsStorage({ multiselect: true });
            filterTemp.find('.billsType').combotree().combotree('loadData', [{
                id: '1',
                text: '所有',
                children: [{
                    id: 19,
                    text: '批发出库单'
                }, {
                    id: 20,
                    text: '批发换货单'
                }, {
                    id: 21,
                    text: '批发退货单'
                }, {
                    id: 45,
                    text: '零售出库单'
                }, {
                    id: 46,
                    text: '零售退货单'
                }]
            }]);

            filterTemp.find('.modalStartDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false
            });
            filterTemp.find('.modalEndDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false
            });
            filterTemp.find('.modalEndDate,modalStartDate').on('blur', function () {
                var startDate = filterTemp.find('.modalStartDate').val();
                var endDate = filterTemp.find('.modalEndDate').val();
                var $this = $(this);
                //两个日期都不为""
                if (startDate != "" && endDate != "") {
                    var startTime = new Date(startDate.replace(/\-/g, '/'));
                    var endTime = new Date(endDate.replace(/\-/g, '/'));
                    var flag = endTime < startTime ? false : true;
                    if (!flag) {
                        $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                        $this.val('');
                    }
                }
            });
        }

        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsSoldGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsSoldGoods(this, options);
            return retObj;
        });
    };
}(jQuery);
'use strict';

/*
获取在库商品信息集合(分页),供出库的单据使用,部门仓库选择后最后才能选择商品
*/

!function ($) {

    // 构造函数
    var comModalsOutStoreGoods = function comModalsOutStoreGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'out';
        var retObj = $(el).comModalsGoods(options);
        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsOutStoreGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return new comModalsOutStoreGoods(this, options);
        });
    };
}(jQuery);
'use strict';

/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsAccount = function comModalsAccount(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/account/getAccountVoList',
            girdParam: {
                sectionId: ''
            },
            treeUrl: '/manager/component/account/getAccountClassTreeNodeVoList',
            treeParams: {},
            name: '资金账户选择',
            placeholder: '账户名称或账户编码',
            multiselect: true, //是否多选  （  默认：多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', '账户编码', '账户名称', '账户类型', '账户类型Code', '开户行', '账号'],
            colModel: [{ name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true }, { name: 'code', index: 'code', sortable: false, align: 'center', width: 125 }, { name: 'name', index: 'name', sortable: false, align: 'center', width: 125 }, { name: 'accountTypeName', index: 'accountTypeName', sortable: false, align: 'center', width: 125 }, { name: 'accountTypeCode', index: 'accountTypeCode', sortable: false, align: 'center', width: 125, hidden: true }, { name: 'bankCode', index: 'bankCode', sortable: false, align: 'center', width: 125 }, { name: 'bankCard', index: 'bankCard', sortable: false, align: 'center', width: 125 }],
            treeSelCod: true
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsAccount = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsAccount(this, options);
        });
    };
}(jQuery);
'use strict';

/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsBusinessArchives = function comModalsBusinessArchives(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/business/archives/getBusinessArchivesVoPageList',
            girdParam: {
                contactUnitId: ''
            },
            treeUrl: '/manager/component/business/archives/getBusinessClassTreeNodeVoList',
            treeParams: {},
            name: '运营商业务',
            placeholder: '业务名称或业务账户编码',
            multiselect: true, //是否多选  （  默认：多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', '运营商业务名称', '业务编码', '类别全路径', '往来单位', '预估佣金', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true }, { name: 'name', index: 'name', sortable: false, align: 'left', width: 200 }, { name: 'code', index: 'code', sortable: false, align: 'left', width: 200 }, { name: 'fullPath', index: 'fullPath', sortable: false, align: 'left', width: 200 }, { name: 'contactUnitName', index: 'contactUnitName', sortable: false, align: 'left', width: 200 }, { name: 'commission', index: 'commission', sortable: false, align: 'right', width: 125, formatter: 'number' }, { name: 'remark', index: 'remark', sortable: false, align: 'left', width: 200 }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsBusinessArchives = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsBusinessArchives(this, options);
        });
    };
}(jQuery);
'use strict';

/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsInpayClass = function comModalsInpayClass(el, option) {
        // 默认参数
        var defaults = {
            girdUrl: '/manager/component/inpayClass/getInpayClassVoPageList',
            girdParam: {
                queryKey: '',
                dataId: option.type || ''
            },
            treeUrl: '/manager/component/inpayClass/getInpayClassTreeNodeVoList',
            treeParams: {
                type: option.type || ''
            },
            name: '类别名称',
            placeholder: '编码，名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: true, //是否有树  （  默认：没有树）
            colNames: ['dataId', 'classifyId', '类别编码', '类别名称', '收支分类', '备注'],
            colModel: [{ name: 'dataId', index: 'dataId', sortable: true, align: 'left', hidden: true }, { name: 'classifyId', index: 'classifyId', align: 'left', sortable: true, hidden: true }, { name: 'code', index: 'code', sortable: true, align: 'left', width: 150 }, { name: 'name', index: 'name', sortable: true, align: 'left', width: 150 }, { name: 'classifyAddress', index: 'classifyAddress', sortable: true, align: 'left', width: 300 }, { name: 'remark', index: 'remark', sortable: true, align: 'left', width: 200 }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsInpayClass = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsInpayClass(this, options);
        });
    };
}(jQuery);
'use strict';

/*
 根据建议补货量过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreNeedGoods = function comModalsStoreNeedGoods(el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'need';
        options.enter = true;
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj;
        if (modal) {
            var $grid = $('#' + modal.option.gridID);
            var filterWrap = modal.dom.find('.filterWrap');
            var filterTemp = $('\n            <div style="margin-top: 10px;">\n                <div class="form-group" style="padding: 0; margin: 0 !important;">\n\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t<input type="checkbox" class="modalFilter" /> \u53EA\u770B\u5EFA\u8BAE\u8865\u8D27\u91CF\u5927\u4E8E0\u7684\u6570\u636E\n\t\t\t\t\t\t<sapn style="color:red;padding-left: 10px;">\u8BF4\u660E\uFF1A\u95E8\u5E97\u5E93\u5B58\u542B\u8C03\u5165\u5728\u9014\uFF0C\u53D1\u8D27\u90E8\u95E8\u4E0D\u542B</sapn>\n\t\t\t\t\t</div>\n                </div>\n            </div>\n            ');

            //重置
            filterTemp.find('.modalFilter').on("click", function (e) {
                $grid.jqGrid('setGridParam', {
                    postData: {
                        'flag': $(this).is(':checked') ? '1' : '0'
                    }
                }).trigger("reloadGrid");
            });
            filterWrap.append(filterTemp);
        }

        return retObj;
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreNeedGoods = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsStoreNeedGoods(this, options);
            return retObj;
        });
    };
}(jQuery);
'use strict';

/*
依赖部门的经办人
*/

!function ($) {

    // 构造函数
    var comModalsgroup = function comModalsgroup(el, option) {
        var _self = this;
        // 默认参数
        var defaults = {
            girdUrl: '/manager/inventory/common/getGroupList',
            girdParam: {},
            name: '集团选择',
            placeholder: '请输入集团编码,名称',
            multiselect: false, //是否多选  （  默认：不多选）
            isHasTree: false, //是否有树  （  默认：没有树）
            colNames: ['dataId', '集团编码', '集团名称'],
            colModel: [{ name: 'dataId', index: 'dataId', width: 10, hidden: true }, { name: 'code', index: 'code', width: 150, align: 'left', sorttype: "string", sortable: true }, { name: 'name', index: 'name', width: 250, align: 'left', sorttype: 'string', sortable: true }]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el), this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsgroup = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw "comModalsbox - No such method: " + options;
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            });
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            return this.isObj = new comModalsgroup(this, options);
        });
    };
}(jQuery);
'use strict';

//  一键核销    模板   :   这里是模板。
!function ($) {
    // 默认模板
    var _template = '<div class="hx-btn-group" style="margin-top:10px">' + ' &nbsp;&nbsp;<button class="btn btn-default hx-save" data-key="save">保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ' <button class="btn btn-default hx-edit"  data-key="edit">编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<button class="btn btn-default hx-key"  data-key="key">一键核销</button>' + '</div>' + '<div class="grid-wrap" style="margin-top:10px">' + '<table id="jqGrid_payment" class="hexiao-table"></table>' + '<div id="jqGridPayment" class=""></div>' + '</div>' + '';
    // 默认参数
    var defaults = {
        //保存 事件
        hxSave: function hxSave() {},
        //编辑 事件
        hxEdit: function hxEdit() {},
        //一键核销
        hxKye: function hxKye() {}
    };

    // 构造函数
    var oneKeyCancel = function oneKeyCancel(el, option) {
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    oneKeyCancel.prototype = {
        _init: function _init() {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function getDom() {
            var _self = this;
            var $_template = $(_template);
            // 绑定事件
            $_template.find(".hx-save").on("click", function () {
                _self.option.hxSave();
            });
            $_template.find(".hx-edit").on("click", function () {
                _self.option.hxEdit();
            });
            $_template.find(".hx-key").on("click", function () {
                _self.option.hxKye();
            });
            _self.dom = $_template;
        },

        //加载dom
        loadDom: function loadDom() {
            this.element.append(this.dom);
        },
        //清空dom
        clearDom: function clearDom() {
            this.element.html("");
        },
        //设置 的按钮的 disabled
        setDisabledbtn: function setDisabledbtn(key) {
            var dom = this.dom.siblings(".hx-btn-group");
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    disabled(key[i]);
                }
            } else {
                disabled(key);
            }
            //禁用
            function disabled(key) {
                dom.find("button[data-key=" + key + "]").attr("disabled", "disabled");
            }
        },
        //设置 的按钮的 disabled
        setUndisabledbtn: function setUndisabledbtn(key) {
            var dom = this.dom.siblings(".hx-btn-group");
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    undisabled(key[i]);
                }
            } else {
                undisabled(key);
            }
            //禁用
            function undisabled(key) {
                dom.find("button[data-key=" + key + "]").removeAttr("disabled");
            }
        }
    };
    window.oneKeyCancel = oneKeyCancel;

    //在插件中使用 组件对象
    $.fn.oneKeyCancel = function (options) {
        //创建的实体
        var obj = new oneKeyCancel(this, options);
        //调用其方法
        return obj;
    };
}(jQuery);
'use strict';

//  历史单据列表查询页面公共方法
!function ($) {
    var getGoInfo = {
        'GYSBJD': {
            detailText: '供应商保价单',
            detailUrl: '/manager/inventory/fund/supplier/reprice/main'
        },
        'CGHHD': {
            detailText: '采购换货单',
            detailUrl: '/manager/inventory/purchase/exchange/main'
        },
        'CGRKD': {
            detailText: '采购入库单',
            detailUrl: '/manager/inventory/purchase/delivery/main'
        },
        'CGDD': {
            detailText: '采购订单',
            detailUrl: '/manager/purchase/order'
        },
        'CGTHD': {
            detailText: '采购退货单',
            detailUrl: '/manager/inventory/purchase/refund/main'
        },
        'XSDD': {
            detailText: '批发订单',
            detailUrl: '/manager/salesOrder/show'
        },
        'XSD': {
            detailText: '批发单',
            detailUrl: '/manager/salesOut/show'
        },
        'XSHHD': {
            detailText: '批发换货单',
            detailUrl: '/manager/salesExchange/show'
        },
        'XSTHD': {
            detailText: '批发退货单',
            detailUrl: '/manager/salesRefund/show'
        },
        'TJDBFHD': {
            detailText: '同价调拨发货单',
            detailUrl: '/manager/inventory/storage/samePrice/transfer/main'
        },
        'BJDBFHD': {
            detailText: '变价调拨发货单',
            detailUrl: '/manager/inventory/storage/changePrice/transfer/main'
        },
        'SPYKD': {
            detailText: '商品移库单',
            detailUrl: '/manager/inventory/storage/products/move/main'
        },
        'QTRKD': {
            detailText: '其他入库单',
            detailUrl: '/manager/inventory/storage/stock/other/incoming/main'
        },
        'QTCKD': {
            detailText: '其他出库单',
            detailUrl: '/manager/inventory/storage/stock/other/removal/main'
        },
        'ZJTZD': {
            detailText: '资金调整单',
            detailUrl: '/manager/inventory/fund/adjust/main'
        },
        'YSTKD': {
            detailText: '预收退款单',
            detailUrl: '/manager/inventory/fund/inPayment/refund/recRefund/main'
        },
        'YFTKD': {
            detailText: '预付退款单',
            detailUrl: '/manager/inventory/fund/inPayment/refund/payRefund/main'
        },
        'FKD': {
            detailText: '付款单',
            detailUrl: '/manager/funds/payment/initPayment'
        },
        'SKD': {
            detailText: '收款单',
            detailUrl: '/manager/funds/payment/initPayee'
        },
        'YFKD': {
            detailText: '预付款单',
            detailUrl: '/manager/funds/payment/planPayment'
        },
        'YSKD': {
            detailText: '预收款单',
            detailUrl: '/manager/funds/payment/planPayee'
        },
        'GYSFLD': {
            detailText: '供应商返利单',
            detailUrl: '/manager/funds/supplierRebate'
        },
        'KHJBD': {
            detailText: '客户价保单',
            detailUrl: '/manager/funds/clientReprice'
        },
        'KHFLD': {
            detailText: '客户返利单',
            detailUrl: '/manager/funds/clientRebate'
        },
        'YHD': {
            detailText: '要货单',
            detailUrl: '/manager/inventory/storage/needGoods/main'
        }
    };
    $.pageListCommon = {
        //初始化红冲
        initRedModal: function initRedModal() {
            var _tem = '<!-- \u7EA2\u51B2Modal -->\n                    <div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n                        <div class="modal-dialog" role="document">\n                            <div class="modal-content">\n                                <div class="modal-header">\n                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span\n                                            aria-hidden="true">&times;</span></button>\n                                    <h4 class="modal-title" id="myModalLabel">\u7EA2\u51B2</h4>\n                                </div>\n                                <div class="modal-body">\n                                    <div class="col-sm-3">\n                                        \u65F6\u95F4\uFF1A\n                                    </div>\n                                    <div class="input-group col-sm-8">\n                                        <input type="text" class="form-control redTime">\n                                    </div>\n                                </div>\n                                <div class="modal-footer">\n                                    <button type="button" class="btn btn-primary redSave">\u786E\u5B9A</button>\n                                    <button type="button" class="btn btn-default" data-dismiss="modal">\u53D6\u6D88</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>';
            $('body').append(_tem);
            //保存红冲按钮
        },
        //初始化列设置
        initSetModal: function initSetModal() {
            var _tem = ' <!-- \u5217\u8BBE\u7F6EModal -->\n                    <div id="lineSet-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">\n                            <div class="modal-dialog" role="document">\n                                <div class="modal-content">\n                                    <div class="modal-header">\n                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                                        <h4 class="modal-title">\u5217\u8BBE\u7F6E</h4>\n                                    </div>\n                                    <div class="modal-body" style="width:600px;">\n                                        <table id=\'lineSetGrid\'></table>\n                                    </div>\n                                    <div class="modal-footer">\n                                        <button type="button" class="erp-btn-bg sureLineSet" data-dismiss="modal" onclick="sureLineSet()">\u786E\u8BA4</button>\n                                        <button type="button" class="erp-btn-lab" data-dismiss="modal">\u5173\u95ED</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>';
            $('body').append(_tem);
            $("#lineSetGrid").jqGrid({
                styleUI: 'Bootstrap',
                mtype: "POST",
                datatype: "local",
                viewrecords: true,
                rowNum: 400,
                width: "100%",
                height: $(window).height() * 0.55,
                colNames: ['id', '报表列字段', '是否显示', 'code'],
                colModel: [{ name: "id", width: '40px', align: "center", sortable: false, hidden: true }, { name: "name", width: '250px', align: "center", sortable: false }, {
                    name: "isShow",
                    width: '250px',
                    align: "center",
                    sortable: false,
                    formatter: "checkbox",
                    formatoptions: { disabled: false },
                    edittype: 'checkbox',
                    editoptions: { value: '1:0' }
                }, { name: "code", width: '40px', align: "center", sortable: false, hidden: true }],
                jsonReader: {
                    repeatitems: false,
                    root: 'data.columnVoList'
                },
                gridComplete: function gridComplete() {
                    $('#lineSet-modal th').css('text-align', 'center');
                    $('#lineSetGrid').resize();
                }
            });

            var startGapX, endGapX;
            //拖动事件回调
            $('#ysContainer').mouseup(function (event) {
                endGapX = event.clientX - $(this).offset().left;
                if (startGapX - endGapX != 0) {
                    setTimeout(function () {
                        var colModel = $("#rpGrid").jqGrid('getGridParam', 'colModel');
                        var colIds = [];
                        for (var i = 1; i < colModel.length; i++) {
                            colIds.push({ 'id': colModel[i].id });
                        }
                        $.ajax({
                            url: '/manager/erp/projectAndColumn/updateColumns',
                            dataType: 'json',
                            type: 'post',
                            data: {
                                flag: true,
                                valList: JSON.stringify(colIds)
                            },
                            success: function success(data) {}
                        });
                    }, 1000);
                }
            });

            $('#ysContainer').mousedown(function (event) {
                startGapX = event.clientX - $(this).offset().left;
            });
        },
        /*
         IgnoreValidation: 是否忽略验证
        * */
        initMenuBtn: function initMenuBtn(Menu, IgnoreValidation) {
            var pageKey = $('#GridTool').data('code');
            Menu = Menu == undefined ? {} : Menu;
            IgnoreValidation = IgnoreValidation == undefined ? {} : IgnoreValidation;
            var GridToolOption = {
                btnGroupLeft: {
                    ColumnSettings: {
                        isShow: true,
                        click: function click() {
                            $('#lineSet-modal').modal('show');
                            $("#lineSetGrid").jqGrid('setGridParam', {
                                datatype: "json",
                                url: '/manager/erp/projectAndColumn/getColumns',
                                postData: {
                                    'rpMainId': projectId
                                }
                            }).trigger("reloadGrid");
                            if (Menu.ColumnSettings) {
                                Menu.ColumnSettings();
                            }
                        }
                    },
                    export: {
                        isShow: true,
                        click: function click() {
                            if (Menu.export) {
                                Menu.export();
                            }
                        }
                    },
                    add: {
                        isShow: true,
                        click: function click() {
                            window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText, getGoInfo[pageKey].detailUrl, true);
                            if (Menu.add) {
                                Menu.add();
                            }
                        }
                    },
                    draftDel: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 1 && rowData.billsStatus != 14 && rowData.billsStatus != 15) {
                                    $.zxsaas_plus.showalert('提示', "只能删除草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function () {
                                if (Menu.draftDel) {
                                    Menu.draftDel(mainIds.join(','));
                                }
                            });
                        }
                    },
                    draftPost: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            } else if (selRowId.length > 1) {
                                $.zxsaas_plus.showalert('提示', "只能过账一条数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 1) {
                                    $.zxsaas_plus.showalert('提示', "只能过账草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.draftPost) {
                                Menu.draftPost(mainIds.join(','));
                            }
                        }
                    },
                    shipments: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            } else if (selRowId.length > 1) {
                                $.zxsaas_plus.showalert('提示', "只能发货一条数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 1) {
                                    $.zxsaas_plus.showalert('提示', "只能发货草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.shipments) {
                                Menu.shipments(mainIds.join(','));
                            }
                        }
                    },
                    red: {
                        isShow: true,
                        click: function click() {
                            //desc(IgnoreValidation) 这里是后续拓展
                            if (IgnoreValidation.red === true) {
                                if (Menu.redValidation) {
                                    Menu.redValidation();
                                }
                                return false;
                            }
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            } else if (selRowId.length > 1) {
                                $.zxsaas_plus.showalert('提示', "只能红冲一条数据!");
                                return false;
                            } else {
                                var mainIds = [];
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                                if (!(rowData.billsStatus == 6 && rowData.auditStatus == '0')) {
                                    $.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
                                    return false;
                                }

                                mainIds.push(rowData.billsId);
                                $('#redModal').modal('show');
                                $('.redSave').data('billsId', mainIds.toString());
                                var min = CompareDate(_authList.minDate, rowData.billsDateStr) ? _authList.minDate : rowData.billsDateStr;
                                $('.redTime').datePlu({
                                    endDate: false,
                                    ifPermissions: false,
                                    minTime: min,
                                    defaultTime: min
                                });
                            }
                        }
                    },
                    copy: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length > 1) {
                                $.zxsaas_plus.showalert('提示', "只能复制一条数据!");
                                return;
                            } else if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                            if (selRowData.billsStatus == 7 && selRowData.billsCode.indexOf('_') != -1) {
                                $.zxsaas_plus.showalert('提示', "不能复制红冲单据!");
                                return false;
                            }
                            if (selRowData.billsStatus == 1) {
                                $.zxsaas_plus.showalert('提示', "只能复制单据状态为“已过账、已红冲原单”的单据!");
                                return false;
                            }
                            if (selRowData.billsStatus == 14 || selRowData.billsStatus == 15) {
                                $.zxsaas_plus.showalert('提示', "只能复制单据状态为“已提交”的单据!");
                                return false;
                            }

                            var billsId = $.trim(selRowData.billsId);
                            var billsCode = $.trim(selRowData.billsCode);
                            window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText, getGoInfo[pageKey].detailUrl + '?billsId=' + billsId + '&copyFlag=1' + '&billsCode=' + billsCode, true);
                        }
                    },
                    submit: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 14 && rowData.billsStatus != 15) {
                                    $.zxsaas_plus.showalert('提示', "只能对未提交单据提交!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.submit) {
                                Menu.submit(mainIds.join(','));
                            }
                        }
                    },
                    revoke: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 13) {
                                    $.zxsaas_plus.showalert('提示', "只能撤回已提交单据!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.revoke) {
                                Menu.revoke(mainIds.join(','));
                            }
                        }
                    },
                    //审核
                    check: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (Menu.check) {
                                Menu.check(selRowId);
                            } else {
                                if (selRowId.length > 1) {
                                    $.zxsaas_plus.showalert('提示', "只能审核一条数据!");
                                    return;
                                } else if (selRowId.length < 1) {
                                    $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                    return false;
                                }
                                var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                                if (selRowData.billsStatus != 1) {
                                    $.zxsaas_plus.showalert('提示', "只能对草稿单进行审核!");
                                    return false;
                                }
                                var billsId = $.trim(selRowData.billsId);
                                window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText, getGoInfo[pageKey].detailUrl + '?billsId=' + billsId + '&checkFlag=1', true);
                            }
                        }
                    },
                    uncheck: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus != 2) {
                                    $.zxsaas_plus.showalert('提示', "只能对已审核单据进行反审核!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.uncheck) {
                                Menu.uncheck(mainIds.join(','));
                            }
                        }
                    },
                    //强制
                    mandatory: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            } else if (selRowId.length > 1) {
                                $.zxsaas_plus.showalert('提示', "一次只能强制完成一条数据");
                                return false;
                            }

                            if (Menu.mandatory) {
                                var data = {
                                    id: selRowData.billsId,
                                    date: selRowData.billsDateStr
                                };
                                Menu.mandatory(data);
                            }
                        }

                    },
                    audit: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (!(rowData.billsStatus != 1 && rowData.auditStatus == '0')) {
                                    $.zxsaas_plus.showalert('提示', "只能对正式且未稽核单据稽核!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.audit) {
                                Menu.audit(mainIds.join(','));
                            }
                        }
                    },
                    auditCancle: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (!(rowData.billsStatus != 1 && rowData.auditStatus == '1')) {
                                    $.zxsaas_plus.showalert('提示', "只能对已稽核单据取消稽核!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            if (Menu.auditCancle) {
                                Menu.auditCancle(mainIds.join(','));
                            }
                        }
                    },
                    voucher: {
                        isShow: true,
                        click: function click() {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
                            if (selRowId.length < 1) {
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds = [];
                            for (var i = 0; i < selRowId.length; i++) {
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if (rowData.billsStatus == 1) {
                                    $.zxsaas_plus.showalert('提示', "只能正式单据才能生成凭证!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId);
                            }
                            $.ajaxPackage({
                                url: '/manager/inventory/common/batchSaveGenerateVoucher',
                                data: { billsIds: mainIds.join(','), 'menuCode': pageKey },
                                success: function success(data) {
                                    $.zxsaas_plus.showalert('提示', data.data.executeResult);
                                    $.pageListCommon.reloadTable();
                                }
                            });
                        }
                    }
                }
            };
            new componentMenuBtn("#GridTool", GridToolOption);

            $(".redSave").off('click').on("click", function () {
                var data = {
                    id: $(this).data('billsId'),
                    redDate: $('.redTime').val()
                };
                if (Menu.red) {
                    Menu.red(data);
                }
            });
        },
        searchDetail: function searchDetail(params, url, options) {
            var pageKey = $('#GridTool').data('code');
            options = options == undefined ? {} : options;
            var alignArr = ['', 'left', 'center', 'right'];
            var def = {
                sortable: true, //是否排序
                footerrow: true,
                multiselect: true, //是否多选
                gotoable: true, //是否跳转
                merge: false //是否合并
            };
            def = $.extend({}, def, options);
            jQuery("#rpGrid").jqGrid("clearGridData");
            //获取头部
            $.ajaxPackage({
                url: "/manager/finance/common/getReportHead",
                data: { 'projectId': projectId },
                success: function success(data) {
                    var colName = [];
                    var colModel = [];
                    var groupHeader = [];
                    var mergeArr = [];
                    var complexData = {
                        colName: colName,
                        colModel: colModel,
                        groupHeader: groupHeader
                    };
                    $.each(data.data.colModel, function (k, v) {
                        colName.push(v.defualname);
                        var addJson = {
                            name: v.code,
                            index: v.code,
                            width: v.columnSize,
                            align: alignArr[v.align],
                            hidden: !v.isShow,
                            id: v.id,
                            sortable: def.sortable,
                            cellattr: function cellattr(rowId, tv, rawObject, cm, rdata) {}
                        };
                        //稽核
                        if (v.code == "auditStatus") {
                            addJson.formatter = "select";
                            addJson.editoptions = { value: "0:未稽核;1:已稽核;" };
                        }
                        //单据编号
                        else if (v.code == "billsCode") {
                                addJson.classes = 'billsCodeStyle';
                                addJson.formatter = function (cellvalue, options, rowObject) {
                                    var links = '';
                                    if ($.trim(rowObject.billsCode) == '') {
                                        links = '草稿单-点我编辑';
                                    } else {
                                        links = cellvalue;
                                    }
                                    return links;
                                };
                            }
                            //单据编号
                            else if (v.code == "billsCode") {
                                    addJson.classes = 'billsCodeStyle';
                                }
                                //单据编号
                                else if (v.code == "voucherNo") {
                                        addJson.classes = 'billsCodecss';
                                    }
                                    //单据状态
                                    else if (v.code == "billsStatus") {
                                            addJson.formatter = "select";
                                            addJson.editoptions = { value: "1:草稿;2:已审核;3:入库中;4:已完成;5:强制完成;6:已过账;7:已红冲;8:已发货;9:作废;10:已接收;11:拒收;12:出库中;13:已提交;14:已撤回;15:未提交;" };
                                        }
                        colModel.push(addJson);
                    });
                    for (var i = 0; i < data.data.colModel.length; i++) {
                        if (data.data.colModel[i].dataType == 'String' && data.data.colModel[i].isShow) {
                            mergeArr.push(data.data.colModel[i].code);
                        }
                        if (data.data.colModel[i].dataType == 'Number') {
                            break;
                        }
                    }

                    $.jgrid.gridUnload("rpGrid");
                    $("#rpGrid").jqGrid({
                        styleUI: 'Bootstrap',
                        mtype: "POST",
                        url: url,
                        postData: params,
                        datatype: "json",
                        jsonReader: {
                            repeatitems: false,
                            root: 'data.dataList',
                            total: 'data.total',
                            page: 'data.page',
                            records: 'data.records'
                        },
                        rowNum: 100,
                        rowList: [100, 200, 500],
                        viewrecords: true,
                        shrinkToFit: false,
                        autowidth: true,
                        rownumWidth: 50, // the width of the row numbers columns
                        rownumbers: true, //显示行号
                        width: '100%',
                        height: $(window).height() * 0.4,
                        pager: '#rpGridPager',
                        colNames: colName,
                        colModel: colModel,
                        userDataOnFooter: true,
                        footerrow: def.footerrow, //显示底部菜单
                        multiselect: def.multiselect,
                        sortable: def.sortable,
                        multiboxonly: true,
                        cellEdit: true,
                        gridComplete: function gridComplete() {
                            $('#rpGrid').resize();
                            if (mergeArr.length > 0 && def.merge) {
                                Merger("rpGrid", mergeArr);
                            }
                        },
                        loadComplete: function loadComplete(data) {
                            $('#rpGrid').resize();
                            $("#rpGrid").footerData("set", { rn: "合计" });
                            var footerData = data.data.totalVo;
                            $(this).footerData("set", footerData, false);
                            if (data.result == 1) {
                                var $table = $('#rpGrid');
                                var ids = $table.getDataIDs();
                                $.each(ids, function (i, keyId) {
                                    var row = $table.getRowData(keyId);
                                    var curTr = $("#rpGrid #" + keyId);
                                    if (row.billsStatus == 7) {
                                        curTr.css("color", "red");
                                    } else {
                                        curTr.css("color", "");
                                    }
                                    // 草稿单 要清除
                                    if (row.billsStatus == 1) {
                                        $table.setCell(keyId, "auditStatus", ' ');
                                    }
                                    if (row.auditStatus == 0) {
                                        $table.setCell(keyId, "auditStatus", '', 'no-auditStatus');
                                    } else {
                                        $table.setCell(keyId, "auditStatus", '', 'yes-auditStatus');
                                    }
                                });

                                //数据请求成功之后，若果有要操作数据的行为，在这里执行
                                if (def.loadComplete) {
                                    def.loadComplete(data);
                                }

                                //分页滚动条 置顶
                                $("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
                            } else {
                                $.zxsaas_plus.showalert("提示", data.desc);
                            }
                        },
                        onCellSelect: function onCellSelect(rowid, index, contents, event) {
                            if (def.gotoable) {
                                var info = $("#rpGrid").getRowData(rowid);
                                var billsCode = info.billsCode == '草稿单-点我编辑' ? '' : info.billsCode;
                                var tarName = $(event.target).attr('aria-describedby') || '';
                                if (tarName == 'rpGrid_billsCode') {
                                    window.top.openWorkBoxByMenutext(getGoInfo[pageKey].detailText, getGoInfo[pageKey].detailUrl + '?billsId=' + info.billsId + '&billsCode=' + billsCode, true);
                                } else if (tarName == 'rpGrid_voucherNo') {
                                    if ($.trim(info.voucherId) != "") {
                                        window.top.openWorkBoxByMenutext("填制凭证", "/manager/cw/test/voucher" + '?billsId=' + info.voucherId + '&bId=' + info.voucherId, true);
                                    }
                                }
                            }
                            if (def.onCellSelect) {
                                def.onCellSelect(rowid, index, contents, event);
                            }
                        },
                        resizeStop: function resizeStop(newwidth, index) {
                            var columnId;
                            var profitIndex;
                            if (def.multiselect) {
                                profitIndex = 2;
                            } else {
                                profitIndex = 1;
                            }
                            columnId = data.data.colModel[index - profitIndex].id;
                            $.ajaxPackage({
                                url: '/manager/erp/projectAndColumn/updateColumnSize',
                                data: {
                                    'columnId': columnId,
                                    'columnSize': newwidth
                                },
                                success: function success(data) {}
                            });
                        }
                    });
                    //数据请求成功之后，若果有要操作数据的行为，在这里执行
                    if (def.headCallback) {
                        def.headCallback();
                    }
                    $("#rpGrid").jqGrid('bindKeys', '');
                }
            });
        },
        resetFun: function resetFun() {
            $("#searchQuery")[0].reset();
            $("#searchQuery input").data({ 'id': '', 'sectionId': '' });
            if ($("#searchQuery input.easyui-combotree").length > 0) {
                $("#searchQuery input.easyui-combotree").combotree("clear");
            }
            $('#isContainsRedbills').prop('disabled', false);
            $('#startDate').datePlu({
                dateEnd: '#endDate',
                endDate: true,
                minTime: "1970-01-01",
                ifPermissions: false
            });
            $('#searchQuery ul').html('');
            $("#searchQuery table tbody .jqgrow").remove();
        },
        reloadTable: function reloadTable() {
            setTimeout(function () {
                $('#rpGrid').trigger("reloadGrid");
            }, 150);
        }
    };
}(jQuery);
"use strict";

//  单据详情 公共方法
!function ($) {
    $.pageDetailCommon = {
        //重载菜单组件
        reloadMenuTool: function reloadMenuTool(toolData) {
            toolData = toolData || {};
            if (toolData.isDraftOp == false) {
                toolData.menuBtn.setShow(toolData.updateKey);
                toolData.menuBtn.setHide(toolData.addkey);
            } else {
                toolData.menuBtn.setHide(toolData.updateKey);
                toolData.menuBtn.setShow(toolData.addkey);
            }
            //判断是否禁用
            if (toolData.isDraftOp == false) {
                //单据：稽核状态
                if (toolData.isAudit == 1) {
                    //启用：取消稽核，禁用：稽核
                    toolData.menuBtn.setDisabledbtn("audit");
                    toolData.menuBtn.setUndisabledbtn("auditCancle");
                    toolData.menuBtn.setDisabledbtn("red");
                } else {
                    //启用：稽核，禁用：取消稽核
                    toolData.menuBtn.setUndisabledbtn("audit");
                    toolData.menuBtn.setDisabledbtn("auditCancle");
                    toolData.menuBtn.setUndisabledbtn("red");
                }
                if (toolData.billsStatus == 7) {
                    toolData.menuBtn.setDisabledbtn("red");
                } else if (toolData.billsStatus == 6 && toolData.isAudit == 1) {
                    toolData.menuBtn.setDisabledbtn("red");
                } else {
                    toolData.menuBtn.setUndisabledbtn("red");
                }
                if ($.trim(toolData.billsCode).indexOf('_R') > -1) {
                    toolData.menuBtn.setDisabledbtn("copy");
                } else {
                    toolData.menuBtn.setUndisabledbtn("copy");
                }
            } else {
                toolData.menuBtn.setUndisabledbtn("audit");
                toolData.menuBtn.setUndisabledbtn("auditCancle");
                toolData.menuBtn.setUndisabledbtn("copy");
            }
        }
    };
}(jQuery);
"use strict";

/*
 组件:凭证打印
*/

!function ($) {
	// 构造函数
	var comProofPrintModal = function comProofPrintModal(el, option) {
		// 默认参数
		var defaults = {
			type: 1, //1.凭证打印 2.账簿打印
			ids: "", //凭证单ID
			startDate: "", //打印开始日期
			endDate: "", //打印结束日期
			disabled: false, //是否禁用区间打印
			url: "/finance/voucher/manager/printgenerateVou" //路由
		};
		this.option = $.extend(true, defaults, option);
		this.element = $(el);
		this.dom = null;
		this._init();
	};

	comProofPrintModal.prototype = {
		_init: function _init() {
			this.loadDom();
		},
		reLoadDom: function reLoadDom() {
			this.clearDom();
			this._init();
		},
		loadDom: function loadDom() {
			var _self = this;
			var $_template = $(_self.getTemplate());
			_self.dom = $_template;
			_self.createEvent();
			$("body").append(_self.dom);
		},
		createEvent: function createEvent() {
			var _self = this;
			_self.importEvent();
		},
		importEvent: function importEvent() {
			var _self = this;
			var $_template = _self.dom;
			$_template.find('#cancelBtn').bind("click", function () {
				_self.hideModal();
			}); //取消按钮
			$_template.find('#printBtn').bind("click", function () {
				printProot(_self);
			}); //打印按钮
		},

		clearDom: function clearDom() {
			if (this.dom !== null) {
				this.dom.remove();
				this.dom = null;
			}
		},
		showModal: function showModal() {
			var $_template = this.dom;
			switch (this.option.type) {
				case 1:
					//凭证打印
					if (this.option.ids == "" && (this.option.startDate == "" || this.option.endDate == "")) {
						$.zxsaas_plus.showalert('提示', '请先选择要打印的凭证或选择要打印凭证的起止日期');
						return;
					}
					//设置默认打印参数
					var printParams = window.localStorage.getItem('printParams');
					if (printParams) {
						//如果存在打印参数
						$.each(printParams.split("&"), function (index, item) {
							var data = item.split("=");
							switch (data[0]) {
								case 'printFormat':
									$_template.find("select[name='" + data[0] + "']").val(data[1]);
									$_template.find('input[name=printSep]').prop("disabled", function () {
										return data[1] == '1';
									});
									break;
								case 'pgOrient':
									$_template.find(":radio[name='" + data[0] + "'][value='" + data[1] + "']").prop("checked", "checked");
									break;
								case 'printSep':
									$_template.find("input[name='" + data[0] + "']").prop("checked", function () {
										return data[1] == '1';
									});
									break;
								case 'innoStr':
								case 'innoEnd':
									$_template.find(":radio[name='printVoucher'][value='2']").prop("checked", "checked");
									$_template.find("input[name='" + data[0] + "']").removeAttr("disabled");
									$_template.find("input[name='" + data[0] + "']").val(data[1]);
									break;
								case 'printVoucher':
									break;
								default:
									$_template.find("input[name='" + data[0] + "']").val(data[1]);
									break;
							}
						});
					}

					//禁用凭证区间
					this.option.disabled ? $_template.find('input[name="printVoucher"]').eq(1).attr("disabled", "disabled") : '';

					//打印凭证切换
					$_template.find('input[name="printVoucher"]').unbind('click').on('click', function () {
						if ($(this).val() == "2") {
							$(":disabled").removeAttr("disabled");
						} else {
							$_template.find('input[name=innoStr]').val("");
							$_template.find('input[name=innoStr]').attr("disabled", "disabled");
							$_template.find('input[name=innoEnd]').val("");
							$_template.find("input[name=innoEnd]").attr("disabled", "disabled");
						}
					});
					//纸张切换
					$_template.find("select.addStorage").change(function () {
						if ($(this).val() == "1") {
							//21*12金额式
							$_template.find('input[name=printSep]').attr("disabled", "disabled");
							$_template.find('input[name=printSep]').removeAttr("checked");
						} else {
							$_template.find('input[name=printSep]').removeAttr("disabled");
							$_template.find('input[name=printSep]').attr("checked", "checked");
						}
					});
					break;
				case 2:
					//账簿打印
					var getNowFormatDate = function getNowFormatDate() {
						var date = new Date();
						var seperator1 = "-";
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var strDate = date.getDate();
						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						var currentdate = year + seperator1 + month;
						return currentdate;
					};

					var startDate = getNowFormatDate(),
					    endDate = getNowFormatDate();
					var lastYear = new Date($("#startDate").val()).getFullYear() ? new Date($("#startDate").val()).getFullYear() : new Date().getFullYear();
					$.ajax({
						url: '/manager/finance/common/getCompanyFinanceConfigVo',
						type: 'post',
						dataType: 'json',
						success: function success(data) {
							var acount = data.data.configVo;
							if (acount.businessSectionAccounting == "0") {
								$_template.find('#condition').attr("disabled", "disabled");
							}
							var start = acount.systemStartDateStr.substring(0, 7);
							$_template.find("#startDate").comDateAccounting({
								endDateId: "#endDate",
								startDate: start,
								changeDateBack: function changeDateBack() {
									var year = new Date(start).getFullYear();
									if (lastYear != year) {
										lastYear = year;
										loadSubCode(lastYear);
									}
									startDate = $_template.find("#startDate").val();
									endDate = $_template.find("#endDate").val();
								}
							});
						}
					});

					//加载科目编码

					var loadSubCode = function loadSubCode(lastYear) {
						$_template.find("input[name='subjectStartCode']").comSubjectCode({
							currentAccountingYear: lastYear
						});
						$_template.find("input[name='subjectEndCode']").comSubjectCode({
							currentAccountingYear: lastYear
						});
					};

					loadSubCode(lastYear);

					//部门下拉框初始化
					$_template.find("input[name='deptName']").storePlu({
						isStoreShow: false,
						isLoadDefaultName: 0,
						checkMore: false,
						search: false,
						ifStore: false, //控制部门选项
						changeStore: function changeStore() {
							var id = $_template.find("input[name='deptName']").data('sectionId'); //设置编辑器值
							$_template.find("input[name='deptIds']").val(id);
						}
					});

					//业务部门下拉框初始化
					$_template.find("input[name='sectionsName']").storePlu({
						isStoreShow: false,
						isLoadDefaultName: 0,
						checkMore: false,
						search: false,
						ifStore: false, // 控制部门选项
						changeStore: function changeStore() {
							var id = $_template.find("input[name='sectionsName']").data('sectionId'); //设置编辑器值
							$_template.find("input[name='sectionIds']").val(id);
						}
					});

					//载入往来单位
					$_template.find("input[name='contactUnitName']").comModalsContactUnit({
						clickback: function clickback() {
							var id = $_template.find("input[name='contactUnitName']").data('id');
							$_template.find("input[name='contactUnitId']").val(id);
						}
					});

					//载入会员
					$_template.find("input[name='employeeInfoName']").funStoreSales({
						checkMore: true,
						clickback: function clickback() {
							var id = $_template.find("input[name='employeeInfoName']").data('employeeId'); //设置编辑器值
							$_template.find("input[name='employeeId']").val(id);
						}
					});

					$_template.find('.tab div:first').addClass('active');

					//按业务部门打印
					$_template.find('#condition').on('click', function () {
						$('input[name="sectionIds"]').val("");
						$('input[name="sectionsName"]').val("");
						$("#sections").toggle();
					});

					//打印范围切换
					$_template.find('input[name="printType"]').not('input[name="printType"]:eq(1)').unbind('click').on('click', function (e) {
						$_template.find('input[name="printNum"]').val("");
						$_template.find('input[name="printNum"]').prop('disabled', true);
					});
					$_template.find('input[name="printType"]').eq(1).unbind('click').on('click', function (e) {
						$_template.find('input[name="printNum"]').prop('disabled', false);
					});

					//打印末级科目
					$_template.find('input[name="ifEndSubject"]').on('click', function () {
						this.value = this.value == 0 ? 1 : 0;
						$_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled', function () {
							return !$(this).prop('disabled');
						});
					});

					//初始化下拉框的值

					var initForm = function initForm() {
						$("#printForm")[0].reset();
						$_template.find("#startDate").val(startDate);
						$_template.find("#endDate").val(endDate);
					};

					//切换tab


					$_template.find('.tab div').unbind('click').on('click', function () {
						$(this).addClass('active').siblings().removeClass('active');
						initForm();
						var onlylast = $_template.find('input[name="ifEndSubject"]');
						switch ($(this).index()) {
							case 0:
								//科目总账
								$("input[name='subjectType']").val(1);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.removeAttr("checked", "checked");
								onlylast.removeAttr("disabled");
								break;
							case 1:
								//科目明细
								$("input[name='subjectType']").val(2);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.removeAttr("checked", "checked");
								onlylast.removeAttr("disabled");
								break;
							case 2:
								//往来辅助账
								$("input[name='subjectType']").val(3);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").show();
								$("#employeeInfo").hide();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
							case 3:
								//部门辅助账
								$("input[name='subjectType']").val(4);
								$("#sections").hide();
								$("#dept").show();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
							case 4:
								//个人往来明细账
								$("input[name='subjectType']").val(5);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").show();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
						}
						if ($_template.find('input[name="printType"]').eq(0).is(":checked")) {
							$_template.find('input[name="printNum"]').prop('disabled', true);
						} else {
							$_template.find('input[name="printNum"]').prop('disabled', false);
						}
						onlylast.is(":checked") ? $_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled', true) : $_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled', false);
					});

					break;
			}

			this.dom.modal('show');
		},
		hideModal: function hideModal() {
			this.dom.modal('hide');
		},
		setOption: function setOption(data) {
			this.option = $.extend(false, this.option, data);
		},
		getTemplate: function getTemplate() {
			var template_head = "\n\t\t\t\t<div class=\"modal fade proofPrint\" id=\"printModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n\t\t\t\t\t<div class=\"modal-dialog\">\n\t\t\t\t\t\t<div class=\"modal-content\"  style=\"width: " + (this.option.type == '2' ? '800px' : 'auto') + "\">\n\t\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n\t\t\t\t\t\t\t\t\t&times;\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<h4 class=\"modal-title\">\n\t\t\t\t\t\t\t\t\t" + (this.option.type == '1' ? '凭证打印' : '账簿打印') + "\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t</div>";

			switch (this.option.type) {
				case 1:
					var template_body = "<div class=\"modal-body\">\n\t\t\t\t\t\t<div class=\"change\" style=\"min-height:200px;height:230px;\">\n\t\t\t\t\t\t\t<form id=\"printForm\">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>\u6253\u5370\u683C\u5F0F:</label>\n\t\t\t\t\t\t\t\t\t<select class=\"addStorage\" name=\"printFormat\">\n\t\t\t\t\t\t\t\t\t\t<option value=\"0\">A4\u7EB8</option>\n\t\t\t\t\t\t\t\t\t\t<option value=\"1\">21*12\u91D1\u989D\u5F0F</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>\u5DE6\u8FB9\u8DDD:</label>\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" max=\"35\" name=\"marginLeft\" value=\"25\" onkeyup=\"if(!/^([0-9]|[1-2][0-9]{1}|3[0-5]{1})$/.test(this.value)){this.value='';}\" />mm\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>\u4E0A\u8FB9\u8DDD:</label>\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" max=\"10\" name=\"marginRight\" value=\"5\" onkeyup=\"if(!/^([0-9]|10)$/.test(this.value)){this.value='';}\" />mm\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>\u7EB8\u5F20\u65B9\u5411:</label>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"pgOrient\"  value=\"0\" checked=\"checked\"  class=\"radioInput\" /><span>\u7EB5\u5411</span>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"pgOrient\"  value=\"1\"  class=\"radioInput\" /><span>\u6A2A\u5411</span>\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>\u51ED\u8BC1\u95F4\u9694:</label>\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" name=\"proofInterval\" value=\"14\" readonly=\"readonly\" />mm\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"printSep\" value=\"1\" checked /><span>\u6253\u5370\u5206\u9694\u7EBF</span>\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<div class=\"btmRadio\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"printVoucher\"  value=\"1\"  class=\"radioInput\" checked /><span>\u6253\u5370\u6240\u9009\u62E9\u7684\u51ED\u8BC1</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"btmRadio\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"printVoucher\"  value=\"2\"  class=\"radioInput\" /><span>\u6309\u51ED\u8BC1\u53F7\u6253\u5370</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"innoStr\" disabled> -- <input type=\"text\" name=\"innoEnd\" disabled>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<span class=\"msg\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";

					break;

				case 2:
					var template_body = "<div class=\"modal-body\">\n\t\t\t\t\t\t<form id=\"printForm\">\n\t\t\t\t\t\t\t<div class=\"tab\">\n\t\t\t\t\t\t\t\t<div onselectstart=\"return false\">\u79D1\u76EE\u603B\u8D26</div>\n\t\t\t\t\t\t\t\t<div onselectstart=\"return false\">\u79D1\u76EE\u660E\u7EC6\u8D26</div>\n\t\t\t\t\t\t\t\t<div onselectstart=\"return false\">\u5F80\u6765\u8F85\u52A9\u8D26</div>\n\t\t\t\t\t\t\t\t<div onselectstart=\"return false\">\u90E8\u95E8\u8F85\u52A9\u8D26</div>\n\t\t\t\t\t\t\t\t<div onselectstart=\"return false\">\u4E2A\u4EBA\u5F80\u6765\u8F85\u52A9\u8D26</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"content form-inline\">\n\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"subjectType\" value=\"1\" />\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\">\n\t\t\t\t\t\t\t\t\t<label>\u4F1A\u8BA1\u671F\u95F4\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<input id=\"startDate\" type=\"text\" name=\"startAccountingPeriod\" class=\"form-control\" placeholder=\"\u5E74-\u6708\" />\n\t\t\t\t\t\t\t\t\t</div>\t-- \n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<input id=\"endDate\" type=\"text\" name=\"endAccountingPeriod\" class=\"form-control\" placeholder=\"\u5E74-\u6708\" />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\">\n\t\t\t\t\t\t\t\t\t<label>\u79D1\u76EE\u7F16\u7801\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"subjectStartCode\">\n\t\t\t\t\t\t\t\t\t</div> --\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"subjectEndCode\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\">\n\t\t\t\t\t\t\t\t\t<label>\u79D1\u76EE\u7EA7\u6B21\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<select class=\"form-control\" name=\"startLevel\" >\n\t\t\t\t\t\t\t\t\t\t\t<option value='1'> 1 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='2'> 2 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='3'> 3 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='4'> 4 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='5'> 5 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='6'> 6 </option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\t-- \n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<select class=\"form-control\" name=\"endLevel\">\n\t\t\t\t\t\t\t\t\t\t\t<option value='1'> 1 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='2'> 2 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='3'> 3 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='4'> 4 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='5'> 5 </option>\n\t\t\t\t\t\t\t\t\t\t\t<option value='6'> 6 </option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\" id=\"contactUnit\" style=\"display:none;\">\n\t\t\t\t\t\t\t\t\t<label>\u5F80\u6765\u5355\u4F4D\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"contactUnitId\" id=\"contactUnitId\" />\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"contactUnitName\" id=\"contactUnitName\" readonly=\"readonly\" disabled />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\" id=\"employeeInfo\" style=\"display:none;\">\n\t\t\t\t\t\t\t\t\t<label>\u804C\u5458\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"employeeId\" id=\"employeeId\" />\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"employeeInfoName\" id=\"employeeInfoName\" readonly=\"readonly\" disabled />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\" id=\"dept\" style=\"display:none;\">\n\t\t\t\t\t\t\t\t\t<label>\u90E8\u95E8\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"deptIds\" />\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"deptName\" id=\"deptName\" readonly=\"readonly\" disabled />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-6\" id=\"sections\" style=\"display:none;\">\n\t\t\t\t\t\t\t\t\t<label>\u4E1A\u52A1\u90E8\u95E8\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"sectionIds\" />\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"sectionsName\" readonly=\"readonly\" disabled />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-12\">\n\t\t\t\t\t\t\t\t\t<label></label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-3\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"input_rt\" id=\"condition\"/>\u6309\u4E1A\u52A1\u90E8\u95E8\u6253\u5370\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-3\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"input_rt\" name=\"ifEndSubject\" value=\"0\" />\u53EA\u6253\u5370\u672B\u7EA7\u79D1\u76EE\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"input_rt\" checked/>\u79D1\u76EE\u6709\u5E74\u521D\u4F59\u989D,\u672C\u671F\u65E0\u53D1\u751F\u989D\u4E5F\u6253\u5370\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-12\">\n\t\t\t\t\t\t\t\t\t<label>\u6253\u5370\u8303\u56F4\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-2\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"input_rt\" name=\"printType\" value=\"0\" checked/>\u5168\u90E8\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"input_rt\" name=\"printType\" value=\"3\" />\u9875\u7801\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" style=\"width: 22%;float: none;\" placeholder=\"\u9700\u6253\u5370\u7684\u9875\u7801\" name=\"printNum\" disabled />\n\t\t\t\t\t\t\t\t\t\t<span style=\"font-size: 12px;margin-left: 10px;\">(\u8F93\u5165\u9875\u9762\u53F7\u7801\u548C/\u6216\u9875\u9762\u8303\u56F4,\u4EE5\u82F1\u6587\u9017\u53F7\u5206\u5272\u3002\u5982\uFF1A1,3,5-12)</span>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-12\">\n\t\t\t\t\t\t\t\t\t<label></label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-2\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"input_rt\" name=\"printType\" value=\"1\" />\u4EC5\u6253\u5370\u5C01\u9762\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-2\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"input_rt\" name=\"printType\" value=\"2\"/>\u4EC5\u6253\u5370\u8D26\u9875\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group col-sm-12\">\n\t\t\t\t\t\t\t\t\t<label>\u9875\u8FB9\u8DDD\uFF1A</label>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-3\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon input_lt\">\u5DE6\u8FB9\u8DDD</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"number\" name=\"leftMargin\" min=\"0\" max=\"30\" class=\"form-control\" value=\"25\" onkeyup=\"if(!/^([0-9]|[1-2][0-9]{1}|30)$/.test(this.value)){this.value=''}\" />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"input-group col-sm-3\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon input_lt\">\u4E0A\u8FB9\u8DDD</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"number\" name=\"rightMargin\" min=\"0\" max=\"10\" class=\"form-control\" value=\"5\" onkeyup=\"if(!/^([0-9]|10)$/.test(this.value)){this.value=''}\" />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>";

					break;
			}

			var template_foot = "<div class=\"modal-footer\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" id=\"printBtn\">\u6253\u5370</button>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn\" data-dismiss=\"modal\" id=\"cancelBtn\">\u53D6\u6D88</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>";

			return template_head + template_body + template_foot;
		}
	};

	function printProot(_self) {
		var $_template = _self.dom,
		    params = {};
		var formData = $_template.find('#printForm').serialize();
		switch (_self.option.type) {
			case 1:
				//打印凭证
				if ($_template.find('input[name="printVoucher"]:checked').val() == "2") {
					//勾选按凭证号打印
					if (_self.option.startDate == "" || _self.option.endDate == "") {
						$.zxsaas_plus.showalert('提示', '当前未设置打印凭证的起止日期');
						return;
					}
					params.startVoucherYearMonth = _self.option.startDate; //凭证日期
					params.endVoucherYearMonth = _self.option.endDate;
				} else {
					//勾选打印
					if (_self.option.ids == "") {
						$.zxsaas_plus.showalert('提示', '当前未选择要打印的凭证');
						return;
					}
					params.billsIds = _self.option.ids; //凭证单号
				}
				for (var Key in params) {
					formData += "&" + Key + "=" + params[Key];
				}
				if (formData.indexOf('printSep') == -1) {
					formData += "&" + "printSep=0";
				}

				//保存打印参数
				var printParams = window.localStorage.getItem('printParams');
				if (printParams) {
					localStorage.removeItem('printParams');
				}
				window.localStorage.setItem('printParams', formData);

				_self.hideModal();

				$.printBills(basePath + _self.option.url, formData, $_template.find(":radio[name='pgOrient']:checked").val() == '1' ? 'horizontal' : '');

				break;
			case 2:
				if ($('#startDate').val().length == 0 || $('#endDate').val().length == 0) {
					$.zxsaas_plus.showalert('提示', '请选择会计期间');
					return;
				}

				if ($_template.find('input[name="printType"]').eq(1).is(":checked") && $_template.find('input[name="printNum"]').val().length == 0) {
					$.zxsaas_plus.showalert('提示', '请填写要打印的页码');
					return;
				}

				if (formData.indexOf('ifEndSubject') == -1) {
					if ($_template.find('input[name="ifEndSubject"]').is(":checked")) {
						formData += "&" + "ifEndSubject=1";
					} else {
						formData += "&" + "ifEndSubject=0";
					}
				}

				$.printBills(basePath + _self.option.url, formData, 'horizontal');
				break;
		}
	}

	window.comProofPrintModal = comProofPrintModal;

	//在插件中使用组件对象
	$.fn.comProofPrintModal = function (options) {
		//创建的实体
		var obj = new comProofPrintModal(this, options);
		//调用其方法
		return obj;
	};
}(jQuery);
'use strict';

!function ($) {

    //在插件中使用 组件对象
    $.validateImeiExisting = function (options) {
        options = options || {};
        if ($.trim(options.queryKey) == '' || $.trim(options.menuCode) == '' || $.trim(options.sectionId) == '') {
            return;
        }
        $.ajaxPackage({
            url: '/manager/inventory/common/validateImeiExistingBeforeInStock',
            data: { queryKey: options.queryKey, menuCode: options.menuCode },
            success: function success(resData) {
                var imeiChangedVoList = resData.data.imeiChangedVoList;
                //验证是否有已经存在过的串号
                if ($.isArray(imeiChangedVoList) && imeiChangedVoList.length > 0) {
                    creatModal(imeiChangedVoList);
                } else {
                    //如果没有，直接走保存操作
                    save();
                }
            }
        });

        function save() {
            //保存草稿单
            if (options.save) {
                options.save();
            }
        }

        function creatModal(imeiChangedVoList) {

            var GenNonDuplicateID = functionObjExtent.GenNonDuplicateID();
            var gridId = 'grid' + GenNonDuplicateID;
            var gridPagerId = 'gridPager' + GenNonDuplicateID;
            var message = '<div>\n                            <p style="color: #ffaf23;font-size: 14px;">\u7CFB\u7EDF\u68C0\u6D4B\u5230\u66FE\u5F55\u5165\u8FC7\u4EE5\u4E0B\u4E32\u53F7\uFF0C\u662F\u5426\u786E\u5B9A\u4F7F\u7528\u672C\u6B21\u5F55\u5165\u65B0\u4E32\uFF1F</p>\n                          <div>\n                               <table id="' + gridId + '"></table>\n                               <div id="' + gridPagerId + '"></div>\n                          </div>\n                           <p style="color: #b0b0b0;font-size: 12px;margin-top: 10px;">(\u6E29\u99A8\u63D0\u793A\uFF1A\u8868\u683C\u4E2D\u7EA2\u8272\u663E\u793A\u7684\u5185\u5BB9\uFF0C\u539F\u4E32\u53F7\u5B58\u5728\u591A\u6761\u9700\u8981\u624B\u5DE5\u53D8\u66F4) </p>\n                       </div>';
            var dialogInstance1 = new BootstrapDialog({
                title: '提示',
                message: message.replace(/\n/g, ""),
                onshown: function onshown(dialog) {
                    //这里使用延时， 是由于显示动画的缘故
                    setTimeout(function () {
                        $('#' + gridId).jqGrid({
                            url: '/manager/inventory/common/validateImeiExistingBeforeInStock',
                            shrinkToFit: false,
                            styleUI: 'Bootstrap',
                            datatype: "local",
                            responsive: true,
                            data: imeiChangedVoList,
                            jsonReader: {
                                root: "data.dataList",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: ['imeiId', '新串(主)', '新串(辅)', '旧串(主)', '旧串(辅)', '合法性标志'],
                            colModel: [{ name: 'imeiId', hidden: true }, { name: 'newImei', sortable: false, align: 'left', width: 125 }, { name: 'newAuxiliaryImei', sortable: false, align: 'left', width: 125 }, { name: 'oldImei', sortable: false, align: 'left', width: 125 }, { name: 'oldAuxiliaryImei', sortable: false, align: 'left', width: 125 }, { name: 'successFlag', hidden: true }],
                            sortable: false,
                            rownumbers: true, //显示行号
                            rowNum: 100,
                            rowTotal: 10000000,
                            rowList: [100, 200, 500],
                            pager: gridPagerId,
                            viewrecords: true,
                            width: '100%',
                            height: 200,
                            autowidth: true,
                            rownumWidth: 50,
                            gridComplete: function gridComplete() {
                                $('#' + gridPagerId + '_left').remove();
                            },
                            loadComplete: function loadComplete(data) {
                                if (data.rows) {
                                    var $grid = $('#' + gridId);
                                    var ids = $grid.getDataIDs();
                                    //表格加载完成后 默认隐藏禁用行  var ids = $grid.getDataIDs();
                                    $.each(ids, function (i, keyId) {
                                        var currRow = $grid.jqGrid('getRowData', keyId);
                                        if (currRow.successFlag == 0) {
                                            //设置单元格高亮
                                            var curTr = $('#' + gridId + ' #' + keyId);
                                            curTr.css({ color: 'red' });
                                        }
                                    });
                                }
                            }
                        });
                    }, 180);
                },
                buttons: [{
                    label: '使用当前录入新串(Enter)',
                    cssClass: 'erp-btn-bg',
                    hotkey: 13,
                    action: function action(dialog) {
                        var jsonData = [];
                        for (var j = 0; j < imeiChangedVoList.length; j++) {
                            var itemItem = imeiChangedVoList[j];
                            if (itemItem.successFlag == 1) {
                                jsonData.push({
                                    sourceImeiId: itemItem.imeiId,
                                    newImei: itemItem.newImei,
                                    newAuxiliaryImei: itemItem.newAuxiliaryImei
                                });
                            }
                        }
                        if (jsonData.length > 0) {
                            $.ajaxPackage({
                                url: '/manager/imei/change/saveAndExecuteOrder',
                                data: {
                                    menuCode: options.menuCode,
                                    jsonData: JSON.stringify({
                                        detailList: jsonData,
                                        sectionId: options.sectionId
                                    })
                                },
                                success: function success(resData) {
                                    dialog.close();
                                    $.zxsaas_plus.showalert("success", "变更成功!");
                                    setTimeout(function () {
                                        save();
                                    }, 1500);
                                }
                            });
                        } else {
                            dialog.close();
                            save();
                        }
                    }
                }, {
                    label: '取消(Esc)',
                    cssClass: 'erp-btn-lab',
                    hotkey: 27,
                    action: function action(dialog) {
                        dialog.close();
                    }
                }]
            });
            dialogInstance1.open();
        }
    };
}(jQuery);