$.mergeJsonObject = function(jsonbject1, jsonbject2) {
	var resultJsonObject = {};
	for(var attr in jsonbject1) {
		resultJsonObject[attr] = jsonbject1[attr];
	}
	for(var attr in jsonbject2) {
		resultJsonObject[attr] = jsonbject2[attr];
	}
	return resultJsonObject;
};
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};
(function($) {
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if(o[this.name]) {
				if(!o[this.name].push) {
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
			var dft = self.data("default")
			if(src) {
				$.getJSON(src, function(res) {
					var str = "";
					$.each(res.data.rows, function(i, item) {
						if(item.value == dft) {
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
	$(document).on('mouseover','.modal-header',function(e){
		$(this).css('cursor','move')
	})
	$(document).on('mouseout','.modal-header',function(e){
		$(this).css('cursor','default');
	})
	$(document).on('mousedown','.modal-header',function(e){
		var _this=$(this);
		var _thisCon=$(this).closest('.modal-content');
		var _thisConW=_thisCon.outerWidth();
		var _thisConH=_thisCon.outerHeight();
		var _thisDia=$(this).closest('.modal-dialog');
        var l=e.clientX-parseInt(_thisCon.offset().left);
        var t=e.clientY-parseInt(_thisCon.offset().top);
        $(document).mousemove(function (e){
        	_thisCon.css({
        		'width':_thisConW,
        		'height':_thisConH
        	})
        	_thisDia.css({
        		'margin':0,
        		'padding':0,
        		'position':'absolute'
        	});
        	_thisCon.css('position','absolute');
            var ox=e.clientX-l;
            var oy=e.clientY-t;
            var w=$(window).width()-_thisCon.width();
            var h=$(window).height()-_thisCon.height();
            if(oy<0){
                oy=0;
            }else if(oy>h){
                oy=h;
            }
            if(ox<0){
                ox=0;
            }else if(ox>w){
                ox=w;
            }
            _thisCon.css({top:oy,left:ox})
            e.stopPropagation();
            e.preventDefault();
        })
	})
	$(document).mouseup(function (e){
        $(this).unbind("mousemove");
    });
})(jQuery);
$.zxsaas_plus = {
	getinput2json: function(item) {
		var tr = {};
		$.each($(item).find("input"), function(j, input) {
			if($(input).hasClass("json")) {
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
				$(".modal-backdro").remove();
			}, 600);
			$(document).off("click", "#yesBta");
		}
	},
	showalert: function(title, msg) {
		var boxstr = '<div class="modal fade" id="alertModal" data-keyboard="true" data-backdrop="static" >' +
			'<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
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
		$("body").append(boxstr);
		$("#alertModal").modal("show");
		$(document).on("click", "#yesBta", function() {
			delmodal();
		});
		function delmodal() {
			$("#alertModal").modal("hide");
			setTimeout(function() {
				$("#alertModal").remove();
				$(".modal-backdro").remove();
			}, 600);
			$(document).off("click", "#yesBta");
		}
	},
	showconfirm: function(title, msg, funyes, funno) {
		var boxstr = '<div class="modal fade" id="confirmModal" data-keyboard="true" data-backdrop="true">' +
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
		$("body").append(boxstr);
		$("#confirmModal").modal("show");
		$(document).off("click", "#yesBtn");
		$(document).on("click", "#yesBtn", function() {
			funyes();
			delmodal();
		});
		$(document).off("click", "#noBtn");
		$(document).on("click", "#noBtn", function() {
			funno();
			delmodal();
		});
		function delmodal() {
			$("#confirmModal").modal("hide");
			setTimeout(function() {
				$("#confirmModal").remove();
				$(".modal-backdro").remove();
			}, 600);
			$(document).off("click", "#yesBtn");
			$(document).off("click", "#noBtn");
		}
	},
	showconfirmsure: function(title, msg, funyes, funno) {
		var boxstr = '<div class="modal fade" id="confirmModal" data-keyboard="true" data-backdrop="true">' +
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
		$("body").append(boxstr);
		$("#confirmModal").modal("show");
		$(document).off("click", "#yesBtn");
		$(document).on("click", "#yesBtn", function() {
			funyes();
			delmodal();
		});
		function delmodal() {
			$("#confirmModal").modal("hide");
			setTimeout(function() {
				$("#confirmModal").remove();
				$(".modal-backdro").remove();
			}, 600);
			$(document).off("click", "#yesBtn");
			$(document).off("click", "#noBtn");
		}
	},
	//	pageloadend:function(){
	//			    this.filebox2button();
	//				$("input").iCheck({ checkboxClass: 'icheckbox_square-blue',    radioClass: 'iradio_square-blue',increaseArea: '-10'  });
	//				$('[data-toggle="tooltip"]').tooltip();
	//				$.datetimepicker.setLocale('zh');
	//				$('.timebox').datetimepicker({format:'Y-m-d h:i'});
	//		
	//	},
	zxsaaspage: function(pageclick, obj) {
		var pagesum = $(obj).data("pagesum");
		var pagetype = $(obj).data("type").toString();
		var pageactive = $(obj).data("pageactive");
		creatpagelist();
		function creatpagelist() {
			obj.html("");
			switch(pagetype) {
				case "1":
					$(obj).append(creatpagelisttype_1());
					break;
				case "2":
					$(obj).append(creatpagelisttype_2());
					break;
				default:
					$(obj).append(creatpagelisttype_d());
					break;
			}
			$(obj).find("a").unbind();
			$(obj).find("a").click(function() {
				if(!$(this).hasClass("active")) {
					pageactive = $(this).data("loadpage");
					creatpagelist();
					pageclick($(this).data("loadpage"));
				}
			});
		}
		function creatpagelisttype_d() {
			var pagelist = "";
			for(var i = 0; i < pagesum; i++) {
				var a = i + 1;
				if(a == pageactive) {
					pagelist += "<a class='active' data-loadpage='" + a + "'>" + a + "</a>"
				} else {
					pagelist += "<a data-loadpage='" + a + "'>" + a + "</a>"
				}
			}
			return pagelist;
		}
		function creatpagelisttype_1() {
			var pagelist = "";
			switch(pageactive) {
				case 1:
					pagelist += "<a data-loadpage='" + (pageactive + 1) + "'>下一页</a>" //下一页
					pagelist += "<a  data-loadpage='" + pagesum + "'>尾页</a>" //尾页
				case pagesum:
					pagelist += "<a data-loadpage='0'>首页</a>" //首页
					pagelist += "<a data-loadpage='" + (pageactive - 1) + "'>上一页</a>" //上一页
				default:
					pagelist += "<a data-loadpage='0'>首页</a>" //首页
					pagelist += "<a data-loadpage='" + (pageactive - 1) + "'>上一页</a>" //上一页
					pagelist += "<a data-loadpage='" + (pageactive + 1) + "'>下一页</a>" //下一页
					pagelist += "<a  data-loadpage='" + pagesum + "'>尾页</a>" //尾页
					break;
			}
			return pagelist;
		}
		function creatpagelisttype_2() {
			var pagelist = "";
			var prev = "<a data-loadpage='0'>首页</a><a data-loadpage='" + (pageactive - 1) + "'>上一页</a>";
			var next = "<a data-loadpage='" + (pageactive + 1) + "'>下一页</a><a  data-loadpage='" + pagesum + "'>尾页</a>";
			switch(pageactive) {
				case "1":
					prev = "";
					break;
				case pagesum.toString():
					next = "";
					break;
				default:
					break;
			}
			if(pagesum < 5) {
				for(var i = 0; i < pagesum; i++) {
					var a = i + 1;
					if(a == pageactive) {
						pagelist += "<a class='active' data-loadpage='" + a + "'>" + a + "</a>"
					} else {
						pagelist += "<a data-loadpage='" + a + "'>" + a + "</a>"
					}
				}
			} else if(pageactive > 2) {
				var max = 5;
				if(pagesum < 5) {
					max = pagesum;
				}
				for(var i = 0; i < max; i++) {
					var a = i + 1;
					if(a == pageactive) {
						pagelist += "<a class='active' data-loadpage='" + a + "'>" + a + "</a>"

					} else {
						pagelist += "<a data-loadpage='" + a + "'>" + a + "</a>"
					}
				}
			} else if(pageactive > pagesum - 5) {
				for(var i = pagesum - 5; i < pagesum; i++) {
					var a = i + 1;
					if(a == pageactive) {
						pagelist += "<a class='active' data-loadpage='" + a + "'>" + a + "</a>"
					} else {
						pagelist += "<a data-loadpage='" + a + "'>" + a + "</a>"
					}
				}
			} else {
				for(var i = pageactive - 2; i < pageactive + 3; i++) {
					var a = i + 1;
					if(a == pageactive) {
						pagelist += "<a class='active' data-loadpage='" + a + "'>" + a + "</a>"
					} else {
						pagelist += "<a data-loadpage='" + a + "'>" + a + "</a>"
					}
				}
			}
			return prev + pagelist + next;
		}
	},
	getinput2json: function(item) {
		var tr = {};
		$.each($(item).find("input"), function(j, input) {
			if($(input).hasClass("json") && $(input).val() != "") {
				tr[$(input).prop("name")] = JSON.parse($(input).val());
			} else {
				tr[$(input).prop("name")] = $(input).val();
			}
		});
		return tr;
	},
	getjson2ajax: function(item) {
		var tr = {};
		$.each($(item), function(j, input) {
			if($(input).hasClass("json") && $(input).val() != "") {
				tr[$(input).prop("name")] = JSON.parse($(input).val());
			} else {
				tr[$(input).prop("name")] = $(input).val();
			}
		});
		return tr;
	},
	//------------------------------此处是报表，只提供查询，排序，冻结，打印，导出等功能---------------------------------
	showtable: function(obj, Idname, URL, subUrl, pager, JqGridColModel, jqsubGridColModel, isSub) {
		Idname = $(obj).prop("id");
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		var lastsel = ''; //最后一次选中的行
		var rightClickColid = ""; //右键列id
		var rightClickColIndex = 0; //右键index
		//var toggleflag=false;//冻结时候切换用
		var isEditable = false; //是否可以编辑
		var isSortable = false; //是否可以排序
		loadGrid();
		function loadGrid() {
			obj.jqGrid({
				url: URL,
				mtype: "get",
				data: {},
				datatype: "json",
				//datatype: "local",
				//editurl: 'clientArray',
				/*mtype:"POST",
								ajaxGridOptions: { contentType: 'application/x-www-form-urlencoded; charset=GBK' },
								postData:{
									"user":window.parent.mUser,
									"mkey":window.parent.mKey,
									"mdbm":returnStore,
									"accountType":"银行账"
								},
								datatype: "json",*/
				jsonReader: {
					root: "rows",
					page: "page",
					total: "total",
					records: "records",
					repeatitems: false
				},
				cellsubmit: 'clientArray', //单元格保存内容的位置
				ajaxGridOptions: {
					contentType: 'application/json; charset=utf-8'
				},
				serializeGridData: function(postData) {
					/*              if (postData.searchField === undefined) postData.searchField = null;
					                if (postData.searchString === undefined) postData.searchString = null;
					                if (postData.searchOper === undefined) postData.searchOper = null;*/
					return JSON.stringify(postData);
				},
				colModel: JqGridColModel,
				loadonce: false,
				rowNum: 10,
				rowList: [10, 15, 20, 25, 40],
				pager: pager,
				viewrecords: true,
				sortable: isSortable,
				sortorder: "desc",
				sortname: 'xuhao',
				multiselect: true,
				cellEdit: isEditable,
				width: "100%",
				height: $(window).height() * 0.7,
				scroll: true,
				/*altRows:true,
				altclass:'.grid-row-odd',*/
				autowidth: true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				/*footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,//设置userData 显示在footer里*/
				ondblClickRow: function(id) {
					xmfunction.showaddnewmodal(id); //双击弹出编辑框
				},
				onCellSelect: function(id, index, e) {

				},
				onSelectRow: function(id) {
					if(id != lastsel && lastsel != '') {
						obj.jqGrid('saveRow', lastsel);
					}
					var ret = obj.jqGrid('getRowData', id);
					lastsel = id;
				},

				beforeSelectRow: function(rowid, e) {

				},
				afterInsertRow: function(rowid, aData) { //新增一行之后

				},
				gridComplete: function() {
					rightClickMenu();
				},
				loadComplete: function(data) {
					//obj.trigger("reloadGrid");
				},

				subGrid: isSub,
				subGridOptions: {
					selectOnLoad: true,
					reloadOnExpand: false
				},
				subGridBeforeExpand: function(subgrid_id, row_id) {

				},
				subGridRowExpanded: function(subgrid_id, row_id) {
					var subgrid_table_id = subgrid_id + "_t";
					var subgrid_pager_id = pager_id = "p_" + subgrid_table_id;
					$("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table>");
					$("#RemunerationGrid").closest(".ui-jqgrid-bdiv").css({
						"overflow-x": "hidden"
					});
					$("#" + subgrid_table_id).jqGrid({
						url: subUrl + row_id,
						datatype: "json",
						serializeGridData: function(postData) {
							return JSON.stringify(postData);
						},
						colModel: jqsubGridColModel,
						rownumbers: true,
						width: "100%",
						height: "100%",
						sortable: true,
						jsonReader: { // 针对子表格的jsonReader设置  
							root: "subrows",
							records: "records",
							repeatitems: false
						},
						pager: subgrid_pager_id
					});
				},
				subGridRowColapsed: function(subgrid_id, row_id) {

				}
			})
		}
		//右键菜单
		function rightClickMenu() {
			/* $(".ui-th-column").contextMenu('contextMenu', {
						menuStyle :{
							width : "150px"
						},				
			      bindings: {
			    		'rightClickFrozenCol': function(t){
			    			rightClickFrozenCol();
			    		},
			    		'hidenthiscol': function(){
			    			hidenthiscol();
			    		}
			      },
			      onContextMenu: function (event, menu) {//右键选中时触发
					rightClickColIndex = $(event.target).context.cellIndex;//获取右键点击的列index
					var rightClickid=$(event.target).parent("th").prop("id");
			      	if(rightClickColIndex == undefined &&  rightClickid != undefined){
			      		for(var i in JqGridColModel){
			      			if(Idname+"_"+JqGridColModel[i].name == rightClickid){
			      				rightClickColIndex = parseInt(i) + 1;
			      				return true;
			      			}
			      		}
			      	}
			      }
			    });*/
		}
		//冻结到右键选中列
		function rightClickFrozenCol() {
			/*	var colModel = obj.jqGrid('getGridParam','colModel');//获取列模板
				var notDataColLength = colModel.length-JqGridColModel.length;
					for(var i=notDataColLength; i < colModel.length; i++){//遍历列模板通过rightClickColIndex给模板frozen赋值
						JqGridColModel[i-notDataColLength] = colModel[i]
						if(i <= rightClickColIndex){
							 	JqGridColModel[i-notDataColLength].frozen = true;
							}else{
								JqGridColModel[i-notDataColLength].frozen = false;
								}
					}
					isSortable=false;
					commonModal.commonmodalobj.find( "#frozenCol" ).addClass( "newFrozenColCSS");//列冻结按钮变色
					obj.jqGrid('setFrozenColumns');*/

			//obj.setGridParam({cellEdit:true}).trigger('reloadGrid');				
			//obj.jqGrid('setFrozenColumns');
			//obj.jqGrid('gridUnload');
			//$.jgrid.gridUnload("#"+Idname);//卸载jqGrid
			//obj.trigger('reloadGrid');
			//loadGrid();//重新转载jqGrid	
		}
		//隐藏右键点击的列
		function hidenthiscol() {
			//obj.setGridParam().hideCol(JqGridColModel[rightClickColIndex-1].name).trigger("reloadGrid");
		}

		/*	commonModal.commonmodalobj.find("#endhidden").bind('click',function(){
				var colModel = obj.jqGrid('getGridParam','colModel');//获取列模板
				var notDataColLength = colModel.length-JqGridColModel.length;
				for(var i=notDataColLength; i < colModel.length-1; i++){
					//遍历列模板通过rightClickColIndex给模板frozen赋值
						JqGridColModel[i].hidedlg=false;
					}
				obj.setGridParam().trigger("reloadGrid");
			})*/

		/*	commonModal.commonmodalobj.find( "#frozenCol" ).bind('click',function(){
				commonModal.commonmodalobj.find( "#frozenCol" ).removeClass("newFrozenColCSS");
				isSortable=true;
				obj.jqGrid('destroyFrozenColumns');
			})*/
	},
	getalltabledata: function(obj) {
		/*var ids = obj.jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				console.log(ids.length);
				var maxid;
				var rowsdata={};
				if(ids.length ==0 ){
					maxid=0;
					return ' ';
				}else{
					maxid = Math.max.apply(Math,ids);
					for(var i=0;i<=maxid;i++){
						rowsdata=Array.concat(rowsdata,obj.jqGrid('getRowData',i))
					}
					return rowsdata;*/

	},
	edittable: function(obj, Idname, URL, pager) {
		/*$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
					var jqGridHeight;//表单header高度
			window.onresize = function(){

					var ttHeiht_parent = $("#tt",window.parent.document).outerHeight(true)
					//var scrollHeight  = window.document.body.scrollHeight;//页面显示高度
					var headerHeight = $("#headerInfo").outerHeight(true);//表单header高度
					var footerHeight = $("#footerInfo").outerHeight(true);//表单footer高度
					jqGridHeight = ttHeiht_parent-headerHeight-footerHeight-215;
		
					if(jqGridHeight < 50){
						jqGridHeight = 50;
					}
					obj.setGridHeight(jqGridHeight);
		
				}
			$(window).resize();
			
			
			var billsOper_goods = function (val, opt, row) {
				var html_con = '<div class="operating" data-id="' + opt.rowId + '"><i style="cursor:pointer;float:left;display:block;margin-left:12px;padding-top:0px;font-size:14px;" id="remove_row" class="ui-icon ui-icon-trash iconfont" title="删除行" >&#xe61c;</i><i style="cursor:pointer;float:left;display:block;margin-left:30px;padding-top:2px;font-size:12px;" id="add_row" class="ui-icon ui-icon-plus iconfont" title="添加商品" >&#xe61f;</i></div>';
				return html_con;
			}
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			//var toggleflag=false;//冻结时候切换用
			var isEditable=false;//是否可以编辑
			var isSortable=false;//是否可以排序
			var mydata=[{
						"xuhao":"1",
						"billCode": "CI20120531010002",
						"storageDate": "2012-05-31",
						"buyer": "黄庆明",
						"storageStore": "演示单位总部",
						"billType": "采购入库单",
						"supplier": "测试错误供应商",
						"billAmount": 400.00,
						"billState": "未关单",
						"purchaseOrdersBillCode": "",
						"billRemarks": "",
						"createMan": "黄庆明",
						"createDate": "2013-01-29 23:23:42"
					},
					{
						"xuhao":"2",
						"billCode": "CI20120911010001",
						"storageDate": "2012-09-11",
						"buyer": "舒语",
						"storageStore": "演示单位总部",
						"billType": "采购入库单",
						"supplier": "深圳天音",
						"billAmount": 150.00,
						"billState": "未关单",
						"purchaseOrdersBillCode": "",
						"billRemarks": "",
						"createMan": "舒语",
						"createDate": "2012-09-11 13:44:02"
					},
					{
						"xuhao":"3",
						"billCode": "CI20121006010002",
						"storageDate": "2012-10-06",
						"buyer": "舒语",
						"storageStore": "演示单位总部",
						"billType": "采购入库单",
						"supplier": "北京普天太力通信科技有限公司合肥分公司",
						"billAmount": 18920.00,
						"billState": "未关单",
						"purchaseOrdersBillCode": "",
						"billRemarks": "",
						"createMan": "舒语",
						"createDate": "2012-10-06 17:49:25"
					},
					{
						"xuhao":"4",
						"billCode": "CI20121102010001",
						"storageDate": "2012-11-02",
						"buyer": "李小波",
						"storageStore": "演示单位总部",
						"billType": "采购入库单",
						"supplier": "测试客户",
						"billAmount": 1000.00,
						"billState": "未关单",
						"purchaseOrdersBillCode": "",
						"billRemarks": "",
						"createMan": "李小波",
						"createDate": "2012-11-02 14:08:35"
					},
					{
						"xuhao":"5",
						"billCode": "CI20121122020002",
						"storageDate": "2012-11-22",
						"buyer": "李小波",
						"storageStore": "钟楼营业厅",
						"billType": "采购入库单",
						"supplier": "长沙康佳",
						"billAmount": 2000.00,
						"billState": "未关单",
						"purchaseOrdersBillCode": "",
						"billRemarks": "",
						"createMan": "李小波",
						"createDate": "2012-11-22 16:10:31"
					}];
			var JqGridColModel=[
                    { name: 'xuhao', key:true,width: 75, index: 'xuhao' ,sorttype:'string',align: "center",id:"1"},
                    { name: 'actions', width: 100, index: 'actions' ,"formatter": billsOper_goods,id:"2"},
                    { name: 'billCode', width: 200, index: 'billCode', editable:true,sorttype:'string',align: "center",id:"3"},
                    { name: 'storageDate', width: 100, index: 'storageDate', formatter:'date',id:"4" ,datefmt:'M d h:i', editable:true ,align: "center"},
                    { name: 'buyer', width: 100, index: 'buyer' , editable:true,align: "center",id:"5"},
                    { name: 'storageStore', width: 150, index: 'storageStore', editable:true ,align: "center",id:"6"},
                    { name: 'billType', width: 150, index: 'billType', editable:true ,align: "center",id:"7"},
                    { name: 'supplier', width: 300, index: 'supplier' , editable:true,align: "center",id:"8"},
                    { name: 'billAmount', width: 150, index: 'billAmount' , editable:true,align: "center",id:"9"},
                    { name: 'billState', width: 150, index: 'billState' , editable:true,align: "center",id:"10"},
                    { name: 'purchaseOrdersBillCode', width: 200, index: 'purchaseOrdersBillCode', editable:true,align: "center" ,id:"11"},
                    { name: 'billRemarks', width: 100, index: 'billRemarks', editable:true ,align: "center",id:"12"},
                    { name: 'createMan', width: 100, index: 'createMan' , editable:true,align: "center",id:"13"},
                    { name: 'createDate', width: 120, index: 'createDate', formatter:'date',  datefmt:'M d h:i'  ,id:"14",editable:true,align: "center"}
                ];
                loadGrid();
		
		
		function loadGrid(){
			obj.jqGrid({
			url:URL,
			mtype:"get",
			data:mydata,
			datatype:"local",
			//datatype: "json",
			//editurl: 'clientArray',
			cellsubmit: 'clientArray',//单元格保存内容的位置
			ajaxGridOptions : {contentType: 'application/json; charset=utf-8'},
			serializeGridData: function (postData)
    		{
              if (postData.searchField === undefined) postData.searchField = null;
                if (postData.searchString === undefined) postData.searchString = null;
                if (postData.searchOper === undefined) postData.searchOper = null;
                return JSON.stringify(postData);
   			 },
			colNames:
                [
                '序号','操作','单据编号','入库日期','采购员','入库门店','单据类型','供货商','单据金额','单据状态','采购订单号','备注','制单人','制单时间'                   
                ],
            colModel:JqGridColModel,
            loadonce: false,
            rowNum: 10,
            rowList: [10, 15, 20, 25, 40],
            pager: pager,
            viewrecords: true,
            sortable:isSortable,
          	sortorder: "desc",
            sortname:'xuhao',           
            multiselect:true,
           	cellEdit:isEditable,
            width: 900,
            height: 300,
            altRows:true,
            altclass:'.grid-row-odd',
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow:true,  //设置表格显示表脚
			userDataOnFooter:true,//设置userData 显示在footer里
			ondblClickRow:function(id){
				
			},
			onCellSelect:function(id,index,e){
				
			},
			onSelectRow:function(id){
				if(id!=lastsel&&lastsel!=''){
					obj.jqGrid('saveRow',lastsel);
				}
				var ret=obj.jqGrid('getRowData',id);
				lastsel=id;
			},
			
			beforeSelectRow:function(rowid,e){

			},
			afterInsertRow: function (rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				rightClickMenu();
				//obj.trigger("reloadGrid");
				 obj.closest("div.ui-jqgrid-view")
		             .children("div.ui-jqgrid-titlebar")
	                 .css("text-align", "center")
	                 .children("span.ui-jqgrid-title")
	                 .css("float", "none");
			},
			loadComplete:function(data){
				//obj.trigger("reloadGrid");
			},
			
			subGrid: true,
			subGridOptions: {
				selectOnLoad :true,
				reloadOnExpand:false
			},
			subGridBeforeExpand: function(subgrid_id, row_id) {

			},
			subGridRowExpanded: function(subgrid_id, row_id) {
				
			},
			subGridRowColapsed: function(subgrid_id, row_id){

			}
		})
		}
		
			//操作中增加一列
			$(document).on('click', '.ui-icon-plus',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				var ids = obj.jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				if(ids.length ==0 ){
						maxid=0;
					}else{
						maxid = Math.max.apply(Math,ids);
					}		
				obj.jqGrid('addRowData', maxid+1, {}, 'last' );
				resetRow(maxid+1);
				obj.jqGrid("setCell",maxid+1,"xuhao",maxid+1);			
			});
			
			
			//操作中删除一列
			$(document).on('click', '.ui-icon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					if($('#jqGrid tbody tr').length === 3) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						//alert('至少保留一条分录！');
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						obj.jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
			function resetRow(rowId){
				obj.jqGrid('setCell',rowId,"billCode",null);
				obj.jqGrid('setCell',rowId,"storageDate",null);
				obj.jqGrid('setCell',rowId,"buyer",null);
				obj.jqGrid('setCell',rowId,"storageStore",null);
				obj.jqGrid('setCell',rowId,"billType",null);
				obj.jqGrid('setCell',rowId,"supplier",null);
				obj.jqGrid('setCell',rowId,"billAmount",'0.00');
				obj.jqGrid('setCell',rowId,"billState",null);
				obj.jqGrid('setCell',rowId,"purchaseOrdersBillCode",null);
				obj.jqGrid('setCell',rowId,"billRemarks",null);
				obj.jqGrid('setCell',rowId,"createMan",null);
				obj.jqGrid('setCell',rowId,"createDate",null);
				obj.jqGrid('setCell',rowId,"goodsCode",null);
				obj.jqGrid('setCell',rowId,"retailBillCode",null);
				obj.jqGrid('setCell',rowId,"store",null);
				obj.jqGrid('setCell',rowId,"customerPhone",null);
			}
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest('#jqGrid').length == 0) { 
						$('#jqGrid').jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
		})	*/
	}

}