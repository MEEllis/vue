$(function() {
//	获取待办信息
	getTodoOrder()
//	获取最新通知
	getTop()
//	排行图表信息
	getRank()
	getTrend()
	
	//菜单伸缩
	$('.menu').click(function(e){
		if($(".body_left").width() == 150){ //如果菜单形态为展开形态时
			$(".body_left").animate({
				"width": 60
			}, 100, "linear"); //设置左边菜单宽度为60
			$(".body_right").animate({
				"margin-left": "60px"
			}, 100, "linear"); //设置右边工作台区域右边距为60
			$(".menulist>ul>li>div").animate({
				"left": "60px"
			}, 100, "linear"); //设置子菜单的位置为左边60像素
			$(".menulist>ul>li>a>font").hide(); //隐藏菜单文字
			$(".menulist .userinfo").hide(); //隐藏用户信息文字
		} else {
			$(".body_left").animate({
				"width": 150
			}, 100, "linear", function() {
				$(".menulist>ul>li>a>font").show(); //显示菜单文字
				$(".menulist .userinfo").show(); //显示用户信息文字
			}); //设置左边菜单宽度为150
			$(".body_right").animate({
				"margin-left": "150px"
			}, 100, "linear"); //设置子菜单的位置为左边150像素
			$(".menulist>ul>li>div").animate({
				"left": "150px"
			}, 100, "linear"); //设置右边工作台区域右边距为150
		}
	})
	
	//系统消息伸缩
	$('.noread').click(function(e){
		if($(".body_read").css('right') == "-210px"){ //如果系统消息未显示
            getTodoOrder();
			$(".body_read").animate({
				"right": 0
			}, 100, "linear");
		} else {
			$(".body_read").animate({
				"right": -210
			}, 100, "linear");
		}
	})
	
	$('.isRead').click(function(e){
		$(".body_read").animate({
			"right": -210
		}, 100, "linear");
	})
	
	var menuVoListUrl = "/manager/auth/menu/getMenuList";
	loadMenu(menuVoListUrl);
	$(document).on("mouseenter",".mainMenuList li",function(event){
    	$(".ulbox ul").show();
		var this_id= $(this).data("id");
     	$(".ulbox ul[data-parentid!='"+this_id+"']").hide();
		var this_t=$(this).offset().top;
		var this_w = $('.body_left').width();
		var body_h=$(window).height();
		var num = [];
		$(".ulbox ul[data-parentid ='"+this_id+"']").each(function(i,item){
			num.push($(this).height());
		});
		var maxNum=Math.max.apply(null,num);
		$(".ulbox ul[data-parentid ='"+this_id+"']").height(maxNum);
		var max_t = this_t+maxNum;
		if(max_t>body_h){
			this_t = this_t - (max_t-body_h);
		}
		if(this_t<0){
			this_t = 0;
		}
		$(".ulbox").css({"left":this_w+"px","top":this_t+"px"}).show();
		event.stopPropagation();
	});
	$('.navBox,.workBox,.headerbox').mouseenter(function(){
		$('.ulbox ul').hide()
	})
	$(document).on("click",".mainMenuList li a,.ulbox ul li p a,.tabBox a span",function(event){
		var a =0;
		$(".tabBox a").each(function(){
		  a+= $(this).width();
		})
		if(a>=500){
			$(".indexLeft,.indexRight").css("display","block");
			$(".tabBox").css("padding-left","20px");
		}else{
			$(".indexLeft,.indexRight").css("display","none");
			$(".tabBox").css({"padding-left":"0px","left":"0"});
		}
	});	
	$(document).on("click",".indexLeft",function(event){
		var a = 50;
		var x = parseInt($(".tabBox").css("left"));
		$(".tabBox").css("left",x-a);
		var tab = document.querySelector(".tabBox");
		var aleft = tab.lastChild.offsetLeft;
		var nav =$(".navBox").width();
		if(nav>1300){
			if(aleft+x<1000){
				$(".tabBox").css("left",x);
			}
		}else{
			if(aleft+x<700){
				$(".tabBox").css("left",x);
			}
		}
	});
	$(document).on("click",".indexRight",function(event){
		var a = 50;
		var x = parseInt($(".tabBox").css("left"));
		if(x<0){
			$(".tabBox").css("left",x+a);
		}
	});
	$(document).on("mouseover",".ulbox ul,.nano-pane",function(event){
		event.stopPropagation();
	});
	$(document).on("click", ".menulist ul>li>a,.ulbox ul li>p>a", function(event) {
		var modalname = "id_" + $(this).data("id"); //将模块路径替换成模块名
		var menutext = $(this).find("font").text(); //获取模块显示文字
		if($(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").size() == 1){ //如果模块在工作台中已经存在
			$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
			$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
			$(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台
		} else { //如果模块在工作台中不存在
			if($(this).data('href').indexOf('empHome')<0){
				$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
				$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
				$(".body_right .tabBox").append('<a data-href="' + modalname + '" class="active"><font>' + menutext + '</font><span class="glyphicon glyphicon-remove"></span></a>'); //新增模块按钮
				$(".body_right .workBox").append('<div id="' + modalname + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + $(this).data("href") + '" ></iframe></div>'); //新增模块工作台
			}
			
		}
		return false;
	});
	$(document).on("click", ".body_right .tabBox a", function() { //工作台按钮点击事件
		$(".body_right .tabBox a").removeClass("active"); //取消所有按钮激活
		$(this).addClass("active"); //激活当前按钮
		$(".body_right .workBox .workCtn").removeClass("active"); //去取消所有工作台激活
		$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活当前工作台
		return false;
	});
	$(document).on("click", ".body_right .tabBox a span", function() { //工作关闭按钮点击事件
		if($(this).parent().hasClass("active")){ //如果当前工作台为激活状态
			var index = $(this).parent().index() - 2; //获取前工作台序号
			$(".body_right .tabBox a:eq(" + index + ")").addClass("active"); //激活前一个工作台按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活前一个工作台
		}
		$(".body_right .workBox").find('div[id=' + $(this).parent().data("href") + ']').remove(); //删除当前工作台按钮对应的工作台
		$(this).parent().remove(); //删除当前工作台按钮
		return false;
	});
	//修改密码
	var myModal_changePwd=$('#myModal_changePwd');
	$('.changepwd').click(function(){
		myModal_changePwd.modal('show');
	})
	
//	以下内容为首页模块功能
	$(document).on("click", ".notice_p", function(){
		$('#newModal').modal('show');
		$(this).addClass('yd');
		var id = $(this).data('id');
		getInfo(id,'0')
	});
	
	$(document).on("click", ".company_p", function() {
		$('#newModal').modal('show');
		var id = $(this).data('id');
		$(this).addClass('yd');
		getInfo(id,'1')
	});

    $(document).on("click", "a[data-href='id_0']", function() {
        var mesChart = echarts.init(document.getElementById('newMes'));
        var sellChart = echarts.init(document.getElementById('newSell'));
        setTimeout(function(){
            mesChart.resize();
            sellChart.resize();
		},200)
    });

    $('.dsbox,.dsbox_p').click(function(){
    	window.parent.openWorkBoxByMenutext2('待审订单','/manager/inventory/main/toAuditOrderMain');
    })
    
    $('.dgzbox,.dgzbox_p').click(function(){
    	window.parent.openWorkBoxByMenutext2('待过账单据','/manager/inventory/main/toPostOrderMain');
    })
    
    $('.dgsbox,.dgsbox_p').click(function(){
    	window.parent.openWorkBoxByMenutext('调拨接收确认','/manager/jxc/storage/allotReceptionAffim/AllotReception');
    })
    
    $('.wdgs_p').click(function(){
    	window.parent.openWorkBoxByMenutext2('公司通知','/manager/inventory/main/toNoticeMain?noticeType=1');
    })
    
    $('.wdxt_p').click(function(){
    	window.parent.openWorkBoxByMenutext2('系统消息','/manager/inventory/main/toNoticeMain?noticeType=0');
    })
    
//    图表排行方法
    $('.mesTime').change(function(){
    	var val = $(this).val();
    	var data = getDate(val)
    	var obj = {
    		startTime: data.s,
    		endTime: data.e
    	}
    	var name = $('.newMesNav .newMon').attr('name');
    	switch(name){
	    	case '1':
	    		obj.groupByTarget = 'saleManName';
	    	  break;
	    	case '2':
	    		obj.groupByTarget = 'sectionName';
	    	  break;
	    	case '3':
	    		obj.groupByTarget = 'goodsName';
	    	  break;
	    	default:
	    	  break;
		}
    	getRank(obj);
    })
    
    $('.sellTime').change(function(){
    	var val = $(this).val();
    	var data = getDate(val)
    	var obj = {
    		startTime: data.s,
    		endTime: data.e,
    	}
    	if(val == 3){
    		obj.dateType = 0;
    	}else if(val == 4){
    		obj.dateType = 1;
    	}else if(val == 5){
    		obj.dateType = 2;
    	}else if(val == 6){
    		obj.dateType = 3;
    	}
    	getTrend(obj)
    })
    
    $('.newMesNav span').click(function(){
    	$('.newMesNav span').removeClass("newMon");
    	$(this).addClass("newMon");
    	var name = $(this).attr('name');
    	var val = $('.mesTime').val();
    	var data = getDate(val)
    	var obj = {
    		startTime: data.s,
    		endTime: data.e
    	}
    	switch(name){
	    	case '1':
	    		obj.groupByTarget = 'saleManName';
	    	  break;
	    	case '2':
	    		obj.groupByTarget = 'sectionName';
	    	  break;
	    	case '3':
	    		obj.groupByTarget = 'goodsName';
	    	  break;
	    	default:
	    	  break;
    	}
    	getRank(obj);
    })
    
    window.onresize = function () {
    	var mesChart = echarts.init(document.getElementById('newMes'));
    	var sellChart = echarts.init(document.getElementById('newSell'));
    	mesChart.resize();
    	sellChart.resize();
    }
    
});

function getDate(n){
	var t = new Date();
	var today = t.getFullYear()+"-"+("00"+(t.getMonth()+1)).substr(-2)+"-"+("00"+t.getDate()).substr(-2);
	var data = {};
		switch(n){
			case '1':
				var x = new Date(t.getTime());
				data.s = x.getFullYear()+"-"+("00"+(x.getMonth()+1)).substr(-2)+"-"+("00"+x.getDate()).substr(-2);
				data.e = today;
			  break;
			case '2':
				var s = 1;
				var x = new Date(t.getTime()- s*24*3600000);
				data.s = x.getFullYear()+"-"+("00"+(x.getMonth()+1)).substr(-2)+"-"+("00"+x.getDate()).substr(-2);
				data.e = x.getFullYear()+"-"+("00"+(x.getMonth()+1)).substr(-2)+"-"+("00"+x.getDate()).substr(-2);
			  break;
			case '3':
				var s = 6;
				var x = new Date(t.getTime()- s*24*3600000);
				data.s = x.getFullYear()+"-"+("00"+(x.getMonth()+1)).substr(-2)+"-"+("00"+x.getDate()).substr(-2);
				data.e = today;
			  break;
			case '4':
				t.setDate(1);
				data.s = t.getFullYear()+"-"+("00"+(t.getMonth()+1)).substr(-2)+"-"+("00"+t.getDate()).substr(-2);
				data.e = today;
			  break;
			case '5':
				t.setMonth(t.getMonth()-1);
				var date_ = new Date();  
	    		var year = date_.getFullYear();  
	    		var month = date_.getMonth();
	    		month = month<10?'0'+month:month;
	    		var day = new Date(year,month,0);
	    		var end = year + '-' + month + '-' + day.getDate(); 
				data.s = t.getFullYear()+"-"+("00"+(t.getMonth()+1)).substr(-2)+"-01";
				data.e = end;
			  break;
			case '6':
				data.s = t.getFullYear()+"-01-01";
				data.e = today;
			  break;
			default:
			  break;
		}
	return data
}

function getInfo(id,type){
	$.ajaxPackage({
		url:"/manager/inventory/main/getNoticeInfo",
		data: {id: id,noticeType:type},
		success:function(data){
		   if(data.result==1){
			   var vo = data.data.noticeVo;
			   if(type == 0){
				   $('#newModal .modal-title').text('系统消息');
			   }else{
				   $('#newModal .modal-title').text('公司通知');
			   }
			   $('.newTitle').text(vo.title);
			   $('.newMan').text(vo.createByName);
			   $('.newTime').text(vo.createDateStr);
			   $('.newBox').html(vo.content);
		   }else{
           		$.zxsaas_plus.showalert('error', data.desc);
           }
	   	},
	});
}

function getRank(obj){
	var data = getDate('1');
	var def = {
			startTime: data.s,
			endTime: data.e,
			groupByTarget: 'saleManName'
        }
    obj = $.extend({}, def, obj);
	$.ajaxPackage({
		url:"/manager/inventory/main/getSalesRank",
		data: obj,
		success:function(data){
		   if(data.result==1){
			   var rows = data.data.rows;
			   var list = data.data.list;
			   var d1 = [],d2 = [],d3 = [],d4 = [];
			   $.each(rows,function(i,item){
				   d1.push(item[obj.groupByTarget]);
				   d2.push(item.lsamtStr);
				   d3.push(item.lsqty);
				   d4.push(item.profitStr);
			   })
			   var t2 = Math.max.apply(Math,d2);
			   var t3 = Math.max.apply(Math,d3);
			   var t4 = Math.max.apply(Math,d4);
			   if(data.data.limits == 1){
				   var t5 = t2;
			   }else{
				   var t5 = t2>t4?t2:t4;
			   }
			   var mesChart = echarts.init(document.getElementById('newMes'));
			   var mesoption = {
						title: {
							text: "",
							subtext: ""
						},
						tooltip: {
							trigger: "axis"
						},
						legend: {
							data: list
						},
						calculable: true,
						xAxis: [{
							type: "category",
							axisLine: {
								onZero: false
							},
							data: d1
						}],
						yAxis: [{
							type: "value",
							name: "金额",
							min: 0,
							max: (t5 * 1.2).toFixed(0),
							axisLabel: {
								formatter: '¥{value}'
							}
						}, {
							type: "value",
							name: "销量",
							min: 0,
							max: (t3 * 1.2).toFixed(0),
						}],
						series: [{
							name: list[0],
							type: "bar",
							data: d2
						}, {
							type: "line",
							name: list[1],
							yAxisIndex: 1,
							data: d3
						}]
					};
			   var limseries = {
					type: "line",
					name: list[2],
					data: d4
				}
			   if(data.data.limits == 1){
				   mesoption.series.push(limseries);
			   }
			   mesChart.setOption(mesoption);
		   }else{
			   $.zxsaas_plus.showalert('error',data.desc);
		   }
	    },
	});
}

function getTrend(obj){
	var data = getDate('3');
	var def = {
			startTime: data.s,
			endTime: data.e,
			groupByTarget: 'billsDate'
        }
    obj = $.extend({}, def, obj);
	$.ajaxPackage({
		url:"/manager/inventory/main/getSalesRank",
		data: obj,
		success:function(data){
		   if(data.result==1){
			   var rows = data.data.rows;
			   var list = data.data.list;
			   var d1 = [],d2 = [],d3 = [],d4 = [];
			   $.each(rows,function(i,item){
				   d1.push(item.billsDate);
				   d2.push(item.lsamtStr);
				   d3.push(item.lsqty);
				   d4.push(item.profitStr);
			   })
			   var t2 = Math.max.apply(Math,d2);
			   var t3 = Math.max.apply(Math,d3);
			   var t4 = Math.max.apply(Math,d4);
			   if(data.data.limits == 1){
				   var t5 = t2;
			   }else{
				   var t5 = t2>t4?t2:t4;
			   }
			   var sellChart = echarts.init(document.getElementById('newSell'));
			   var selloption = {
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'cross',
					            crossStyle: {
					                color: '#999'
					            }
					        }
					    },
					    legend: {
					        data: list
					    },
					    xAxis: {
							type: 'category',
							boundaryGap: false,
							data: d1
						},
						yAxis: [{
							type: "value",
							name: "金额",
							min: 0,
							max: (t5 * 1.2).toFixed(0),
							axisLabel: {
								formatter: '¥{value}'
							}
						}, {
							type: "value",
							name: "销量",
							min: 0,
							max: (t3 * 1.2).toFixed(0)
						}],
						series: [{
							name: list[0],
							type: 'line',
							yAxisIndex: 0,
							areaStyle: {
								// 渐变
								normal: {
									color: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
											offset: 0,
											color: 'red'
										}, {
											offset: 1,
											color: 'rgba(255,255,255,0.8)'
										}],
										globalCoord: false
									}
								}
							},
							data: d2
						}, {
							name: list[1],
							type: 'line',
							yAxisIndex: 1,
							areaStyle: {
								// 渐变
								normal: {
									color: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
											offset: 0,
											color: 'green'
										}, {
											offset: 1,
											color: 'rgba(255,255,255,0.8)'
										}],
										globalCoord: false
									}
								}
							},
							data: d3
						}]
				};
			   var limseries = {
						name: list[2],
						type: 'line',
						yAxisIndex: 0,
						areaStyle: {
							// 渐变
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'blue'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}],
									globalCoord: false
								}
							}
						},
						data: d4
			   }
			   if(data.data.limits == 1){
				   selloption.series.push(limseries);
			   }
			   sellChart.setOption(selloption);
		   }else{
			   $.zxsaas_plus.showalert('error',data.desc);
		   }
	    },
	});
}

