$(function() {
	var resourcejson = "menu/mainPageMenu";
	loadres(resourcejson);
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
	$('.navBox').mouseenter(function(){
		$('.ulbox ul').hide()
	})
	$('.workBox').mouseenter(function(){
		$('.ulbox ul').hide()
	})
	$('.headerbox').mouseenter(function(){
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
		$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
		$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
		if($(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").size() == 1){ //如果模块在工作台中已经存在
			$(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台
		} else { //如果模块在工作台中不存在
			$(".body_right .tabBox").append('<a data-href="' + modalname + '" class="active">' + menutext + '<span class="glyphicon glyphicon-remove"></span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id="' + modalname + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + $(this).prop("href") + '" ></iframe></div>'); //新增模块工作台
		}
		return false;
	});
	$(document).on("click", ".headerbox .menuAndSkin>.menu", function() { //菜单形态转换事件
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
		return false;
	});
	$(document).on("click", ".menulist>ul>li>a", function() { //点击弹出主模块流程图页面
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
});
//跳转到报表页面的传参加密方法测试
function encode64(sysIn) {
	var input = sysIn + "";
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
var output = "";
var gsId = "";
output = encode64(empId);
gsId = encode64(companyId);

function loadres(resourcejson){
	$.getJSON(resourcejson, function(r) {
		$("body").append("<ul class='tempbox'></ul>");
		var resList = r.data.rows;
		$.each(resList, function(i, item) {
			if(item.parentId == "0") {
				var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '"><a href="' + item.url + '?resourceId=' + item.id + '" data-id="' + item.id + '"><i class="iconfont">' + item.iconID + '</i><font>' + item.menuText + '</font></a><span class=\"bg\"></span></li>';
				$(".mainMenuList").append(li);
			} else {
				if(item.ifMenuName !== null){
//					if(item.id == 80801){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 350 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80802){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 450 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80803){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 100 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80804){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 300 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80805){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 200 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80806){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 400 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80807){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' + 500 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80501){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +600 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80701){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +650 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80601){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +660 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80301){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +670 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80302){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +690 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80303){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +710 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80502){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +730 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80602){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +740 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80702){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +750 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80808){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +760 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80102){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +800 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80304){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +66363 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80503){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +66362 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80504){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +66458 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80104){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +10002 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}else if(item.id == 80204){
//						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url + '?resourceId=' + item.id + '&userId=' + output + '&projectId=' +10001 + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}
//					
//					
//					else{
						var li = '<li data-id="' + item.id + '" data-parentid="' + item.parentId + '" data-ifmenuname="' + item.ifMenuName + '"><p><a href="' + item.url +'?reportEmid=' +output+ '&userId=' + output + '&gsId=' + gsId + '&jspPath=' +item.remark + '" data-id="' + item.id + '"><font data-ifmenunav="' +item.ifMenuNav + '">' + item.menuText + '</font></a></p><span class=\"bg\"></span></li>';
//					}
					$(".tempbox").append(li);
					$(".ulbox").append("<ul data-id=\"" + item.id + "\" data-parentid=\"" + item.parentId + "\" data-ifmenuname=\"" + item.ifMenuName + "\" ></ul>");
				}
			}
		});
		var ulbox = $(".ulbox ul");
		$.each($(".tempbox li"), function(i, item) {
			var p_id = $(item).data("parentid");
			var n_id = $(item).data("ifmenuname");
			if($(item).data("ifmenuname") == "1"){
				for(var a=0;a<ulbox.length;a++){
					if(ulbox.eq(a).data('parentid') ==p_id && ulbox.eq(a).data('ifmenuname') ==n_id ){
						ulbox.eq(a).append($(item));
					}
				}
			}
			if($(item).data("ifmenuname") == "2"){
				for(var b=0;b<ulbox.length;b++){
					if(ulbox.eq(b).data('parentid') ==p_id && ulbox.eq(b).data('ifmenuname') ==n_id ){
						ulbox.eq(b).append($(item));
					}
				}
			}
			if($(item).data("ifmenuname") == "3"){
				for(var c=0;c<ulbox.length;c++){
					if(ulbox.eq(c).data('parentid') ==p_id && ulbox.eq(c).data('ifmenuname') ==n_id ){
						ulbox.eq(c).append($(item));
					}
				}
			}
			if($(item).data("ifmenuname") == "4"){
				for(var d=0;d<ulbox.length;d++){
					if(ulbox.eq(d).data('parentid') ==p_id && ulbox.eq(d).data('ifmenuname') ==n_id ){
						ulbox.eq(d).append($(item));
					}
				}
			}
			if($(item).data("ifmenuname") == "5"){
				for(var k=0;k<ulbox.length;k++){
					if(ulbox.eq(k).data('parentid') ==p_id && ulbox.eq(k).data('ifmenuname') ==n_id ){
						ulbox.eq(k).append($(item));
					}
				}
			}
		});
		$(".tempbox").remove();
		$(".nano").nanoScroller();
		$.each($(".ulbox ul"), function(i, item) {
			if($(item).find("li").size() < 1) {
				$(item).remove();
			}
		});
		$.each($(".ulbox ul li font"), function(i, item) {
			if($(item).data("ifmenunav") == "0"){
				var h4 = '<h4>' + $(item).html() + '</h4>';
				$(item).parent().parent().parent().parent().prepend(h4);
				$(item).parent().parent().parent().remove();
			}
		});
	
	});
}
//根据名称打开工作区
function openWorkBoxByMenutext(menutext,url){
	var modalname = "";
	$(".body_right").find("font").each(function(){
		if($(this).text() == menutext){
			modalname = $(this).parent().data("id");
		}
	});
	$(".body_right .tabBox a").removeClass("active"); //取消原显示的页面按钮块激活状态
	$(".body_right .workBox .workCtn").removeClass("active"); //取消原显示的工作台激活状态
	if(modalname != "") {//如果模块在工作台中已经存在
		if($(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").length == 0){
			$(".body_right .tabBox").append('<a data-href="' + modalname + '" class="active">' + menutext + '<span>&Chi;</span></a>'); //新增模块按钮
			$(".body_right .workBox").append('<div id="' + modalname + '"  class="workCtn workChild  active clearfix "><iframe frameborder="0" height="100%"  src="' + url + '" ></iframe></div>'); //新增模块工作台
		}else{
			$(".body_right .tabBox").find("a[data-href='" + modalname + "' ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台		
		}
	} else {//如果模块在工作台中不存在
		var kk = $(".body_right .tabBox").find("a[data-href='"+menutext+"']").text();
		if(kk != ""){
			$(".body_right .tabBox").find("a[data-href='" + menutext + "' ]").addClass("active"); // 激活点击的模块按钮
			$(".body_right .workBox").find('div[id=' + $(".body_right .tabBox a.active").data("href") + ']').addClass("active"); //激活点击的工作模块工作台
		}else{
			$(".body_right .tabBox").append('<a data-href="' + menutext + '" class="active">' + menutext + '<span>&Chi;</span></a>'); //新增模块按钮
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