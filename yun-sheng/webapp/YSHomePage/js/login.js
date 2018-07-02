
//console.log($('.tabBox', parent.document).find(".active").html().replace("<span>Χ</span>",""));

//序列化成对象
$.fn.extend({
  toJsonObject:function(){
	var array = $(this).find("*")
	 .filter(function() {
	    //过滤元素
	 	return this.name && !this.disabled && (this.checked || /^(?:select|textarea)/i.test(this.nodeName) || /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i.test(this.type));
		 })
		 .map(function (i, elem) {
	        var val = jQuery(this).val();
			
	        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
	            return {
	                name: elem.name,
	                value: val.replace(/\r?\n/g, "\r\n")
	            };
	        }) : {
	            name: elem.name,
	            value: val.replace(/\r?\n/g, "\r\n")
	        };
	 }).get();
	var obj = '{';
	for ( var i = 0; i < array.length; i++) {
		var o = array[i];
		if(i==0){
			obj =obj+'"'+o.name+'":"'+o.value+'"';
		}else{
			obj = obj+',"'+o.name+'":"'+o.value+'"';;
		}
	}
	obj = obj + '}';
	return jQuery.parseJSON(obj);;
  },
	toJsonObject2:function(){
		var array = $(this).find("input");
		array = array.filter(function() {
		    //过滤元素
		 	return this.name;
	    });
		array = array.map(function (i, elem) {
		        var val = jQuery(this).val();
		        var kk = val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
		            return {
		                name: elem.name,
		                value: this.type == 'checkbox'?$(this).is(':checked'):val.replace(/\r?\n/g, "\r\n")
		            };
		        }) : {
		            name: elem.name,
		            value: this.type == 'checkbox'?$(this).is(':checked'):val.replace(/\r?\n/g, "\r\n")
		        };
		        return kk;
		}).get();
		var obj = '{';
		for ( var i = 0; i < array.length; i++) {
			var o = array[i];
			if(i==0){
				obj =obj+'"'+o.name+'":"'+o.value+'"';
			}else{
				obj = obj+',"'+o.name+'":"'+o.value+'"';;
			}
		}
		obj = obj + '}';
		return jQuery.parseJSON(obj);;
	}
});
//序列化成对象数组
$.fn.extend({
	//转出对象数组
	toJsonObjectArray:function(){
		var array = [];
		$(this).each(function(){
			array.push($(this).toJsonObject());
		});
		return array;
	},
	//将对象写入文档
	writeJson2Dom:function(json){
		var content = this;
		var obj = json;
		var key,value,tagName,type,arr;
		for(x in obj){
			key = x;
			value = obj[x];
			$('[name="'+key+'"]',content).each(function(){
				tagName = $(this)[0].tagName;
				type = $(this).attr('type');
				if(tagName=='INPUT'){
					if(type=='radio'){
						try {
							$(this).attr('checked',$(this).val()==value);
							$(this).prop("checked",$(this).val()==value); 
						} catch (e) {
							// TODO: handle exception
						}
					}else if(type=='checkbox'){
						try {
							if(value == true || value == "true"){
								$(this).attr('checked',true);
								$(this).prop("checked",true); 
							}else{
								$(this).removeAttr("checked");
							}
//							arr = value.split(',');
							
//							for(var i =0;i<arr.length;i++){
//								if($(this).val()==arr[i]){
//									$(this).attr('checked',true);
//									break;
//								}else{
//									$(this).removeAttr("checked")
//								}
//							}
							console.log("funck");
						} catch (e) {
							console.log(e);
						}
					}else{
						$(this).val(value);
						try {
							//如果是datepicker转换成日期设置其值
							if($(this).attr("role") == "datepicker"){
								$(this).datepicker('setDate',$.StringToDate(value));
							}
						} catch (e) {
							console.log(e);
						}
					}
				}else if(tagName=='SELECT' || tagName=='TEXTAREA'){
					$(this).val(value);
				}
			});
		}
	}
});
$.extend({
	//转换check的值 选中未1 没选中则为null
	parseCheckValue:function(value){
		  return value == undefined || value != "on" ? null:1;
	}
});
/** 
 * 将数值四舍五入(保留2位小数)后格式化成金额形式 
 * 
 * @param num 数值(Number或者String) 
 * @return 金额格式的字符串,如'1,234,567.45' 
 * @type String 
 */  