function getTodoOrder(){
	$.ajaxPackage({
		url:"/manager/inventory/main/getTodoOrder",
		type : 'get',  
		success:function(data){
		   if(data.result==1){
			   var count = data.data.countVo;
               count.auditCount = count.auditCount==null?'0':count.auditCount;
               count.postCount = count.postCount==null?'0':count.postCount;
               count.receiveCount = count.receiveCount==null?'0':count.receiveCount;
               count.companyCount = count.companyCount==null?'0':count.companyCount;
               count.systemCount = count.systemCount==null?'0':count.systemCount;
			   $('.auditCount').text(count.auditCount);
			   $('.postCount').text(count.postCount);
			   $('.receiveCount').text(count.receiveCount);
			   $('.wdgsCount').text(count.companyCount);
			   $('.wdxtCount').text(count.systemCount);
		   }
	    },

	});
}

function getTop(){
	$.ajax({
		url:"/manager/inventory/main/getTop10Notice",
		type : 'POST',  
		dataType: "json",
		data: {noticeType:"0"},
		success:function(data){
		   if(data.result==1){
			   var vo = data.data.noticeVoList;
			   $('.mesDiv p').remove();
			   $.each(vo,function(i,item){
				   if(i>6){
					   return false
				   }
				   if(item.readStatus == 1){
					   var p = '<P data-id='+ item.id +' class="notice_p yd" title='+ item.title +'>'+ item.title +'<i>'+ item.createDateStr.substring(5,10) +'</i></P>'
				   }else{
					   var p = '<P data-id='+ item.id +' class="notice_p" title='+ item.title +'>'+ item.title +'<i>'+ item.createDateStr.substring(5,10) +'</i></P>'
				   }
				   $('.mesDiv').append(p);
			   })
		   }
	    }
	});
	$.ajax({
		url:"/manager/inventory/main/getTop10Notice",
		type : 'POST',  
		dataType: "json",
		data: {noticeType:"1"},
		success:function(data){
		   if(data.result==1){
			   var vo = data.data.noticeVoList;
			   $('.infoDiv p').remove();
			   $.each(vo,function(i,item){
				   if(i>6){
					   return false
				   }
				   if(item.readStatus == 1){
					   var p = '<P data-id='+ item.id +' class="company_p yd" title='+ item.title +'>'+ item.title +'<i>'+ item.createDateStr.substring(5,10) +'</i></P>'
				   }else{
					   var p = '<P data-id='+ item.id +' class="company_p" title='+ item.title +'>'+ item.title +'<i>'+ item.createDateStr.substring(5,10) +'</i></P>'
				   }
				   $('.infoDiv').append(p);
			   })
		   }
	    }
	});
}

