//时间插件
    $(document).ready(function(){
//    	表格参数
    	var options = {
        		LoadTableUrl: basePath + '/inventory/basis/app/device/queryDraft',
        		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
        		pager: "#jqGridPager",
        		colNames : ['id','EXCEL顺序号','系统判定结果','设备类型','设备类型名称','设备号','集团','集团名称','发货日期','发货日期格式','发货人','发货单号','备注'], 
        		colModel : [
        		            {name:'id',index:'id',width:80,align:'center',hidden:true},
        		            {name:'exclId',index:'exclId', width:120,align:'center',sortable:false},
    						{name:'result',index:'result', width:200,align:'center', sorttype:'string',sortable:false},
    						{name:'devicetype',index:'devicetype', width:150,align:'center',sortable:false},
    						{name:'devicetypeName',index:'devicetypeName', width:150,align:'center',hidden:true},
    						{name:'devicenumber',index:'devicenumber', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'groupId',index:'groupId', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'groupName',index:'groupName', width:150,align:'center', sorttype:'string',hidden:true},
    						{name:'sendDate',index:'sendDate', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'sendDateStr',index:'sendDateStr', width:150,align:'center',hidden:true},
    						{name:'sendName',index:'sendName', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'sendNum',index:'sendNum', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
    	                ]       
        	};
    	loadmodal(options);
		
//		查询
		$('.search').click(function(){
			var obj = {
				page: 1,
				rows: 100,
				keyWord: $(".keyWord").val()
			}
			obj.flag = objFlag();
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
		
//		导入
		$('.sure').click(function(){
			if($(".file").val() == ""){
				$.zxsaas_plus.showalert("错误","请上传需要导入的文件！");
				return
			}
			$("#leadModal").modal('hide');
			$("#file").ajaxSubmit({         
				url: '/manager/inventory/basis/app/device/upload',
				type: 'post', 
				dataType: 'json',
				iframe: true ,                            
				success: function(data) {
					console.log(data);
		            var result = data.data;
		            if (data.result == 1){
		            	$.zxsaas_plus.showalert("提示","上传成功!");
		            	$('.search').click();
		            }else{
    	    			$.zxsaas_plus.showalert("错误",data.desc)
    	    		}	
	            },
	            error: function(arg1, arg2, ex) {
	            	$.zxsaas_plus.showalert("提示","arg1.responseText!");
	            }
	         });
		})
		
//		清空
		$('.empty').click(function(){
	    	$.ajax({
	    		type: 'Get',
	    		url: basePath+'/inventory/basis/app/device/emptyDraftData',
	    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	    		success: function(data) {
	    			console.log(data);
		    		if(data.result == 1){
		    			$(".search").click();
	    			}else{
    	    			$.zxsaas_plus.showalert("错误",data.desc)
    	    		}
	    		},
	    		error: function(msg){
	    			$.zxsaas_plus.showalert("提示","error!")
	    		}
	    	});
		})
		
//		执行
		$('.execute').click(function(){
	    	$.ajax({
	    		type: 'Get',
	    		url: basePath+'/inventory/basis/app/device/executeImport',
	    		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	    		success: function(data) {
	    			console.log(data);
	    			if(data.result == 1){
	    				$.zxsaas_plus.showalert("提示","执行成功");
	    			}else{
    	    			$.zxsaas_plus.showalert("错误",data.desc)
    	    		}
	    			$(".search").click();
	    		},
	    		error: function(msg){
	    			$.zxsaas_plus.showalert("提示","error!")
	    		}
		    });
		});
		
		
		//	导出
		$('.derive').click(function(){
			var obj = {
				keyWord: $(".keyWord").val(),
			}
			obj.flag = objFlag();
			window.open(basePath+'/inventory/basis/app/device/exportDraft?keyWord='+obj.keyWord+'&flag='+obj.flag);
		});
		
//		模板下载
		$('.down').click(function(){
			window.open(basePath+'/inventory/basis/app/device/downImportTemplate');
		});
		
	});
    
    function objFlag(){
    	if($("input[name='true']").is(":checked")){
			if($("input[name='false']").is(":checked")){
				return "";
			}else{
				return 0;
			}
		}else{
			if($("input[name='false']").is(":checked")){
				return 1;
			}else{
				return "";
			}
		}
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
			onCellSelect: function(id, index, e) {
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
