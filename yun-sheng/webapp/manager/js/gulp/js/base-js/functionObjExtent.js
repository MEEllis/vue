;!function () {
// 函数扩展
    var functionObjExtent = {
        /**
         * 生成一个用不重复的ID (时间戳 随机数前置 36进制 加入随机数长度控制);
         */
        GenNonDuplicateID: function (randomLength) {
            return Number(Math.random().toString().substr(3, randomLength || 3) + Date.now()).toString(36)
        },
        //数组去重
        unique:function(data){
            var res = [];
            var json = {};
            for(var i = 0; i < data.length; i++){
                if(!json[data[i]]){
                    res.push(data[i]);
                    json[data[i]] = 1;
                }
            }
            return res;
        },
        //导出公共方法
        construtForm: function (actionUrl, parms) {
            var form = document.createElement("form");
            form.style.display = 'none';
            form.setAttribute('class', 'exportForm')
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
            $('.exportForm').remove()
        },
        // 判断substr字符串在str中出现的次数 isIgnore是否忽略大小写!
        countSubstr: function (str, substr, isIgnore) {
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
         getnum:function(obj) {
            obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
            obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
         },
        //去除千分位
         delcommafy:function(num){
                if($.trim((num+""))==""){
                    return"";
                }
                num=num.replace(/,/gi,'');
                return num;
         },
        getQueryString:function (name)
        {
            //
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURI(r[2]); return '';
        },

        getGoInfo:function(info) {
            var gotoUrl = '', gotoName = '';


            switch (info.billsType.split('-')[0]) {
                case "零售退货单" :
                    gotoName = "零售退货单";
                    gotoUrl = '/manager/inventory/retail/returnGoods/toPrint'
                    break;
                case '零售开单' :
                    gotoName = '零售开单';
                    gotoUrl = '/manager/inventory/retail/delivery/toPrint'
                    break;
                case '零售退定单' :
                    gotoName = '零售退定单';
                    gotoUrl = '/manager/retail/reDeposit/retailReDepositMain'
                    break;
                case '零售定金单' :
                    gotoName = '零售定金单';
                    gotoUrl = '/manager/retail/deposit/retailDepositMain'
                    break;
                case '零售出库单' :
                    gotoName = '零售开单';
                    gotoUrl = '/manager/inventory/retail/delivery/toPrint'
                    break;
                case '采购订单' :
                    gotoName = '采购订单';
                    gotoUrl = '/manager/purchase/order'
                    break;
                case '采购入库单' :
                    gotoName = '采购入库单';
                    gotoUrl = '/manager/inventory/purchase/delivery/main'
                    break;
                case '采购退货单' :
                    gotoName = '采购退货单';
                    gotoUrl = '/manager/inventory/purchase/refund/main'
                    break;
                case '采购换货单' :
                    gotoName = '采购换货单';
                    gotoUrl = '/manager/inventory/purchase/exchange/main'
                    break;
                case '同价调拨发货单' :
                    gotoName = '同价调拨发货单';
                    gotoUrl = '/manager/inventory/storage/samePrice/transfer/main'
                    break;
                case '变价调拨发货单' :
                    gotoName = '变价调拨发货单';
                    gotoUrl = '/manager/inventory/storage/changePrice/transfer/main'
                    break;
                case '资金调整单' :
                    gotoName = '资金调整单';
                    gotoUrl = '/manager/inventory/fund/adjust/main'
                    break;
                case '成本调整单' :
                    gotoName = '成本调整单';
                    gotoUrl = '/manager/inventory/storage/cost/adjustment/main'
                    break;
                case '销售订单' :
                    gotoName = '销售订单';
                    gotoUrl = '/manager/salesOrder/show'
                    break;
                case '其它入库单' :
                    gotoName = '其它入库单';
                    gotoUrl = '/manager/inventory/storage/stock/other/incoming/main'
                    break;
                case '其它出库单' :
                    gotoName = '其它出库单';
                    gotoUrl = '/manager/inventory/storage/stock/other/removal/main'
                    break;
                case '供应商保价单' :
                    gotoName = '供应商保价单';
                    gotoUrl = '/manager/inventory/fund/supplier/reprice/main'
                    break;
                case '供应商返利单' :
                    gotoName = '供应商返利单';
                    gotoUrl = '/manager/funds/supplierRebate'
                    break;
                case '其它收入单' :
                    gotoName = '供应商返利单';
                    gotoUrl = '/manager/funds/supplierRebate'
                    break;
                case '其它支出单' :
                    gotoName = '其它支出单';
                    gotoUrl = '/manager/funds/payment/otherExpend'
                    break;
                case '收款单' :
                    gotoName = '收款单';
                    gotoUrl = '/manager/funds/payment/initPayee'
                    break;
                case '付款单' :
                    gotoName = '付款单';
                    gotoUrl = '/manager/funds/payment/initPayment'
                    break;
                case '费用单' :
                    gotoName = '费用单';
                    gotoUrl = '/manager/inventory/expend/expendBill'
                    break;
                case '收入单' :
                    gotoName = '收入单';
                    gotoUrl = '/manager/inventory/income/incomeBill'
                    break;
                case '预付款单' :
                    gotoName = '预付款单';
                    gotoUrl = '/manager/funds/payment/planPayment'
                    break;
                case '预收款单' :
                    gotoName = '预收款单';
                    gotoUrl = '/manager/funds/payment/planPayee'
                    break;
                case '往来调整单' :
                    gotoName = '往来调整单';
                    gotoUrl = '/manager/funds/adjust/initAdjust'
                    break;
                case '往来结算单' :
                    gotoName = '往来结算单';
                    gotoUrl = '/manager/funds/settlement/initSettlement'
                    break;
                case '批发出库单' :
                    gotoName = '批发单';
                    gotoUrl = '/manager/salesOut/show'
                    break;
                case '批发退货单' :
                    gotoName = '批发退货单';
                    gotoUrl = '/manager/salesRefund/show'
                    break;
                case '批发换货单' :
                    gotoName = '批发换货单';
                    gotoUrl = '/manager/salesExchange/show'
                    break;
                case '客户返利单' :
                    gotoName = '客户返利单';
                    gotoUrl = '/manager/funds/clientRebate'
                    break;
                case '客户保价单' :
                    gotoName = '客户价保单';
                    gotoUrl = '/manager/funds/clientReprice'
                    break;
                case '受托结算单' :
                    gotoName = '受托结算单';
                    gotoUrl = '/manager/funds/beEntrustSettlement'
                    break;
                case '受托撤结单' :
                    gotoName = '受托撤结单';
                    gotoUrl = '/manager/funds/beEntrustUndoSettlement'
                    break;
                case '委托结算单' :
                    gotoName = '委托结算单';
                    gotoUrl = '/manager/funds/entrustSettlement'
                    break;
                case '委托撤结单' :
                    gotoName = '委托撤结单';
                    gotoUrl = '/manager/funds/entrustUndoSettlement'
                    break;
                case '受托调价单' :
                    gotoName = '受托调价单';
                    gotoUrl = '/manager/funds/beEntrustChangePrice'
                    break;
                case '委托调价单' :
                    gotoName = '委托调价单';
                    gotoUrl = '/manager/funds/entrustChangePrice'
                    break;
                case '预付退款单' :
                    gotoName = '预付退款单';
                    gotoUrl = '/manager/inventory/fund/inPayment/refund/payRefund/main'
                    break;
                case '预收退款单' :
                    gotoName = '预收退款单';
                    gotoUrl = '/manager/inventory/fund/inPayment/refund/recRefund/main'
                    break;
                case '商品移库单' :
                    gotoName = '商品移库单';
                    gotoUrl = '/manager/inventory/storage/products/move/main'
                    break;
                case '内部转账单' :
                    gotoName = '内部转账单';
                    gotoUrl = '/manager/funds/innerTransfer/initInnerTransfer'
                    break;
            }
            var goInfo = {
                gotoName: gotoName,
                gotoUrl: gotoUrl
            }
            return goInfo;
        },
        //检查输入验证
        checkInput : {
            //只能输入大于0的正整数
            checkPositiveInteger:function(t){
                var strNumber=t.value;
                var reg=/^\+?[1-9]\d*$/;
                if(!reg.test(strNumber)){
                    $(t).val('');
                }
            },
            //检查数字  n位长度 2位小数
            checkNum : function(t,n){
                var str = t.value;
                var rex = new RegExp('^[0-9]{1,' + (n-2) + '}\.{0,1}[0-9]{0,2}$');
                //var rex = /^[1-9]\d{12}\.?\d{2}$/;
                if(!rex.test(str)){
                    $(t).val('');
                }
                if(isNaN($(t).val())){
                    $(t).val('')
                }
            },
            //检查数字  n位长度 3位小数
            checkNum3 : function(t,n){
                var str = t.value;
                var rex = new RegExp('^[0-9]{1,' + (n-3) + '}\.{0,1}[0-9]{0,3}$');
                if(!rex.test(str)){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位,3位小数');
                }
                //(t.value.length > n) && (t.value = t.value.substring(0,n))
            },
            //长度
            checkStr : function(t,n){
                if(t.value.length > n){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','至多' + n + '位');
                }
            },
            //字母、数字
            checkStrNum : function(t,n){
                var reg = new RegExp('^[a-zA-Z0-9]{0,' + n + '}$');
                if(!reg.test(t.value)){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','只能包含字母、数字,且至多' + n + '位');
                }
            },
            //字母、数字
            checkStrNumPlus : function(t,s,e){
                var reg = new RegExp('^[a-zA-Z0-9]{' + s + ',' + e + '}$');
                if(!reg.test(t.value)){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','只能包含字母、数字,且在' + s + '-' + e + '位');
                }
            },
            //验证备注
            clearNoText : function(t,n){
                if(t.value.length > n){
                    t.value = t.value.substring(0,n);
//				$(t).val('');
                }
            },
            //禁止输入非数字
            clearNoNum: function(t,n){
                t.value = t.value.replace(/[^\d]/g,"");
                if(t.value.length > n){
                    t.value = t.value.substring(0,n);
                }
            },
            //禁止中文输入
            checkChinese : function(t,n){
                var reg = new RegExp('^[^\u4e00-\u9fa5]{0,' + n + '}$');
                if(!reg.test(t.value)){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','不能包含中文,且至多' + n + '位');
                }
            },
            //禁止特殊字符
            checkNotChars : function(t,n){
                var reg = new RegExp('^([\u4e00-\u9fa5]+|[a-zA-Z0-9\-_+\/]+){0,' + n + '}$');
                if(!reg.test(t.value) || t.value.length > n){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','不能包含特殊字符,且至多' + n + '位');
                }
//			if(t.value.length > n){
//				t.value = t.value.substring(0,n);
//			}
            },
            //卡号
            checkIdCard : function(t,str){
                var bankCard = /^\d{16}|\d{19}$/,
                    qq = /^[1-9][0-9]{4,10}$/,
                    weex = /^[a-zA-Z\d_]{5,20}$/,
                    idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    phone = /^1(3|4|5|7|8)\d{9}$/,
                    telPhone = /(^(\d{3}-)?\d{8})$|(^(\d{4}-)?\d{7})$|(^1(3|4|5|7|8)\d{9}$)/;
                var msg = '',reg = '';

                switch (str){
                    case 'bank':
                        reg = bankCard;
                        msg = '银行卡号格式不正确';
                        break;
                    case 'qq':
                        reg = qq;
                        msg = 'QQ格式不正确'
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
                if(!reg.test(t.value)){
                    $(t).val('');
                    $.zxsaas_plus.showalert('提示','非法的格式 <br />' + msg);
                }
            },
            //判断一个对象是否为空
            isEmptyObject : function(e){
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            //时间验证
            checkTime : function(t,s,e){
                var startTime = new Date($(s).val().replace(/\-/g,'/'));
                var endTime = new Date($(e).val().replace(/\-/g,'/'));
                var flag = (endTime < startTime) ? false : true;
                if(!flag){
                    $.zxsaas_plus.showalert("提示","前后日期不合法!");
                    $(t).val('');
                    return;
                }
            }
        },


    };


    window.functionObjExtent = functionObjExtent;
}();