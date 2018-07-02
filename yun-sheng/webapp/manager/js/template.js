		function loadmodal(options)
			{
				var d_option = {
		LoadBtnUrl: "../../json/button.js", //按钮工具栏加载地址
		LoadTableUrl: "../../json/table.json", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		LoadTableFomatUrl: "../../json/tableset.json", //获取表格显示格式数据加载地址
		SaveEditUrl: "", //新增或修改后保存数据接口地址
		SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		SaveEditBtnName: ".saveeditbutton", //保存按钮名称。遵照css选择器书写
		SaveAddBtnName:".savenewbutton",
		TableName: ".zxsaastable", //显示表格名称。遵照css选择器书写
		EditModalName: ".EditBox", //修改时弹窗名称。遵照css选择器书写
		AddModalName: ".AddBox", //新增时弹窗名称。遵照css选择器书写	
		iconJsonUrl:"../json/icon.json",
		addbtn:"button[name='showAddModal']",//新增按钮
		editbtn:"button[name='showEditModal']",//打印按钮
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		pager:"#jqGridPager"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
		};
		d_option = $.extend(d_option, options);
		//加载功能按钮
		$.getJSON(options.LoadBtnUrl, function(r) {
			$("#" + options.ModouleName ).find(options.btnbox).html("");
			var btnjson = r.data;
			$.each(btnjson, function(i, item) {
				var buttonstr = '<button type="button" class="btn btn-default button" data-eventname="' + item.name + '" data-editid="0"><i class="iconfont">' + item.iconcode + '</i>' + item.text + '</button>'
				$("#" + options.ModouleName ).find(options.btnbox).append(buttonstr);
			});
		})
		

		//加载表格
		$.getJSON(options.LoadTableUrl,function(t_data){
			var jqmodel=t_data.jqmodel;
			var jqsubGridColModel=t_data.jqsubGridColModel;
			$.zxsaas_plus.showtable($('#'+options.ModouleName),
			options.ModouleName,options.LoadTableUrl,options.subLoadTableUrl,options.pager,
			jqmodel,jqsubGridColModel,options.isSub)
		})

//--------------------------新增按钮打开新增弹出框---------------------------------
		$(document).on("click",options.addbtn,function(event){
		var editid=$(this).data("editid");
		var idname=$(this).parent().parent().siblings(".tablebox").children().children().attr('id');
		var idtruename=idname.slice(5,idname.length);
		var ids=($("#"+idtruename)).jqGrid("getGridParam",'selarrrow');
		var modelname=(($("#"+idtruename)).jqGrid("getRowData",ids[0])).name;
		if(ids.length==1){
			$("#"+options.AddModalName.trim() +" input[name='parentId']").val(ids[0]);
			//(("#"+options.AddModalName.trim() +" .parentName")).text(modelname);
		}else if(ids.length==0){
			
		}else{
			$.scojs_message('新增时最多选中一行', $.scojs_message.TYPE_ERROR);
			return false;
		}
		$(options.AddModalName).modal("show");
	});
	$(document).on("click",options.editbtn,function(event){
		var idname=$(this).parent().parent().siblings(".tablebox").children().children().attr('id');
		var idtruename=idname.slice(5,idname.length);
		var ids=($("#"+idtruename)).jqGrid("getGridParam",'selarrrow');
		if(ids.length==1){
			$("#"+options.EditModalName.trim()).modal("show");
			$("#"+options.EditModalName.trim()+" input[name='id']").val(ids[0]);
			var postdata=$("#"+options.EditModalName.trim()+" input[name='parentId']").val();
			$.post(options.GetRowInfoUrl,postdata,function(r_data){
			//$("#newprj input[name='resourceTypeId']").val(r_data.resourceTypeId);
			})
		}else{
			$.scojs_message('编辑时必须只选中一行或者双击该行', $.scojs_message.TYPE_ERROR);
			
		}
		
	});
	$(document).on("click",options.SaveAddBtnName,function(event){
		var postdata = $("#tablename_add").serializeArray();
			$.post(options.SaveAddUrl,postdata,function(){
				//alert(1111111);
			});
		
	});
	$(document).on("click",options.SaveEditBtnName,function(event){
		var postdata = $("#tablename_edit").serializeArray();
			$.post(options.SaveEditUrl,postdata,function(){
				//alert(1111111);
			});
		
	});
	$(document).on("click",".btnbox button[name='delRow']",function(event){
		$.zxsaas_plus.showconfirm("数据删除提醒", "您正在删除系统数据，该操作将导致不可逆的数据销毁！您确定要执行改操作吗？",
			function() {
				var delid = $("#" + options.ModouleName).find("delid").val();
				$.post(options.DelRowUrl, {
					id: delid
				}, function() {		
					if(r.result == 1) {
						$.zxsaas_plus.showalert("数据操作成功！", "数据操作成功");
					} else {
						$.zxsaas_plus.showalert("数据操作失败！", "数据操作失败");
					}
				});
			},
			function() {
		
			});
		
	});
	$(document).on("click",".btnbox button[name='printtable']",function(event){
		$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
		
	});
	$(document).on("click",".btnbox button[name='exportTablename']",function(event){
		$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
		
	});
			}