$.mergeJsonObject = function(jsonbject1, jsonbject2) {
	var resultJsonObject = {};
	for (var attr in jsonbject1) {
		resultJsonObject[attr] = jsonbject1[attr];
	}
	for (var attr in jsonbject2) {
		resultJsonObject[attr] = jsonbject2[attr];
	}
	return resultJsonObject;
};
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};
var progressTime;
$.progress= function (color,during) {
	$('#progressContent').remove();
	var html='<div id="progressContent" style="width: 100%;height:8px;"><span id="progressBack" style="border-radius:10px;height: 100%;display: block;width: 0;background:'+color+'"></span></div>';
	$('#alertModal .modal-footer').html(html);
	clearInterval(progressTime);
	var n=0;
	var dur=during;
	var add=2;
	progressTime=setInterval(function () {
		n+=add;
		if(n>=100){
			clearInterval(progressTime)
		}
		$('#progressBack').css({
			'width':n+'%'
		});
	},dur/(100/add));
};


$(document).on("show.bs.modal","#alertModal",function(){
	var title =$(this).find(".modal-title").text();
	if(title=="success"){
		$('#alertModal .modal-content').css({"background-color":"#BBF4BB",'color':'#000'});
		$('#alertModal.modal-header,#alertModal .modal-body').css('borderBottom',0).click(function () {
			$('#alertModal').modal('hide')
		});
		$('#alertModal .modal-footer').css({
			"padding":"0px",
			"border":0
		});
		$.progress('#fff',1500);
		$('#alertModal .modal-header').hide();
	}else if(title=="error"){
		$('#alertModal .modal-content').css({"background-color":"#d9534f",'color':'#fff'});
		$('#alertModal .modal-header,#alertModal .modal-body').css('borderBottom',0);
		$('#alertModal .modal-footer').css({
			"padding":"0px",
			"border":0,
			'textAlign':'right'
		});
		$('#alertModal button').css({'background':'#d9534f','border':0});
		$('#alertModal .modal-header').hide();
	}else if(title=="warning"){
		$('#alertModal .modal-content').css({"background-color":"#f0ad4e",'color':'#fff'});
		$('#alertModal .modal-header,#alertModal .modal-body').css('borderBottom',0);
		$('#alertModal .modal-footer').css({
			"padding":"0px",
			"border":0,
			'textAlign':'right'
		});
		$('#alertModal button').css({'background':'#f0ad4e','border':0});
		$('#alertModal .modal-header').hide()
	}else{
		$('#alertModal .modal-header').show()
	}
});
$(document).on("shown.bs.modal","#alertModal",function(){
	var title =$(this).find(".modal-title").text();
	if(title=="success"){
		$("#alertModal").find(".path_one").css({"strokeDashoffset":"0"});
		setTimeout(function(){
			$("#alertModal").modal('hide');
		},1500);
	}
});
/*%格式变换成小数*/
$(document).on("input propertychange",".DataFormat",function(){
	if($(this).val().indexOf("%")>-1){
		$(this).attr("maxLength",$(this).val().length);
		$(this).val($(this).val().replaceAll("%","").valueOf()/100)
	}
	if($(this).val()==""){
		$(this).removeAttr("maxLength");
	}
});
$(document).on('keypress','form input',function(e){//阻止boot验证插件form表单回车默认事件
	if(e.keyCode==13){
		e.preventDefault()
	}
});
/*********************模态框不能滚动调整**********************************/
$(window).resize(function(){
	toggleScroll();
});

$(document).on("hidden.bs.modal",".modal",function(e){
	toggleScroll();
});