//跳转到报表页面的传参加密方法测试
function encode64(sysIn) {
	var input = sysIn+"";
	var out = "";
	// base64加密开始
	var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
	
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		out = out + keyStr.charAt(enc1) + keyStr.charAt(enc2)
		+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	
	return out;
};

var output="";
var gsId = "";
gsId = encode64(companyId);
output = encode64(empId);

function _output(){return output;}

function loadMenu(menuVoListUrl){
	$.getJSON(menuVoListUrl, function(r) {
		$("body").append("<ul class='tempbox'></ul>");
		var menuList = r.data.menuVoList;
		var nav = [
	        {code:'XTQX',name : '系统权限', icon : '&#xe60d;'},
	        {code:'JCSZ',name : '基础设置', icon : '&#xe60c;'},
	        {code:'CGGL',name : '采购管理', icon : '&#xe608;'},
	        {code:'CCGL',name : '仓储管理', icon : '&#xe606;'},
	        {code:'HYGL',name : '会员管理', icon : '&#xe609;'},
	        {code:'XSGL',name : '分销管理', icon : '&#xe610;'},
	        {code:'ZJWL',name : '资金往来', icon : '&#xe60b;'},
	        {code:'JGGL',name : '价格管理', icon : '&#xe60a;'},
	        {code:'CXGL',name : '促销管理', icon : '&#xe605;'},
	        {code:'QCGL',name : '期初设置', icon : '&#xe729;'},
	        {code:'SHGL',name : '售后管理', icon : '&#xe60e;'},
	        {code:'LSGL',name : '零售管理', icon : '&#xe60f;'},
	        {code:'CWGL',name : '财务管理', icon : '&#xe607;'},
	        {code:'BBZX',name : '报表中心', icon : '&#xe604;'}
		];
		
		$.each(menuList, function(i, item) {
			if(item.parentId == "ROOT") {
				var li = '<li  data-code="'+ item.moduleCode+'"  data-id="' + item.id + '" data-parentid="' + item.parentId + '"><a data-href="empHome"    data-id="' + item.id + '"><i class="iconfont">' + 3 + '</i><font>' + item.name + '</font></a><span class=\"bg\"></span></li>';
				$(".mainMenuList").append(li);
				// 设置最多10个导航块
				for(var i = 1; i <= 10; i++){
					$(".ulbox").append("<ul data-id=\"" + item.id + "\" data-parentid=\"" + item.id + "\" data-ifmenuname=\"" + i + "\" ></ul>");
				}
			} else {
////				//向锐本地测试代码，不提交
//				if( /^\/manager\/cw\/reportforms\/route/.test(item.url)){
//					item.url = "/report" + item.url;
//				}
				var li = '<li  data-code="'+ item.moduleCode+'" data-id="' + item.id + '" data-parentid="' + item.moduleCode + '" data-ifmenuname="' + item.position + '"><p><a data-href="' + item.url + '?reportEmid='+output+'&userId=' + output + '&gsId=' + gsId + '&jspPath=' +item.remark +'" data-id="' + item.id + '"><font data-ifmenunav="' +item.nav + '">' + item.name + '</font></a></p><span class=\"bg\"></span></li>';
				$(".tempbox").append(li);
				$(".ulbox").append("<ul data-id=\"" + item.id + "\" data-parentid=\"" + item.moduleCode + "\" data-ifmenuname=\"" + item.position + "\" ></ul>");
			}
		});
		
		// 添加模块按钮图标
		for(var i =0; i<$(".mainMenuList li font").length; i++){
			var code = $(".mainMenuList li").eq(i).data('code');
			for(var k=0;k<nav.length;k++){
				if(nav[k].code == code){
					$(".mainMenuList li i").eq(i).html(nav[k].icon);
				}
			}
		}
		var ulbox = $(".ulbox ul");
		$.each($(".tempbox li"), function(i, item) {
			var p_id = $(item).data("parentid");
			var n_id = $(item).data("ifmenuname");
			for(var a=0; a< ulbox.length; a++){
				if(ulbox.eq(a).data('id') == p_id && ulbox.eq(a).data('ifmenuname') == n_id ){
					ulbox.eq(a).append($(item));
				}
			}
		});
		$(".tempbox").remove();
		$(".nano").nanoScroller();
		$.each($(".ulbox ul li font"), function(i, item) {
			if($(item).data("ifmenunav") == "1"){
				var h4 = '<h4>' + $(item).html() + '</h4>';
				$(item).parent().parent().parent().parent().prepend(h4);
				$(item).parent().parent().parent().remove();
			}
		});
		$(".ulbox ul").each(function(i,val){
			if($(this).find("li").length==0) {
				$(this).remove();
			}
		})
	});
}
//根据名称打开工作区
function openWorkBoxByMenutext(menutext,url,flag){
	var modalname = "";
	$(".body_right").find("font").each(function(){
		if($(this).text() == menutext){
			if($(this).parent().data("id")){
				modalname = "id_" + $(this).parent().data("id");
			}else{
				modalname = menutext
			}

		}
	});
	$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
	$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
	if(modalname != "") {//如果模块在工作台中已经存在
		if($(".body_right .tabBox").find("a[data-href=" + modalname + " ]").length == 0){
			$(".body_right .tabBox").append('<a data-href=' + modalname + ' class="active"><font>' + menutext + '</font><span>&Chi;</span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id=' + modalname + '  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
		}else{
			if(flag){
				$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').remove(); //激活点击的工作模块工作台		
				$(".body_right .workBox").find('div[id=' + modalname +' ]').remove();
				$(".body_right .workBox").append('<div id=' + modalname + '  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
				$(".body_right .tabBox").find("a[data-href=" + modalname + " ]").addClass("active"); // 激活点击的模块按钮
			}else{
				$(".body_right .tabBox").find("a[data-href=" + modalname + " ]").addClass("active"); // 激活点击的模块按钮
				$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台	
			}
		}
	} else {//如果模块在工作台中不存在
		var kk = $(".body_right .tabBox").find("a[data-href="+menutext+" ]").text();
		if(kk != ""){
			$(".body_right .tabBox").find("a[data-href=" + menutext + " ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台
		}else{
			$(".body_right .tabBox").append('<a data-href=' + menutext + ' class="active"><font>' + menutext + '</font><span>&Chi;</span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id="' + menutext + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
		}
	}
}

//根据名称打开工作区 需重新指定url
function openWorkBoxByMenutext2(menutext,url,ids){
	var modalname = "";
	$(".body_right").find("font").each(function(){
		if($(this).text() == menutext){
			modalname = "id_" + $(this).parent().data("id");
		}
	});
	$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
	$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
	if(modalname != "") {//如果模块在工作台中已经存在
		if($(".body_right .tabBox").find("a[data-href=" + modalname + " ]").length == 0){
			$(".body_right .tabBox").append('<a data-href=' + modalname + ' class="active">' + menutext + '<span>&Chi;</span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id="' + modalname + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
		}else{
			$(".body_right .tabBox").find("a[data-href=" + modalname + " ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台	
			//$(".body_right .workBox").find('iframe').attr('src',url);
//			
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').find('iframe')[0].contentWindow.firstPage2(ids);
		}
	} else {//如果模块在工作台中不存在
		var kk = $(".body_right .tabBox").find("a[data-href="+menutext+" ]").text();
		if(kk != ""){
			$(".body_right .tabBox").find("a[data-href=" + menutext + " ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台
		}else{
			$(".body_right .tabBox").append('<a data-href=' + menutext + ' class="active">' + menutext + '<span>&Chi;</span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id="' + menutext + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
		}
	}
}

//修改密码
function changePwd(){
	var oldPwd=$("#oldPwd").val();
	var newPwd=$("#newPwd").val();
	var surePwd=$("#surePwd").val();
	if(oldPwd==""){
		$.zxsaas_plus.showalert("提示","旧密码不能为空!");
		return;
	}
	if(newPwd==""){
		$.zxsaas_plus.showalert("提示","新密码不能为空!");
		return;
	}
	if(surePwd==""){
		$.zxsaas_plus.showalert("提示","确认密码不能为空!");
		return;
	}
	if(newPwd!=surePwd){
		$.zxsaas_plus.showalert("提示","确认密码和新密码不一致!");
		return;
	}
	$.ajax({
		url:"../manager/menu/updatePassword",
		type : 'GET',  
		dataType: "json",
		contentType :'application/json', 
		data:{"oldPwd":oldPwd,"newPwd":newPwd},
		success:function(data){
		   $.zxsaas_plus.showalert("提示",data.desc);
		   if(data.data.status==1){//成功
			   $("#myModal_changePwd").modal("hide");
		   }
	    }
	});
}