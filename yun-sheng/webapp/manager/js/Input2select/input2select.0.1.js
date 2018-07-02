	String.prototype.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2);
	};;
	(function($) {

		$.fn.Input2select = function() {

			return this.each(function() {
				var self = $(this);
				var src = self.data("src"); //json地址
				var type = self.data("type"); //下拉类型，list为普通列表、tree为树形列表
				var multi = self.data("multi"); //是否单选，0为单选、1为多选
				var valin = self.data("valin"); //选择后选择值存储的控件name
				var namecol = self.data("namecol"); //json数组中的显示字段名
				var valcol = self.data("valcol"); //json数组中的传输值字段名
				var valself = $("[name='" + valin + "']"); //选择的值存储的容器
				var val = $(valself).val(); //当前值
				var l = self.position().left; //获取控件右边定位
				var t = self.position().top; //获取控件上边定位
				var h = self.outerHeight(); //获取控件高度
				var w = self.outerWidth(); //获取控件宽度
				var b_h = $(window).height(); //获取页面高度
				var box_h = "300"; //下拉框高度
				if(b_h > Number(t) + Number(h) + Number(box_h) + 100) {
					t = Number(t) + Number(h);
				} else {
					t = 0 - 300;
				} // 如果控件下方高度 允许存放下拉框，下拉框存放在页面下方；否则控件存放在页面上方
				var listtempone = "<li><input type=\"hidden\" name=\"{{valcol}}\"  value=\"{{val}}\" />{{name}}</li>";
				//单选列表行模板
				var listtempmulti = "<li><span class=\"check\"><i class=\"icon icon-ok\"></i></span> <input type=\"hidden\" name=\"{{valcol}}\"  value=\"{{val}}\" />{{name}}</li>";
				//多选列表行模板
				var treetempone = "<li data-id=\"{{val}}\" data-parentId=\"{{parentId}}\"><input type=\"hidden\" name=\"{{valcol}}\"  value=\"{{val}}\" /><i class='icon icon-plus'></i><i class='icon  icon-minus'></i><span class=\"txt\">{{name}}</span><ul></ul></li>";
				//单选树行模板
				var treetempmulti = "<li data-id=\"{{val}}\" data-parentId=\"{{parentId}}\"><i class='icon icon-plus'></i><i class='icon  icon-minus'></i><span class=\"check\"><i class=\"icon icon-ok\"></i></span> <input type=\"hidden\" name=\"{{valcol}}\"  value=\"{{val}}\" /><span class=\"txt\">{{name}}</span><ul></ul></li>";
				//多选树行模板
				self.wrap("<div class=\"input2selectbox\"></div>"); //添加一个包裹容器
				$(".input2selectbox").find(".icon-sort-down").remove(); //删除原有向下图标
				$(".input2selectbox").append("	<i class=\"icon icon-sort-down\"></i>"); //添加一个向下图标

				//根据type判断调用模板
				var listtemp = ""; //列表模板
				var treetemp = ""; //树形模板
				if(multi == "0") {
					listtemp = listtempone;
				} else {
					listtemp = listtempmulti;
				} //根据multi确定单选或者多选
				if(multi == "0") {
					treetemp = treetempone;
				} else {
					treetemp = treetempmulti;
				} //根据multi确定单选或者多选
				self.focusin(function(event) { //控件获取焦点的时候弹出选择层
					if(type == "tree") //如果是tree就调用树形列表显示
					{
						showtree(self.val(),valself.val()); //如果是tree就调用树形列表显示
					} else {
						showlist(self.val(),valself.val()); //如果不是tree就调用普通列表显示
					}
					event.preventDefault(); //禁止默认事件
					event.stopPropagation(); //禁止冒泡事件
					return false; //中断事件执行
				});
				self.click(function(event) {
					//禁止click的冒泡事件

					event.preventDefault(); //禁止默认事件
					event.stopPropagation(); //禁止冒泡事件
					return false; //中断事件执行
				});
//				self.keyup(function(event) {
//					//keyuP事件预报做模糊搜索
//
//					event.preventDefault();
//					event.stopPropagation();
//					return false;
//				});

				function showlist(keyword,val) {//显示选择列表方法
					$(".input2seletlistbox").remove();
					$(self).parent().append("<ul class=\"input2seletlistbox\"  ></ul>"); //添加列表容器
					$.getJSON(src, {
						keyword: keyword
					}, function(r) {
						$.each(r.data.rows, function(i, item) {
							var li = listtemp.replaceAll("{{valcol}}", valcol);
							li = li.replaceAll("{{namecol}}", namecol);
							li = li.replaceAll("{{val}}", item[valcol]);
							li = li.replaceAll("{{name}}", item[namecol]);
							
							$(self).parent().find(".input2seletlistbox").append(li);
							
						});
						$(self).parent().find(".input2seletlistbox").show();
						$(self).parent().find(".input2seletlistbox li").unbind("click");
						$(self).parent().find(".input2seletlistbox li").click(function(event) {
							//alert("111");

							if(multi == "0") {
								$(self).val($(this).text());
								$(valself).val($(this).find("input[type='hidden']").val());
								$(".input2seletlistbox").remove();
							} else {

								if($(this).hasClass("checked")) {

									$(this).removeClass("checked");
								} else {

									$(this).addClass("checked");
								}
								var txt = "";
								var val = "";

								$.each($(".input2seletlistbox li.checked"), function(i, item) {

									txt = txt + "," + $(item).text();
									val = val + "," + $(item).find("input[type='hidden']").val();

								});

								$(self).val(txt.substring(1));
								$(valself).val(val.substring(1));
							}
							event.preventDefault();
							event.stopPropagation();
							return false;
						});
					});
				};

				function showtree(keyword,val) {//显示树形列表方法
					$(".input2seletlistbox").remove();
					$(self).parent().append("<ul class=\"treelist input2seletlistbox\"></ul>");
					$.getJSON(src, {
						keyword: keyword
					}, function(r) {
						$.each(r.data.rows, function(i, item) {
							var li = treetemp.replaceAll("{{valcol}}", valcol);
							li = li.replaceAll("{{namecol}}", namecol);
							li = li.replaceAll("{{val}}", item[valcol]);
							li = li.replaceAll("{{name}}", item[namecol]);
							li = li.replaceAll("{{parentId}}", item["parentId"]);
							$(self).parent().find(".input2seletlistbox").append(li);
							

						});

						$.each($(".input2seletlistbox>li"), function(i, item) {

							var parentid = $(item).data("parentid");
							if($("li[data-id='" + parentid + "']").size() == 1) {
								$("li[data-id='" + parentid + "']>ul").append($(item).clone());
								$(item).remove();
							}

						});

						$(".icon-plus").click(function(event) {
							$(this).hide();
							$(this).nextAll(".icon-minus,ul").show();
							event.preventDefault();
							event.stopPropagation();
							return false;
						});
						$(".icon-minus").click(function(event) {
							$(this).hide();
							$(this).nextAll("ul").hide();
							$(this).prevAll(".icon-plus").show();
							event.preventDefault();
							event.stopPropagation();
							return false;
						});
						
						$(self).parent().find(".input2seletlistbox li").click(function(event) {
							if(multi == "0") {
								$(self).val($(this).children(".txt").text());
								$(valself).val($(this).find("input[type='hidden']").val());
								$(".input2seletlistbox").remove();
							} else {

								if($(this).hasClass("checked")) {

									$(this).removeClass("checked");
									$(this).find("li").removeClass("checked");
								} else {

									$(this).addClass("checked");
								
									$(this).find("li").addClass("checked");
								}
								var txt = "";
								var val = "";

								$.each($(".input2seletlistbox li.checked"), function(i, item) {

									txt = txt + "," + $(item).children(".txt").text();
									val = val + "," + $(item).find("input[type='hidden']").val();

								});

								$(self).val(txt.substring(1));
								$(valself).val(val.substring(1));
							}
							event.preventDefault();
							event.stopPropagation();
							return false;
						});

					});
				};
				document.onclick = function(oEvent) {//空白区域点击关闭选择项方法
					$(".input2seletlistbox").remove();
					   $(".input2tablebox").remove();
					return true;
				};

			});

		};

      $.fn.autocom=function(){//自动完成筛选插件
		return this.each(function(){
					var self = $(this);
				var src = self.data("comsrc"); //json地址
					var valin = self.data("valin"); //选择后选择值存储的控件name
				var namecol = self.data("namecol"); //json数组中的显示字段名
				var valcol = self.data("valcol"); //json数组中的传输值字段名
				var valself = $("[name='" + valin + "']"); //选择的值存储的容器
				var l = self.position().left; //获取控件右边定位
				var t = self.position().top; //获取控件上边定位
				var h = self.outerHeight(); //获取控件高度
				var w = self.outerWidth(); //获取控件宽度
				var b_h = $(window).height(); //获取页面高度
				var box_h = "300"; //下拉框高度
				if(b_h > Number(t) + Number(h) + Number(box_h) + 100) {
					t = Number(t) + Number(h);
				} else {
					t = 0 - 300;
				} // 如果控件下方高度 允许存放下拉框，下拉框存放在页面下方；否则控件存放在页面上方
				var listtempone = "<li>{{name}}</li>";
				//单选列表行模板
				self.wrap("<div class=\"input2selectbox\"></div>"); //添加一个包裹容器
				$(".input2selectbox").find(".icon-sort-down").remove(); //删除原有向下图标
				$(".input2selectbox").append("	<i class=\"icon icon-sort-down\"></i>"); //添加一个向下图标

				//根据type判断调用模板
				var listtemp = listtempone; //列表模板
			
						
				self.focusin(function(event) { //控件获取焦点的时候弹出选择层
					
					showlist(self.val()); 
					event.preventDefault(); //禁止默认事件
					event.stopPropagation(); //禁止冒泡事件
					return false; //中断事件执行
				});
				self.click(function(event) {
					//禁止click的冒泡事件
	               // showlist(self.val()); 
					event.preventDefault(); //禁止默认事件
					event.stopPropagation(); //禁止冒泡事件
					return false; //中断事件执行
				});
				self.keyup(function(event) {
					//keyuP事件预报做模糊搜索
	                showlist(self.val()); 
					event.preventDefault();
					event.stopPropagation();
					return false;
				});

				function showlist(keyword) {//显示选择列表方法
					$(".input2seletlistbox").remove();
					$(self).parent().append("<ul class=\"input2seletlistbox\"  ></ul>"); //添加列表容器
					$.getJSON(src, {
						keyword: keyword
					}, function(r) {
						$.each(r.data.rows, function(i, item) {
								var li = treetemp.replaceAll("{{valcol}}", valcol);
							li = li.replaceAll("{{namecol}}", namecol);
							li = li.replaceAll("{{val}}", item[valcol]);
							li = li.replaceAll("{{name}}", item[namecol]);							
							$(self).parent().find(".input2seletlistbox").append(li);
						});
						$(self).parent().find(".input2seletlistbox").show();
						$(self).parent().find(".input2seletlistbox li").unbind("click");
						$(self).parent().find(".input2seletlistbox li").click(function(event) {
						
								$(self).val($(this).text());
								$(valself).val($(this).find("input[type='hidden']").val());
								$(".input2seletlistbox").remove();
						
						
							event.preventDefault();
							event.stopPropagation();
							return false;
						});
					});
				};

		});
	}
	  $.fn.autCompleteTable=function(option){//自动完成筛选插件
	
			var d_option={
	  		thead:'',
	  		tbody:'<tr><td>{{md}}</td></tr>\n',
	  		parentbox:$("body"),
	  		ontrclick:function trclick(obj,self,valself){
	$(self).val($(obj).find("input.text").val());
	$(valself).val($(obj).find("input.value").val());
}
	  	};
	  	option = $.extend(d_option, option);
	  	  	
		return this.each(function(){
				var self = $(this);
				var src = self.data("autocompletetablesrc"); //json地址
				var type = self.data("type"); //下拉类型，list为普通列表、tree为树形列表
			//	var multi = self.data("multi"); //是否单选，0为单选、1为多选
				var valin = self.data("valin"); //选择后选择值存储的控件name
				var namecol = self.data("namecol"); //json数组中的显示字段名
				var valcol = self.data("valcol"); //json数组中的传输值字段名
				var valself = $(this).parents("tr").find("[name='" + valin + "']"); //选择的值存储的容器
				var val = $(valself).val(); //当前值
				var selfattr={};
				selfattr["l"] = self.position().left; //获取控件右边定位
				selfattr["t"] = self.position().top; //获取控件上边定位
				selfattr["h"] = self.outerHeight(); //获取控件高度
				selfattr["w"] = self.outerWidth(); //获取控件宽度
				var parentboxattr={};
				parentboxattr["l"] = option.parentbox.position().left; //获取父窗口控件右边定位
				parentboxattr["t"] = option.parentbox.position().top; //获取父窗口控件右边定位
				parentboxattr["h"] = option.parentbox.outerHeight(); //获取父窗口控件高度
				parentboxattr["w"] = option.parentbox.outerWidth(); //获取父窗口控件宽度
				
			//console.log(selfattr.t);
				self.wrap("<div class=\"input2table\"></div>"); //添加一个包裹容器
				$(".input2table").find(".icon-search").remove(); //删除原有放大镜图标
				$(".input2table").append("	<i class=\"icon icon-search\"></i>"); //添加一个放大镜图标

				self.keyup(function(event) {
					//keyuP事件做模糊搜索
	                showtable(self.val()); 
					event.preventDefault();
					event.stopPropagation();
					return false;
				});
;
				function showtable(keyword) {//显示选择列表方法
					$(".input2tablebox").remove();
					option.parentbox.append("<div class=\"input2tablebox\"  ><table class=\"input2seletlistbox zxsaastable\"  >\n"+option.thead+"\n<tbody></tbody>\n</table></div>"); //添加列表容器
					$.getJSON(src, {
						keyword: keyword
					}, function(r) {
						$.each(r.data.rows, function(i, item) {
						var li = option.tbody;
						for(var key in item)
							{
								var li = li.replaceAll("{{"+key+"}}", item[key]);
							}
								
									
							option.parentbox.find(".input2seletlistbox").append(li);
							option.parentbox.find(".input2seletlistbox tr:last-child").append("<input type='hidden' class='text' value='"+item[namecol]+"' /><input type='hidden' class='value' value='"+item[valcol]+"' />");
						});
				
							var showboxattr={};
			    option.parentbox.find(".input2tablebox").show();
				showboxattr["h"] = option.parentbox.find(".input2tablebox .input2seletlistbox").outerHeight(); //获取弹出窗口控件高度
				showboxattr["w"] = option.parentbox.find(".input2tablebox").outerWidth(); //获取弹出窗口控件宽度
				showboxattr["l"] = selfattr["l"];
				showboxattr["t"]=0;
				if(parentboxattr.h-(selfattr.t-parentboxattr.t)-selfattr.h-20>showboxattr.h)
				{
					showboxattr["t"]=selfattr.t+selfattr.h;
				}
				else
				{
					showboxattr["t"]=selfattr.t-showboxattr.h;
				}
				console.log(showboxattr);
				$(".input2tablebox").css({"top":showboxattr.t+"px","left":showboxattr.l+"px"});
					
						option.parentbox.find(".input2seletlistbox tr").unbind("click");
						option.parentbox.find(".input2seletlistbox tr").click(function(event) {
						
							
							
          option.ontrclick($(this),self,valself);	
          $(".input2seletlistbox").remove();
          $(".input2tablebox").remove();
          
						
						
							event.preventDefault();
							event.stopPropagation();
							return false;
						});
					});
				};

		});
	}
	
	})(jQuery);