function toggleScroll(){
	 var len=$(".modal:visible").length;
	 var lenBack =$("body").find(".modal-backdrop").length||0;
	 if(len>0){
		$("body").hasClass("modal-open")||$("body").addClass("modal-open");
		lenBack==0&&$("body").append('<div class="modal-backdrop fade in"></div>');
	 }else{
		 if(lenBack>0){
			 $(".modal-backdrop").remove();
		 }
	 }
}
(function($) {
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	$.fn.select = function() {
		return this.each(function() {
			var self = $(this);
			var src = self.data("src");
			var dft = self.data("default");
			if (src) {
				$.getJSON(src, function(res) {
					var str = "";
					$.each(res.data.rows, function(i, item) {
						if (item.value == dft) {
							str += "<option value='" + item.id + "' selected='selected'>" + item.name + "</option>";
						} else {
							str += "<option value='" + item.id + "'>" + item.name + "</option>";
						}
					});
					self.html(str);
				});
			}
		});
	};
	$(document).on('mouseover', '.modal-header', function(e) {
		$(this).css('cursor', 'move')
	});
	$(document).on('mouseout', '.modal-header', function(e) {
		$(this).css('cursor', 'default');
	});
	$(document).on('mousedown', '.modal-header', function(e) {
		var _this = $(this);
		var _thisCon = $(this).closest('.modal-content');
		var _thisConW = _thisCon.outerWidth();
		var _thisConH = _thisCon.outerHeight();
		var _thisDia = $(this).closest('.modal-dialog');
		
		var l = e.clientX - parseInt(_thisCon.offset().left);
		var t = e.clientY - parseInt(_thisCon.offset().top);
		$(document).mousemove(function(e) {
			_thisCon.css({
				'width': _thisConW,
				'height': _thisConH
			});
			_thisDia.css({
				'margin': 0,
				'padding': 0,
				'position': 'absolute'
			});
			_thisCon.css('position', 'absolute');
			var ox = e.clientX - l;
			var oy = e.clientY - t;
			var w = $(window).width() - _thisCon.width();
			var h = $(window).height() - _thisCon.height();
			if (oy < 0) {
				oy = 0;
			} 
			if (ox < 0) {
				ox = 0;
			} else if (ox > w) {
				ox = w;
			}
			_thisCon.css({
				top: oy,
				left: ox
			});
			e.stopPropagation();
			e.preventDefault();
		})
	});
	$(document).mouseup(function(e) {
		$(this).unbind("mousemove");
	});
})(jQuery);
$.zxsaas_plus = {
	getinput2json: function(item) {
		var tr = {};
		$.each($(item).find("input"), function(j, input) {
			if ($(input).hasClass("json")) {
				tr[$(input).prop("name")] = JSON.parse($(input).val());
			} else {
				tr[$(input).prop("name")] = $(input).val();
			}
		});
		return tr;
	},
	showloading: function() {
		$("body").append('<div class="loadingbox"><i class="icon-spinner icon-spin"></i>加载中...	</div>');
	},
	hideloading: function() {
		$("body").find('.loadingbox').remove();
	},
	filebox2button: function() {
		$.each($("input[type='file']"), function(i, item) {
			var item_t = $(item).position().top;
			var item_l = $(item).position().left;
			var item_w = $(item).outerWidth();
			var item_h = $(item).outerHeight();
			var input_w = item_w - 100;
			$(item).addClass('fileboxhide');
			$(item).after('<div class="filebox" style="width:' + item_w + 'px;left:' + item_l + 'px;top:' + item_t + 'px;"><input type="text" class="form-control" style="width:' + input_w + 'px" /><button class="btn btn-primary btn-sm pull-right">选择文件</button></div>');

		});
		$(document).on("change", "input[type='file']", function() {
			$(this).next().find("input[type='text']").val($(this).val());
		});
	},
	treeload: function(jsonurl, obj) {
		$.getJSON(jsonurl, function(r) {
			obj.treeview({
				data: r,
				emptyIcon: "glyphicon glyphicon-list-alt",
				expandIcon: "glyphicon glyphicon-folder-close",
				collapseIcon: "glyphicon glyphicon-folder-open"
			});
		});
	},
	showTip: function(title, msg) {
		var boxstr = '<div class="modal fade" id="alertModal" data-keyboard="true" data-backdrop="static" >' +
			'<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
			' <div class="modal-content" >' +
			'  <div class="modal-header">' +
			'   <h4 class="modal-title">' + title + '</h4>' +
			'</div>' +
			'<div class="modal-body">' + msg +
			'</div>' +
			'</div>' +
			' </div>';
		$("body").append(boxstr);
		$("#alertModal").modal("show");
		$(document).on("click", "#yesBta", function() {
			delmodal();
		});

		function delmodal() {
			$("#alertModal").modal("hide");
			setTimeout(function() {
				$("#alertModal").remove();
				$(".modal-backdrop").remove();
			}, 600);
			$(document).off("click", "#yesBta");
		}
	},
	showalert: function(title, msg , callback) {
		var boxstr = '<div class="modal fade" id="alertModal" data-keyboard="true">' +
			'<div class="modal-dialog" style="width: 400px;" >' +
			' <div class="modal-content" >' +
			'  <div class="modal-header">' +
			'   <h4 class="modal-title">' + title + '</h4>' +
			'</div>' +
			'<div class="modal-body">' + msg +
			'</div>' +
			'<div class="modal-footer" style="text-align: center;">' +
			'<button type="button" class="btn btn-warning" id="yesBta">确定</button>' +
			'  </div>' +
			'</div>' +
			'</div>' +
			' </div>';
		$("#alertModal").remove();
		$(".modal-backdrop").remove();
		$("body").append(boxstr);
		$("#alertModal").modal("show");
		$(document).on("click", "#yesBta", function() {
			delmodal();
			if(callback) callback();
		});
		function delmodal() {
			$("#alertModal").modal("hide");
			$(document).off("click", "#yesBta");
		}
	},
	showconfirm: function(title, msg, funyes, funno) {
		var boxstr = '<div class="modal fade" id="confirmModal" data-keyboard="true" data-backdrop="static">' +
			'<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
			' <div class="modal-content" >' +
			'  <div class="modal-header">' +
			'   <h4 class="modal-title">' + title + '</h4>' +
			'</div>' +
			'<div class="modal-body">' + msg +
			'</div>' +
			'<div class="modal-footer" style="text-align: center;">' +
			'<button type="button" class="btn btn-warning" id="yesBtn">确定</button>' +
			'  <button type="button" class="btn btn-primary" data-dismiss="modal" id="noBtn">取消</button>' +
			'  </div>' +
			'</div>' +
			'</div>' +
			' </div>';
		$("#confirmModal").remove();
		$(".modal-backdrop").remove();
		$("body").append(boxstr);
		$("#confirmModal").modal("show");
		$(document).off("click", "#yesBtn");
		$(document).on("click", "#yesBtn", function() {
			if(funyes)funyes();
			delmodal();
		});
		$(document).off("click", "#noBtn");
		$(document).on("click", "#noBtn", function() {
			if(funno) funno();
			delmodal();
		});
		function delmodal() {
			$("#confirmModal").modal("hide");
			$(document).off("click", "#yesBtn");
			$(document).off("click", "#noBtn");
		}
	},
	showconfirmsure: function(title, msg, funyes) {
		var boxstr = '<div class="modal fade" id="confirmModalsure" data-keyboard="true" data-backdrop="static">' +
			'<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
			' <div class="modal-content" >' +
			'  <div class="modal-header">' +
			'   <h4 class="modal-title">' + title + '</h4>' +
			'</div>' +
			'<div class="modal-body">' + msg +
			'</div>' +
			'<div class="modal-footer" style="text-align: center;">' +
			'<button type="button" class="btn btn-warning" id="yesBtn">确定</button>' +
			'  </div>' +
			'</div>' +
			'</div>' +
			' </div>';
		$("#confirmModalsure").remove();
		$(".modal-backdrop").remove();
		$("body").append(boxstr);
		$("#confirmModalsure").modal("show");
		$(document).off("click", "#yesBtn");
		$(document).on("click", "#yesBtn", function() {
			funyes();
			delmodal();
		});
		function delmodal() {
			$("#confirmModalsure").modal("hide");
			$(document).off("click", "#yesBtn");
		}
	}
};