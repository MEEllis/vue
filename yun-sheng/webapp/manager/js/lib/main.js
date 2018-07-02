/**
 * 表单元素验证气泡提示插件
 * 
 * @description <input type="text" id="input-id" /> 设置显示验证提示
 *              $(inputSelecter).validTip({title:"提示文案"}); or
 *              $(inputSelecter).validTip("提示文案"); $(inputSelecter).validTip();
 * 
 * 设置隐藏验证提示 $($inputSelecter).validTip("method","hide");
 * 
 */
(function($) {
	$.fn.validTip = function(option) {
		if(arguments.length){
		   if(arguments.length==1){
		       if(typeof option == "string"){
		          option = {
		             title : option
		          };
		       }
		   }else if(arguments.length==2){
		       var arg1 = arguments[0];
		       var arg2 = arguments[1];
		       option = {};
		       option[arg1] = arg2;
		   }
		}else{
		   option = option || {};
		}
		option = option || {};
		var op = {
		   title : "提示文案", 
		   postop : 33,
		   posright : 50,
		   hideEven : "click",
		   trigger : "tipshow"
		};
		for (var key in op) {
			option[key] = option[key] || op[key];
		}
		if(option.method){
			option.trigger = option.method;
		}
		var vtipidcode = $(this).data("vtipidcode");
		var tipDom;
		if(vtipidcode){
			tipDom = $("#"+vtipidcode);
		}
		if(tipDom==null || $(tipDom).length==0){
			vtipidcode = "vtipidcode"+new Date().getTime();
			vtipidcode += parseInt(Math.random()*1000000);
			var tipHtml = '<div class="yktipWAI" id="'+vtipidcode+'"><div class="yktip"></div></div>';
			tipDom = $(tipHtml);
			$("body").append(tipDom);
			$(tipDom).bind({
				tipshow : function(){
					$(this).show();
					$(this).trigger("timeoutClose");
				},
				tiphide : function(){
					$(this).hide();
					$(this).trigger("tipdestroy");
				},
				hide : function(){
					$(this).trigger("tiphide");
				},
				tipdestroy : function(){
					$(this).remove();
				},
				click : function(){
					
				},
				timeoutClose : function(){
					var $this = this;
					var id = $(this).attr("timeid");
					clearTimeout(id);
					id = setTimeout(function(){
						$($this).trigger("tiphide");
					},4000);
					$(this).attr("timeid",id);
				}
			});
			$(this).data("vtipidcode",vtipidcode);
			$(this).focus(function(e){
				var t = $(this).data("vtipidcode");
				t = $("#"+t);
				if(t && $(t).length>0 ){
					try{
						$(t).hide();
					}catch(e){
					
					}
				}
			});
		}
		$(tipDom).find(".yktip").html(option.title);
		var iwidth = $(this).width();
		var iheight = $(this).height();
		var ioffset = $(this).offset();
		var top = ioffset.top-option.postop;
		var left = ioffset.left+iwidth-option.posright-52;
		$(tipDom).css({"left":left,"top":top});
		if(option.trigger){
			$(tipDom).trigger(option.trigger);
		}
	}
})(jQuery);


/**
 * 输入框或者文本域内嵌内容输入提示文案插件,在绑定的元素获取焦点时，提示文案隐藏；在绑定的元素失去焦点时，提示文案显示
 * 
 * @param {object}
 *            option 参数 option.title 提示文案 缺省则直接读取表单元素的title属性
 * @description 方案1、 <input type="text" id="input-id" />
 *              $("#input-id").flagTip({title:"提示文案"}); 方案2、 <input type="text"
 *              id="input-id" title="提示文案"/> $("#input-id").flagTip(); 方案3、（推荐）
 *              <input type="text" id="input-id" flagtip="tip"/>
 * 
 */
(function($) {
	$.fn.flagTip = function(option) {
		option = option || {};
		$(this).each(function() {
					var tnames = "[name=flag-tip-name]";
					option["class"] = option["class"] || "input-flag-tip";
					var ftipd = '<div class="' + option["class"]+ '" name="flag-tip-name"></div>';
					var title = option.title || $(this).attr("title");
					var ftip = $(this).siblings(tnames);
					if (ftip.length == 0) {
						$(this).after(ftipd);
						ftip = $(this).siblings(tnames);
						option.width = option.width || $(this).width();
					}
					$(ftip).html(title);
					$(this).focus(function() {
								$(this).siblings("[name=flag-tip-name]").hide();
							}).bind("flagTipBlur", function() {
								var v = $(this).val();
								if ($.isEmpty(v)) {
									$(this).siblings("[name=flag-tip-name]").show();
								} else {
									$(this).siblings("[name=flag-tip-name]").hide();
								}
							}).blur(function() {
								$(this).trigger("flagTipBlur");
							}).trigger("flagTipBlur");
					$(ftip).click(function() {
						$(this).prev("input,textarea").focus();
					});
				});
	}
})(jQuery);

