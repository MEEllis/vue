String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.format = function() {
    var i = 1 , args = arguments;
    var str = args[0];
    var re = /\{(\d+)\}/g;
    return str.replace(re,function(){return args[i++];});
};
jQuery.scm = {
		DictTypeUrl: "DictType/DictType_",
		DictTypeUrlEnd: "../DictType/DictType_",
		DictSsmcUrl: "DictSsmc/DictSsmc_",
		TGatherUrl:"../TGather/TGather_",
		TOrderUrl:"../torder/torder_",
		TKcpdUrl:"../tkcpd/tkcpd_",
		TOutport:"../toutport/toutport_",
		YsrkcxUrl:"../ysrkcx/ysrkcx_",
		ITmport:"../itmport/itmport_",
		applyXqsh:"../applyXqsh/applyXqsh_",
		getThisHeigth : $(window).height()-30,
		loadSelect : function(id, bizAction, param, defaultValue) {
			$.post(this.DictTypeUrl+bizAction, param, function(result) {
				$('#' + id).combobox('loadData', result);
				if (defaultValue != null && defaultValue != "") {
					$('#' + id).combobox('setValue', defaultValue);
				}
			}, "json");
		},
		
		loadComboTree : function(id, bizAction, param, defaultValue) {
			$.post(this.DictTypeUrl+bizAction, param, function(result) {
				$('#' + id).combotree('loadData', result);
				if (defaultValue != null && defaultValue != '') {
					$('#' + id).combotree('setValue', defaultValue);
				}
			}, "json");
		},
		
		loadComboTree1 : function(id, bizAction, param, defaultValue) {
			$.post("../"+this.DictTypeUrl+bizAction, param, function(result) {
				$('#' + id).combotree('loadData', result);
				if (defaultValue != null && defaultValue != '') {
					$('#' + id).combotree('setValue', defaultValue);
				}
			}, "json");
		},
		
		//日期格式化
		getFormatterDate : function(date) {
			var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
			var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
			return date.getFullYear() + '-' + month + '-' + day;
		},
		post:function(bizAction,param,successFn) 
		{
			param.bizAction=bizAction;
			$.ajax({
		        url :this.url,
		        data:param,
		        type : "POST",
		        dataType : 'json',
		        success : successFn
		    });
		},
		
		formatNull:function(value) 
		{
			if (value == null || typeof(value) == "undefined") 
			{
				return "";
			}
			return value;
		},
		open:function( strUrl,winWidth,winHeight,winLeft,winTop,id)
		{
			var win_id='win_'+parseInt(Math.random()*10000);
			if(typeof(id)!="undefined")
			{
				win_id=id;
			}
			var newwin=window.open(	strUrl,
					win_id,
									"width="+ winWidth + ","
									+ "height="+winHeight + ","
									+ "left="+winLeft+","
									+ "top="+winTop+","
									+ "status=yes,toolbar=no,menubar=no,location=yes,scrollbars=yes");
			newwin.focus();
		},
		QueryString:function(val) {
			var uri = window.location.search;
			var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
			return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
		},
		loadDictNoLogin:function(businTypeID)
		{
			var res;
			$.ajax({
      			url : this.url,
     			data:{  
    						businTypeID: businTypeID, isLogin: '1' ,bizAction:'dictAction.getDict'
        		},
        		cache : false, 
        		async : false,
        		type : "POST",
        		dataType : 'json',
        		success : function (data){
        			res = data;
        		}
    		});
    		return res;
		},
		getDictText:function(businTypeID,businID)
		{
			var businName="";
			$.ajax({
		        url : this.url,
		        data:{  
		    		businTypeID: businTypeID, businID: businID ,bizAction:'dictAction.getDictText'
		        },
		        cache : false, 
		        async : false,
		        type : "POST",
		        dataType : 'json',
		        success : function (data){
		        	
		        	businName=data.businName;
		        }
		    });
			return businName;
		},
		jsonObjectToString : function(o) {
			if (o == null)
				return "null";

			switch (o.constructor) {
			case String:
				var s = o;
				if (s.indexOf("}") < 0)
					s = '"' + s.replace(/(["\\])/g, '\\$1') + '"';
				s = s.replace(/\n/g, "\\n");
				s = s.replace(/\r/g, "\\r");
				return s;
			case Array:
				var v = [];
				for ( var i = 0; i < o.length; i++)
					v.push(jsonObjectToString(o[i]));
				if (v.length <= 0)
					return "\"\"";
				return "[" + v.join(",") + "]";
			case Number:
				return isFinite(o) ? o.toString() : this.jsonObjectToString(null);
			case Boolean:
				return o.toString();
			case Date:
				var d = new Object();
				d.__type = "System.DateTime";
				d.Year = o.getUTCFullYear();
				d.Month = o.getUTCMonth() + 1;
				d.Day = o.getUTCDate();
				d.Hour = o.getUTCHours();
				d.Minute = o.getUTCMinutes();
				d.Second = o.getUTCSeconds();
				d.Millisecond = o.getUTCMilliseconds();
				d.TimezoneOffset = o.getTimezoneOffset();
				return this.jsonObjectToString(d);
			default:
				if (o["toJSON"] != null && typeof o["toJSON"] == "function")
					return o.toJSON();
				if (typeof o == "object") {
					var v = [];
					for (attr in o) {
						if (typeof o[attr] != "function") {
							var attrValue = this.jsonObjectToString(o[attr]);
							if (attrValue.length > 0 && attrValue != null) {
								v.push('"' + attr + '": ' + attrValue);
							}
						}
					}

					if (v.length > 0)
						return "{" + v.join(",") + "}";
					else
						return "{}";
				}
				alert(o.toString());
				return o.toString();
			}
		},
		getSession:function()
		{
			var ret;
			$.ajax({
		        url : "/VasUI/servlet/ActionServlet",
		        data:{  
		    		bizAction:'loginAction.writeSessionJSON'
		        },
		        cache : false, 
		        async : false,
		        type : "POST",
		        dataType : 'json',
		        success : function (data){
		        	
		        	ret=data;
		        }
		    });
			return ret;
		},
		alert:function(msg)
		{
			$.messager.alert('提示','<font color=red>'+msg+'</font>','error');
		},
		showMsg : function(msg)
		{
			$.messager.show({
	            title:'提示',
	            msg:'<font color=red>'+msg+'</font>',  
	            showType:'show'
	       	});
		},
		removeMySession:function(fn){
			var url = $.getWebPath()+"/servlet/ActionServlet";
			var param = {};
			param.bizAction = "mySession!removeMySession";
			$.ajax({
				type: "POST",
				url: url,
				data: param,
				dataType: "json",
				cache: false,
				async:false,
				success: function(data){	
					if(data.Code==1){
						if(fn){
							fn();
						}
					}else{
						$.vas.showMessage(data);
					}
				}
			});
		},
		showMessage:function(data,str){
			$.messager.defaults = { ok: "确定", cancel: "取消" };
			if(data.Code == -100){
				$.messager.alert("系统提示",(typeof str == "undefined"?"登录已失效或未登录，请重新登录系统！":str),'info',function(){
					//top.location.href = $.getWebPath()+"/login.html";
					//window.top.loginAgain();
				}); 
			}else if(data.Code==-1){
				$.messager.alert("异常",(typeof str == "undefined"?"系统异常":str)+"："+data.Message,'error'); 
			}else if(data.Code==-2){
				$.messager.alert("提示",(typeof str == "undefined"?"系统提示":str)+"："+data.Message,'info');
			}else if(data.Code==-3){
				$.messager.alert("警告",(typeof str == "undefined"?"系统警告":str)+"："+data.Message,'warning');
			}else{
				$.messager.alert("",(typeof str == "undefined"?"":str)+"："+data.Message,'question');
			}
		},
		//显示日期
		showToDay:function(){
			var date = new Date();
			date = date.format("yyyy-MM-dd");
			return date;
		},
		showDialogs:function(msg){
			$.messager.show({
				title:'系统提示',
				msg:msg,
				showType:'show'
			});
		},
		showWindow:function(titleCon,queryTorderWin,tabHeight,pkgtorderdetail){
			$('#'+queryTorderWin).window({
	            title:titleCon,
	            iconCls:'icon-save',
	            closed:true,
	            modal:true,
	            minimizable:false,
	            maximizable:false,
	            width: 900,
	            collapsible:false,
	            height: tabHeight-110,
	            top:(document.body.clientHeight-tabHeight+110)/2,   
	            left:(document.body.clientWidth-900)/2,
	            onClose:function(){
	            	$('#'+pkgtorderdetail).datagrid('loadData',{totalProperty:0,result:[]});
	            }
		  });
		}
};


function GetAddressFieldString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
