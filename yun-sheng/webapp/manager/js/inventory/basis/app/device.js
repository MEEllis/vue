//时间插件
    $(document).ready(function(){
//    	表格参数
    	var options = {
        		LoadTableUrl: basePath + '/inventory/basis/app/device/query',
        		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
        		pager: "#jqGridPager",
        		colNames : ['id','设备类型','设备类型名称','设备号','集团','集团名称','发货日期','发货日期格式','发货人','发货单号','是否禁用','备注',
        		               '最近登录时间','新增人','新增时间','修改人','修改时间'], 
        		colModel : [
        		            {name:'id',index:'id',width:80,align:'center',hidden:true},
    						{name:'devicetype',index:'devicetype', width:200,align:'center',sorttype:'string',sortable:false},
    						{name:'devicetypeName',index:'devicetypeName', width:150,align:'center',hidden:true},
    						{name:'devicenumber',index:'devicenumber', width:160,align:'center', sorttype:'string',sortable:false},
    						{name:'groupId',index:'groupId', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'groupName',index:'groupName', width:150,align:'center', sorttype:'string',hidden:true},
    						{name:'sendDate',index:'sendDate', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'sendDateStr',index:'sendDateStr', width:150,align:'center',hidden:true},
    						{name:'sendName',index:'sendName', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'sendNum',index:'sendNum', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'status',index:'status', width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"0:启用;1:禁用;2:删除"}},
    						{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
    						{name:'lastLoginTime',index:'lastLoginTime', width:200,align:'center',sorttype:'string',sortable:false},
    						{name:'createByName',index:'createByName', width:180,align:'center',  sorttype:'string',sortable:false},
    						{name:'createDateStr',index:'createDateStr', width:180,align:'center',  sorttype:'string',sortable:false},
    						{name:'updateByName',index:'updateByName', width:180,align:'center',  sorttype:'string',sortable:false},
    						{name:'updateDateStr',index:'updateDateStr', width:180,align:'center', sorttype:'string',sortable:false}
    	                ]       
        	};
    	var times = {
    			LoadTableUrl: basePath + '/inventory/basis/app/device/findLoginRecord',
        		TableName: "#timeGrid", //显示表格名称。遵照css选择器书写
        		pager: "#jqGridPager_time",
        		colNames : ['id','登录时间','登录IP','登录账号ID'], 
        		colModel : [
        		            {name:'id',index:'id',width:80,align:'center',hidden:true},
        		            {name:'createDate',index:'createDate', width:200,align:'center',sortable:false},
    						{name:'ip',index:'ip', width:170,align:'center', sorttype:'string',sortable:false},
    						{name:'createName',index:'createName', width:170,align:'center',sortable:false}
    	                ] 	
    	}
    	
//    	初始化表格
    	loadmodal(options);
    	timemodal(times);
    	
//    	默认查询设备类型
    	queryDevicetype();
    	
//    	默认集团
    	getGroupList();
    	
//    	初始化时间
    	getAuthList(initDealDate);
    	
    	
//    	开始日期效验
    	$("#bg_date,#end_date").change(function (){
    		var begin = $("#bg_date").val();
    		var end = $("#end_date").val();
    		if(end !== ""){
    			if(begin>end){
    				$("#bg_date").val(end);
    			}
    		}
    	});
    	
    	
//		查询
		$('.search').click(function(){
			var obj = {
				devicetype: $(".devicetype").val(),
				keyWord: $(".keyWord").val(),
				sendDateBegin: $("#bg_date").val(),
				sendDateEnd: $("#end_date").val()
			}
			if($(".queryDisEnbled").is(':checked')){
				obj.queryDisEnbled = 1;
			}else{
				obj.queryDisEnbled = 0;
			}
			console.log(obj);
			$("#dataGrid").jqGrid("setGridParam",{
				datatype:'json',
				page: 1,
				postData: obj
			}).trigger("reloadGrid"); 
		});
		
//		禁止回车提交表单
		document.onkeydown = function (e){ 
	        // 兼容FF和IE和Opera    
	        var theEvent = e || window.event;    
	        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
	        if (code == 13) {    
	            return false;
	        }    
	        return true;    
	    } 
		
//		新增并关闭
		$('.addSave').click(function(){
			var bootstrapValidator = $("#addForm").data('bootstrapValidator');
		    bootstrapValidator.validate();
		    var obj = $("#addForm").toJsonObject();
			if($("#addForm input[name='status']").is(':checked')){
				obj.status = 1;
			}else{
				obj.status = 0;
			}
			obj.sendDate = $("#fh_date").val();
			console.log(obj);
		    if(bootstrapValidator.isValid()){
		    	$.ajax({
		    		type: 'Get',
		    		url: basePath+'/inventory/basis/app/device/add',
		    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		    		data: obj,
		    		success: function(data) {
		    			if(data.result == 1){
		    				$("#dataGrid").jqGrid("setGridParam",{
								datatype:'json',
								page: 1,
							}).trigger("reloadGrid"); 
		    				$('#addModal').modal('hide');
		    				$('#addForm')[0].reset();
		    				bootstrapValidator.resetForm();
		    			}else{
	    	    			$.zxsaas_plus.showalert("错误",data.desc)
	    	    			return;
	    	    		}
		    		},
		    		error: function(msg){
		    			$.zxsaas_plus.showalert("提示","error!")
		    		}
		    	});
		    }
		})
		
//		新增不关闭
		$('.NewSave').click(function(){
			var bootstrapValidator = $("#addForm").data('bootstrapValidator');
		    bootstrapValidator.validate();
		    var obj = $("#addForm").toJsonObject();
			if($("#addForm input[name='status']").is(':checked')){
				obj.status = 1;
			}else{
				obj.status = 0;
			}
			obj.sendDate = $("#fh_date").val();
			console.log(obj);
		    if(bootstrapValidator.isValid()){
		    	$.ajax({
		    		type: 'Get',
		    		url: basePath+'/inventory/basis/app/device/add',
		    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		    		data: obj,
		    		success: function(data) {
		    			if(data.result == 1){
		    				$("#dataGrid").jqGrid("setGridParam",{
								datatype:'json',
								page: 1,
							}).trigger("reloadGrid"); 
		    				$('#addForm')[0].reset();
		    				bootstrapValidator.resetForm();
		    			}else{
	    	    			$.zxsaas_plus.showalert("错误",data.desc)
	    	    			return;
	    	    		}
		    		},
		    		error: function(msg){
		    			$.zxsaas_plus.showalert("提示","error!")
		    		}
		    	});
		    }
		})
		
//		修改
		$('.amend').click(function(){
			var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
			if(ids.length != 1){
				$.zxsaas_plus.showalert("提示","请选择一条需要修改的数据");
				return;
			}else{
				$('#amendForm')[0].reset();
				$("#amendModal").modal('show');
				var row = $("#dataGrid").jqGrid('getRowData',ids[0]);
				console.log(row);
				$(".devicetype option").each(function (){
		             var txt = $(this).text(); //获取单个text
		             var val = $(this).val(); //获取单个value
		             if(row.devicetype == txt){
		            	 $(".amendtype").val(val);
		            	 return false;
		             }
		         });
				$(".amendnumber").val(row.devicenumber);
				$(".amendId option").each(function (){
		             var txt = $(this).text(); //获取单个text
		             var val = $(this).val(); //获取单个value
		             if(row.groupId == txt){
		            	 $(".amendId").val(val);
		            	 return false;
		             }
		         });
				$(".amendDate").val(row.sendDate);
				$(".amendName").val(row.sendName);
				$(".amendNum").val(row.sendNum);
			    $(".createByName").val(row.createByName);
			    $(".createDateStr").val(row.createDateStr);
			    $(".updateByName").val(row.updateByName);
			    $(".updateDateStr").val(row.updateDateStr);
			    $(".amendRemark").val(row.remark);
			    if(row.status == "1"){
			    	$(".amendStatus").attr("checked",true);
			    }else{
			    	$(".amendStatus").attr("checked",false);
			    }
			}
		});
		
		$('.amendSave').click(function(){
			var bootstrapValidator = $("#amendForm").data('bootstrapValidator');
		    bootstrapValidator.validate();
		    if(bootstrapValidator.isValid()){
				var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
			    var obj = $("#amendForm").toJsonObject();
			    if($(".amendStatus").is(':checked')){
					obj.status = "1";
				}else{
					obj.status = "0";
				}
			    obj.sendDate = $("#xg_date").val();
			    obj.id = $("#dataGrid").jqGrid('getCell',ids[0],'id');
			    console.log(obj);
		    	$.ajax({
		    		type: 'Get',
		    		url: basePath+'/inventory/basis/app/device/save',
		    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		    		data: obj,
		    		success: function(data) {
			    		if(data.result == 1){
			    			$("#dataGrid").jqGrid("setGridParam",{
								datatype:'json',
								page: $('#dataGrid').getGridParam('page'),
							}).trigger("reloadGrid");
		    				$('#amendModal').modal('hide');
		    				$.zxsaas_plus.showalert("提示","修改成功");
		    				$('#amendForm')[0].reset();
		    				bootstrapValidator.resetForm();
		    			}else{
	    	    			$.zxsaas_plus.showalert("错误",data.desc)
	    	    		}
		    		},
		    		error: function(msg){
		    			$.zxsaas_plus.showalert("提示","error!")
		    		}
		    	});
		    }
		})
		
//		删除
		$('.del').click(function(){
			var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
			if(ids.length< 1){
				$.zxsaas_plus.showalert("提示","请选择需要删除的数据");
				return;
			}else{
				var arr = [];
				var data = {};
				data.ids = "";
				for(x in ids){
					arr.push(ids[x]);
					var id = $("#dataGrid").jqGrid('getCell',ids[x],'id');
					data.ids += id+",";
				}
				data.ids = data.ids.substring(0, data.ids.length - 1);
				$.zxsaas_plus.showconfirm("提示","是否确定删除此数据？",function(){
		    	$.ajax({
		    		type: 'Get',
		    		url: basePath+'/inventory/basis/app/device/del',
		    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		    		data: data,
		    		success: function(data) {
		    			console.log(data);
		    			if(data.result == 1){
		    				$("#dataGrid").jqGrid("setGridParam",{
								datatype:'json',
								page: $('#dataGrid').getGridParam('page'),
							}).trigger("reloadGrid");
		    				$('#delModal').modal('hide');
		    				$.zxsaas_plus.showalert("提示","删除成功");
		    			}else{
	    	    			$.zxsaas_plus.showalert("错误",data.desc)
	    	    		}
		    		},
		    		error: function(msg){
		    			$.zxsaas_plus.showalert("提示","error!")
		    		}
			    });
				},function(){
					
				});
			};
		});
		
		
		//	启用
		$('.using').click(function(){
			var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
			if(ids.length< 1){
				$.zxsaas_plus.showalert("提示","请选择需要启用的数据");
				return;
			}else{
				var data = {};
				data.ids = "";
				for(x in ids){
					var id = $("#dataGrid").jqGrid('getCell',ids[x],'id');
					data.ids += id+",";
				}
				data.ids = data.ids.substring(0, data.ids.length - 1);
				$.zxsaas_plus.showconfirm("提示","是否确定启用此数据？",function(){
					$.ajax({
			    		type: 'Get',
			    		url: basePath+'/inventory/basis/app/device/enable',
			    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			    		data: data,
						success:function(data){
							console.log(data);
							if(data.result == 1){
								for(x in ids){
			    					$("#dataGrid").jqGrid('setCell',ids[x],'status',"0");
			    				}
								$.zxsaas_plus.showalert("提示","启用成功!");
							}else{
		    	    			$.zxsaas_plus.showalert("错误",data.desc)
		    	    		}
						},
						error:function(data){
							$.zxsaas_plus.showalert("提示","启用失败!");
						}
			    	});
				},function(){
					
				});
			}
		});
		
//		禁用
		$('.off').click(function(){
			var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
			if(ids.length< 1){
				$.zxsaas_plus.showalert("提示","请选择需要禁用的数据");
				return;
			}else{
				var data = {};
				data.ids = "";
				for(x in ids){
					var id = $("#dataGrid").jqGrid('getCell',ids[x],'id');
					data.ids += id+",";
				}
				data.ids = data.ids.substring(0, data.ids.length - 1);
				$.zxsaas_plus.showconfirm("提示","是否确定禁用此数据？",function(){
				$.ajax({
		    		type: 'Get',
		    		url: basePath+'/inventory/basis/app/device/disenable',
		    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		    		data: data,
					success:function(data){
						console.log(data)
						if(data.result == 1){
		    				$('#delModal').modal('hide');
		    				for(x in ids){
		    					$("#dataGrid").jqGrid('setCell',ids[x], 'status',"1");
		    				}
		    				$.zxsaas_plus.showalert("提示","禁用成功!");
		    			}else{
	    	    			$.zxsaas_plus.showalert("错误",data.desc)
	    	    		}
					},
					error:function(data){
						$.zxsaas_plus.showalert("提示","禁用失败!");
					}
		    	});
				},function(){
					
				});
			}
		});
		
		
//		导出
		$('.derive').click(function(){
			var obj = {
				devicetype: $(".devicetype").val(),
				keyWord: $(".keyWord").val(),
				sendDateBegin: $("#bg_date").val(),
				sendDateEnd: $("#end_date").val()
			}
			if($(".queryDisEnbled").is(':checked')){
				obj.queryDisEnbled = 1;
			}else{
				obj.queryDisEnbled = 0;
			}
			console.log(obj);
			window.open(basePath+'/inventory/basis/app/device/export?devicetype='+obj.devicetype+'&keyWord='+obj.keyWord+'&sendDateBegin='+obj.sendDateBegin+'&sendDateEnd='+obj.sendDateEnd+'&queryDisEnbled='+obj.queryDisEnbled);
		});
		
		//验证bootstrap规范
		$('#amendForm').bootstrapValidator({
			feedbackIcons:{
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields:{
				devicetype:{
					validators:{
						notEmpty:{
							message:'类型必选'
						}
					},
				},
				devicenumber:{
					validators:{
						notEmpty:{
							message:'字段必填'
						}
					},
				}
			}
		});
		
		$('#addForm').bootstrapValidator({
			feedbackIcons:{
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields:{
				devicetype:{
					validators:{
						notEmpty:{
							message:'类型必选'
						}
					},
				},
				devicenumber:{
					validators:{
						notEmpty:{
							message:'字段必填'
						}
					},
				}
			}
		});
		
	});
    
//    转时间格式年月日
    function dateStr(s){
		var a = parseInt(s);
		a = new Date(a);
		return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
	}
    
//  转时间格式年月日时分秒
    function dateString(s){
		var a = parseInt(s);
		a = new Date(a);
		var h = a.getHours();
		var m = a.getMinutes();
		var s = a.getSeconds()
		if(parseInt(h)<10){
			h = "0" +a.getHours();
		}
		if(parseInt(m)<10){
			m = "0" +a.getMinutes();
		}
		if(parseInt(s)<10){
			s = "0" +a.getSeconds();
		}
		return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + " " + h + ":" + m + ":" + s;
	}
    
    function queryDevicetype(){
    	$.ajax({
    		type: 'Get',
    		url: basePath+'/inventory/basis/app/device/findkind',
    		async: false,
    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
    		success: function(data) {
    			var list = data.data.dataList;
    			$('select[name="devicetype"]').empty();
    			$('select[name="devicetype"]').append("<option></option>");
    			for(x in list){
    				var option = "<option value="+ list[x].code +">"+ list[x].name +"</option>";
    				$('select[name="devicetype"]').append(option);
    			}
    		},
    		error: function(msg){
    			$.zxsaas_plus.showalert("提示","error!")
    		}
    	});
    }
    
    function getGroupList(){
    	var obj = {};
    	obj.status = 0;
    	$.ajax({
    		type: 'Get',
    		url: basePath+'/inventory/common/getGroupList',
    		async: false,
    		data: obj,
    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
    		success: function(data) {
    			var list = data.data.dataList;
    			$('select[name="groupId"]').empty();
    			$('select[name="groupId"]').append("<option></option>");
    			for(x in list){
    				var option = "<option value="+ list[x].id +">"+ list[x].name +"</option>";
    				$('select[name="groupId"]').append(option);
    			}
    		},
    		error: function(msg){
    			$.zxsaas_plus.showalert("提示","error!")
    		}
    	});
    }
    
    function loadmodal(options) {
    	$.jgrid.defaults.width = 1280;
    	$.jgrid.defaults.responsive = true;
    	$.jgrid.defaults.styleUI = 'Bootstrap';

		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				root: "data.rows",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			//cellsubmit: 'clientArray',//单元格保存内容的位置
			colNames: options.colNames,
			colModel: options.colModel,
			//loadonce: false,
			sortable: false,
			multiselect : true,	//复选框属性
			rownumbers:true,	//显示行号
			//loadonce: true,
			rowNum: 10,
			rowList: [10, 20, 30],
			pager: options.pager,
			viewrecords: true,
			//cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.5,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {

			},
			onCellSelect: function(rowid, index,cell, e) {
				if(index == 14){
					$("#timeModal").modal('show');
					var obj ={
						pageNum: 1,
						pageSize: 10
					}
					obj.resCkzsId = $("#dataGrid").jqGrid('getCell',rowid,'id');
					console.log(obj);
					$("#timeGrid").jqGrid("setGridParam",{
						datatype:'json',
						page: 1,
						postData: obj
					}).trigger("reloadGrid"); 
				}
			},
			onSelectRow: function(id) {

			},

			beforeSelectRow: function(rowid, e) {

			},
			afterInsertRow: function(rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				var ids = $("#dataGrid").jqGrid("getDataIDs");
				for(x in ids){
					var row = $("#dataGrid").jqGrid('getRowData',ids[x]);
					$("#dataGrid").jqGrid("setCell",ids[x],'devicetype',row.devicetypeName);
					$("#dataGrid").jqGrid("setCell",ids[x],'groupId',row.groupName);
					$("#dataGrid").jqGrid("setCell",ids[x],'sendDate',row.sendDateStr);
				}
			},
			loadComplete: function(data) {
			
			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})

    }
    
    function timemodal(options) {
    	$.jgrid.defaults.width = 560;
    	$.jgrid.defaults.responsive = true;
    	$.jgrid.defaults.styleUI = 'Bootstrap';

		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				root: "data.rows",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			//cellsubmit: 'clientArray',//单元格保存内容的位置
			colNames: options.colNames,
			colModel: options.colModel,
			//loadonce: false,
			sortable: false,
			multiselect : false,	//复选框属性
			rownumbers:true,	//显示行号
			//loadonce: true,
			rowNum: 10,
			rowList: [10, 20, 30],
			pager: options.pager,
			viewrecords: true,
			//cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.3,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {

			},
			onCellSelect: function(id, index,cell, e) {
				
			},
			onSelectRow: function(id) {

			},
			beforeSelectRow: function(rowid, e) {

			},
			afterInsertRow: function(rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				var ids = $("#timeGrid").jqGrid("getDataIDs");
				for(x in ids){
					var row = $("#timeGrid").jqGrid('getCell',ids[x],'createDate');
					var t = dateString(row);
					$("#timeGrid").jqGrid("setCell",ids[x],'createDate',t);
				}
			},
			loadComplete: function(data) {

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})
    }
    
    
    //初始化受理时间
    function initDealDate(){
//    	$("input[name='deviceDate']").prop('readonly','readonly')
    	formateDateInput("input[name='deviceDate']");
    	if($("input[name='deviceDate']").val()==""||$("input[name='deviceDate']").val()==null||$("input[name='billsDate']").val()==undefined)
    	{
    		$("input[name='deviceDate']").val(_authList.maxDate);
    	}
    }

    //格式化日期控件
    function formateDateInput(modelId){
    	if(_authList.hasPermissions==0){
    		$(modelId).prop('disabled',true);
    	}else{
    		$(modelId).prop('disabled',false);
    		$("input[name='deviceDate']").datetimepicker({
    	        lang: "ch",           //语言选择中文
    	        format: "Y-m-d",      //格式化日期
    	        timepicker: false,    //关闭时间选项
    	        todayButton: false,    //关闭选择今天按钮
    	        maxDate:_authList.maxDate,
    		    minDate:_authList.minDate,
    	    })
    	}
    }