/**
 * 提示框
 */
jQuery.popMsg = function(txt,className) {
	var txt = txt;
	var html = '<div class="news-show">'+txt+'</div>';
	var $content = $('.news-show');
	if($content.length == 0){
		$(".topDiv").prepend(html);
		$content=$('.news-show');
	}else{
		$content.removeClass();
		$content.addClass("news-show");
	}
	$content.addClass(className);
	setTimeout(function(){
		$content.remove();
	},1500);
};

/**
 * 红色背景提示框信息
 */
jQuery.errMsg = function(txt) {
	$.popMsg(txt,"red");
};

/**
 * 绿色背景提示框信息
 */
jQuery.infoMsg = function(txt){
	$.popMsg(txt,"green");
}


/**
 * 验证字符串v是否为空（null 或者 空字符串——""）
 *
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 为空，false 不为空
 *         @example
 *         $.isEmpty(v) //需要被验证的字符串
 */
jQuery.isEmpty = function(v) {
	if (v == null || $.trim(v) == "") {
		return true;
	} else {
		return false;
	}
};

/**
 * 日期字符串格式验证
 * 
 * @param {str}
 * 			str 需要被验证的字符串
 * @return {boolean} true 符合日期字符串格式，false 不符合日期字符串格式
 * 			@example
 *          $.isDateStr(str) //需要被验证的字符串
 */
jQuery.isDateStr = function(str) {
	var reg = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
	return reg.test(str);
};

/**
 * 有效数字格式验证
 * 
 * @param {str}
 * 			str 需要被验证的字符串
 * @return {boolean} true 符合有效数字格式，false 不有效数字格式
 * 			@example
 *          $.isNumber(str) //需要被验证的字符串
 */
jQuery.isNumber = function(str) {
	var reg = /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/;
	return reg.test(str + "");
};

/**
 * 验证字符串v是否符合邮箱格式
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合邮箱格式，false 不符合邮箱格式
 * 			@example 
 * 			$.isEmail(v) //需要被验证的字符串
 */
jQuery.isEmail = function(v) {
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return reg.test(v);
};

/**
 * 验证字符串v是否符合手机格式
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合手机格式，false 不符合手机格式
 * 			@example 
 * 			$.isPhone(v) //需要被验证的字符串
 */
jQuery.isPhone = function(v) {
	var reg = /^(12[0-9]|13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
	return reg.test(v);
};

/**
 * 获取指定字符串v的长度，1个中文=2个字节
 * 
 * @param {string}
 *            v 字符串
 * @return {number} 字符串长度
 * 			@example 
 * 			$.getLength(v)
 */
jQuery.getLength = function(v) {
	if ($.isEmpty(v)) {
		return 0;
	} else {
		return v.replace(/[^\x00-\xff]/ig, "**").length;
	}
};

/**
 * 验证字符串是否只有字母和数字组成
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合格式，false 不符合格式
 * 			@example 
 * 			$.isLetterNumber (v) //需要被验证的字符串
 */
jQuery.isLetterNumber = function(v) {
	var reg = /^[0-9a-zA-Z]+$/;
	return reg.test(v);
};

/**
 * 非负整数判断
 * 
 * @param {v}
 * 			str 需要被验证的字符串
 * @return {boolean} true 是非负整数，false 不是非负整数
 * 			@example
 *          $.isZZNum(v) //需要被验证的字符串
 */
jQuery.isZZNum = function(v) {
	var reg = /^(([1-9])\d*|0{1})$/;
	return reg.test(v);
};


var CONSTANTS={
	/**
	 * 返回结果
	 */
	CONTROLLER_RESULT : {
		SUCCESS : 1 ,
		/** 未知错误 */
		ERROR : -999,
		/** 业务异常 */
		SERVICE_EXCEPTION : -998,
		/** 未登录 */
		NOT_LOGIN : -1,
		/** 参数为空 */
		NULL_PARAMETER : -2,
		/** 对象为空 */
		NULL_OBJECT : -3,
		/** 没有操作权限 */
		UNAUTHORIZED : -4,
		/** 用户名错误*/
		ERROR_USERNAME : -5,
		/** 密码错误*/
		ERROR_PASSWORD : -6,
		/** 对象已存在*/
		ISEXIST : -7
	}
};