function formatCurrency(num) {  
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
    num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}  
   
/** 
 * 将数值四舍五入(保留1位小数)后格式化成金额形式 
 * 
 * @param num 数值(Number或者String) 
 * @return 金额格式的字符串,如'1,234,567.4' 
 * @type String 
 */  
function formatCurrencyTenThou(num) {  
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
    num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*10+0.50000000001);  
    cents = num%10;  
    num = Math.floor(num/10).toString();  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}  

jQuery.extend({ 
	//将货币字符串转浮点数并保留两位小数
	parseFloat:function(str){
		try {
			var replaceStr = ",";
			str = str.replace(new RegExp(replaceStr,'gm'),'');	
			return parseFloat(str);
		} catch (e) {
			console.log(e);
			return 0.00;
		}
    },
    parseInt:function(str){
		try {
			var replaceStr = ",";
			str = str.replace(new RegExp(replaceStr,'gm'),'');	
			return parseInt(str);
		} catch (e) {
			console.log(e);
			return 0;
		}
    },
	//单据打印
	printBills:function(templateURL, paras){
		$.ajax({
			url: templateURL,
			type : "post",
			dataType : 'html',
			data:paras,
			success:function(data){
				var html = null;
				$(data).map(function(index, obj){if((obj.nodeName == "DIV" || obj.nodeName == "div") && obj.id == "billsDIV")html = obj;});
				if(html == null){$.MsgBox("异常信息","打印模板生成失败");return;}
				$(html.outerHTML).jqprint({
				     debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
				     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
				     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
				     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
				});
			}
		});
    },
	//根据单据状态给状态图片输值
	showBillsStatus:function(domId,status){
		 var imgUrl = "";
		 if(status == "1"){
			 //草稿
			 $("#"+domId).hide();
		 }else if(status == "2"){
			 //已审核
			 $("#"+domId).attr("src",basePath+"/images/status/statusAudit.png").show();
		 }else if(status == "3"){
			 //入库中
			 $("#"+domId).hide();
		 }else if(status == "4"){
			 //已完成
			 $("#"+domId).attr("src",basePath+"/images/status/statusComplete.png").show();
		 }else if(status == "5"){
			 //强制完成
			 $("#"+domId).attr("src",basePath+"/images/status/statusForce.png").show();
		 }else if(status == "6"){
			 //已过账
			 $("#"+domId).attr("src",basePath+"/images/status/statusPass.png").show();
		 }else if(status == "7"){
			 //已红冲
			 $("#"+domId).attr("src",basePath+"/images/status/statusRed.png").show();
		 }else if(status == "8"){
			 //已发货
			 $("#"+domId).attr("src",basePath+"/images/status/statusSend.png").show();
		 }else if(status == "9"){
			 //作废
			 $("#"+domId).attr("src",basePath+"/images/status/statusCancellation.png").show();
		 }else if(status == "10"){
			 //已接收
			 $("#"+domId).attr("src",basePath+"/images/status/statusReceive.png").show();
		 }else if(status == "11"){
			 //拒收
			 $("#"+domId).attr("src",basePath+"/images/status/statusRejection.png").show();
		 }else{
			 $("#"+domId).hide();
		 }
	},
	//获取当月第一天
	getCurrentMonthFirst:function(){
		 var date=new Date();
		 if(arguments.length == 1)date = arguments[0];
		 date.setDate(1);
		 return date;
	},
	//批量非空判断
	notEmpty:function(){
		for ( var i = 0; i < arguments.length; i++) {
			if(typeof arguments[i] == "undefined" || arguments[i] == null || $.trim(arguments[i]) == "")
				return false;
		}
		return true;
	},
	//获取当月最后一天
	getCurrentMonthLast:function(){
		 var date=new Date();
		 if(arguments.length == 1)date = arguments[0];
		 var currentMonth=date.getMonth();
		 var nextMonth=++currentMonth;
		 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
		 var oneDay=1000*60*60*24;
		 return new Date(nextMonthFirstDay-oneDay);
	},
	//字符串转成日期类型
	StringToDate:function(DateStr)
	{//格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
		var converted = Date.parse(DateStr);
		var myDate = new Date(converted);
		if (isNaN(myDate))
		{
			var arys= DateStr.split('-');
			myDate = new Date(arys[0],--arys[1],arys[2]);
		}
		return myDate;
	},
	//格式化日期
	DateFormat:function()   
	{   //(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
		//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
		var fmt = null;
		var date = null;
		if(arguments.length == 0){
			date = new Date();
			fmt = "yyyy-MM-dd hh:mm:ss.S";
		}
		if(arguments.length == 1){
			date = arguments[0];
			fmt = "yyyy-MM-dd hh:mm:ss.S";
		}
		if(arguments.length == 2){
			date = arguments[0];
			fmt = arguments[1];
		}
		var o = {   
		 "M+" : date.getMonth()+1,                 //月份   
		 "d+" : date.getDate(),                    //日   
		 "h+" : date.getHours(),                   //小时   
		 "m+" : date.getMinutes(),                 //分   
		 "s+" : date.getSeconds(),                 //秒   
		 "q+" : Math.floor((date.getMonth()+3)/3), //季度   
		 "S"  : date.getMilliseconds()             //毫秒   
		};   
		if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;   
	},
	//格式化日期
	DateFormatFromTimestamp:function()   
	{   //(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
		//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
		var fmt = null;
		var date = null;
		if(arguments.length == 0){
			return "";
		}
		if(arguments.length == 1){
			return "";
		}
		if(arguments.length == 2){
			date = new Date();
			date.setTime(arguments[1]);
			fmt = arguments[0];
		}
		var o = {   
		 "M+" : date.getMonth()+1,                 //月份   
		 "d+" : date.getDate(),                    //日   
		 "h+" : date.getHours(),                   //小时   
		 "m+" : date.getMinutes(),                 //分   
		 "s+" : date.getSeconds(),                 //秒   
		 "q+" : Math.floor((date.getMonth()+3)/3), //季度   
		 "S"  : date.getMilliseconds()             //毫秒   
		};   
		if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;   
	},
	// 添加金额格式化  
    formatFloat:function(src, pos){  
        var num = parseFloat(src).toFixed(pos);  
        num = num.toString().replace(/\$|\,/g,'');  
        if(isNaN(num)) num = "0";  
        sign = (num == (num = Math.abs(num)));  
        num = Math.floor(num*100+0.50000000001);  
        cents = num%100;  
        num = Math.floor(num/100).toString();  
        if(cents<10) cents = "0" + cents;  
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));  
        return (((sign)?'':'-') + num + '.' + cents);  
    },
    // 添加消息框
	MsgBox:function(){ 
        //此功能可以不封装
		function Method(){};
		var title = "提示消息";
		var bodyHtml = "";
		var method = new Method();
		var buttons = [];
		
		//接收方法对象
		Method.prototype.okCallBack = function(){};
		Method.prototype.cancelCallBack = function(){};
		if(arguments.length == 0)return;
		if(arguments.length == 1)title = arguments[0];
		if(arguments.length == 2){
			title = arguments[0];
			bodyHtml = arguments[1];
			buttons = [
						  {
			                label: '确定',
			                action: function(dialog) {
			            		dialog.close();
			                }
						  }
					   ];
		}
		if(arguments.length == 3){
			title = arguments[0];
			bodyHtml = arguments[1];
			if($.isFunction(arguments[2]))Method.prototype.okCallBack = arguments[2];
			buttons = [
						  {
			                label: '确定',
			                action: function(dialog) {
			            		dialog.close();
			            		method.okCallBack(); 
			                }
						  }
					   ];
		}
		if(arguments.length == 4){
			title = arguments[0];
			bodyHtml = arguments[1];
			Method.prototype.okCallBack = arguments[2];
			Method.prototype.cancelCallBack = arguments[3];
			buttons = [
						  {
			                label: '确定',
			                action: function(dialog) {
			            		dialog.close();
			            		method.okCallBack(); 
			                }
						  },
						  {
				                label: '取消',
				                action: function(dialog) {
							        method.cancelCallBack();
				            		dialog.close();
				                }
						  }
					   ];
		}
		
		
        BootstrapDialog.show({
            title: title,
            message: bodyHtml,
            buttons:buttons
        });
		
    } 
});

 

